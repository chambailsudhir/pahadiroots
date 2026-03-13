// ═══════════════════════════════════════════════════════════════
// Pahadi Roots — Abandoned Cart Recovery API
// File: api/abandoned-cart.js
// ═══════════════════════════════════════════════════════════════

export const config = { api: { bodyParser: { sizeLimit: '1mb' } } };

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;
const RESEND_KEY   = process.env.RESEND_API_KEY;
const CRON_SECRET  = process.env.CRON_SECRET;

async function sbFetch(method, table, query = '', body = null) {
  let url = `${SUPABASE_URL}/rest/v1/${table}`;
  if (query) url += `?${query}`;
  const r = await fetch(url, {
    method,
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': method === 'POST' ? 'return=representation' : 'return=minimal',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await r.text();
  if (!r.ok) throw new Error(text);
  return text ? JSON.parse(text) : null;
}

// Get user info from token
async function getUserFromToken(token) {
  const r = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${token}` }
  });
  if (!r.ok) return null;
  return await r.json();
}

async function sendAbandonedCartEmail(email, cartItems, cartTotal) {
  if (!RESEND_KEY || !email) return;

  const itemsHtml = cartItems.map(i => `
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #f0e8d4;font-size:14px">${i.emoji || '🌿'} ${i.name}${i.variant ? ' <span style="color:#888;font-size:12px">('+i.variant+')</span>' : ''}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #f0e8d4;text-align:center;color:#666">×${i.qty}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #f0e8d4;text-align:right;font-weight:700;color:#1a3a1e">₹${(i.price * i.qty).toLocaleString('en-IN')}</td>
    </tr>`).join('');

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f0e8;font-family:'Helvetica Neue',Arial,sans-serif">
<div style="max-width:560px;margin:0 auto;padding:32px 16px">

  <!-- Header -->
  <div style="background:linear-gradient(135deg,#1a3a1e 0%,#2d6a4f 100%);border-radius:16px 16px 0 0;padding:32px;text-align:center">
    <div style="font-size:40px">🏔️</div>
    <div style="font-family:Georgia,serif;font-size:26px;font-weight:900;color:#fff;margin-top:8px">Pahadi Roots</div>
    <div style="font-size:11px;color:rgba(255,255,255,.6);letter-spacing:2px;margin-top:4px">HIMALAYAN ORGANIC STORE</div>
  </div>

  <!-- Body -->
  <div style="background:#fff;padding:36px;border-radius:0 0 16px 16px;box-shadow:0 4px 24px rgba(0,0,0,.08)">
    <h2 style="font-family:Georgia,serif;color:#1a3a1e;margin:0 0 12px;font-size:22px">Your cart is waiting! 🛒</h2>
    <p style="color:#555;font-size:14px;line-height:1.7;margin:0 0 28px">
      You left some pure Himalayan goodness behind. Your cart has been saved — complete your order before items sell out!
    </p>

    <!-- Cart Items Table -->
    <div style="background:#fdf8f0;border-radius:12px;overflow:hidden;margin-bottom:28px;border:1px solid #f0e8d4">
      <table style="width:100%;border-collapse:collapse">
        <thead>
          <tr style="background:#f0e8d4">
            <th style="padding:10px 12px;text-align:left;font-size:11px;color:#888;font-weight:800;letter-spacing:.5px">PRODUCT</th>
            <th style="padding:10px 12px;text-align:center;font-size:11px;color:#888;font-weight:800;letter-spacing:.5px">QTY</th>
            <th style="padding:10px 12px;text-align:right;font-size:11px;color:#888;font-weight:800;letter-spacing:.5px">AMOUNT</th>
          </tr>
        </thead>
        <tbody>${itemsHtml}</tbody>
        <tfoot>
          <tr style="background:#1a3a1e">
            <td colspan="2" style="padding:14px 12px;font-weight:800;color:#fff;font-size:13px">Cart Total</td>
            <td style="padding:14px 12px;text-align:right;font-weight:900;color:#e8b84b;font-size:20px">₹${Number(cartTotal).toLocaleString('en-IN')}</td>
          </tr>
        </tfoot>
      </table>
    </div>

    <!-- CTA -->
    <div style="text-align:center;margin-bottom:28px">
      <a href="https://pahadiroots.com/?opencart=1"
         style="display:inline-block;background:linear-gradient(135deg,#2d6a4f,#40916c);color:#fff;text-decoration:none;padding:18px 48px;border-radius:12px;font-weight:800;font-size:16px;letter-spacing:.3px;box-shadow:0 4px 16px rgba(45,106,79,.4)">
        ⚡ Complete My Order
      </a>
    </div>

    <!-- Trust Badges -->
    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;padding:16px;background:#f9f9f9;border-radius:10px;margin-bottom:24px">
      <span style="font-size:12px;color:#555">✅ 100% Natural</span>
      <span style="font-size:12px;color:#555">🚚 Free Shipping</span>
      <span style="font-size:12px;color:#555">🔒 Secure Payment</span>
      <span style="font-size:12px;color:#555">↩️ Easy Returns</span>
    </div>

    <p style="font-size:12px;color:#aaa;text-align:center;margin:0;line-height:1.8">
      Need help? WhatsApp us at <a href="https://wa.me/919899984895" style="color:#2d6a4f;text-decoration:none">+91 98999 84895</a><br>
      or reply to this email — we're happy to help!
    </p>
  </div>

  <!-- Footer -->
  <div style="text-align:center;padding:20px 0;font-size:11px;color:#aaa">
    © 2026 Pahadi Roots · New Delhi, India · <a href="https://pahadiroots.com" style="color:#aaa">pahadiroots.com</a>
  </div>

</div>
</body>
</html>`;

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${RESEND_KEY}` },
    body: JSON.stringify({
      from: 'Pahadi Roots <noreply@pahadiroots.com>',
      to: [email],
      subject: '🏔️ Your Pahadi Roots cart is waiting — complete your order!',
      html,
    }),
  });
  if (!r.ok) throw new Error(await r.text());
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://pahadiroots.com');
  res.setHeader('Content-Type', 'application/json');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const body = req.body || {};
  const { action } = body;

  // ── ACTION: save ─────────────────────────────────────────────
  // Called from frontend whenever cart changes (user is logged in)
  if (action === 'save') {
    const { token, cart_items, cart_total } = body;
    if (!token || !cart_items?.length) return res.status(200).json({ ok: true });

    try {
      const user = await getUserFromToken(token);
      if (!user?.email) return res.status(200).json({ ok: true });

      // Upsert — one record per auth_user_id (update if exists)
      const existing = await sbFetch('GET', 'abandoned_carts',
        `auth_user_id=eq.${user.id}&converted=eq.false&select=id`);

      if (existing && existing.length > 0) {
        await sbFetch('PATCH', 'abandoned_carts', `id=eq.${existing[0].id}`, {
          cart_items,
          cart_total,
          reminder_sent: false, // Reset so they get reminded again if they re-abandon
          updated_at: new Date().toISOString(),
        });
      } else {
        // Get customer profile for phone
        const customers = await sbFetch('GET', 'customers',
          `auth_user_id=eq.${user.id}&select=id,phone`);
        const customer = customers?.[0];

        await sbFetch('POST', 'abandoned_carts', '', {
          auth_user_id: user.id,
          customer_id: customer?.id || null,
          email: user.email,
          phone: customer?.phone || null,
          cart_items,
          cart_total,
        });
      }
      return res.status(200).json({ ok: true });
    } catch(e) {
      console.error('Save abandoned cart error:', e.message);
      return res.status(200).json({ ok: true }); // Never fail silently on frontend
    }
  }

  // ── ACTION: converted ─────────────────────────────────────────
  // Called when order is successfully placed
  if (action === 'converted') {
    const { token } = body;
    if (!token) return res.status(200).json({ ok: true });

    try {
      const user = await getUserFromToken(token);
      if (!user?.id) return res.status(200).json({ ok: true });

      await sbFetch('PATCH', 'abandoned_carts',
        `auth_user_id=eq.${user.id}&converted=eq.false`, {
        converted: true,
        updated_at: new Date().toISOString(),
      });
      return res.status(200).json({ ok: true });
    } catch(e) {
      return res.status(200).json({ ok: true });
    }
  }

  // ── ACTION: cron (called by GitHub Actions) ───────────────────
  if (action === 'cron') {
    const secret = req.headers['x-cron-secret'] || body.secret;
    if (!CRON_SECRET || secret !== CRON_SECRET) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
      const carts = await sbFetch('GET', 'abandoned_carts',
        `reminder_sent=eq.false&converted=eq.false&created_at=lt.${twoHoursAgo}&email=not.is.null&select=*`);

      if (!carts?.length) return res.status(200).json({ processed: 0 });

      let sent = 0;
      for (const cart of carts) {
        try {
          await sendAbandonedCartEmail(cart.email, cart.cart_items, cart.cart_total);
          await sbFetch('PATCH', 'abandoned_carts', `id=eq.${cart.id}`, {
            reminder_sent: true,
            reminder_sent_at: new Date().toISOString(),
          });
          sent++;
        } catch(e) {
          console.warn(`Cart ${cart.id} email failed:`, e.message);
        }
      }
      return res.status(200).json({ processed: carts.length, sent });
    } catch(e) {
      return res.status(500).json({ error: e.message });
    }
  }

  return res.status(400).json({ error: 'Invalid action' });
}
