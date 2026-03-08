// ═══════════════════════════════════════════════════════════════
// Pahadi Roots — Customer Auth API (Vercel Serverless Function)
// Version: 1.0 — Phone OTP + Email/Password, linked accounts
// File path: api/auth.js
// ═══════════════════════════════════════════════════════════════

const SUPABASE_URL  = process.env.SUPABASE_URL;
const SUPABASE_KEY  = process.env.SUPABASE_SERVICE_KEY;  // service key for admin ops
const SUPABASE_ANON = process.env.SUPABASE_ANON_KEY;     // anon key for auth

const CORS_HEADERS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type':                 'application/json',
  'Cache-Control':                'no-store, no-cache, must-revalidate',
  'Surrogate-Control':            'no-store',
};

// ── Supabase Auth REST helper ──────────────────────────────────
async function sbAuth(path, body = null, token = null) {
  const url = `${SUPABASE_URL}/auth/v1${path}`;
  const headers = {
    'Content-Type':  'application/json',
    'apikey':        SUPABASE_ANON,
    'Authorization': token ? `Bearer ${token}` : `Bearer ${SUPABASE_ANON}`,
  };
  const res = await fetch(url, {
    method: body !== null ? 'POST' : 'GET',
    headers,
    body: body !== null ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  if (!res.ok) throw { status: res.status, message: data.msg || data.error_description || data.message || 'Auth error' };
  return data;
}

// ── Supabase Admin helper (service key) ───────────────────────
async function sbAdmin(method, path, body = null) {
  const url = `${SUPABASE_URL}${path}`;
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type':  'application/json',
      'apikey':        SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Prefer':        'return=representation',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw { status: res.status, message: text };
  return text ? JSON.parse(text) : null;
}

// ── Get/create customer profile from customers table ──────────
async function syncCustomerProfile(user) {
  const phone = user.phone || '';
  const email = user.email || '';
  try {
    // Try find by supabase auth user id first
    let existing = await sbAdmin('GET', `/rest/v1/customers?auth_user_id=eq.${user.id}&select=*`).catch(() => null);
    if (existing && existing.length > 0) return existing[0];

    // Try find by phone or email
    if (phone) {
      const byPhone = await sbAdmin('GET', `/rest/v1/customers?phone=eq.${encodeURIComponent(phone)}&select=*`).catch(() => null);
      if (byPhone && byPhone.length > 0) {
        // Link auth_user_id to existing customer
        await sbAdmin('PATCH', `/rest/v1/customers?id=eq.${byPhone[0].id}`, { auth_user_id: user.id }).catch(() => {});
        return byPhone[0];
      }
    }
    if (email) {
      const byEmail = await sbAdmin('GET', `/rest/v1/customers?email=eq.${encodeURIComponent(email)}&select=*`).catch(() => null);
      if (byEmail && byEmail.length > 0) {
        await sbAdmin('PATCH', `/rest/v1/customers?id=eq.${byEmail[0].id}`, { auth_user_id: user.id, phone: phone || byEmail[0].phone }).catch(() => {});
        return byEmail[0];
      }
    }

    // Create new customer profile
    const nameParts = (user.user_metadata?.full_name || '').trim().split(' ');
    const newCustomer = await sbAdmin('POST', '/rest/v1/customers', {
      auth_user_id: user.id,
      first_name:   nameParts[0] || (email ? email.split('@')[0] : 'Customer'),
      last_name:    nameParts.slice(1).join(' ') || null,
      phone:        phone || null,
      email:        email || null,
    });
    return newCustomer && newCustomer[0] ? newCustomer[0] : null;
  } catch (e) {
    console.warn('syncCustomerProfile failed:', e);
    return null;
  }
}

// ── Get customer orders ────────────────────────────────────────
async function getCustomerOrders(customerId) {
  try {
    const orders = await sbAdmin('GET',
      `/rest/v1/orders?customer_id=eq.${customerId}&order=created_at.desc&limit=20&select=id,order_number,total_amount,order_status,payment_status,payment_method,created_at`
    );
    if (!orders || !orders.length) return [];
    // Get items for each order
    const orderIds = orders.map(o => o.id);
    const items = await sbAdmin('GET',
      `/rest/v1/order_items?order_id=in.(${orderIds.join(',')})&select=order_id,quantity,price_at_time,product_id,products(name,emoji)`
    ).catch(() => []);
    return orders.map(o => ({
      ...o,
      items: (items || []).filter(i => i.order_id === o.id).map(i => ({
        qty:   i.quantity,
        price: i.price_at_time,
        name:  i.products?.name || 'Product',
        emoji: i.products?.emoji || '🌿',
      }))
    }));
  } catch (e) {
    return [];
  }
}

// ══════════════════════════════════════════════════════════════
// MAIN HANDLER
// ══════════════════════════════════════════════════════════════
export default async function handler(req, res) {
  const ok  = (data)   => { Object.entries(CORS_HEADERS).forEach(([k,v]) => res.setHeader(k,v)); return res.status(200).json(data); };
  const err = (s, msg) => { Object.entries(CORS_HEADERS).forEach(([k,v]) => res.setHeader(k,v)); return res.status(s).json({ error: msg }); };

  Object.entries(CORS_HEADERS).forEach(([k,v]) => res.setHeader(k,v));
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST')   return err(405, 'Method not allowed');

  if (!SUPABASE_URL || !SUPABASE_KEY || !SUPABASE_ANON) {
    return err(500, 'Server misconfigured — check SUPABASE_ANON_KEY env var');
  }

  let body = {};
  try { body = req.body || {}; if (typeof body === 'string') body = JSON.parse(body); } catch(e) { return err(400, 'Invalid JSON'); }

  const { action } = body;

  // ── 1. Send Phone OTP ──────────────────────────────────────
  if (action === 'send_otp') {
    const { phone } = body;
    if (!phone) return err(400, 'Phone required');
    const normalised = phone.startsWith('+') ? phone : '+91' + phone.replace(/\D/g, '').slice(-10);
    try {
      await sbAuth('/otp', { phone: normalised, channel: 'sms' });
      return ok({ success: true, message: 'OTP sent' });
    } catch(e) {
      // Friendly error if SMS provider not configured
      const msg = e.message || '';
      if (msg.toLowerCase().includes('unsupported') || msg.toLowerCase().includes('provider') || e.status === 422) {
        return err(422, 'SMS_NOT_CONFIGURED');
      }
      return err(e.status || 500, e.message || 'Failed to send OTP');
    }
  }

  // ── 2. Verify Phone OTP ────────────────────────────────────
  if (action === 'verify_otp') {
    const { phone, token } = body;
    if (!phone || !token) return err(400, 'Phone and OTP required');
    const normalised = phone.startsWith('+') ? phone : '+91' + phone.replace(/\D/g, '').slice(-10);
    try {
      const data = await sbAuth('/verify', { phone: normalised, token, type: 'sms' });
      const user = data.user || data;
      if (!user || !user.id) return err(400, 'Verification failed');
      const profile = await syncCustomerProfile(user);
      return ok({
        success:      true,
        access_token: data.access_token,
        refresh_token:data.refresh_token,
        user: {
          id:    user.id,
          phone: user.phone || normalised,
          email: user.email || null,
        },
        profile,
      });
    } catch(e) {
      return err(e.status || 400, e.message || 'Invalid OTP');
    }
  }

  // ── 3. Email Sign Up ───────────────────────────────────────
  if (action === 'email_signup') {
    const { email, password, full_name } = body;
    if (!email || !password) return err(400, 'Email and password required');
    if (password.length < 6)  return err(400, 'Password must be at least 6 characters');
    try {
      const data = await sbAuth('/signup', {
        email, password,
        data: { full_name: full_name || '' }
      });
      // Supabase may return user in data.user or data directly
      const user = data.user || data;
      if (!user || !user.id) return err(400, 'Signup failed — could not create user');
      const profile = await syncCustomerProfile(user);
      return ok({
        success:      true,
        access_token: data.access_token || null,
        refresh_token:data.refresh_token || null,
        user: {
          id:    user.id,
          email: user.email || email,
          phone: user.phone || null,
        },
        profile,
      });
    } catch(e) {
      return err(e.status || 400, e.message || 'Signup failed');
    }
  }

  // ── 4. Email Sign In ───────────────────────────────────────
  if (action === 'email_login') {
    const { email, password } = body;
    if (!email || !password) return err(400, 'Email and password required');
    try {
      const data = await sbAuth('/token?grant_type=password', { email, password });
      const user = data.user || data;
      if (!user || !user.id) return err(401, 'Invalid email or password');
      const profile = await syncCustomerProfile(user);
      return ok({
        success:      true,
        access_token: data.access_token,
        refresh_token:data.refresh_token,
        user: {
          id:    user.id,
          email: user.email || email,
          phone: user.phone || null,
        },
        profile,
      });
    } catch(e) {
      return err(e.status || 401, e.message || 'Invalid email or password');
    }
  }

  // ── 5. Refresh Token ───────────────────────────────────────
  if (action === 'refresh_token') {
    const { refresh_token } = body;
    if (!refresh_token) return err(400, 'refresh_token required');
    try {
      const data = await sbAuth('/token?grant_type=refresh_token', { refresh_token });
      return ok({
        success:       true,
        access_token:  data.access_token,
        refresh_token: data.refresh_token,
      });
    } catch(e) {
      return err(401, 'Session expired — please login again');
    }
  }

  // ── 6. Get Profile + Orders ────────────────────────────────
  if (action === 'get_profile') {
    const token = (req.headers['authorization'] || '').replace('Bearer ', '');
    if (!token) return err(401, 'Not logged in');
    try {
      const user = await sbAuth('/user', null, token);
      const profile = await syncCustomerProfile(user);
      const orders  = profile ? await getCustomerOrders(profile.id) : [];
      return ok({ success: true, user: { id: user.id, email: user.email, phone: user.phone }, profile, orders });
    } catch(e) {
      return err(401, 'Session expired — please login again');
    }
  }

  // ── 7. Link Email to Phone account (or vice versa) ─────────
  if (action === 'link_email') {
    const token = (req.headers['authorization'] || '').replace('Bearer ', '');
    const { email, password } = body;
    if (!token)          return err(401, 'Not logged in');
    if (!email || !password) return err(400, 'Email and password required');
    try {
      // Update user email via admin API
      const user = await sbAuth('/user', null, token);
      await sbAdmin('PUT', `/auth/v1/admin/users/${user.id}`, { email, password });
      // Also update customer table
      const profile = await syncCustomerProfile(user);
      if (profile) await sbAdmin('PATCH', `/rest/v1/customers?id=eq.${profile.id}`, { email });
      return ok({ success: true, message: 'Email linked successfully' });
    } catch(e) {
      return err(e.status || 400, e.message || 'Failed to link email');
    }
  }

  // ── 8. Link Phone to Email account ────────────────────────
  if (action === 'link_phone') {
    const token = (req.headers['authorization'] || '').replace('Bearer ', '');
    const { phone } = body;
    if (!token) return err(401, 'Not logged in');
    if (!phone) return err(400, 'Phone required');
    try {
      const normalised = phone.startsWith('+') ? phone : '+91' + phone.replace(/\D/g, '').slice(-10);
      const user = await sbAuth('/user', null, token);
      await sbAdmin('PUT', `/auth/v1/admin/users/${user.id}`, { phone: normalised });
      const profile = await syncCustomerProfile(user);
      if (profile) await sbAdmin('PATCH', `/rest/v1/customers?id=eq.${profile.id}`, { phone: normalised });
      return ok({ success: true, message: 'Phone linked successfully' });
    } catch(e) {
      return err(e.status || 400, e.message || 'Failed to link phone');
    }
  }

  // ── 9. Update Profile ──────────────────────────────────────
  if (action === 'update_profile') {
    const token = (req.headers['authorization'] || '').replace('Bearer ', '');
    if (!token) return err(401, 'Not logged in');
    const { first_name, last_name, address_line1, city, state, postal_code, saved_addresses } = body;
    try {
      const user    = await sbAuth('/user', null, token);
      const profile = await syncCustomerProfile(user);
      if (!profile) return err(404, 'Profile not found');
      const updates = {};
      if (first_name       !== undefined) updates.first_name       = first_name;
      if (last_name        !== undefined) updates.last_name        = last_name;
      if (address_line1    !== undefined) updates.address_line1    = address_line1;
      if (city             !== undefined) updates.city             = city;
      if (state            !== undefined) updates.state            = state;
      if (postal_code      !== undefined) updates.postal_code      = postal_code;
      if (saved_addresses  !== undefined) updates.saved_addresses  = saved_addresses;
      await sbAdmin('PATCH', `/rest/v1/customers?id=eq.${profile.id}`, updates);
      return ok({ success: true, profile: { ...profile, ...updates } });
    } catch(e) {
      return err(e.status || 500, e.message || 'Update failed');
    }
  }

  // ── 10. Logout ─────────────────────────────────────────────
  if (action === 'logout') {
    const token = (req.headers['authorization'] || '').replace('Bearer ', '');
    if (token) {
      try { await sbAuth('/logout', {}, token); } catch(e) {}
    }
    return ok({ success: true });
  }

  // ── 11. Forgot Password — send reset email via Resend ───────
  if (action === 'forgot_password') {
    const { email } = body;
    if (!email) return err(400, 'Email required');

    const RESEND_KEY = process.env.RESEND_API_KEY;
    const SITE_URL   = 'https://pahadiroots.com';

    try {
      // Step 1: Generate reset token via Supabase Admin
      const genRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/generate_link`, {
        method: 'POST',
        headers: {
          'Content-Type':  'application/json',
          'apikey':        SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
        },
        body: JSON.stringify({
          type:       'recovery',
          email,
          options: { redirect_to: SITE_URL }
        }),
      });
      const genData = await genRes.json();
      if (!genRes.ok) {
        // Don't reveal if email exists
        return ok({ success: true });
      }

      // Step 2: Build reset URL pointing to pahadiroots.com
      const actionLink = genData.action_link || '';
      // Replace Supabase URL with our site URL
      const resetUrl = actionLink.replace(/^https?:\/\/[^\/]+/, SUPABASE_URL)
        .replace('redirect_to=', 'redirect_to=' + encodeURIComponent(SITE_URL) + '&_=');

      // Use the hashed token directly
      const token       = genData.hashed_token || '';
      const finalResetUrl = `${SITE_URL}#access_token=${token}&type=recovery`;

      // Step 3: Send via Resend
      if (RESEND_KEY) {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type':  'application/json',
            'Authorization': `Bearer ${RESEND_KEY}`,
          },
          body: JSON.stringify({
            from:    'Pahadi Roots <noreply@pahadiroots.com>',
            to:      [email],
            subject: 'Reset Your Password — Pahadi Roots',
            html: `
              <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px">
                <div style="text-align:center;margin-bottom:24px">
                  <span style="font-size:36px">🌿</span>
                  <h2 style="color:#1a3a1e;margin:8px 0">Pahadi Roots</h2>
                </div>
                <h3 style="color:#1a3a1e">Reset Your Password</h3>
                <p style="color:#555;line-height:1.6">
                  Aapne password reset request ki hai. Neeche diye button pe click karke naya password set karein.
                </p>
                <div style="text-align:center;margin:32px 0">
                  <a href="${finalResetUrl}" 
                     style="background:#1a5c2a;color:#fff;padding:14px 32px;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px">
                    🔑 Reset Password
                  </a>
                </div>
                <p style="color:#888;font-size:12px;text-align:center">
                  Yeh link 1 ghante mein expire ho jaayega.<br>
                  Agar aapne request nahi ki, please ignore karein.
                </p>
                <hr style="border:none;border-top:1px solid #eee;margin:24px 0">
                <p style="color:#aaa;font-size:11px;text-align:center">
                  Pahadi Roots — Pure Himalayan Products<br>
                  pahadiroots.com
                </p>
              </div>
            `,
          }),
        });
      }
      return ok({ success: true });
    } catch(e) {
      return ok({ success: true }); // Always success for security
    }
  }

  // ── 12. Reset Password — set new password with token ────────
  if (action === 'reset_password') {
    const token = (req.headers['authorization'] || '').replace('Bearer ', '');
    const { password } = body;
    if (!token)   return err(401, 'Invalid or expired reset link');
    if (!password || password.length < 6) return err(400, 'Password must be at least 6 characters');
    try {
      const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
        method: 'PUT',
        headers: {
          'Content-Type':  'application/json',
          'apikey':        SUPABASE_ANON,
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw { status: res.status, message: data.msg || data.message || 'Reset failed' };
      return ok({ success: true });
    } catch(e) {
      return err(e.status || 400, e.message || 'Reset failed — link expire ho gaya');
    }
  }

  // ── Google OAuth ─────────────────────────────────────────────
  if (action === 'google_oauth') {
    const redirectUrl = body.redirectUrl || process.env.SITE_URL || 'https://pahadiroots.com';
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
        queryParams: { access_type: 'offline', prompt: 'consent' }
      }
    });
    if (error) return err(400, error.message);
    return res.status(200).json({ url: data.url });
  }

  if (action === 'google_callback') {
    const { code, redirectUrl } = body;
    if (!code) return err(400, 'No code provided');
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) return err(400, error.message);
    const session = data.session;
    const user = data.user;
    // Upsert customer record
    let profile = null;
    try {
      const nameParts = (user.user_metadata?.full_name || '').split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      const { data: existing } = await supabase
        .from('customers')
        .select('*')
        .eq('auth_user_id', user.id)
        .single();
      if (!existing) {
        const { data: newCust } = await supabase
          .from('customers')
          .insert({
            auth_user_id: user.id,
            email: user.email,
            first_name: firstName,
            last_name: lastName,
            avatar_url: user.user_metadata?.avatar_url || null
          })
          .select()
          .single();
        profile = newCust;
      } else {
        profile = existing;
      }
    } catch(e) {}
    return res.status(200).json({ session, profile, user });
  }

  return err(400, `Unknown action: ${action}`);
}


