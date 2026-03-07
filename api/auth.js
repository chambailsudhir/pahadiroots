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
    const { first_name, last_name, address_line1, city, state, postal_code } = body;
    try {
      const user    = await sbAuth('/user', null, token);
      const profile = await syncCustomerProfile(user);
      if (!profile) return err(404, 'Profile not found');
      const updates = {};
      if (first_name    !== undefined) updates.first_name    = first_name;
      if (last_name     !== undefined) updates.last_name     = last_name;
      if (address_line1 !== undefined) updates.address_line1 = address_line1;
      if (city          !== undefined) updates.city          = city;
      if (state         !== undefined) updates.state         = state;
      if (postal_code   !== undefined) updates.postal_code   = postal_code;
      await sbAdmin('PATCH', `/rest/v1/customers?id=eq.${profile.id}`, updates);
      return ok({ success: true, profile: { ...profile, ...updates } });
    } catch(e) {
      return err(e.status || 500, e.message || 'Update failed');
    }
  }

  // ── 10. Logout (client-side only, but invalidate session) ──
  if (action === 'logout') {
    const token = (req.headers['authorization'] || '').replace('Bearer ', '');
    if (token) {
      try { await sbAuth('/logout', {}, token); } catch(e) {}
    }
    return ok({ success: true });
  }

  return err(400, `Unknown action: ${action}`);
}
