// ═══════════════════════════════════════════════════════════════
// Pahadi Roots — Admin API (Netlify Serverless Function)
// Secure Version (Rate limit + Table whitelist + Admin logging)
// ═══════════════════════════════════════════════════════════════

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY || !process.env.ADMIN_PASSWORD) {
  console.error("FATAL: Missing required environment variables");
}

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;
const ADMIN_PW = process.env.ADMIN_PASSWORD;

// ── Allowed tables whitelist ──
const ALLOWED_TABLES = new Set([
  "products","categories","orders","order_items","customers",
  "coupons","coupon_usage","subscribers","reviews",
  "inventory_logs","order_logs","order_status_history",
  "admin_logs","order_detailed","order_summary","site_settings",
  "revenue_summary"
]);

// ── Write methods for logging ──
const WRITE_METHODS = new Set(["POST","PATCH","DELETE"]);

// ── Rate limiting ──
const rateLimitMap = new Map();
const RATE_LIMIT = 10;
const RATE_WINDOW = 60000;

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
async function sbFetch(method, table, query = "", body = null) {

  let url = `${SUPABASE_URL}/rest/v1/${table}`;
  if (query) url += `?${query}`;

  const r = await fetch(url, {
    method,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation"
    },
    body: body ? JSON.stringify(body) : undefined
  });

  const text = await r.text();

  if (!r.ok) throw { status: r.status, message: text };

  return text ? JSON.parse(text) : null;
}

// ── Admin action logging ──
async function logAdminAction(table, method, recordId = null) {

  try {

    await sbFetch("POST","admin_logs","",{
      table_name: table,
      action: method,
      record_id: recordId || null,
      admin_email: "admin@pahadiroots.com"
    });

  } catch(e) {

    console.warn("Admin log failed:", e);

  }

}

// ═══════════════════════════════════════
// MAIN HANDLER
// ═══════════════════════════════════════

exports.handler = async (event) => {

  // ✔ FIXED CORS
  const headers = {
    "Access-Control-Allow-Origin": event.headers.origin || "*",
    "Access-Control-Allow-Headers": "Content-Type, x-admin-password",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY"
  };

  const ok = (data) => ({
    statusCode: 200,
    headers,
    body: JSON.stringify(data)
  });

  const err = (s,msg) => ({
    statusCode: s,
    headers,
    body: JSON.stringify({ error: msg })
  });

  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers };

  if (event.httpMethod !== "POST") return err(405,"Method not allowed");

  if (!SUPABASE_URL || !SUPABASE_KEY || !ADMIN_PW)
    return err(500,"Server misconfigured");

  const ip = event.headers["x-forwarded-for"]?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip))
    return err(429,"Too many requests");

  const pw = event.headers["x-admin-password"] || "";

  if (!pw || pw !== ADMIN_PW)
    return err(401,"Unauthorized");

  let req;

  try {
    req = JSON.parse(event.body);
  } catch {
    return err(400,"Invalid JSON");
  }

  const { method, table, query, body } = req;

  if (!table || !ALLOWED_TABLES.has(table))
    return err(400,`Table "${table}" not permitted`);

  const allowedMethods = new Set(["GET","POST","PATCH","DELETE"]);

  if (!allowedMethods.has(method))
    return err(400,`Method "${method}" not allowed`);

  if (method === "DELETE" && (!query || query.trim()===""))
    return err(400,"DELETE without filter not allowed");

  if (method === "PATCH" && (!query || query.trim()===""))
    return err(400,"PATCH without filter not allowed");

  try {

    const result = await sbFetch(method,table,query || "",body || null);

    if (WRITE_METHODS.has(method)) {

      const recordId =
        body?.id ||
        (Array.isArray(result) ? result[0]?.id : result?.id) ||
        null;

      await logAdminAction(table,method,recordId);
    }

    return ok(result ?? []);

  } catch(e) {

    console.error("Supabase error:", e);

    return err(e.status || 500, e.message || "Supabase error");

  }

};
