// ═══════════════════════════════════════════════════════════════
// Pahadi Roots — Admin API (Vercel Serverless Function)
// Version: 2.2 — Secure storage upload + increased body limit
// File path: api/admin-api.js
// ═══════════════════════════════════════════════════════════════

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '6mb', // base64 of a 4MB image ≈ 5.3MB
    },
  },
};

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY || !process.env.ADMIN_PASSWORD) {
  console.error('FATAL: Missing required environment variables');
}

const SUPABASE_URL   = process.env.SUPABASE_URL;
const SUPABASE_KEY   = process.env.SUPABASE_SERVICE_KEY;
const ADMIN_PW       = process.env.ADMIN_PASSWORD;

const ALLOWED_TABLES = new Set([
  'products', 'categories', 'orders', 'order_items', 'customers',
  'coupons', 'coupon_usage', 'subscribers', 'reviews',
  'inventory_logs', 'order_logs', 'order_status_history',
  'admin_logs', 'order_detailed', 'order_summary', 'site_settings',
  'revenue_summary', 'states', 'sales_summary', 'stock_overview', 'daily_revenue',
  'state_images', 'product_images', 'founder_images',
  'product_variants',
]);

const WRITE_METHODS = new Set(['POST', 'PATCH', 'DELETE']);

const rateLimitMap = new Map();
const RATE_LIMIT   = 200;
const RATE_WINDOW  = 30000;

function isRateLimited(ip) {
  const now   = Date.now();
  const entry = rateLimitMap.get(ip) || { count: 0, start: now };
  if (now - entry.start > RATE_WINDOW) { rateLimitMap.set(ip, { count: 1, start: now }); return false; }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  rateLimitMap.set(ip, entry);
  return false;
}

