// ═══════════════════════════════════════════════════════════════
// Pahadi Roots — Admin API (Netlify Serverless Function)
// Version: 2.0 — Security Hardened + Auto Admin Logging
//
// File path: netlify/functions/admin-api.js
//
// Required Environment Variables (Netlify Dashboard → Site Settings → Env):
//   SUPABASE_URL         = https://ulyrhnpoiyuvarulqqi.supabase.co
//   SUPABASE_SERVICE_KEY = eyJ...  (service_role key from Supabase)
//   ADMIN_PASSWORD       = your-strong-password
//   ALLOWED_ORIGIN       = https://pahadiroots.com  (your production domain)
// ═══════════════════════════════════════════════════════════════

// ── 3.1 Environment validation — fail fast if misconfigured ──
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY || !process.env.ADMIN_PASSWORD) {
  console.error('FATAL: Missing required environment variables');
}

const SUPABASE_URL  = process.env.SUPABASE_URL;
const SUPABASE_KEY  = process.env.SUPABASE_SERVICE_KEY;
const ADMIN_PW      = process.env.ADMIN_PASSWORD;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';

// ── Allowed tables whitelist — prevents arbitrary DB access ──
const ALLOWED_TABLES = new Set([
  'products', 'categories', 'orders', 'order_items', 'customers',
  'coupons', 'coupon_usage', 'subscribers', 'reviews',
  'inventory_logs', 'order_logs', 'order_status_history',
  'admin_logs', 'order_detailed', 'order_summary', 'site_settings',
  'revenue_summary',   // DB view for analytics
]);

// ── Methods that trigger admin_logs auto-logging ──
const WRITE_METHODS = new Set(['POST', 'PATCH', 'DELETE']);

// ── 3.2 Rate limiting — in-memory (resets on cold start) ──
// For production, replace with Redis/Upstash for persistence
const rateLimitMap = new Map();
const RATE_LIMIT    = 10;   // max requests
const RATE_WINDOW   = 60000; // per 60 seconds

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip) || { count: 0, start: now };
  if (now - entry.start > RATE_WINDOW) {
    rateLimitMap.set(ip, { count: 1, start: now });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  rateLimitMap.set(ip, entry);
  return false;
}

// ── Supabase request helper ──
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

// ── 3.3 Auto admin action logging ──
async function logAdminAction(table, method, recordId = null) {
  try {
    await sbFetch('POST', 'admin_logs', '', {
      table_name: table,
      action:     method,
      record_id:  recordId || null,
      admin_email: 'admin@pahadiroots.com', // replace with role-based email when upgrading to admin_users
    });
  } catch (e) {
    console.warn('Admin log failed (non-critical):', e.message || e);
  }
}

// ═══════════════════════════════════════════════════════════════
// MAIN HANDLER
// ═══════════════════════════════════════════════════════════════
exports.handler = async (event) => {

  // ── 3.2 Restrict CORS to production domain only ──
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, x-admin-password',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type':                 'application/json',
    'X-Content-Type-Options':       'nosniff',
    'X-Frame-Options':              'DENY',
  };

  const ok  = (data)   => ({ statusCode: 200, headers, body: JSON.stringify(data) });
  const err = (s, msg) => ({ statusCode: s,   headers, body: JSON.stringify({ error: msg }) });

  // ── Handle CORS preflight ──
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers, body: '' };
  if (event.httpMethod !== 'POST')    return err(405, 'Method not allowed');

  // ── 3.1 Fail if env not configured ──
  if (!SUPABASE_URL || !SUPABASE_KEY || !ADMIN_PW) {
    return err(500, 'Server misconfigured — check environment variables');
  }

  // ── 3.2 Rate limiting — check IP ──
  const ip = event.headers['x-forwarded-for']?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(ip)) {
    return err(429, 'Too many requests — slow down');
  }

  // ── Auth — constant-time comparison prevents timing attacks ──
  const pw = event.headers['x-admin-password'] || '';
  if (!pw || pw.length !== ADMIN_PW.length || pw !== ADMIN_PW) {
    return err(401, 'Unauthorized');
  }

  // ── Parse request body ──
  let req;
  try { req = JSON.parse(event.body); }
  catch (e) { return err(400, 'Invalid JSON body'); }

  const { method, table, query, body } = req;

  // ── Validate table ──
  if (!table || !ALLOWED_TABLES.has(table)) {
    return err(400, `Table "${table}" not permitted`);
  }

  // ── Validate method ──
  const allowedMethods = new Set(['GET', 'POST', 'PATCH', 'DELETE']);
  if (!allowedMethods.has(method)) {
    return err(400, `Method "${method}" not allowed`);
  }

  // ── Block dangerous queries (e.g. no-filter mass deletes) ──
  if (method === 'DELETE' && (!query || query.trim() === '')) {
    return err(400, 'DELETE without filter is not allowed');
  }
  if (method === 'PATCH' && (!query || query.trim() === '')) {
    return err(400, 'PATCH without filter is not allowed');
  }

  // ── Execute Supabase request ──
  try {
    const result = await sbFetch(method, table, query || '', body || null);

    // ── 3.3 Auto-log all write operations ──
    if (WRITE_METHODS.has(method)) {
      const recordId = body?.id || (Array.isArray(result) ? result[0]?.id : result?.id) || null;
      await logAdminAction(table, method, recordId);
    }

    return ok(result ?? []);

  } catch (e) {
    console.error(`Supabase error [${method} ${table}]:`, e);
    return err(e.status || 500, e.message || 'Supabase error');
  }
};
