/**
 * ═══════════════════════════════════════════════════════
 * 5 Pahadi Roots — AI Assistant Widget  v2.0
 * File: js/ai-assistant.js
 * Drop ONE script tag before </body> on any page:
 *
 * <script src="/js/ai-assistant.js"
 *   data-edge-url="https://ulyrhnpolypuvaurlqqi.supabase.co/functions/v1/ai-chat"
 *   data-name="Pahadi_AI"
 *   data-tagline="Himalayan Shopping Guide · Online"
 *   data-whatsapp="919XXXXXXXXX">
 * </script>
 * ═══════════════════════════════════════════════════════
 */
(function () {
  'use strict';

  /* ── CONFIG ─────────────────────────────────────────── */
  const script   = document.currentScript;
  const EDGE_URL = script?.getAttribute('data-edge-url') || '';
  const WA_NUM   = script?.getAttribute('data-whatsapp') || '919000000000';
  const DEMO     = !EDGE_URL;

  // Load admin-saved config from localStorage, fall back to data attrs
  let AI_CFG = {
    name   : script?.getAttribute('data-name')    || 'Pahadi_AI',
    tagline: script?.getAttribute('data-tagline') || 'Himalayan Shopping Guide · Online',
    avatar : 'data:image/webp;base64,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',
  };
  try {
    const saved = JSON.parse(localStorage.getItem('pahadi_ai_config') || '{}');
    if (saved.name)    AI_CFG.name    = saved.name;
    if (saved.tagline) AI_CFG.tagline = saved.tagline;
    if (saved.avatar && !saved.avatar.startsWith('data:')) AI_CFG.avatarEmoji = saved.avatar;
  } catch(e){}

  /* ── DETECT SITE THEME COLOR ─────────────────────────
     Reads CSS vars from the site so widget matches theme */
  function getSiteAccent() {
    const r = getComputedStyle(document.documentElement);
    const candidates = [
      r.getPropertyValue('--accent'),
      r.getPropertyValue('--primary'),
      r.getPropertyValue('--color-primary'),
      r.getPropertyValue('--brand'),
    ].map(s => s.trim()).filter(Boolean);
    return candidates[0] || '#2d7a4f';
  }

  /* ── INJECT STYLES ───────────────────────────────────── */
  const accent = getSiteAccent();
  const style = document.createElement('style');
  style.textContent = `
  /* WhatsApp button */
  #pr-wa-btn{
    position:fixed;bottom:96px;right:24px;
    width:52px;height:52px;border-radius:50%;
    background:#25D366;border:none;cursor:pointer;z-index:2147483644;
    box-shadow:0 4px 16px rgba(37,211,102,.45);
    display:flex;align-items:center;justify-content:center;
    transition:transform .2s cubic-bezier(.34,1.56,.64,1);
  }
  #pr-wa-btn:hover{transform:scale(1.12)}
  #pr-wa-btn svg{width:28px;height:28px;fill:#fff}
  .pr-wa-tooltip{
    position:absolute;right:60px;top:50%;transform:translateY(-50%);
    background:#1a1a1a;color:#fff;font-size:11.5px;padding:5px 10px;
    border-radius:8px;white-space:nowrap;pointer-events:none;opacity:0;
    transition:opacity .2s;font-family:inherit;
  }
  #pr-wa-btn:hover .pr-wa-tooltip{opacity:1}

  /* AI FAB */
  #pr-ai-fab{
    position:fixed;bottom:32px;right:24px;
    width:56px;height:56px;border-radius:50%;
    background:${accent};
    border:none;cursor:pointer;z-index:2147483645;
    box-shadow:0 6px 24px rgba(0,0,0,.25);
    display:flex;align-items:center;justify-content:center;overflow:hidden;
    transition:transform .25s cubic-bezier(.34,1.56,.64,1),box-shadow .2s;
    animation:pr-pulse 3s ease-out infinite;
  }
  #pr-ai-fab:hover{transform:scale(1.1);box-shadow:0 10px 32px rgba(0,0,0,.3)}
  #pr-ai-fab.open{animation:none;transform:scale(1)}
  #pr-ai-fab img.pr-fab-img{width:100%;height:100%;object-fit:cover;border-radius:50%}
  #pr-ai-fab .pr-fab-close{display:none;font-size:22px;color:#fff;line-height:1}
  #pr-ai-fab.open .pr-fab-img{display:none}
  #pr-ai-fab.open .pr-fab-close{display:block}
  @keyframes pr-pulse{
    0%{box-shadow:0 0 0 0 rgba(45,122,79,.5),0 6px 24px rgba(0,0,0,.25)}
    70%{box-shadow:0 0 0 12px rgba(45,122,79,0),0 6px 24px rgba(0,0,0,.25)}
    100%{box-shadow:0 0 0 0 rgba(45,122,79,0),0 6px 24px rgba(0,0,0,.25)}
  }
  .pr-notif{
    position:absolute;top:-2px;right:-2px;
    background:#ff5252;color:#fff;border-radius:50%;
    width:17px;height:17px;font-size:10px;font-weight:700;
    display:flex;align-items:center;justify-content:center;
    border:2px solid #fff;
  }

  /* AI Panel */
  #pr-ai-panel{
    position:fixed;bottom:100px;right:24px;
    width:370px;
    background:#0f1f14;border-radius:20px;
    box-shadow:0 20px 60px rgba(0,0,0,.55),0 0 0 1px rgba(74,173,114,.15);
    display:flex;flex-direction:column;
    z-index:2147483644;
    transform:scale(.88) translateY(16px);opacity:0;pointer-events:none;
    transition:all .28s cubic-bezier(.34,1.2,.64,1);
    overflow:hidden;
    /* resize handle */
    resize:both;
    min-width:300px;max-width:600px;
    min-height:400px;max-height:90vh;
  }
  #pr-ai-panel.open{transform:scale(1) translateY(0);opacity:1;pointer-events:all}
  @media(max-width:430px){
    #pr-ai-panel{width:calc(100vw - 20px) !important;right:10px;bottom:96px}
  }

  /* Resize handle bar */
  .pr-resize-bar{
    height:20px;background:rgba(74,173,114,.06);border-bottom:1px solid rgba(74,173,114,.1);
    display:flex;align-items:center;justify-content:center;cursor:ns-resize;flex-shrink:0;
    user-select:none;
  }
  .pr-resize-bar::before{
    content:'';width:32px;height:3px;border-radius:3px;
    background:rgba(255,255,255,.15);
  }
  /* Size preset buttons */
  .pr-size-btns{
    position:absolute;top:22px;right:12px;display:flex;gap:4px;z-index:10;
  }
  .pr-sz{
    background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);
    border-radius:5px;color:rgba(255,255,255,.5);font-size:10px;
    padding:2px 6px;cursor:pointer;transition:all .15s;line-height:1.4;
  }
  .pr-sz:hover{background:rgba(74,173,114,.2);color:#a8d8b8;border-color:rgba(74,173,114,.3)}
  .pr-sz.active{background:rgba(74,173,114,.25);color:#a8d8b8;border-color:rgba(74,173,114,.4)}

  /* Header */
  .pr-header{
    background:linear-gradient(135deg,#1a3a2a,#2d5a3d);
    padding:14px 16px;display:flex;align-items:center;gap:10px;
    border-bottom:1px solid rgba(74,173,114,.12);flex-shrink:0;position:relative;
  }
  .pr-hav{
    width:42px;height:42px;border-radius:50%;flex-shrink:0;overflow:hidden;
    border:2px solid rgba(74,173,114,.4);
  }
  .pr-hav img{width:100%;height:100%;object-fit:cover}
  .pr-hname{font-size:15px;font-weight:700;color:#e8f5ec;line-height:1.2;font-family:inherit}
  .pr-hsub{font-size:10.5px;color:#7ab88a;font-family:inherit}
  .pr-online{
    width:8px;height:8px;border-radius:50%;background:#4aad72;
    display:inline-block;margin-right:4px;
    animation:pr-blink 2s ease-in-out infinite;
  }
  @keyframes pr-blink{0%,100%{opacity:1}50%{opacity:.3}}
  .pr-lang-sel{
    margin-left:auto;background:rgba(255,255,255,.08);
    border:1px solid rgba(255,255,255,.12);border-radius:8px;
    padding:4px 6px;font-size:10px;color:#a8d8b8;cursor:pointer;
    outline:none;max-width:90px;font-family:inherit;
  }
  .pr-lang-sel option,.pr-lang-sel optgroup{background:#1a3a2a;color:#e8f5ec}

  /* Chips */
  .pr-chips{
    padding:8px 10px;display:flex;gap:6px;overflow-x:auto;flex-shrink:0;
    scrollbar-width:none;border-bottom:1px solid rgba(74,173,114,.08);
  }
  .pr-chips::-webkit-scrollbar{display:none}
  .pr-chip{
    white-space:nowrap;background:rgba(74,173,114,.1);
    border:1px solid rgba(74,173,114,.2);border-radius:14px;
    padding:4px 10px;font-size:11px;color:#8dd4a8;cursor:pointer;
    transition:all .15s;flex-shrink:0;font-family:inherit;
  }
  .pr-chip:hover{background:rgba(74,173,114,.22);color:#c8efd8}

  /* Messages */
  .pr-msgs{
    flex:1;overflow-y:auto;padding:12px;
    display:flex;flex-direction:column;gap:10px;
    scrollbar-width:thin;scrollbar-color:rgba(74,173,114,.15) transparent;
  }
  .pr-msgs::-webkit-scrollbar{width:3px}
  .pr-msgs::-webkit-scrollbar-thumb{background:rgba(74,173,114,.2);border-radius:3px}
  .pr-m{display:flex;gap:7px;align-items:flex-end;animation:pr-in .25s ease-out}
  @keyframes pr-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
  .pr-m.u{flex-direction:row-reverse}
  .pr-mav{
    width:28px;height:28px;border-radius:50%;flex-shrink:0;overflow:hidden;
    display:flex;align-items:center;justify-content:center;
  }
  .pr-m.b .pr-mav{border:1px solid rgba(74,173,114,.3)}
  .pr-m.b .pr-mav img{width:100%;height:100%;object-fit:cover;border-radius:50%}
  .pr-m.u .pr-mav{background:rgba(255,255,255,.1);font-size:13px}
  .pr-mb{
    max-width:80%;padding:9px 13px;border-radius:16px;
    font-size:13px;line-height:1.55;font-family:inherit;
  }
  .pr-m.b .pr-mb{
    background:#1a3a2a;color:#d4edda;
    border:1px solid rgba(74,173,114,.12);border-bottom-left-radius:4px;
  }
  .pr-m.u .pr-mb{
    background:${accent};color:#fff;border-bottom-right-radius:4px;
  }
  /* Product cards */
  .pr-pcards{display:flex;flex-direction:column;gap:6px;margin-top:8px}
  .pr-pc{
    background:rgba(0,0,0,.2);border:1px solid rgba(74,173,114,.18);
    border-radius:10px;padding:8px 10px;
    display:flex;align-items:center;gap:8px;cursor:pointer;transition:all .15s;
  }
  .pr-pc:hover{background:rgba(74,173,114,.1)}
  .pr-pce{font-size:22px;flex-shrink:0}
  .pr-pcn{font-size:12px;color:#c8efd8;font-weight:600;line-height:1.3}
  .pr-pcp{font-size:11px;color:#7ab88a}
  .pr-pcb{
    margin-left:auto;background:${accent};color:#fff;
    border:none;border-radius:6px;padding:4px 9px;font-size:11px;
    cursor:pointer;font-weight:600;flex-shrink:0;transition:transform .15s;font-family:inherit;
  }
  .pr-pcb:hover{transform:scale(1.05)}
  /* Feedback */
  .pr-fb{display:flex;gap:5px;padding-left:35px;margin-top:2px}
  .pr-fb button{
    background:none;border:1px solid rgba(255,255,255,.1);
    border-radius:5px;padding:2px 7px;font-size:11px;
    color:rgba(255,255,255,.35);cursor:pointer;transition:all .15s;
  }
  .pr-fb button:hover{border-color:rgba(74,173,114,.4);color:#7ab88a}
  .pr-fb button.liked{border-color:#4aad72;color:#4aad72}
  .pr-fb button.disliked{border-color:#ff5252;color:#ff5252}
  /* Typing */
  .pr-dots{display:flex;gap:4px;padding:2px 0}
  .pr-dots span{
    width:6px;height:6px;background:#4aad72;border-radius:50%;
    animation:pr-db .8s ease-in-out infinite;
  }
  .pr-dots span:nth-child(2){animation-delay:.15s}
  .pr-dots span:nth-child(3){animation-delay:.3s}
  @keyframes pr-db{0%,80%,100%{transform:scale(.6);opacity:.3}40%{transform:scale(1);opacity:1}}

  /* Input */
  .pr-ia{padding:10px 12px;border-top:1px solid rgba(74,173,114,.1);background:#0c1a10;flex-shrink:0}
  .pr-ir{display:flex;gap:7px;align-items:flex-end}
  #pr-ti{
    flex:1;background:rgba(255,255,255,.05);
    border:1px solid rgba(74,173,114,.18);border-radius:14px;
    padding:9px 12px;font-size:13px;color:#e8f5ec;
    resize:none;outline:none;font-family:inherit;
    max-height:100px;line-height:1.4;scrollbar-width:none;
    transition:border-color .2s;
  }
  #pr-ti:focus{border-color:rgba(74,173,114,.4)}
  #pr-ti::placeholder{color:rgba(255,255,255,.22)}
  #pr-ti::-webkit-scrollbar{display:none}
  #pr-voice{
    background:none;border:1px solid rgba(74,173,114,.2);
    border-radius:50%;width:36px;height:36px;cursor:pointer;
    display:flex;align-items:center;justify-content:center;
    flex-shrink:0;transition:all .2s;
  }
  #pr-voice:hover{border-color:rgba(74,173,114,.5)}
  #pr-voice svg{width:15px;height:15px;fill:rgba(255,255,255,.4)}
  #pr-voice.rec{border-color:#ff5252;animation:pr-rec .8s ease-in-out infinite}
  @keyframes pr-rec{0%,100%{box-shadow:0 0 0 0 rgba(255,82,82,.4)}50%{box-shadow:0 0 0 7px rgba(255,82,82,0)}}
  #pr-sb{
    width:36px;height:36px;flex-shrink:0;border-radius:50%;
    background:${accent};border:none;cursor:pointer;
    display:flex;align-items:center;justify-content:center;
    transition:transform .15s;
  }
  #pr-sb:hover:not(:disabled){transform:scale(1.1)}
  #pr-sb:disabled{opacity:.35;cursor:not-allowed}
  #pr-sb svg{width:16px;height:16px;fill:#fff}
  .pr-ft{text-align:center;font-size:9.5px;color:rgba(255,255,255,.13);margin-top:7px;font-family:inherit}

  /* Cart toast */
  .pr-toast{
    position:fixed;bottom:105px;left:50%;
    transform:translateX(-50%) translateY(16px);
    background:#2d7a4f;color:#fff;border-radius:10px;
    padding:8px 18px;font-size:12.5px;font-weight:600;
    opacity:0;transition:all .3s;z-index:2147483647;
    pointer-events:none;box-shadow:0 6px 20px rgba(0,0,0,.35);font-family:inherit;
  }
  .pr-toast.show{opacity:1;transform:translateX(-50%) translateY(0)}
  `;
  document.head.appendChild(style);

  /* ── DOM — WhatsApp button ───────────────────────────── */
  const waBtn = document.createElement('button');
  waBtn.id = 'pr-wa-btn';
  waBtn.setAttribute('aria-label','Chat on WhatsApp');
  waBtn.title = 'Chat on WhatsApp';
  waBtn.innerHTML = `
    <span class="pr-wa-tooltip">Chat on WhatsApp</span>
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>`;
  waBtn.addEventListener('click', () => {
    const msg = encodeURIComponent('Namaste! I want to know more about your Himalayan products 🌿');
    window.open(`https://wa.me/${WA_NUM}?text=${msg}`, '_blank');
  });
  document.body.appendChild(waBtn);

  /* ── DOM — AI FAB ────────────────────────────────────── */
  const fab = document.createElement('button');
  fab.id = 'pr-ai-fab';
  fab.setAttribute('aria-label','Chat with Pahadi_AI');
  fab.innerHTML = `
    <img class="pr-fab-img" src="${AI_CFG.avatar}" alt="AI">
    <span class="pr-fab-close">✕</span>
    <span class="pr-notif" id="pr-notif">1</span>`;
  document.body.appendChild(fab);

  /* ── DOM — Panel ─────────────────────────────────────── */
  const panel = document.createElement('div');
  panel.id = 'pr-ai-panel';
  panel.setAttribute('role','dialog');
  panel.innerHTML = `
  <div class="pr-resize-bar" id="pr-resize-bar"></div>

  <div class="pr-size-btns">
    <button class="pr-sz" data-w="300" data-h="420" title="Small">S</button>
    <button class="pr-sz active" data-w="370" data-h="520" title="Medium">M</button>
    <button class="pr-sz" data-w="520" data-h="680" title="Large">L</button>
    <button class="pr-sz" data-w="600" data-h="800" title="Extra Large">XL</button>
  </div>

  <div class="pr-header">
    <div class="pr-hav"><img src="${AI_CFG.avatar}" alt="${AI_CFG.name}"></div>
    <div>
      <div class="pr-hname" id="pr-ai-name">${AI_CFG.name}</div>
      <div class="pr-hsub"><span class="pr-online"></span><span id="pr-ai-tagline">${AI_CFG.tagline}</span></div>
    </div>
    <select class="pr-lang-sel" id="pr-lang">
      <optgroup label="🇮🇳 Indian">
        <option value="en">English</option><option value="hi">हिंदी</option>
        <option value="pa">ਪੰਜਾਬੀ</option><option value="bn">বাংলা</option>
        <option value="ta">தமிழ்</option><option value="te">తెలుగు</option>
        <option value="mr">मराठी</option><option value="gu">ગુજરાતી</option>
        <option value="kn">ಕನ್ನಡ</option><option value="ml">മലയാളം</option>
        <option value="or">ଓଡ଼ିଆ</option><option value="as">অসমীয়া</option>
        <option value="mai">मैथिली</option><option value="ne">नेपाली</option>
        <option value="kok">कोंकणी</option><option value="doi">डोगरी</option>
        <option value="sa">संस्कृत</option><option value="mni">মৈতৈলোন্</option>
        <option value="brx">बड़ो</option><option value="sat">संताली</option>
        <option value="ks">कॉशुर</option><option value="sd">سنڌي</option>
      </optgroup>
      <optgroup label="🌍 International">
        <option value="zh">中文</option><option value="ja">日本語</option>
        <option value="ko">한국어</option><option value="ar">العربية</option>
        <option value="fr">Français</option><option value="de">Deutsch</option>
        <option value="es">Español</option><option value="pt">Português</option>
        <option value="ru">Русский</option><option value="it">Italiano</option>
        <option value="nl">Nederlands</option><option value="tr">Türkçe</option>
        <option value="vi">Tiếng Việt</option><option value="th">ภาษาไทย</option>
        <option value="id">Bahasa Indonesia</option><option value="ms">Bahasa Melayu</option>
        <option value="sw">Kiswahili</option><option value="pl">Polski</option>
        <option value="uk">Українська</option><option value="he">עברית</option>
      </optgroup>
    </select>
  </div>

  <div class="pr-chips" id="pr-chips">
    <div class="pr-chip" data-q="Best honey recommendation?">🍯 Best honey</div>
    <div class="pr-chip" data-q="Show me products under ₹500">💰 Under ₹500</div>
    <div class="pr-chip" data-q="Benefits of A2 Bilona Ghee?">🧈 Ghee benefits</div>
    <div class="pr-chip" data-q="How to check if saffron is genuine?">🌸 Real saffron?</div>
    <div class="pr-chip" data-q="How long does delivery take?">🚚 Delivery time</div>
    <div class="pr-chip" data-q="Suggest a gift idea under ₹1000">🎁 Gift ideas</div>
    <div class="pr-chip" data-q="Tell me about Ladakhi Shilajit">⚡ Shilajit</div>
    <div class="pr-chip" data-q="What makes your products different from market products?">🏔️ Why us?</div>
  </div>

  <div class="pr-msgs" id="pr-msgs"></div>

  <div class="pr-ia">
    <div class="pr-ir">
      <button id="pr-voice" title="Voice input" aria-label="Voice input">
        <svg viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1 1.93c-3.94-.49-7-3.85-7-7.93H2c0 4.57 3.13 8.37 7.26 9.58V21h5.48v-3.42C18.87 16.37 22 12.57 22 8h-2c0 4.08-3.06 7.44-7 7.93V15.93z"/></svg>
      </button>
      <textarea id="pr-ti" rows="1" placeholder="Ask about our Himalayan products…"></textarea>
      <button id="pr-sb" aria-label="Send">
        <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
      </button>
    </div>
    <div class="pr-ft">Pahadi Roots AI · Himalayan Shopping Guide</div>
  </div>`;
  document.body.appendChild(panel);

  /* toast */
  const toast = document.createElement('div');
  toast.className = 'pr-toast';
  document.body.appendChild(toast);

  /* ── STATE ───────────────────────────────────────────── */
  let isOpen=false, isThinking=false, history=[], lang='en', isRec=false, rec=null;

  const msgs  = document.getElementById('pr-msgs');
  const input = document.getElementById('pr-ti');
  const sb    = document.getElementById('pr-sb');
  const voice = document.getElementById('pr-voice');
  const langSel = document.getElementById('pr-lang');

  /* ── SIZE PRESETS ────────────────────────────────────── */
  document.querySelectorAll('.pr-sz').forEach(btn => {
    btn.addEventListener('click', () => {
      const w = btn.dataset.w, h = btn.dataset.h;
      panel.style.width  = w + 'px';
      panel.style.height = h + 'px';
      document.querySelectorAll('.pr-sz').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  /* ── DRAG RESIZE (top bar) ───────────────────────────── */
  const resizeBar = document.getElementById('pr-resize-bar');
  let dragging=false, startY=0, startH=0;
  resizeBar.addEventListener('mousedown', e => {
    dragging=true; startY=e.clientY;
    startH=panel.offsetHeight; e.preventDefault();
  });
  document.addEventListener('mousemove', e => {
    if(!dragging) return;
    const diff = startY - e.clientY; // drag up = bigger
    const newH = Math.min(Math.max(startH+diff, 400), window.innerHeight*0.9);
    panel.style.height = newH + 'px';
  });
  document.addEventListener('mouseup', () => { dragging=false; });

  /* ── TOGGLE ──────────────────────────────────────────── */
  fab.addEventListener('click', () => {
    isOpen = !isOpen;
    fab.classList.toggle('open', isOpen);
    panel.classList.toggle('open', isOpen);
    const n = document.getElementById('pr-notif');
    if(n) n.remove();
    if(isOpen && !msgs.children.length) showWelcome();
    if(isOpen) setTimeout(() => input.focus(), 300);
  });

  /* outside click */
  document.addEventListener('click', e => {
    if(isOpen && !panel.contains(e.target) && !fab.contains(e.target)){
      isOpen=false; fab.classList.remove('open'); panel.classList.remove('open');
    }
  });

  /* ── LANGUAGE ────────────────────────────────────────── */
  langSel.addEventListener('change', () => { lang = langSel.value; });

  /* ── CHIPS ───────────────────────────────────────────── */
  panel.querySelectorAll('.pr-chip').forEach(c => {
    c.addEventListener('click', () => {
      send(c.dataset.q);
      document.getElementById('pr-chips').style.display='none';
    });
  });

  /* ── WELCOME ─────────────────────────────────────────── */
  function showWelcome() {
    const name = AI_CFG.name;
    const greet = {
      en:`🙏 Namaste! I'm **${name}** — your Himalayan shopping expert!\n\nTell me your need, budget, or health goal and I'll find the perfect product for you. I can also add items to your cart directly!`,
      hi:`🙏 नमस्ते! मैं **${name}** हूँ — आपका Himalayan shopping expert!\n\nअपनी ज़रूरत या budget बताइए, मैं सबसे अच्छा product find करूँगा।`,
    };
    addMsg('bot', greet[lang] || greet.en);
  }

  /* ── ADD MESSAGE ─────────────────────────────────────── */
  function addMsg(role, text, products=[], skipHistory=false) {
    const m = document.createElement('div');
    m.className = `pr-m ${role==='user'?'u':'b'}`;

    const av = document.createElement('div');
    av.className = 'pr-mav';
    if(role==='user') av.textContent='👤';
    else av.innerHTML=`<img src="${AI_CFG.avatar}" alt="AI">`;

    const bbl = document.createElement('div');
    bbl.className = 'pr-mb';
    bbl.innerHTML = text
      .replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')
      .replace(/\n•/g,'<br>•')
      .replace(/\n/g,'<br>');

    // Product cards
    if(products.length){
      const pc = document.createElement('div');
      pc.className='pr-pcards';
      products.forEach(p => {
        pc.innerHTML+=`<div class="pr-pc">
          <span class="pr-pce">${p.emoji||'🌿'}</span>
          <div><div class="pr-pcn">${p.name}</div><div class="pr-pcp">₹${p.price} · ${p.variant}</div></div>
          <button class="pr-pcb" onclick="window.dispatchEvent(new CustomEvent('pr-add-cart',{detail:{id:'${p.id}',name:'${p.name}'}}));document.querySelector('.pr-toast').textContent='✅ ${p.name} added!';document.querySelector('.pr-toast').classList.add('show');setTimeout(()=>document.querySelector('.pr-toast').classList.remove('show'),2500)">Add</button>
        </div>`;
      });
      bbl.appendChild(pc);
    }

    m.appendChild(av); m.appendChild(bbl);
    msgs.appendChild(m);

    // Feedback buttons
    if(role==='bot' && !skipHistory){
      const fb = document.createElement('div');
      fb.className='pr-fb';
      fb.innerHTML=`<button onclick="this.classList.toggle('liked');this.parentElement.querySelector('.disliked')?.classList.remove('disliked')">👍</button>
        <button onclick="this.classList.toggle('disliked');this.parentElement.querySelector('.liked')?.classList.remove('liked')">👎</button>`;
      msgs.appendChild(fb);
    }

    msgs.scrollTop=msgs.scrollHeight;
    if(!skipHistory) history.push({role:role==='user'?'user':'model',parts:[{text}]});
  }

  function showTyping(){
    const el=document.createElement('div');
    el.className='pr-m b'; el.id='pr-typ';
    el.innerHTML=`<div class="pr-mav"><img src="${AI_CFG.avatar}" alt="AI"></div>
      <div class="pr-mb"><div class="pr-dots"><span></span><span></span><span></span></div></div>`;
    msgs.appendChild(el); msgs.scrollTop=msgs.scrollHeight;
  }
  function hideTyping(){const e=document.getElementById('pr-typ');if(e)e.remove();}

  /* ── SEND ────────────────────────────────────────────── */
  async function send(txt) {
    const t=(txt||input.value).trim();
    if(!t||isThinking)return;
    input.value=''; input.style.height='auto';
    addMsg('user',t);
    isThinking=true; sb.disabled=true;
    showTyping();
    try{
      const r = await getReply(t);
      hideTyping(); addMsg('bot', r.text, r.products||[]);
    }catch(e){
      hideTyping();
      addMsg('bot','🙏 Connection issue — please try again in a moment!');
    }
    isThinking=false; sb.disabled=false; input.focus();
  }

  /* ── AI CALL ─────────────────────────────────────────── */
  async function getReply(msg) {
    if(DEMO) return getDemoReply(msg);
    const res = await fetch(EDGE_URL,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({message:msg, history:history.slice(-10), mode:'customer', language:lang}),
    });
    if(!res.ok) throw new Error('API '+res.status);
    const d = await res.json();
    return {text: d.reply||'No response', products: d.products||[]};
  }

  /* ── DEMO REPLIES ────────────────────────────────────── */
  function getDemoReply(t){
    const l=t.toLowerCase();
    if(l.match(/honey|शहद/)) return {text:`🍯 Our **Himalayan Wild Honey** is raw, unprocessed & enzyme-rich — sourced from wildflower fields in Himachal Pradesh.\n\n**Why it's special:**\n• Never heated or filtered\n• Anti-bacterial & immunity boosting\n• Direct from beekeepers — no middlemen\n\nFree shipping above ₹799 🚚`,products:[{id:'h1',name:'Wild Honey',price:499,variant:'500g',emoji:'🍯'},{id:'h2',name:'Wild Honey',price:899,variant:'1kg',emoji:'🍯'}]};
    if(l.match(/ghee|घी/)) return {text:`🧈 **A2 Bilona Ghee** — made the traditional way from cultured curd of Himalayan desi cows.\n\n**Benefits:**\n• Easy to digest (butyric acid)\n• Rich in Vitamins A, D, E, K\n• Zero additives, zero preservatives`,products:[{id:'g1',name:'A2 Bilona Ghee',price:749,variant:'500ml',emoji:'🧈'},{id:'g2',name:'A2 Bilona Ghee',price:1399,variant:'1L',emoji:'🧈'}]};
    if(l.match(/500|budget|under|₹.*500/i)) return {text:`💰 **Best products under ₹500:**\n\nAll sourced directly from Himalayan farmers — pure quality, fair price!`,products:[{id:'h1',name:'Wild Honey',price:499,variant:'500g',emoji:'🍯'},{id:'t1',name:'Lakadong Turmeric',price:299,variant:'200g',emoji:'🌿'},{id:'c1',name:'Kangra Green Tea',price:399,variant:'100g',emoji:'🍵'},{id:'c2',name:'Large Cardamom',price:349,variant:'100g',emoji:'🫚'}]};
    if(l.match(/saffron|kesar|केसर/)) return {text:`🌸 **Kashmiri Saffron** from Pampore — the world's finest.\n\n**Authenticity test:** Drop a strand in warm water. If it slowly releases golden-yellow colour — it's real.\n\nOurs is lab-tested, certified Grade A.`,products:[{id:'s1',name:'Kashmiri Saffron',price:599,variant:'1g',emoji:'🌸'},{id:'s2',name:'Kashmiri Saffron',price:1099,variant:'2g',emoji:'🌸'}]};
    if(l.match(/shilajit|शिलाजीत/)) return {text:`⚡ **Ladakhi Shilajit** from 16,000+ ft altitude in Ladakh.\n\n• 60%+ Fulvic acid content\n• Increases energy & stamina\n• Supports hormonal balance\n• Immunity & anti-aging\n\nPea-sized amount in warm milk daily. 💪`,products:[{id:'sh1',name:'Ladakhi Shilajit',price:999,variant:'20g resin',emoji:'⚡'}]};
    if(l.match(/deliver|ship|कब|दिन/)) return {text:`🚚 **Delivery Details:**\n\n• Pan India delivery — 4 to 7 business days\n• Free shipping above ₹799\n• Ships within 24 hours of payment\n• SMS + email tracking provided\n• We deliver to J&K and Northeast India too!`,products:[]};
    if(l.match(/gift|उपहार|तोहफा/)) return {text:`🎁 **Gift Ideas from the Himalayas:**\n\n🥇 **Premium (₹1500+):** Saffron + A2 Ghee + Wild Honey combo\n🥈 **Mid-range (₹800-1200):** Shilajit + Honey set\n🥉 **Budget (under ₹500):** Turmeric + Cardamom + Kangra Tea trio\n\nAll beautifully packaged. Want me to help pick one?`,products:[{id:'h1',name:'Wild Honey',price:499,variant:'500g',emoji:'🍯'},{id:'s1',name:'Kashmiri Saffron',price:599,variant:'1g',emoji:'🌸'},{id:'sh1',name:'Ladakhi Shilajit',price:999,variant:'20g',emoji:'⚡'}]};
    if(l.match(/why|different|special|unique/i)) return {text:`🏔️ **Why 5 Pahadi Roots is different:**\n\n• **Direct from farmers** — no middlemen, 200+ mountain families\n• **Lab tested** — every batch certified pure\n• **10 Himalayan states** — broadest authentic range in India\n• **No compromise** — no additives, no heating, no artificial processing\n• **Fair trade** — farmers get better prices, you get better products\n\nWe're not just a store — we're a movement for pure Himalayan living 🌿`,products:[]};
    return {text:`🌿 Namaste! I'm here to help you find the perfect Himalayan product.\n\nYou can ask me:\n• Specific health needs (immunity, energy, digestion)\n• Budget filters (e.g. "best under ₹500")\n• Product authenticity checks\n• Delivery & return queries\n• Gift recommendations\n\nWhat are you looking for today?`,products:[]};
  }

  /* ── VOICE ───────────────────────────────────────────── */
  const voiceLangMap={en:'en-IN',hi:'hi-IN',pa:'pa-IN',bn:'bn-IN',ta:'ta-IN',te:'te-IN',mr:'mr-IN',gu:'gu-IN',kn:'kn-IN',ml:'ml-IN',or:'or-IN',as:'as-IN',ne:'ne-NP',zh:'zh-CN',ja:'ja-JP',ko:'ko-KR',ar:'ar-SA',fr:'fr-FR',de:'de-DE',es:'es-ES',pt:'pt-BR',ru:'ru-RU',it:'it-IT',nl:'nl-NL',tr:'tr-TR',vi:'vi-VN',th:'th-TH',id:'id-ID',ms:'ms-MY',pl:'pl-PL',uk:'uk-UA',he:'he-IL'};
  voice.addEventListener('click',()=>{
    if(!('webkitSpeechRecognition' in window||'SpeechRecognition' in window)){addMsg('bot','🎤 Voice not supported in this browser. Try Chrome!');return;}
    if(isRec){rec&&rec.stop();voice.classList.remove('rec');isRec=false;return;}
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    rec=new SR(); rec.lang=voiceLangMap[lang]||'en-IN'; rec.interimResults=false;
    rec.onresult=e=>{input.value=e.results[0][0].transcript;autoResize(input);voice.classList.remove('rec');isRec=false;};
    rec.onerror=()=>{voice.classList.remove('rec');isRec=false;};
    rec.start(); voice.classList.add('rec'); isRec=true;
  });

  /* ── INPUT HELPERS ───────────────────────────────────── */
  input.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();}});
  input.addEventListener('input',()=>autoResize(input));
  sb.addEventListener('click',()=>send());
  function autoResize(el){el.style.height='auto';el.style.height=Math.min(el.scrollHeight,100)+'px';}

})();
