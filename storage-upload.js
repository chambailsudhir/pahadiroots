// netlify/functions/storage-upload.js
// Uploads image to Supabase Storage — service key stays server-side
// Required env vars: SUPABASE_URL, SUPABASE_SERVICE_KEY, ADMIN_PASSWORD

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

  // Auth
  const pw = event.headers['x-admin-password'];
  if (!pw || pw !== ADMIN_PW)
    return { statusCode:401, headers:CORS, body: JSON.stringify({ error:'Unauthorized' }) };

  // Env vars check
  if (!SB_URL || !SB_KEY)
    return { statusCode:500, headers:CORS, body: JSON.stringify({ error:'Missing env vars: SUPABASE_URL or SUPABASE_SERVICE_KEY' }) };

  // Parse body
  let payload;
  try { payload = JSON.parse(event.body || '{}'); }
  catch(e) { return { statusCode:400, headers:CORS, body: JSON.stringify({ error:'Invalid JSON: '+e.message }) }; }

  const { bucket, path: filePath, base64, mimeType } = payload;
  if (!bucket || !filePath || !base64)
    return { statusCode:400, headers:CORS, body: JSON.stringify({ error:'bucket, path, base64 are required' }) };

  // Check body size (Netlify limit is 6MB)
  const bodySize = (event.body || '').length;
  if (bodySize > 5.5 * 1024 * 1024)
    return { statusCode:413, headers:CORS, body: JSON.stringify({ error:'File too large — please resize image below 4MB before uploading' }) };

  // Decode base64 → binary
  let buffer;
  try { buffer = Buffer.from(base64, 'base64'); }
  catch(e) { return { statusCode:400, headers:CORS, body: JSON.stringify({ error:'Invalid base64: '+e.message }) }; }

  const uploadUrl = `${SB_URL}/storage/v1/object/${bucket}/${filePath}`;

  try {
    const r = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'apikey': SB_KEY,
        'Authorization': 'Bearer ' + SB_KEY,
        'Content-Type': mimeType || 'image/jpeg',
        'x-upsert': 'true',
        'Content-Length': buffer.length.toString(),
      },
      body: buffer,
    });

    if (!r.ok) {
      const errText = await r.text();
      return { statusCode: r.status, headers: CORS, body: JSON.stringify({ error: `Supabase error ${r.status}: ${errText}` }) };
    }

    const publicUrl = `${SB_URL}/storage/v1/object/public/${bucket}/${filePath}`;
    return {
      statusCode: 200,
      headers: { ...CORS, 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: publicUrl }),
    };
  } catch(err) {
    return { statusCode: 500, headers: CORS, body: JSON.stringify({ error: 'Upload failed: ' + err.message }) };
  }
};
