// netlify/functions/store-data.js
// ═══════════════════════════════════════════════════════════════════════════
// PUBLIC store data endpoint — no auth needed, read-only
//
// THIS IS THE ONLY FILE THAT KNOWS ABOUT YOUR DATABASE.
// Change DB provider? Only edit this file. index.html stays untouched.
//
// Current DB: Supabase (PostgreSQL)
// To switch DB: replace the fetchFromDB() function below with your new adapter
//
// Env vars needed (Netlify Dashboard → Environment Variables):
//   SUPABASE_URL      = https://YOUR_PROJECT.supabase.co
//   SUPABASE_ANON_KEY = your_anon_key_from_supabase_dashboard
//
// Returns: { states: [...], products: [...] }
// ═══════════════════════════════════════════════════════════════════════════

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Cache-Control':                'public, max-age=60', // cache 60s — fast & cheap
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode:200, headers:CORS, body:'' };
  if (event.httpMethod !== 'GET')     return { statusCode:405, headers:CORS, body:'Method not allowed' };

  try {
    const data = await fetchFromDB();
    return {
      statusCode: 200,
      headers: { ...CORS, 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
  } catch(err) {
    console.error('store-data error:', err.message);
    return {
      statusCode: 500,
      headers: CORS,
      body: JSON.stringify({ error: err.message, states: [], products: [] }),
    };
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// DATABASE ADAPTER — swap this function to change your database
// ═══════════════════════════════════════════════════════════════════════════
//
// Current: Supabase REST API
//
// To switch to plain Postgres:   replace with pg/postgres client query
// To switch to Firebase:         replace with Firestore getDocs()
// To switch to PlanetScale:      replace with @planetscale/database fetch
// To switch to MongoDB Atlas:    replace with Atlas Data API fetch
// To switch to any REST API:     replace URL + headers below
//
// The return shape must always be: { states: Array, products: Array }
// That contract is what index.html depends on — nothing else.
// ═══════════════════════════════════════════════════════════════════════════
async function fetchFromDB() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    // Env vars not set — return empty arrays, store uses local fallback
    console.warn('SUPABASE_URL or SUPABASE_ANON_KEY not set — returning empty data');
    return { states: [], products: [] };
  }

  const headers = {
    'apikey':        key,
    'Authorization': 'Bearer ' + key,
    'Content-Type':  'application/json',
  };

  // Fetch states and products in parallel
  const [statesRes, prodsRes] = await Promise.all([
    fetch(`${url}/rest/v1/states?is_active=eq.true&order=id`,   { headers }),
    fetch(`${url}/rest/v1/products?is_active=eq.true&order=id`, { headers }),
  ]);

  if (!statesRes.ok) throw new Error(`States fetch failed: ${statesRes.status}`);
  if (!prodsRes.ok)  throw new Error(`Products fetch failed: ${prodsRes.status}`);

  const [states, products] = await Promise.all([
    statesRes.json(),
    prodsRes.json(),
  ]);

  return { states, products };
}

// ─── EXAMPLE: Switch to plain PostgreSQL (e.g. Neon, Railway, Render) ───────
// import { Pool } from 'pg';
// async function fetchFromDB() {
//   const pool = new Pool({ connectionString: process.env.DATABASE_URL });
//   const [s, p] = await Promise.all([
//     pool.query('SELECT * FROM states WHERE is_active = true ORDER BY id'),
//     pool.query('SELECT * FROM products WHERE is_active = true ORDER BY id'),
//   ]);
//   return { states: s.rows, products: p.rows };
// }

// ─── EXAMPLE: Switch to Firebase Firestore ──────────────────────────────────
// import { initializeApp } from 'firebase-admin/app';
// import { getFirestore }   from 'firebase-admin/firestore';
// async function fetchFromDB() {
//   const db = getFirestore();
//   const [s, p] = await Promise.all([
//     db.collection('states').where('is_active','==',true).get(),
//     db.collection('products').where('is_active','==',true).get(),
//   ]);
//   return {
//     states:   s.docs.map(d => ({ id: d.id, ...d.data() })),
//     products: p.docs.map(d => ({ id: d.id, ...d.data() })),
//   };
// }
