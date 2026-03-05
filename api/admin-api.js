// ═══════════════════════════════════════════════════════════════
// Pahadi Roots — Admin API (Vercel Serverless Function)
// Version: 2.1 — Fixed setCORS + reqBody bug
// File path: api/admin-api.js
// ═══════════════════════════════════════════════════════════════

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

  const pw = req.headers['x-admin-password'] || '';
  if (!pw || pw.length !== ADMIN_PW.length || pw !== ADMIN_PW) {
    return err(401, 'Unauthorized');
  }

  // ── Parse request body ──
  let reqBody = {};
  try {
    reqBody = req.body || {};
    if (typeof reqBody === 'string') reqBody = JSON.parse(reqBody);
  } catch (e) {
    return err(400, 'Invalid JSON body');
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
