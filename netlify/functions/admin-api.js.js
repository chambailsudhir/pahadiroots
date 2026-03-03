// netlify/functions/admin-api.js
// Place this file at: your-project/netlify/functions/admin-api.js
//
// Set these environment variables in Netlify Dashboard:
//   SUPABASE_URL     = https://ulyrhnpoiyuvarulqqi.supabase.co
//   SUPABASE_SERVICE_KEY = your-service-role-key   ← NEVER in frontend
//   ADMIN_PASSWORD   = your-chosen-admin-password

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;
const ADMIN_PW    = process.env.ADMIN_PASSWORD;

// Tables that are allowed — prevents arbitrary table access
const ALLOWED_TABLES = new Set([
  'products','categories','orders','order_items','customers',
  'coupons','coupon_usage','subscribers','reviews',
  'inventory_logs','order_logs','order_status_history','admin_logs',
  'order_detailed','order_summary','site_settings'
]);

exports.handler = async (event) => {
  // ── CORS ──
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, x-admin-password',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };

  // ── AUTH — check password header ──
  const pw = event.headers['x-admin-password'];
  if (!pw || pw !== ADMIN_PW) {
    return { statusCode: 401, headers, body: JSON.stringify({ error: 'Unauthorized' }) };
  }

  // ── PARSE BODY ──
  let req;
  try { req = JSON.parse(event.body); }
  catch (e) { return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON' }) }; }

  const { method, table, query, body } = req;

  // ── VALIDATE TABLE ──
  if (!ALLOWED_TABLES.has(table)) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: `Table "${table}" not allowed` }) };
  }

  // ── BUILD SUPABASE REQUEST ──
  let url = `${SUPABASE_URL}/rest/v1/${table}`;
  if (query) url += `?${query}`;

  const sbHeaders = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation',
  };

  try {
    const response = await fetch(url, {
      method: method || 'GET',
      headers: sbHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    const text = await response.text();

    if (!response.ok) {
      return { statusCode: response.status, headers, body: text };
    }

    return { statusCode: 200, headers, body: text || '[]' };

  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