async function sbFetch(method, table, query = '', body = null) {
  let url = `${SUPABASE_URL}/rest/v1/${table}`;
  if (query) url += `?${query}`;
  const r = await fetch(url, {
    method,
    headers: {
      'apikey':        SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type':  'application/json',
      'Prefer':        'return=representation',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await r.text();
  if (!r.ok) throw { status: r.status, message: text };
  return text ? JSON.parse(text) : null;
}

async function logAdminAction(table, method, recordId = null) {
  try {
    await sbFetch('POST', 'admin_logs', '', {
      table_name:  table,
      action:      method,
      record_id:   recordId || null,
      admin_email: 'admin@pahadiroots.com',
    });
  } catch (e) {
    console.warn('Admin log failed (non-critical):', e.message || e);
  }
}

// ═══════════════════════════════════════════════════════════════
// MAIN HANDLER
// ═══════════════════════════════════════════════════════════════
export default async function handler(req, res) {

  // ── CORS headers helper ──
  function setCORS() {
    res.setHeader('Access-Control-Allow-Origin',  '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-password');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Content-Type',                 'application/json');
    res.setHeader('X-Content-Type-Options',       'nosniff');
    res.setHeader('X-Frame-Options',              'DENY');
    // Prevent Vercel edge / CDN / browser from caching API responses
    res.setHeader('Cache-Control',                'no-store, no-cache, must-revalidate');
    res.setHeader('Pragma',                       'no-cache');
    res.setHeader('Surrogate-Control',            'no-store');
  }

  const ok  = (data)    => { setCORS(); return res.status(200).json(data); };
  const err = (s, msg)  => { setCORS(); return res.status(s).json({ error: msg }); };

  setCORS();
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST')   return err(405, 'Method not allowed');

  if (!SUPABASE_URL || !SUPABASE_KEY || !ADMIN_PW) {
    return err(500, 'Server misconfigured — check environment variables');
  }

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress || 'unknown';
  if (isRateLimited(ip)) return err(429, 'Too many requests — slow down');

  // ── Parse request body ──
  let reqBody = {};
  try {
    reqBody = req.body || {};
    if (typeof reqBody === 'string') reqBody = JSON.parse(reqBody);
  } catch (e) {
    return err(400, 'Invalid JSON body');
  }

  const pw = req.headers['x-admin-password'] || '';
  const isPublicAction = reqBody.action === 'save_order' || reqBody.action === 'public_get_order';
  if (!isPublicAction && (!pw || pw.length !== ADMIN_PW.length || pw !== ADMIN_PW)) {
    return err(401, 'Unauthorized');
  }

  const { method, table, query, body } = reqBody;

  // ── Storage Upload Handler ──
  if (reqBody.action === 'storage_upload') {
    try {
      const { fileName, fileType, fileBase64 } = reqBody;
      if (!fileName || !fileType || !fileBase64) return err(400, 'Missing fileName, fileType or fileBase64');
      const fileBuffer = Buffer.from(fileBase64, 'base64');
      const storageUrl = `${SUPABASE_URL}/storage/v1/object/pahadi-images/${fileName}`;
      const uploadRes  = await fetch(storageUrl, {
        method:  'POST',
        headers: { 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': fileType, 'x-upsert': 'true' },
        body:    fileBuffer,
      });
      if (!uploadRes.ok) { const t = await uploadRes.text(); return err(400, 'Storage upload failed: ' + t); }
      const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/pahadi-images/${fileName}`;
      return ok({ url: publicUrl });
    } catch (e) {
      return err(500, 'Storage error: ' + e.message);
    }
  }

  // ── Public Order Save (no password required) ──
  if (reqBody.action === 'save_order') {
    try {
      const { name, phone, email, addr, city, state, pin, final, discount, shipCharge, payMethod, paymentId, items, auth_user_id, couponCode } = reqBody;
      if (!name || !phone || !final) return err(400, 'Missing required order fields');

      // 1. Upsert customer
      const nameParts = name.trim().split(' ');
      const firstName = nameParts[0] || name.trim();
      const lastName = nameParts.slice(1).join(' ') || null;
      const custBody = { first_name: firstName, last_name: lastName, phone: phone.trim(), email: email||null, address_line1: addr||null, city: city||null, state: state||null, postal_code: pin||null };
      if (auth_user_id) custBody.auth_user_id = auth_user_id;

      let custId = null;
      // First try by auth_user_id (most reliable for logged-in users)
      if (auth_user_id) {
        const byAuth = await sbFetch('GET', 'customers', `auth_user_id=eq.${auth_user_id}&select=id`).catch(()=>[]);
        if (byAuth && byAuth.length > 0) {
          custId = byAuth[0].id;
          await sbFetch('PATCH', 'customers', `id=eq.${custId}`, custBody);
        }
      }
      // Fallback: lookup by phone
      if (!custId) {
        const existing = await sbFetch('GET', 'customers', `phone=eq.${encodeURIComponent(phone.trim())}&select=id`).catch(()=>[]);
        if (existing && existing.length > 0) {
          custId = existing[0].id;
          await sbFetch('PATCH', 'customers', `id=eq.${custId}`, custBody);
        } else {
          const nc = await sbFetch('POST', 'customers', '', custBody);
          custId = nc && nc[0] ? nc[0].id : null;
        }
      }
      if (!custId) return err(500, 'Could not create customer');

      // 2. Create order
      const orderBody = {
        customer_id: custId,
        total_amount: final,
        subtotal: final + (discount||0),
        coupon_discount: discount||0,
        tax: 0,
        shipping_charge: shipCharge || 0,
        order_status: payMethod === 'razorpay_online' ? 'confirmed' : 'pending',
        payment_status: payMethod === 'razorpay_online' ? 'paid' : 'pending',
        payment_method: payMethod,
        payment_id: paymentId || null,
      };
      const newOrder = await sbFetch('POST', 'orders', '', orderBody);
      const orderId = newOrder && newOrder[0] ? newOrder[0].id : null;
      const orderNumber = newOrder && newOrder[0] ? newOrder[0].order_number : null;
      if (!orderId) return err(500, 'Could not create order');

      // 3. Save order items
      if (items && items.length) {
        const orderItems = items.map(i => ({ order_id: orderId, product_id: i.id||null, quantity: i.qty, price_at_time: i.price }));
        await sbFetch('POST', 'order_items', '', orderItems).catch(e => console.warn('order_items failed:', e));
      }

      // 4. Increment coupon uses_count + save coupon_usage
      if (reqBody.couponCode && discount > 0) {
        const coup = await sbFetch('GET', 'coupons', `code=eq.${reqBody.couponCode}&select=id`).catch(()=>[]);
        const couponId = coup && coup[0] ? coup[0].id : null;
        if (couponId) {
          // Save coupon_usage record
          await sbFetch('POST', 'coupon_usage', '', {
            coupon_id: couponId,
            order_id: orderId,
            customer_id: custId,
            discount_amount: discount
          }).catch(e => console.warn('coupon_usage save failed:', e));
          // Increment uses_count
          const curr = await sbFetch('GET', 'coupons', `id=eq.${couponId}&select=uses_count`).catch(()=>[]);
          const currCount = curr && curr[0] ? (curr[0].uses_count || 0) : 0;
          await sbFetch('PATCH', 'coupons', `id=eq.${couponId}`, { uses_count: currCount + 1 }).catch(()=>{});
        }
      }

      // 5. Decrement stock_quantity for each item
      if (items && items.length) {
        for (const item of items) {
          try {
            let prod = null;
            // Try by id first (UUID from DB products)
            if (item.id) {
              const res = await sbFetch('GET', 'products', `id=eq.${item.id}&select=id,stock_quantity,name`).catch(()=>[]);
              if (res && res[0]) prod = res[0];
            }
            // Fallback: try by name (for fallback/hardcoded products)
            if (!prod && item.name) {
              const nameQ = encodeURIComponent('*' + item.name + '*');
              const res = await sbFetch('GET', 'products', `name=ilike.${nameQ}&select=id,stock_quantity,name&limit=1`).catch(()=>[]);
              if (res && res[0]) prod = res[0];
            }
            if (prod) {
              const newStock = Math.max(0, (prod.stock_quantity || 0) - (item.qty || 1));
              await sbFetch('PATCH', 'products', `id=eq.${prod.id}`, { stock_quantity: newStock });
              await sbFetch('POST', 'inventory_logs', '', {
                product_id: prod.id,
                change_type: 'sale',
                quantity_change: -(item.qty || 1),
                reference_id: orderNumber || String(orderId)
              }).catch(()=>{});
            }
          } catch(e) { console.warn('stock decrement failed:', item.name, e); }
        }
      }

      // 6. Save order_status_history
      await sbFetch('POST', 'order_status_history', '', {
        order_id: orderId,
        old_status: 'new',
        new_status: payMethod === 'razorpay_online' ? 'confirmed' : 'pending',
        changed_at: new Date().toISOString()
      }).catch(()=>{});

      return ok({ success: true, orderId, orderNumber });
    } catch(e) {
      console.error('save_order error:', e);
      return err(500, 'Order save failed: ' + (e.message || JSON.stringify(e)));
    }
  }

  // ── public_get_order — order confirmation page ──────────────────
  if (reqBody.action === 'public_get_order') {
    const { order_id } = reqBody;
    if (!order_id) return err(400, 'order_id required');
    try {
      const orderRes = await fetch(
        `${SUPABASE_URL}/rest/v1/orders?id=eq.${order_id}&select=id,order_number,order_status,payment_status,total_amount,subtotal,discount_amount,shipping_charge,customer_name,customer_phone,delivery_address,city,state,pincode,tracking_number,courier,shipped_at,delivered_at,created_at,payment_method`,
        { headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY } }
      );
      const orders = await orderRes.json();
      if (!orders || !orders.length) return err(404, 'Order not found');
      const order = orders[0];
      const itemsRes = await fetch(
        `${SUPABASE_URL}/rest/v1/order_items?order_id=eq.${order_id}&select=product_id,quantity,price_at_time,products(name,emoji,image_url)`,
        { headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY } }
      );
      const rawItems = await itemsRes.json();
      order.items = (rawItems || []).map(i => ({
        name: i.products?.name || 'Product',
        emoji: i.products?.emoji || '🌿',
        image_url: i.products?.image_url || null,
        qty: i.quantity,
        price: i.price_at_time
      }));
      return ok({ order });
    } catch(e) {
      return err(500, e.message || 'Failed to fetch order');
    }
  }

  if (!table || !ALLOWED_TABLES.has(table)) return err(400, `Table "${table}" not permitted`);

  const allowedMethods = new Set(['GET', 'POST', 'PATCH', 'DELETE']);
  if (!allowedMethods.has(method)) return err(400, `Method "${method}" not allowed`);

  if (method === 'DELETE' && (!query || query.trim() === '')) return err(400, 'DELETE without filter is not allowed');
  if (method === 'PATCH'  && (!query || query.trim() === '')) return err(400, 'PATCH without filter is not allowed');

  try {
    const result = await sbFetch(method, table, query || '', body || null);
    if (WRITE_METHODS.has(method)) {
      const recordId = body?.id || (Array.isArray(result) ? result[0]?.id : result?.id) || null;
      await logAdminAction(table, method, recordId);
    }
    return ok(result ?? []);
  } catch (e) {
    console.error(`Supabase error [${method} ${table}]:`, e);
    return err(e.status || 500, e.message || 'Supabase error');
  }
}
