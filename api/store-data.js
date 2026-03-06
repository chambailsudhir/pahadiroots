// ═══════════════════════════════════════════════════════════════
// Pahadi Roots — Store Data API (Vercel Serverless Function)
// File path: api/store-data.js
// Returns: states, products, site_settings for the main site
// ═══════════════════════════════════════════════════════════════

export const config = {
  api: { bodyParser: false }
};

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=20',
};

async function sbGet(table, query = '') {
  const url = `${SUPABASE_URL}/rest/v1/${table}${query ? '?' + query : ''}`;
  const res = await fetch(url, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
    }
  });
  if (!res.ok) throw new Error(`Supabase ${table}: ${res.status}`);
  return res.json();
}

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.writeHead(204, CORS).end();
  }

  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));

  try {
    // Fetch states, products, and site_settings in parallel
    const [states, products, siteSettings, coupons] = await Promise.all([
      sbGet('states', 'is_active=eq.true&order=name.asc').catch(() => []),
      sbGet('products', 'status=eq.active&is_deleted=eq.false&order=name.asc').catch(() => []),
      sbGet('site_settings', 'select=key,value').catch(() => []),
      sbGet('coupons', 'is_active=eq.true&select=code,type,value,min_order,max_uses,uses_count,expires_at,first_order_only,max_discount').catch(() => []),
    ]);

    // Convert site_settings array to object
    const settings = {};
    (siteSettings || []).forEach(s => { settings[s.key] = s.value; });

    res.status(200).json({
      states:   states   || [],
      products: products || [],
      settings,
      coupons:  coupons  || [],
    });

  } catch (e) {
    console.error('store-data error:', e.message);
    res.status(500).json({ error: e.message, states: [], products: [], settings: {} });
  }
}
