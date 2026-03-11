// ═══════════════════════════════════════════════════════════════
// Pahadi Roots — Email Service (Vercel Serverless Function)
// File path: api/send-email.js
// ═══════════════════════════════════════════════════════════════

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const RESEND_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_KEY) return res.status(500).json({ error: 'Email service not configured' });

  let body = {};
  try { body = req.body || {}; if (typeof body === 'string') body = JSON.parse(body); }
  catch(e) { return res.status(400).json({ error: 'Invalid JSON' }); }

  const { type, to, orderNumber, orderId, name, items, total, discount, shipping, address, city, state, pin, payMethod, whatsappNumber } = body;
  const WA_NUMBER = whatsappNumber || process.env.WHATSAPP_NUMBER || '919899984895';
  const WA_DISPLAY = WA_NUMBER.replace(/^91/, '+91 ').replace(/(\d{5})(\d{5})$/, '$1 $2');

  if (!to || !to.includes('@')) return res.status(400).json({ error: 'Valid email required' });
  if (!type) return res.status(400).json({ error: 'Email type required' });

  // ── Build email based on type ──
  let subject, html;

  if (type === 'order_confirmation') {
    const orderUrl = `https://pahadiroots.com/order-confirmation?id=${orderId}&num=${encodeURIComponent(orderNumber||'')}`;
    const estDate = getDeliveryEstimate();
    const itemsHtml = (items || []).map(i =>
      `<tr>
        <td style="padding:10px 0;border-bottom:1px solid #f0f0f0">
          <span style="font-size:16px">${i.emoji || '🌿'}</span>
          <strong style="color:#1a1a1a;margin-left:8px">${i.name}</strong>
          <span style="color:#888;font-size:13px"> × ${i.qty}</span>
        </td>
        <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;text-align:right;font-weight:700;color:#1a3a1e">
          ₹${(i.price * i.qty).toLocaleString('en-IN')}
        </td>
      </tr>`
    ).join('');

    const subtotal = total + (discount || 0);
    const discountRow = discount > 0
      ? `<tr><td style="padding:6px 0;color:#2d6a4f;font-weight:700">🎉 Discount</td><td style="text-align:right;color:#2d6a4f;font-weight:700">−₹${discount}</td></tr>` : '';
    const shipRow = (shipping > 0)
      ? `<tr><td style="padding:6px 0;color:#555">Shipping</td><td style="text-align:right;color:#555">₹${shipping}</td></tr>`
      : `<tr><td style="padding:6px 0;color:#2d6a4f;font-weight:700">Shipping</td><td style="text-align:right;color:#2d6a4f;font-weight:700">FREE 🎉</td></tr>`;
    const payLabel = payMethod === 'razorpay_online' ? '💳 Paid Online' : '💵 Cash on Delivery';

    subject = `Order Confirmed — ${orderNumber || 'Your Pahadi Roots Order'} 🌿`;
    html = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f7f3ee;font-family:'Helvetica Neue',Arial,sans-serif">
  <div style="max-width:580px;margin:0 auto;padding:24px 16px">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#1a3a1e,#2d5233);border-radius:16px 16px 0 0;padding:32px 32px 28px;text-align:center">
      <div style="font-size:36px;margin-bottom:8px">🌿</div>
      <div style="font-family:Georgia,serif;font-size:24px;font-weight:900;color:#fff;margin-bottom:4px">Pahadi Roots</div>
      <div style="font-size:12px;color:rgba(255,255,255,.6);letter-spacing:2px;text-transform:uppercase">Himalayan Organic Store</div>
    </div>

    <!-- Success Banner -->
    <div style="background:#fff;padding:28px 32px;text-align:center;border-left:1px solid #eee;border-right:1px solid #eee">
      <div style="font-size:48px;margin-bottom:12px">✅</div>
      <h1 style="font-family:Georgia,serif;font-size:26px;color:#1a3a1e;margin:0 0 8px">Order Confirmed!</h1>
      <p style="color:#666;font-size:14px;margin:0 0 16px">Shukriya ${name || 'valued customer'}! Aapka order place ho gaya hai.</p>
      <div style="display:inline-block;background:#f0f7f4;border:1.5px solid #c8e6c9;border-radius:20px;padding:8px 20px">
        <span style="font-size:13px;font-weight:700;color:#1a3a1e">📋 ${orderNumber || 'Order Placed'}</span>
      </div>
    </div>

    <!-- Delivery Estimate -->
    <div style="background:#fff9e6;border-left:4px solid #c8920a;padding:16px 32px;border-right:1px solid #eee">
      <div style="display:flex;align-items:center;gap:12px">
        <span style="font-size:24px">🚚</span>
        <div>
          <div style="font-weight:700;color:#1a3a1e;font-size:15px">Estimated Delivery: ${estDate}</div>
          <div style="color:#888;font-size:12px;margin-top:2px">Pan India delivery · We'll notify you when shipped</div>
        </div>
      </div>
    </div>

    <!-- Order Items -->
    <div style="background:#fff;padding:24px 32px;border-left:1px solid #eee;border-right:1px solid #eee">
      <h3 style="font-size:13px;font-weight:800;color:#aaa;text-transform:uppercase;letter-spacing:1px;margin:0 0 16px">Your Items</h3>
      <table style="width:100%;border-collapse:collapse">
        ${itemsHtml}
        <tr><td colspan="2" style="padding:12px 0 0"></td></tr>
        ${discountRow}
        ${shipRow}
        <tr style="border-top:2px solid #eee">
          <td style="padding:12px 0 0;font-weight:900;font-size:16px;color:#1a1a1a">Total Paid</td>
          <td style="padding:12px 0 0;text-align:right;font-weight:900;font-size:18px;color:#1a3a1e">₹${total.toLocaleString('en-IN')}</td>
        </tr>
        <tr>
          <td colspan="2" style="padding:4px 0 0;font-size:12px;color:#888">${payLabel}</td>
        </tr>
      </table>
    </div>

    <!-- Delivery Address -->
    <div style="background:#f9f9f9;padding:20px 32px;border-left:1px solid #eee;border-right:1px solid #eee">
      <h3 style="font-size:13px;font-weight:800;color:#aaa;text-transform:uppercase;letter-spacing:1px;margin:0 0 12px">📍 Delivering To</h3>
      <div style="color:#333;font-size:14px;line-height:1.7">
        <strong>${name || ''}</strong><br>
        ${address || ''}, ${city || ''}<br>
        ${state || ''} — ${pin || ''}
      </div>
    </div>

    <!-- CTA Button -->
    <div style="background:#fff;padding:24px 32px;text-align:center;border-left:1px solid #eee;border-right:1px solid #eee">
      <a href="${orderUrl}"
         style="display:inline-block;background:linear-gradient(135deg,#1a3a1e,#2d5233);color:#fff;padding:14px 32px;border-radius:12px;text-decoration:none;font-weight:800;font-size:15px">
        📦 Track Your Order
      </a>
      <p style="color:#aaa;font-size:12px;margin-top:16px">
        Koi sawaal? WhatsApp karein: <a href="https://wa.me/${WA_NUMBER}" style="color:#1a3a1e">${WA_DISPLAY}</a>
      </p>
    </div>

    <!-- Footer -->
    <div style="background:#1a3a1e;border-radius:0 0 16px 16px;padding:20px 32px;text-align:center">
      <div style="color:rgba(255,255,255,.5);font-size:12px;line-height:1.8">
        🌿 Pahadi Roots — Pure Himalayan Goodness<br>
        <a href="https://pahadiroots.com" style="color:#e8b84b;text-decoration:none">pahadiroots.com</a>
      </div>
    </div>

  </div>
</body>
</html>`;
  } else {
    return res.status(400).json({ error: 'Unknown email type' });
  }

  // ── Send via Resend ──
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${RESEND_KEY}` },
      body: JSON.stringify({ from: 'Pahadi Roots <noreply@pahadiroots.com>', to: [to], subject, html })
    });
    const data = await r.json();
    if (!r.ok) {
      console.error('Resend error:', data);
      return res.status(500).json({ error: data.message || 'Email send failed' });
    }
    return res.status(200).json({ success: true, id: data.id });
  } catch(e) {
    console.error('Email error:', e);
    return res.status(500).json({ error: e.message || 'Email service error' });
  }
}

function getDeliveryEstimate() {
  var d = new Date();
  var added = 0;
  while (added < 5) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) added++;
  }
  var from = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long' });
  d.setDate(d.getDate() + 2);
  var to = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long' });
  return from + ' – ' + to;
}
