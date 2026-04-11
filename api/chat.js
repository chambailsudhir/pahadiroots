// api/chat.js — Vercel Serverless Function
// Gemini API key is stored in Vercel Environment Variable — NEVER in frontend code

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get key from Vercel environment — never exposed to browser
  const GEMINI_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_KEY) {
    return res.status(500).json({ error: 'API key not configured on server' });
  }

  try {
    const { contents, system_instruction, generationConfig } = req.body;

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction,
          contents,
          tools: [{ google_search: {} }],
          generationConfig: generationConfig || {
            temperature: 0.7,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    const data = await geminiRes.json();

    if (!geminiRes.ok) {
      return res.status(geminiRes.status).json({ error: data.error?.message || 'Gemini error' });
    }

    return res.status(200).json(data);

  } catch (err) {
    console.error('[api/chat] Error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
