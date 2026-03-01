// netlify/functions/storage-upload.js
// ═══════════════════════════════════════════════════════════════════
// SECURE STORAGE UPLOAD PROXY
// Admin sends file as base64 → this function uploads to Supabase Storage
// using the SERVICE KEY stored in env vars → returns public URL
//
// Required env vars (same as admin-api.js):
//   SUPABASE_URL, SUPABASE_SERVICE_KEY, ADMIN_PASSWORD
// ═══════════════════════════════════════════════════════════════════

const SB_URL  = process.env.SUPABASE_URL;
const SB_KEY  = process.env.SUPABASE_SERVICE_KEY;
const ADMIN_PW= process.env.ADMIN_PASSWORD;

exports.handler = async (event) => {
  const CORS = {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,x-admin-password',
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode:200, headers:CORS, body:'' };

  const pw = event.headers['x-admin-password'];
  if (!pw || pw !== ADMIN_PW) {
    return { statusCode:401, headers:CORS, body: JSON.stringify({ error:'Unauthorized' }) };
  }

  if (!SB_URL || !SB_KEY) {
    return { statusCode:500, headers:CORS, body: JSON.stringify({ error:'Missing env vars' }) };
  }

  let payload;
  try { payload = JSON.parse(event.body || '{}'); }
  catch { return { statusCode:400, headers:CORS, body: JSON.stringify({ error:'Invalid JSON' }) }; }

  const { bucket, path: filePath, base64, mimeType } = payload;
  if (!bucket || !filePath || !base64) {
    return { statusCode:400, headers:CORS, body: JSON.stringify({ error:'bucket, path, base64 required' }) };
  }

  // Decode base64 → binary Buffer
  const buffer = Buffer.from(base64, 'base64');
  const url = `${SB_URL}/storage/v1/object/${bucket}/${filePath}`;

  try {
    const r = await fetch(url, {
      method: 'POST',
      headers:{ 'apikey':SB_KEY, 'Authorization':'Bearer '+SB_KEY, 'Content-Type':mimeType||'image/webp', 'x-upsert':'true' },
      body: buffer,
    });
    if (!r.ok) {
      const t = await r.text();
      return { statusCode:r.status, headers:CORS, body: JSON.stringify({ error:t }) };
    }
    const publicUrl = `${SB_URL}/storage/v1/object/public/${bucket}/${filePath}`;
    return { statusCode:200, headers:{ ...CORS,'Content-Type':'application/json' }, body: JSON.stringify({ url:publicUrl }) };
  } catch(err) {
    return { statusCode:500, headers:CORS, body: JSON.stringify({ error:err.message }) };
  }
};
