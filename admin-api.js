// netlify/functions/admin-api.js
// ═══════════════════════════════════════════════════════════════════
// SECURE SUPABASE PROXY — service key lives ONLY in Netlify env vars
// Browser → this function → Supabase (key never touches browser)
//
// Set in Netlify Dashboard → Site → Environment Variables:
//   SUPABASE_URL          = https://ulyrhnpoiypuvaurlqqi.supabase.co
//   SUPABASE_SERVICE_KEY  = your_service_role_key_here
//   ADMIN_PASSWORD        = your_chosen_admin_password (e.g. PahadiAdmin2026)
// ═══════════════════════════════════════════════════════════════════

const SB_URL  = process.env.SUPABASE_URL;
const SB_KEY  = process.env.SUPABASE_SERVICE_KEY;
const ADMIN_PW= process.env.ADMIN_PASSWORD;

exports.handler = async (event) => {
  const CORS = {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,x-admin-password,x-method,x-table,x-query',
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode:200, headers:CORS, body:'' };

  // ── Auth check ─────────────────────────────────────────────────────
  const pw = event.headers['x-admin-password'];
  if (!pw || pw !== ADMIN_PW) {
    return { statusCode:401, headers:CORS, body: JSON.stringify({ error:'Unauthorized' }) };
  }

  if (!SB_URL || !SB_KEY) {
    return { statusCode:500, headers:CORS, body: JSON.stringify({ error:'Missing env vars: SUPABASE_URL, SUPABASE_SERVICE_KEY' }) };
  }

  let payload;
  try { payload = JSON.parse(event.body || '{}'); }
  catch { return { statusCode:400, headers:CORS, body: JSON.stringify({ error:'Invalid JSON' }) }; }

  const { method='GET', table, query='', body:sbBody } = payload;
  if (!table) return { statusCode:400, headers:CORS, body: JSON.stringify({ error:'table required' }) };

  // ── Proxy to Supabase with SERVICE KEY (never leaves server) ───────
  const url = `${SB_URL}/rest/v1/${table}${query?'?'+query:''}`;
  try {
    const r = await fetch(url, {
      method,
      headers:{ 'apikey':SB_KEY, 'Authorization':'Bearer '+SB_KEY, 'Content-Type':'application/json', 'Prefer':'return=representation' },
      ...(sbBody?{ body:JSON.stringify(sbBody) }:{}),
    });
    const text = await r.text();
    return { statusCode:r.status, headers:{ ...CORS,'Content-Type':'application/json' }, body:text };
  } catch(err) {
    return { statusCode:500, headers:CORS, body: JSON.stringify({ error:err.message }) };
  }
};
