/**
 * 5 Pahadi Roots — AI Assistant + WhatsApp Widget  v4.0
 * js/ai-assistant.js
 */
(function () {
  'use strict';

  const script   = document.currentScript;
  const EDGE_URL = script?.getAttribute('data-edge-url') || '';
  const WA_NUM   = script?.getAttribute('data-whatsapp') || '919000000000';
  const DEMO     = !EDGE_URL;

  /* ── THEME from site CSS vars ────────────────────────── */
  const R = getComputedStyle(document.documentElement);
  const DARK_GREEN = (R.getPropertyValue('--g')  || '#1a3a1e').trim();
  const MID_GREEN  = (R.getPropertyValue('--g2') || '#2d5233').trim();
  const GOLD       = (R.getPropertyValue('--gd') || '#c8920a').trim();
  const GOLD2      = (R.getPropertyValue('--gd2')|| '#e8b84b').trim();

  /* ── AI CONFIG ───────────────────────────────────────── */
  let AI_CFG = { name:'Pahadi_AI', tagline:'Himalayan Shopping Guide · Online', avatar:'data:image/webp;base64,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' };
  try {
    const s = JSON.parse(localStorage.getItem('pahadi_ai_config')||'{}');
    if(s.name)    AI_CFG.name    = s.name;
    if(s.tagline) AI_CFG.tagline = s.tagline;
  } catch(e){}

  /* ── STYLES ──────────────────────────────────────────── */
  const css = document.createElement('style');
  css.textContent = `
  /* ── Both FABs wrap ── */
  #pr-fabs{
    position:fixed;right:24px;bottom:30px;
    display:flex;flex-direction:row;align-items:flex-end;gap:10px;
    z-index:2147483645;
  }

  /* ── WhatsApp FAB ── */
  #pr-wa{
    width:52px;height:52px;border-radius:50%;
    background:#25D366;border:none;cursor:pointer;
    box-shadow:0 4px 16px rgba(37,211,102,.45);
    display:flex;align-items:center;justify-content:center;
    transition:transform .2s cubic-bezier(.34,1.56,.64,1);
    position:relative;
  }
  #pr-wa:hover{transform:scale(1.1)}
  #pr-wa svg{width:27px;height:27px;fill:#fff}
  #pr-wa .pr-tip{
    position:absolute;bottom:60px;left:50%;transform:translateX(-50%);
    background:rgba(0,0,0,.75);color:#fff;font-size:11px;
    padding:4px 10px;border-radius:7px;white-space:nowrap;
    opacity:0;pointer-events:none;transition:opacity .18s;font-family:inherit;
  }
  #pr-wa:hover .pr-tip{opacity:1}

  /* ── AI FAB ── */
  #pr-ai-fab{
    width:56px;height:56px;border-radius:50%;
    background:${DARK_GREEN};border:none;cursor:pointer;
    box-shadow:0 6px 22px rgba(26,58,30,.5);
    display:flex;align-items:center;justify-content:center;overflow:hidden;
    transition:transform .22s cubic-bezier(.34,1.56,.64,1);
    animation:pr-pulse 3s ease-out infinite;position:relative;
  }
  #pr-ai-fab:hover{transform:scale(1.08)}
  #pr-ai-fab.open{animation:none}
  #pr-ai-fab img.pr-fi{width:100%;height:100%;object-fit:cover;border-radius:50%}
  #pr-ai-fab .pr-fc{display:none;font-size:20px;color:#fff}
  #pr-ai-fab.open .pr-fi{display:none}
  #pr-ai-fab.open .pr-fc{display:block}
  .pr-badge{position:absolute;top:-2px;right:-2px;background:#ff5252;color:#fff;border-radius:50%;width:16px;height:16px;font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center;border:2px solid #fff}
  @keyframes pr-pulse{
    0%{box-shadow:0 0 0 0 rgba(26,58,30,.55),0 6px 22px rgba(26,58,30,.5)}
    70%{box-shadow:0 0 0 12px rgba(26,58,30,0),0 6px 22px rgba(26,58,30,.5)}
    100%{box-shadow:0 0 0 0 rgba(26,58,30,0),0 6px 22px rgba(26,58,30,.5)}
  }

  /* ── Panel ── */
  #pr-panel{
    position:fixed;bottom:105px;right:24px;
    width:380px;height:560px;
    /* Allow free resize by dragging — both axes */
    min-width:300px;min-height:380px;
    max-width:min(680px,96vw);max-height:92vh;
    resize:both;overflow:hidden;
    background:#0c1a0e;border-radius:18px;
    box-shadow:0 24px 72px rgba(0,0,0,.65),0 0 0 1px rgba(45,82,51,.3);
    display:flex;flex-direction:column;
    z-index:2147483644;
    transform:scale(.87) translateY(18px);opacity:0;pointer-events:none;
    transition:transform .28s cubic-bezier(.34,1.2,.64,1),opacity .28s;
  }
  #pr-panel.open{transform:scale(1) translateY(0);opacity:1;pointer-events:all}
  @media(max-width:440px){#pr-panel{width:calc(100vw - 16px) !important;right:8px;bottom:108px}}

  /* Drag bar — top handle */
  #pr-drag{
    height:20px;background:linear-gradient(135deg,${DARK_GREEN},${MID_GREEN});
    display:flex;align-items:center;justify-content:center;
    cursor:row-resize;flex-shrink:0;user-select:none;
    border-radius:18px 18px 0 0;
  }
  #pr-drag::before{content:'';width:40px;height:3px;border-radius:3px;background:rgba(255,255,255,.22)}

  /* Corner resize hint */
  #pr-panel::after{
    content:'⤡';position:absolute;bottom:4px;right:6px;
    font-size:13px;color:rgba(200,146,10,.3);pointer-events:none;line-height:1;
  }

  /* Header */
  .pr-hd{
    background:linear-gradient(135deg,${DARK_GREEN},${MID_GREEN});
    padding:11px 14px;display:flex;align-items:center;gap:10px;flex-shrink:0;
    border-bottom:1px solid rgba(200,146,10,.18);
  }
  .pr-hav{width:40px;height:40px;border-radius:50%;overflow:hidden;flex-shrink:0;border:2px solid ${GOLD}}
  .pr-hav img{width:100%;height:100%;object-fit:cover}
  .pr-hn{font-size:14px;font-weight:700;color:#f0ede0;line-height:1.2;font-family:inherit}
  .pr-hs{font-size:10px;color:${GOLD2};font-family:inherit}
  .pr-dot{width:7px;height:7px;border-radius:50%;background:#4aad72;display:inline-block;margin-right:4px;animation:pr-blink 2s ease-in-out infinite}
  @keyframes pr-blink{0%,100%{opacity:1}50%{opacity:.3}}
  .pr-lsel{
    margin-left:auto;background:rgba(0,0,0,.3);
    border:1px solid rgba(200,146,10,.3);border-radius:7px;
    padding:4px 6px;font-size:10.5px;color:${GOLD2};
    cursor:pointer;outline:none;max-width:96px;font-family:inherit;
    flex-shrink:0;
  }
  .pr-lsel option,.pr-lsel optgroup{background:#1a3a1e;color:#f0ede0}

  /* Chips */
  .pr-chips{padding:7px 10px;display:flex;gap:5px;overflow-x:auto;flex-shrink:0;scrollbar-width:none;border-bottom:1px solid rgba(200,146,10,.1)}
  .pr-chips::-webkit-scrollbar{display:none}
  .pr-chip{white-space:nowrap;background:rgba(200,146,10,.1);border:1px solid rgba(200,146,10,.22);border-radius:12px;padding:4px 10px;font-size:11px;color:${GOLD2};cursor:pointer;transition:all .15s;flex-shrink:0;font-family:inherit}
  .pr-chip:hover{background:rgba(200,146,10,.22);color:#f5d98a}

  /* Messages */
  .pr-msgs{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;scrollbar-width:thin;scrollbar-color:rgba(200,146,10,.15) transparent}
  .pr-msgs::-webkit-scrollbar{width:3px}
  .pr-msgs::-webkit-scrollbar-thumb{background:rgba(200,146,10,.15);border-radius:3px}
  .pr-m{display:flex;gap:7px;align-items:flex-end;animation:pr-in .25s ease-out}
  @keyframes pr-in{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:translateY(0)}}
  .pr-m.u{flex-direction:row-reverse}
  .pr-mav{width:28px;height:28px;border-radius:50%;flex-shrink:0;overflow:hidden;display:flex;align-items:center;justify-content:center}
  .pr-m.b .pr-mav{border:1.5px solid ${GOLD}}
  .pr-m.b .pr-mav img{width:100%;height:100%;object-fit:cover;border-radius:50%}
  .pr-m.u .pr-mav{background:rgba(255,255,255,.1);font-size:13px}
  .pr-mb{max-width:82%;padding:9px 13px;border-radius:15px;font-size:13px;line-height:1.55;font-family:inherit}
  .pr-m.b .pr-mb{background:#152018;color:#e8edd4;border:1px solid rgba(200,146,10,.1);border-bottom-left-radius:4px}
  .pr-m.u .pr-mb{background:linear-gradient(135deg,${MID_GREEN},#3d6b42);color:#fff;border-bottom-right-radius:4px}

  /* Product cards */
  .pr-pcs{display:flex;flex-direction:column;gap:6px;margin-top:8px}
  .pr-pc{background:rgba(0,0,0,.25);border:1px solid rgba(200,146,10,.18);border-radius:9px;padding:8px 10px;display:flex;align-items:center;gap:8px;transition:all .15s;cursor:default}
  .pr-pc:hover{background:rgba(200,146,10,.07)}
  .pr-pce{font-size:20px;flex-shrink:0}
  .pr-pcn{font-size:12px;color:#e8edd4;font-weight:600;line-height:1.3}
  .pr-pcp{font-size:11px;color:${GOLD2};margin-top:1px}
  .pr-pcb{margin-left:auto;background:${GOLD};color:#1a1a0a;border:none;border-radius:6px;padding:4px 9px;font-size:11px;cursor:pointer;font-weight:700;flex-shrink:0;transition:transform .15s;font-family:inherit}
  .pr-pcb:hover{transform:scale(1.05)}

  /* Feedback */
  .pr-fb{display:flex;gap:4px;padding-left:35px;margin-top:2px}
  .pr-fb button{background:none;border:1px solid rgba(255,255,255,.1);border-radius:5px;padding:2px 7px;font-size:11px;color:rgba(255,255,255,.3);cursor:pointer;transition:all .15s;font-family:inherit}
  .pr-fb button:hover{border-color:rgba(200,146,10,.4);color:${GOLD2}}
  .pr-fb button.liked{border-color:#4aad72;color:#4aad72}
  .pr-fb button.disliked{border-color:#ff5252;color:#ff5252}

  /* Typing */
  .pr-dots{display:flex;gap:4px;padding:2px 0}
  .pr-dots span{width:6px;height:6px;background:${GOLD};border-radius:50%;animation:pr-db .8s ease-in-out infinite}
  .pr-dots span:nth-child(2){animation-delay:.15s}
  .pr-dots span:nth-child(3){animation-delay:.3s}
  @keyframes pr-db{0%,80%,100%{transform:scale(.6);opacity:.3}40%{transform:scale(1);opacity:1}}

  /* Input */
  .pr-ia{padding:10px 12px;border-top:1px solid rgba(200,146,10,.1);background:#0a1209;flex-shrink:0}
  .pr-ir{display:flex;gap:7px;align-items:flex-end}
  #pr-ti{flex:1;background:rgba(255,255,255,.05);border:1px solid rgba(200,146,10,.2);border-radius:13px;padding:9px 12px;font-size:13px;color:#e8edd4;resize:none;outline:none;font-family:inherit;max-height:100px;line-height:1.4;scrollbar-width:none;transition:border-color .2s}
  #pr-ti:focus{border-color:rgba(200,146,10,.5)}
  #pr-ti::placeholder{color:rgba(255,255,255,.2)}
  #pr-ti::-webkit-scrollbar{display:none}
  #pr-voice{background:none;border:1px solid rgba(200,146,10,.2);border-radius:50%;width:35px;height:35px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .2s}
  #pr-voice:hover{border-color:rgba(200,146,10,.5)}
  #pr-voice svg{width:15px;height:15px;fill:rgba(255,255,255,.35)}
  #pr-voice.rec{border-color:#ff5252;animation:pr-rec .8s ease-in-out infinite}
  @keyframes pr-rec{0%,100%{box-shadow:0 0 0 0 rgba(255,82,82,.4)}50%{box-shadow:0 0 0 7px rgba(255,82,82,0)}}
  #pr-sb{width:35px;height:35px;flex-shrink:0;border-radius:50%;background:${GOLD};border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .15s}
  #pr-sb:hover:not(:disabled){transform:scale(1.1)}
  #pr-sb:disabled{opacity:.35;cursor:not-allowed}
  #pr-sb svg{width:15px;height:15px;fill:#1a1a0a}
  .pr-ft{text-align:center;font-size:9px;color:rgba(255,255,255,.12);margin-top:6px;font-family:inherit}

  /* Cart toast */
  .pr-toast{position:fixed;bottom:115px;left:50%;transform:translateX(-50%) translateY(14px);background:${MID_GREEN};border:1px solid ${GOLD};color:#f5d98a;border-radius:9px;padding:8px 18px;font-size:12px;font-weight:600;opacity:0;transition:all .28s;z-index:2147483647;pointer-events:none;font-family:inherit;white-space:nowrap}
  .pr-toast.show{opacity:1;transform:translateX(-50%) translateY(0)}
  `;
  document.head.appendChild(css);

  /* ── DOM — FABs wrapper (side by side) ──────────────── */
  const fabsWrap = document.createElement('div');
  fabsWrap.id = 'pr-fabs';

  // WhatsApp
  const waFab = document.createElement('button');
  waFab.id = 'pr-wa';
  waFab.setAttribute('aria-label','WhatsApp');
  waFab.innerHTML = `<span class="pr-tip">WhatsApp us</span>
    <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;
  waFab.addEventListener('click', () => {
    window.open(`https://wa.me/${WA_NUM}?text=${encodeURIComponent('Namaste! I want to know more about your Himalayan products 🌿')}`, '_blank');
  });

  // AI FAB
  const fab = document.createElement('button');
  fab.id = 'pr-ai-fab';
  fab.setAttribute('aria-label', 'Chat with Pahadi_AI');
  fab.innerHTML = `<img class="pr-fi" src="${AI_CFG.avatar}" alt="AI"><span class="pr-fc">✕</span><span class="pr-badge" id="pr-badge">1</span>`;

  fabsWrap.appendChild(waFab);
  fabsWrap.appendChild(fab);
  document.body.appendChild(fabsWrap);

  /* ── DOM — Panel ─────────────────────────────────────── */
  const panel = document.createElement('div');
  panel.id = 'pr-panel';
  panel.innerHTML = `
  <div id="pr-drag" title="Drag to resize height"></div>
  <div class="pr-hd">
    <div class="pr-hav"><img src="${AI_CFG.avatar}" alt="AI"></div>
    <div>
      <div class="pr-hn" id="pr-name">${AI_CFG.name}</div>
      <div class="pr-hs"><span class="pr-dot"></span><span id="pr-tagline">${AI_CFG.tagline}</span></div>
    </div>
    <select class="pr-lsel" id="pr-lang">
      <optgroup label="🇮🇳 Indian">
        <option value="en">English</option><option value="hi">हिंदी</option>
        <option value="pa">ਪੰਜਾਬੀ</option><option value="bn">বাংলা</option>
        <option value="ta">தமிழ்</option><option value="te">తెలుగు</option>
        <option value="mr">मराठी</option><option value="gu">ગુજરાતી</option>
        <option value="kn">ಕನ್ನಡ</option><option value="ml">മലയാളം</option>
        <option value="or">ଓଡ଼ିଆ</option><option value="as">অসমীয়া</option>
        <option value="mai">मैथिली</option><option value="ne">नेपाली</option>
        <option value="kok">कोंकणी</option><option value="doi">डोगरी</option>
        <option value="sa">संस्कृत</option>
      </optgroup>
      <optgroup label="🌍 Global">
        <option value="zh">中文</option><option value="ja">日本語</option>
        <option value="ko">한국어</option><option value="ar">العربية</option>
        <option value="fr">Français</option><option value="de">Deutsch</option>
        <option value="es">Español</option><option value="pt">Português</option>
        <option value="ru">Русский</option><option value="it">Italiano</option>
        <option value="nl">Nederlands</option><option value="tr">Türkçe</option>
        <option value="vi">Tiếng Việt</option><option value="th">ภาษาไทย</option>
        <option value="id">Bahasa Indonesia</option>
      </optgroup>
    </select>
  </div>
  <div class="pr-chips" id="pr-chips">
    <div class="pr-chip" data-q="Best honey recommendation?">🍯 Best honey</div>
    <div class="pr-chip" data-q="Show products under ₹500">💰 Under ₹500</div>
    <div class="pr-chip" data-q="Benefits of A2 Bilona Ghee?">🧈 Ghee benefits</div>
    <div class="pr-chip" data-q="How to identify genuine Kashmiri saffron?">🌸 Real saffron?</div>
    <div class="pr-chip" data-q="Delivery time and shipping details?">🚚 Delivery?</div>
    <div class="pr-chip" data-q="Gift ideas from Himachal Pradesh?">🎁 Gift ideas</div>
    <div class="pr-chip" data-q="Tell me about Himachal Pradesh and its products">🏔️ Himachal</div>
    <div class="pr-chip" data-q="What superfoods grow in the Himalayas?">🌿 Superfoods</div>
  </div>
  <div class="pr-msgs" id="pr-msgs"></div>
  <div class="pr-ia">
    <div class="pr-ir">
      <button id="pr-voice" title="Voice input">
        <svg viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1 1.93c-3.94-.49-7-3.85-7-7.93H2c0 4.57 3.13 8.37 7.26 9.58V21h5.48v-3.42C18.87 16.37 22 12.57 22 8h-2c0 4.08-3.06 7.44-7 7.93V15.93z"/></svg>
      </button>
      <textarea id="pr-ti" rows="1" placeholder="Ask anything — products, Himachal, health tips…"></textarea>
      <button id="pr-sb" aria-label="Send">
        <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
      </button>
    </div>
    <div class="pr-ft">Pahadi Roots AI · Himalayan Guide</div>
  </div>`;
  document.body.appendChild(panel);

  const toast = document.createElement('div');
  toast.className = 'pr-toast';
  document.body.appendChild(toast);

  /* ── DRAG-TO-RESIZE (top bar — height only) ──────────── */
  const dragBar = document.getElementById('pr-drag');
  let dragging=false, dY0=0, dH0=0;
  dragBar.addEventListener('mousedown', e => {
    dragging=true; dY0=e.clientY; dH0=panel.offsetHeight;
    document.body.style.userSelect='none'; e.preventDefault();
  });
  document.addEventListener('mousemove', e => {
    if(!dragging) return;
    const newH = Math.min(Math.max(dH0 + (dY0 - e.clientY), 380), window.innerHeight * 0.9);
    panel.style.height = newH + 'px';
  });
  document.addEventListener('mouseup', () => { if(dragging){dragging=false; document.body.style.userSelect='';} });
  // Touch
  dragBar.addEventListener('touchstart', e => { const t=e.touches[0]; dragging=true; dY0=t.clientY; dH0=panel.offsetHeight; },{passive:true});
  document.addEventListener('touchmove', e => { if(!dragging) return; const dY=dY0-e.touches[0].clientY; panel.style.height=Math.min(Math.max(dH0+dY,380),window.innerHeight*.9)+'px'; },{passive:true});
  document.addEventListener('touchend', () => { dragging=false; });

  /* ── STATE ───────────────────────────────────────────── */
  let isOpen=false, isThinking=false, history=[], lang='en', isRec=false, rec=null;
  const msgs  = document.getElementById('pr-msgs');
  const input = document.getElementById('pr-ti');
  const sb    = document.getElementById('pr-sb');
  const voice = document.getElementById('pr-voice');
  const langSel = document.getElementById('pr-lang');

  /* ── LANGUAGE SELECTOR ───────────────────────────────── */
  // Map language code to BCP-47 for Gemini + voice
  const LANG_NAMES = {
    en:'English',hi:'Hindi — हिंदी',pa:'Punjabi — ਪੰਜਾਬੀ',bn:'Bengali — বাংলা',
    ta:'Tamil — தமிழ்',te:'Telugu — తెలుగు',mr:'Marathi — मराठी',gu:'Gujarati — ગુજરાતી',
    kn:'Kannada — ಕನ್ನಡ',ml:'Malayalam — മലയാളം',or:'Odia — ଓଡ଼ିଆ',as:'Assamese — অসমীয়া',
    mai:'Maithili — मैथिली',ne:'Nepali — नेपाली',kok:'Konkani — कोंकणी',doi:'Dogri — डोगरी',sa:'Sanskrit — संस्कृत',
    zh:'Chinese',ja:'Japanese',ko:'Korean',ar:'Arabic',fr:'French',de:'German',
    es:'Spanish',pt:'Portuguese',ru:'Russian',it:'Italian',nl:'Dutch',tr:'Turkish',
    vi:'Vietnamese',th:'Thai',id:'Indonesian',
  };
  const VOICE_MAP = {
    en:'en-IN',hi:'hi-IN',pa:'pa-IN',bn:'bn-IN',ta:'ta-IN',te:'te-IN',
    mr:'mr-IN',gu:'gu-IN',kn:'kn-IN',ml:'ml-IN',or:'or-IN',as:'as-IN',
    ne:'ne-NP',zh:'zh-CN',ja:'ja-JP',ko:'ko-KR',ar:'ar-SA',fr:'fr-FR',
    de:'de-DE',es:'es-ES',pt:'pt-BR',ru:'ru-RU',it:'it-IT',tr:'tr-TR',
    vi:'vi-VN',th:'th-TH',id:'id-ID',
  };

  langSel.addEventListener('change', function() {
    lang = this.value;
    // Update placeholder based on lang
    const placeholders = {
      hi:'कुछ भी पूछें — उत्पाद, हिमाचल, स्वास्थ्य…',
      pa:'ਕੁਝ ਵੀ ਪੁੱਛੋ — ਉਤਪਾਦ, ਹਿਮਾਚਲ, ਸਿਹਤ…',
      bn:'যেকোনো কিছু জিজ্ঞেস করুন…',
      ta:'எதையும் கேளுங்கள்…',
      te:'ఏమైనా అడగండి…',
      mr:'काहीही विचारा — उत्पादने, हिमाचल…',
      gu:'કંઈ પણ પૂછો — ઉત્પાદનો, હિમાચલ…',
    };
    input.placeholder = placeholders[lang] || 'Ask anything — products, Himachal, health tips…';
  });

  /* ── TOGGLE ──────────────────────────────────────────── */
  fab.addEventListener('click', () => {
    isOpen = !isOpen;
    fab.classList.toggle('open', isOpen);
    panel.classList.toggle('open', isOpen);
    const b = document.getElementById('pr-badge');
    if(b) b.remove();
    if(isOpen && !msgs.children.length) welcome();
    if(isOpen) setTimeout(() => input.focus(), 300);
  });
  document.addEventListener('click', e => {
    if(isOpen && !panel.contains(e.target) && !fab.contains(e.target) && !fabsWrap.contains(e.target)){
      isOpen=false; fab.classList.remove('open'); panel.classList.remove('open');
    }
  });
  panel.querySelectorAll('.pr-chip').forEach(c => {
    c.addEventListener('click', () => { send(c.dataset.q); document.getElementById('pr-chips').style.display='none'; });
  });

  /* ── WELCOME ─────────────────────────────────────────── */
  function welcome() {
    const w = {
      en:`🙏 Namaste! I'm **${AI_CFG.name}** — your Himalayan guide!\n\nI can help you with:\n• Our pure Himalayan products & health benefits\n• Himachal Pradesh, Kashmir & Northeast India info\n• Budget-based product recommendations\n• Stories about mountain farming communities\n\nWhat would you like to know?`,
      hi:`🙏 नमस्ते! मैं **${AI_CFG.name}** हूँ — आपका Himalayan guide!\n\nमैं इनमें मदद कर सकता हूँ:\n• हमारे शुद्ध Himalayan उत्पाद और उनके फायदे\n• हिमाचल प्रदेश, कश्मीर और पूर्वोत्तर भारत की जानकारी\n• Budget के अनुसार product suggestions\n\nआज क्या जानना है आपको?`,
      pa:`🙏 ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ **${AI_CFG.name}** ਹਾਂ — ਤੁਹਾਡਾ Himalayan guide!\n\nਦੱਸੋ ਕੀ ਚਾਹੀਦਾ ਹੈ — ਉਤਪਾਦ, ਹਿਮਾਚਲ ਬਾਰੇ ਜਾਣਕਾਰੀ ਜਾਂ ਕੁਝ ਹੋਰ?`,
    };
    addMsg('bot', w[lang] || w.en, [], true);
  }

  /* ── ADD MESSAGE ─────────────────────────────────────── */
  function addMsg(role, text, products=[], skipHistory=false) {
    const wrap = document.createElement('div');
    wrap.className = `pr-m ${role==='user'?'u':'b'}`;
    const av = document.createElement('div'); av.className='pr-mav';
    if(role==='user') av.textContent='👤';
    else av.innerHTML=`<img src="${AI_CFG.avatar}" alt="AI">`;
    const bbl = document.createElement('div'); bbl.className='pr-mb';
    bbl.innerHTML = text
      .replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')
      .replace(/\n•/g,'<br>•')
      .replace(/\n/g,'<br>');

    if(products.length) {
      const pc = document.createElement('div'); pc.className='pr-pcs';
      products.forEach(p => {
        pc.innerHTML += `<div class="pr-pc">
          <span class="pr-pce">${p.emoji||'🌿'}</span>
          <div><div class="pr-pcn">${p.name}</div><div class="pr-pcp">₹${p.price} · ${p.variant}</div></div>
          <button class="pr-pcb" onclick="(function(){window.dispatchEvent(new CustomEvent('pr-add-cart',{detail:{id:'${p.id}',name:'${p.name}'}}));var t=document.querySelector('.pr-toast');t.textContent='✅ Added to cart!';t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2500);})()">Add</button>
        </div>`;
      });
      bbl.appendChild(pc);
    }
    wrap.appendChild(av); wrap.appendChild(bbl);
    msgs.appendChild(wrap);

    if(role==='bot' && !skipHistory) {
      const fb = document.createElement('div'); fb.className='pr-fb';
      fb.innerHTML=`<button onclick="this.classList.toggle('liked');this.parentElement.querySelectorAll('button')[1].classList.remove('disliked')">👍</button><button onclick="this.classList.toggle('disliked');this.parentElement.querySelectorAll('button')[0].classList.remove('liked')">👎</button>`;
      msgs.appendChild(fb);
    }
    msgs.scrollTop = msgs.scrollHeight;
    if(!skipHistory) history.push({role:role==='user'?'user':'model', parts:[{text}]});
  }

  function showTyping() {
    const el=document.createElement('div'); el.id='pr-typ'; el.className='pr-m b';
    el.innerHTML=`<div class="pr-mav"><img src="${AI_CFG.avatar}" alt="AI"></div><div class="pr-mb"><div class="pr-dots"><span></span><span></span><span></span></div></div>`;
    msgs.appendChild(el); msgs.scrollTop=msgs.scrollHeight;
  }
  function hideTyping(){const e=document.getElementById('pr-typ');if(e)e.remove();}

  /* ── SEND ────────────────────────────────────────────── */
  async function send(txt) {
    const t = (txt||input.value).trim();
    if(!t||isThinking) return;
    input.value=''; input.style.height='auto';
    addMsg('user', t);
    isThinking=true; sb.disabled=true; showTyping();
    try {
      const r = await getReply(t);
      hideTyping(); addMsg('bot', r.text, r.products||[]);
    } catch(err) {
      hideTyping();
      console.error('[Pahadi_AI]', err);
      // Fallback to demo on error — never show error to user
      const dr = getDemoReply(t);
      addMsg('bot', dr.text, dr.products||[]);
    }
    isThinking=false; sb.disabled=false; input.focus();
  }

  /* ── AI CALL ─────────────────────────────────────────── */
  async function getReply(msg, attempt=1) {
    if(DEMO) return getDemoReply(msg);
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 18000);
      const res = await fetch(EDGE_URL, {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          message: msg,
          history: history.slice(-10),
          mode: 'customer',
          language: lang,
          languageName: LANG_NAMES[lang] || 'English',  // ← send full language name so AI knows exactly
        }),
        signal: ctrl.signal,
      });
      clearTimeout(timer);
      if(!res.ok) throw new Error('HTTP '+res.status);
      const d = await res.json();
      if(!d.reply) throw new Error('Empty');
      return {text: d.reply, products: d.products||[]};
    } catch(e) {
      if(attempt < 2) { await new Promise(r=>setTimeout(r,1200)); return getReply(msg, attempt+1); }
      throw e;
    }
  }

  /* ── DEMO / FALLBACK REPLIES ─────────────────────────── */
  // These are the fallback when API is unavailable
  // They already respond correctly to Himachal/regional queries
  function getDemoReply(t) {
    const l = t.toLowerCase();

    // Himachal & regional info — NO restriction now
    if(l.match(/himachal|shimla|manali|kullu|dharamsala|palampur|kangra|spiti|kinnaur|lahaul/)) return {
      text:`🏔️ **Himachal Pradesh** — Land of the Gods!\n\n**Famous products from Himachal:**\n• 🍯 Wild Honey — from Kullu & Kangra valley flowers\n• 🍵 Kangra Tea — India's finest green & black tea\n• 🍎 Himachali Apples — world-famous from Kinnaur & Shimla\n• 🌿 Medicinal herbs — Brahmi, Ashwagandha from Spiti\n• 🌰 Chilgoza Pine nuts — rare, from Kinnaur forests\n\n**About Himachal:**\nArea: 55,673 km² · Capital: Shimla · 12 districts\nKnown for Himalayan peaks, Buddhist monasteries, apple orchards, and ancient temples.\n\nWould you like to explore our Himachal products?`,
      products:[{id:'h1',name:'Wild Honey',price:499,variant:'500g',emoji:'🍯'},{id:'t1',name:'Kangra Green Tea',price:399,variant:'100g',emoji:'🍵'}]
    };

    if(l.match(/kashmir|saffron|kesar|pampore|dal lake|shikara/)) return {
      text:`🌸 **Kashmir** — Paradise on Earth!\n\n**Famous Kashmir products:**\n• 🌸 Saffron — Pampore is world's saffron capital\n• 🍎 Kashmiri Apples & Walnuts\n• 🌿 Kashmiri Kahwa tea — with saffron & cardamom\n• 🧣 Pashmina wool — finest in the world\n\n**Saffron authenticity test:**\nReal Kashmiri saffron releases golden-yellow colour slowly in warm water. Never bright red instantly.\n\nOur saffron is Grade-A, lab-tested from Pampore.`,
      products:[{id:'s1',name:'Kashmiri Saffron',price:599,variant:'1g',emoji:'🌸'},{id:'s2',name:'Kashmiri Saffron',price:1099,variant:'2g',emoji:'🌸'}]
    };

    if(l.match(/ladakh|leh|shilajit|spiti|zanskar/)) return {
      text:`⚡ **Ladakh** — The Land of High Passes!\n\n**Famous Ladakh products:**\n• ⚡ Shilajit — the "destroyer of weakness", from 16,000ft rocks\n• 🍑 Sea Buckthorn — superfruit, vitamin C powerhouse\n• 🫐 Ladakhi berries — wild, antioxidant-rich\n• 🌾 Black Barley (Tsamphe) — traditional staple\n\n**About Ladakh:**\nHighest cold desert · Avg altitude 3,500m\nHome to ancient Buddhist culture & pristine Himalayan ecosystem.\n\nOur Shilajit is sourced ethically from 16,000+ feet.`,
      products:[{id:'sh1',name:'Ladakhi Shilajit',price:999,variant:'20g resin',emoji:'⚡'}]
    };

    if(l.match(/northeast|assam|meghalaya|nagaland|sikkim|manipur|mizoram|arunachal|tripura/)) return {
      text:`🌿 **Northeast India** — The Eight Sisters!\n\n**Amazing products from Northeast:**\n• ☕ Assam Tea — world's largest tea growing region\n• 🌶️ Bhut Jolokia — Nagaland's ghost chilli, world's hottest\n• 🌿 Lakadong Turmeric — Meghalaya, highest curcumin in world\n• 🍚 Black Rice — Manipur's ancient superfood\n• 🎋 Bamboo Shoot — Mizoram, probiotic & fibre-rich\n• 🫚 Large Cardamom — Sikkim, premium spice\n• 🍚 Joha Rice — Assam's aromatic heritage rice`,
      products:[{id:'bt1',name:'Bhut Jolokia',price:299,variant:'50g',emoji:'🌶️'},{id:'lr1',name:'Lakadong Turmeric',price:299,variant:'200g',emoji:'🌿'},{id:'br1',name:'Black Rice',price:349,variant:'500g',emoji:'🍚'}]
    };

    if(l.match(/honey|शहद/)) return {
      text:`🍯 **Himalayan Wild Honey** — raw, unprocessed, enzyme-rich.\n\nSourced from wildflower fields in Himachal Pradesh. Never heated. No additives or sugar.\n\n**Benefits:**\n• Anti-bacterial & immunity boosting\n• Rich in antioxidants & enzymes\n• Digestive health & energy\n\nFree shipping above ₹799 🚚`,
      products:[{id:'h1',name:'Wild Honey',price:499,variant:'500g',emoji:'🍯'},{id:'h2',name:'Wild Honey',price:899,variant:'1kg',emoji:'🍯'}]
    };

    if(l.match(/ghee|घी/)) return {
      text:`🧈 **A2 Bilona Ghee** — traditional hand-churned ghee from Himalayan desi cows.\n\nMade from A2 milk using the ancient bilona method — slow-churned from cultured curd.\n\n**Benefits:**\n• Easy to digest (butyric acid)\n• Rich in vitamins A, D, E, K\n• Brain health & joint lubrication`,
      products:[{id:'g1',name:'A2 Bilona Ghee',price:749,variant:'500ml',emoji:'🧈'},{id:'g2',name:'A2 Bilona Ghee',price:1399,variant:'1L',emoji:'🧈'}]
    };

    if(l.match(/500|budget|under|cheap|affordable/i)) return {
      text:`💰 **Best products under ₹500:**\n\nAll sourced directly from Himalayan farmers — pure quality at fair prices!`,
      products:[{id:'h1',name:'Wild Honey',price:499,variant:'500g',emoji:'🍯'},{id:'t2',name:'Lakadong Turmeric',price:299,variant:'200g',emoji:'🌿'},{id:'t1',name:'Kangra Green Tea',price:399,variant:'100g',emoji:'🍵'},{id:'c1',name:'Large Cardamom',price:349,variant:'100g',emoji:'🫚'}]
    };

    if(l.match(/deliver|ship|कब|दिन|shipping/)) return {
      text:`🚚 **Delivery Details:**\n\n• Pan India — 4 to 7 business days\n• Free shipping above ₹799\n• Ships within 24hrs of payment\n• SMS + email tracking provided\n• J&K and Northeast covered!`,
      products:[]
    };

    if(l.match(/gift|उपहार/)) return {
      text:`🎁 **Himalayan Gift Ideas:**\n\n🥇 **Premium (₹1500+):** Saffron + A2 Ghee + Wild Honey\n🥈 **Mid-range (₹800–1200):** Shilajit + Honey set\n🥉 **Budget (under ₹500):** Turmeric + Cardamom + Tea trio`,
      products:[{id:'h1',name:'Wild Honey',price:499,variant:'500g',emoji:'🍯'},{id:'s1',name:'Kashmiri Saffron',price:599,variant:'1g',emoji:'🌸'},{id:'sh1',name:'Ladakhi Shilajit',price:999,variant:'20g',emoji:'⚡'}]
    };

    if(l.match(/superfood|healthy|health|immunity|energy|weight/i)) return {
      text:`🌿 **Top Himalayan Superfoods for Health:**\n\n⚡ **Energy & Stamina:** Shilajit, Wild Honey\n🛡️ **Immunity:** Lakadong Turmeric, Wild Honey, Black Rice\n🧠 **Brain Health:** A2 Ghee, Saffron\n💪 **Strength:** Shilajit, Joha Rice\n🌸 **Skin & Glow:** Kashmiri Saffron, Turmeric\n🔥 **Metabolism:** Bhut Jolokia, Cardamom, Mustard Oil\n\nWhich health goal can I help you with?`,
      products:[]
    };

    return {
      text:`🌿 Namaste! I can help you with:\n• **Himalayan products** — benefits, sourcing, how to use\n• **Regional info** — Himachal, Kashmir, Ladakh, Northeast\n• **Health goals** — immunity, energy, digestion\n• **Budget filters** — best products in your budget\n• **Delivery & returns**\n\nWhat would you like to know?`,
      products:[]
    };
  }

  /* ── VOICE ───────────────────────────────────────────── */
  voice.addEventListener('click', () => {
    if(!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      addMsg('bot','🎤 Voice input works in Chrome browser. Please type your question!'); return;
    }
    if(isRec){ rec&&rec.stop(); voice.classList.remove('rec'); isRec=false; return; }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    rec = new SR(); rec.lang = VOICE_MAP[lang]||'en-IN'; rec.interimResults=false;
    rec.onresult = e => { input.value=e.results[0][0].transcript; autoR(input); voice.classList.remove('rec'); isRec=false; };
    rec.onerror = () => { voice.classList.remove('rec'); isRec=false; };
    rec.start(); voice.classList.add('rec'); isRec=true;
  });

  input.addEventListener('keydown', e => { if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();} });
  input.addEventListener('input', () => autoR(input));
  sb.addEventListener('click', () => send());
  function autoR(el){ el.style.height='auto'; el.style.height=Math.min(el.scrollHeight,100)+'px'; }

})();
