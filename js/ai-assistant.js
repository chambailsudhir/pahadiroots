/**
 * 5 Pahadi Roots — AI Assistant + WhatsApp Widget v4.1
 * js/ai-assistant.js
 */
(function () {
  'use strict';

  const script   = document.currentScript;
  const EDGE_URL = script?.getAttribute('data-edge-url') || '';
  const WA_NUM   = script?.getAttribute('data-whatsapp') || '919000000000';
  const DEMO     = !EDGE_URL;
  console.log('[Pahadi_AI] Edge URL:', EDGE_URL || 'NOT SET - demo mode');
  console.log('[Pahadi_AI] Demo mode:', DEMO);

  /* ── THEME from site CSS vars ──────────────────────────── */
  const R = getComputedStyle(document.documentElement);
  const DARK_GREEN = (R.getPropertyValue('--g')  || '#1a3a1e').trim();
  const MID_GREEN  = (R.getPropertyValue('--g2') || '#2d5233').trim();
  const GOLD       = (R.getPropertyValue('--gd') || '#c8920a').trim();
  const GOLD2      = (R.getPropertyValue('--gd2')|| '#e8b84b').trim();

  /* ── AI CONFIG ─────────────────────────────────────────── */
  let AI_CFG = {
    name   : 'Pahadi_AI',
    tagline: 'Himalayan Shopping Guide · Online',
    avatar : 'data:image/webp;base64,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',
  };
  try {
    const s = JSON.parse(localStorage.getItem('pahadi_ai_config') || '{}');
    if (s.name)    AI_CFG.name    = s.name;
    if (s.tagline) AI_CFG.tagline = s.tagline;
  } catch(e) {}

  /* ── STYLES ─────────────────────────────────────────────── */
  const css = document.createElement('style');
  css.textContent = `
  #pr-wa {
    position:fixed; right:90px; bottom:30px;
    width:52px; height:52px; border-radius:50%;
    background:#25D366; border:none; cursor:pointer;
    box-shadow:0 4px 16px rgba(37,211,102,.45);
    display:flex; align-items:center; justify-content:center;
    transition:transform .2s cubic-bezier(.34,1.56,.64,1);
    z-index:2147483645; position:fixed;
  }
  #pr-wa:hover { transform:scale(1.1) }
  #pr-wa svg { width:27px; height:27px; fill:#fff }
  .pr-wa-tip {
    position:absolute; bottom:60px; left:50%; transform:translateX(-50%);
    background:rgba(0,0,0,.75); color:#fff; font-size:11px;
    padding:4px 10px; border-radius:7px; white-space:nowrap;
    opacity:0; pointer-events:none; transition:opacity .18s; font-family:inherit;
  }
  #pr-wa:hover .pr-wa-tip { opacity:1 }

  #pr-ai-fab {
    position:fixed; right:24px; bottom:30px;
    width:56px; height:56px; border-radius:50%;
    border:none; cursor:pointer; overflow:hidden;
    display:flex; align-items:center; justify-content:center;
    transition:transform .22s cubic-bezier(.34,1.56,.64,1);
    animation:pr-pulse 3s ease-out infinite;
    z-index:2147483645;
  }
  #pr-ai-fab:hover { transform:scale(1.08) }
  #pr-ai-fab.open  { animation:none }
  #pr-ai-fab img.pr-fi { width:100%; height:100%; object-fit:cover; border-radius:50% }
  #pr-ai-fab .pr-fc { display:none; font-size:20px; color:#fff; font-family:inherit }
  #pr-ai-fab.open .pr-fi { display:none }
  #pr-ai-fab.open .pr-fc { display:block }
  .pr-badge {
    position:absolute; top:-2px; right:-2px;
    background:#ff5252; color:#fff; border-radius:50%;
    width:16px; height:16px; font-size:9px; font-weight:700;
    display:flex; align-items:center; justify-content:center; border:2px solid #fff;
  }
  @keyframes pr-pulse {
    0%   { box-shadow:0 0 0 0 rgba(26,58,30,.55), 0 6px 22px rgba(26,58,30,.5) }
    70%  { box-shadow:0 0 0 12px rgba(26,58,30,0), 0 6px 22px rgba(26,58,30,.5) }
    100% { box-shadow:0 0 0 0 rgba(26,58,30,0), 0 6px 22px rgba(26,58,30,.5) }
  }

  #pr-panel {
    position:fixed; bottom:100px; right:24px;
    width:380px; height:560px;
    min-width:280px; min-height:380px;
    max-width:min(700px,96vw); max-height:92vh;
    overflow:hidden; background:#0c1a0e; border-radius:18px;
    box-shadow:0 24px 72px rgba(0,0,0,.65), 0 0 0 1px rgba(45,82,51,.3);
    display:flex; flex-direction:column;
    z-index:2147483644;
    transform:scale(.87) translateY(18px); opacity:0; pointer-events:none;
    transition:transform .28s cubic-bezier(.34,1.2,.64,1), opacity .28s;
  }
  #pr-panel.open { transform:scale(1) translateY(0); opacity:1; pointer-events:all }
  @media(max-width:440px) { #pr-panel { width:calc(100vw - 16px) !important; right:8px; bottom:108px } }

  /* Drag handles */
  #pr-drag {
    height:20px; border-radius:18px 18px 0 0;
    display:flex; align-items:center; justify-content:center;
    cursor:row-resize; flex-shrink:0; user-select:none;
  }
  #pr-drag::before { content:''; width:40px; height:3px; border-radius:3px; background:rgba(255,255,255,.22) }
  #pr-left-edge {
    position:absolute; left:0; top:20px; bottom:0; width:5px;
    cursor:ew-resize; z-index:10; border-radius:18px 0 0 18px;
  }
  #pr-left-edge:hover { background:rgba(200,146,10,.2) }
  #pr-bottom-edge {
    position:absolute; left:5px; right:0; bottom:0; height:5px;
    cursor:ns-resize; z-index:10;
  }
  #pr-bottom-edge:hover { background:rgba(200,146,10,.15) }

  .pr-hd {
    padding:11px 14px; display:flex; align-items:center; gap:10px; flex-shrink:0;
    border-bottom:1px solid rgba(200,146,10,.18);
  }
  .pr-hav { width:40px; height:40px; border-radius:50%; overflow:hidden; flex-shrink:0; }
  .pr-hav img { width:100%; height:100%; object-fit:cover }
  .pr-hn { font-size:14px; font-weight:700; color:#f0ede0; line-height:1.2; font-family:inherit }
  .pr-hs { font-size:10px; font-family:inherit }
  .pr-dot { width:7px; height:7px; border-radius:50%; background:#4aad72; display:inline-block; margin-right:4px; animation:pr-blink 2s ease-in-out infinite }
  @keyframes pr-blink { 0%,100%{opacity:1} 50%{opacity:.3} }
  .pr-lsel {
    margin-left:auto; border-radius:7px; padding:4px 6px;
    font-size:10.5px; cursor:pointer; outline:none;
    max-width:96px; font-family:inherit; flex-shrink:0;
  }

  .pr-chips { padding:7px 10px; display:flex; gap:5px; overflow-x:auto; flex-shrink:0; scrollbar-width:none; border-bottom:1px solid rgba(200,146,10,.1) }
  .pr-chips::-webkit-scrollbar { display:none }
  .pr-chip { white-space:nowrap; border-radius:12px; padding:4px 10px; font-size:11px; cursor:pointer; transition:all .15s; flex-shrink:0; font-family:inherit; border:1px solid rgba(200,146,10,.22); background:rgba(200,146,10,.1) }

  .pr-msgs { flex:1; overflow-y:auto; padding:12px; display:flex; flex-direction:column; gap:10px; scrollbar-width:thin; scrollbar-color:rgba(200,146,10,.15) transparent }
  .pr-msgs::-webkit-scrollbar { width:3px }
  .pr-msgs::-webkit-scrollbar-thumb { background:rgba(200,146,10,.15); border-radius:3px }
  .pr-m { display:flex; gap:7px; align-items:flex-end; animation:pr-in .25s ease-out }
  @keyframes pr-in { from{opacity:0;transform:translateY(7px)} to{opacity:1;transform:translateY(0)} }
  .pr-m.u { flex-direction:row-reverse }
  .pr-mav { width:28px; height:28px; border-radius:50%; flex-shrink:0; overflow:hidden; display:flex; align-items:center; justify-content:center }
  .pr-m.b .pr-mav img { width:100%; height:100%; object-fit:cover; border-radius:50% }
  .pr-m.u .pr-mav { background:rgba(255,255,255,.1); font-size:13px }
  .pr-mb { max-width:82%; padding:9px 13px; border-radius:15px; font-size:13px; line-height:1.55; font-family:inherit }
  .pr-m.b .pr-mb { background:#152018; color:#e8edd4; border:1px solid rgba(200,146,10,.1); border-bottom-left-radius:4px }
  .pr-m.u .pr-mb { border-bottom-right-radius:4px; color:#fff }

  .pr-pcs { display:flex; flex-direction:column; gap:6px; margin-top:8px }
  .pr-pc { background:rgba(0,0,0,.25); border:1px solid rgba(200,146,10,.18); border-radius:9px; padding:8px 10px; display:flex; align-items:center; gap:8px }
  .pr-pce { font-size:20px; flex-shrink:0 }
  .pr-pcn { font-size:12px; color:#e8edd4; font-weight:600; line-height:1.3 }
  .pr-pcp { font-size:11px; margin-top:1px }
  .pr-pcb { margin-left:auto; border:none; border-radius:6px; padding:4px 9px; font-size:11px; cursor:pointer; font-weight:700; flex-shrink:0; transition:transform .15s; font-family:inherit }
  .pr-pcb:hover { transform:scale(1.05) }

  .pr-fb { display:flex; gap:4px; padding-left:35px; margin-top:2px }
  .pr-fb button { background:none; border:1px solid rgba(255,255,255,.1); border-radius:5px; padding:2px 7px; font-size:11px; color:rgba(255,255,255,.3); cursor:pointer; transition:all .15s; font-family:inherit }
  .pr-fb button.liked { border-color:#4aad72; color:#4aad72 }
  .pr-fb button.disliked { border-color:#ff5252; color:#ff5252 }

  .pr-dots { display:flex; gap:4px; padding:2px 0 }
  .pr-dots span { width:6px; height:6px; border-radius:50%; animation:pr-db .8s ease-in-out infinite }
  .pr-dots span:nth-child(2) { animation-delay:.15s }
  .pr-dots span:nth-child(3) { animation-delay:.3s }
  @keyframes pr-db { 0%,80%,100%{transform:scale(.6);opacity:.3} 40%{transform:scale(1);opacity:1} }

  .pr-ia { padding:10px 12px; border-top:1px solid rgba(200,146,10,.1); background:#0a1209; flex-shrink:0 }
  .pr-ir { display:flex; gap:7px; align-items:flex-end }
  #pr-ti { flex:1; background:rgba(255,255,255,.05); border:1px solid rgba(200,146,10,.2); border-radius:13px; padding:9px 12px; font-size:13px; color:#e8edd4; resize:none; outline:none; font-family:inherit; max-height:100px; line-height:1.4; scrollbar-width:none; transition:border-color .2s }
  #pr-ti:focus { border-color:rgba(200,146,10,.5) }
  #pr-ti::placeholder { color:rgba(255,255,255,.2) }
  #pr-ti::-webkit-scrollbar { display:none }
  #pr-voice { background:none; border:1px solid rgba(200,146,10,.2); border-radius:50%; width:35px; height:35px; cursor:pointer; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:all .2s }
  #pr-voice svg { width:15px; height:15px }
  #pr-voice.rec { border-color:#ff5252; animation:pr-rec .8s ease-in-out infinite }
  @keyframes pr-rec { 0%,100%{box-shadow:0 0 0 0 rgba(255,82,82,.4)} 50%{box-shadow:0 0 0 7px rgba(255,82,82,0)} }
  #pr-sb { width:35px; height:35px; flex-shrink:0; border-radius:50%; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:transform .15s }
  #pr-sb:hover:not(:disabled) { transform:scale(1.1) }
  #pr-sb:disabled { opacity:.35; cursor:not-allowed }
  #pr-sb svg { width:15px; height:15px }
  .pr-ft { text-align:center; font-size:9px; color:rgba(255,255,255,.12); margin-top:6px; font-family:inherit }

  .pr-toast { position:fixed; bottom:115px; left:50%; transform:translateX(-50%) translateY(14px); border-radius:9px; padding:8px 18px; font-size:12px; font-weight:600; opacity:0; transition:all .28s; z-index:2147483647; pointer-events:none; font-family:inherit; white-space:nowrap }
  .pr-toast.show { opacity:1; transform:translateX(-50%) translateY(0) }
  `;
  document.head.appendChild(css);

  /* ── Apply theme colors via JS (avoids CSS template issues) ── */
  function applyTheme() {
    // AI FAB background
    document.getElementById('pr-ai-fab').style.background = DARK_GREEN;
    document.getElementById('pr-ai-fab').style.boxShadow = '0 6px 22px rgba(26,58,30,.5)';
    // Panel header gradient
    const hd = document.querySelector('.pr-hd');
    if(hd) hd.style.background = 'linear-gradient(135deg,' + DARK_GREEN + ',' + MID_GREEN + ')';
    // Drag bar
    const drag = document.getElementById('pr-drag');
    if(drag) drag.style.background = 'linear-gradient(135deg,' + DARK_GREEN + ',' + MID_GREEN + ')';
    // Chips color
    document.querySelectorAll('.pr-chip').forEach(c => { c.style.color = GOLD2; });
    // Lang select
    const lsel = document.getElementById('pr-lang');
    if(lsel){ lsel.style.background = 'rgba(0,0,0,.3)'; lsel.style.border = '1px solid ' + GOLD + '33'; lsel.style.color = GOLD2; }
    // Tagline color
    const hs = document.querySelector('.pr-hs');
    if(hs) hs.style.color = GOLD2;
    // Send button
    const sb = document.getElementById('pr-sb');
    if(sb){ sb.style.background = GOLD; }
    const sbSvg = sb ? sb.querySelector('svg') : null;
    if(sbSvg) sbSvg.style.fill = '#1a1a0a';
    // Voice icon
    const vSvg = document.querySelector('#pr-voice svg');
    if(vSvg) vSvg.style.fill = 'rgba(255,255,255,.35)';
    // Dots color
    document.querySelectorAll('.pr-dots span').forEach(s => s.style.background = GOLD);
    // Product add button
    document.querySelectorAll('.pr-pcb').forEach(b => { b.style.background = GOLD; b.style.color = '#1a1a0a'; });
    // Toast colors
    const toast = document.querySelector('.pr-toast');
    if(toast){ toast.style.background = MID_GREEN; toast.style.border = '1px solid ' + GOLD; toast.style.color = GOLD2; }
    // User bubble
    document.querySelectorAll('.pr-m.u .pr-mb').forEach(b => b.style.background = 'linear-gradient(135deg,' + MID_GREEN + ',#3d6b42)');
  }

  /* ── DOM — WhatsApp button ──────────────────────────── */
  const waBtn = document.createElement('button');
  waBtn.id = 'pr-wa';
  waBtn.setAttribute('aria-label', 'WhatsApp');
  waBtn.innerHTML = '<span class="pr-wa-tip">WhatsApp us</span><svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
  waBtn.addEventListener('click', () => {
    window.open('https://wa.me/' + WA_NUM + '?text=' + encodeURIComponent('Namaste! I want to know more about your Himalayan products'), '_blank');
  });
  document.body.appendChild(waBtn);

  /* ── DOM — AI FAB ───────────────────────────────────── */
  const fab = document.createElement('button');
  fab.id = 'pr-ai-fab';
  fab.setAttribute('aria-label', 'Chat with Pahadi_AI');
  fab.innerHTML = '<img class="pr-fi" src="' + AI_CFG.avatar + '" alt="AI"><span class="pr-fc">✕</span><span class="pr-badge" id="pr-badge">1</span>';
  document.body.appendChild(fab);

  /* ── DOM — Panel ────────────────────────────────────── */
  const panel = document.createElement('div');
  panel.id = 'pr-panel';
  panel.innerHTML = '<div id="pr-left-edge"></div><div id="pr-bottom-edge"></div><div id="pr-drag"></div>'
    + '<div class="pr-hd">'
    + '<div class="pr-hav"><img src="' + AI_CFG.avatar + '" alt="AI"></div>'
    + '<div><div class="pr-hn" id="pr-name">' + AI_CFG.name + '</div>'
    + '<div class="pr-hs"><span class="pr-dot"></span><span id="pr-tagline">' + AI_CFG.tagline + '</span></div></div>'
    + '<select class="pr-lsel" id="pr-lang">'
    + '<optgroup label="Indian"><option value="en">English</option><option value="hi">हिंदी</option>'
    + '<option value="pa">ਪੰਜਾਬੀ</option><option value="bn">বাংলা</option>'
    + '<option value="ta">தமிழ்</option><option value="te">తెలుగు</option>'
    + '<option value="mr">मराठी</option><option value="gu">ગુજરાતી</option>'
    + '<option value="kn">ಕನ್ನಡ</option><option value="ml">മലയാളം</option>'
    + '<option value="or">ଓଡ଼ିଆ</option><option value="as">অসমীয়া</option>'
    + '<option value="mai">मैथिली</option><option value="ne">नेपाली</option>'
    + '<option value="doi">डोगरी</option><option value="sa">संस्कृत</option></optgroup>'
    + '<optgroup label="Global"><option value="zh">中文</option><option value="ja">日本語</option>'
    + '<option value="ko">한국어</option><option value="ar">العربية</option>'
    + '<option value="fr">Français</option><option value="de">Deutsch</option>'
    + '<option value="es">Español</option><option value="pt">Português</option>'
    + '<option value="ru">Русский</option><option value="it">Italiano</option>'
    + '<option value="tr">Türkçe</option><option value="vi">Tiếng Việt</option>'
    + '<option value="th">ภาษาไทย</option><option value="id">Bahasa Indonesia</option></optgroup>'
    + '</select></div>'
    + '<div class="pr-chips" id="pr-chips">'
    + '<div class="pr-chip" data-q="Best honey recommendation?">🍯 Best honey</div>'
    + '<div class="pr-chip" data-q="Show products under 500 rupees">💰 Under ₹500</div>'
    + '<div class="pr-chip" data-q="Benefits of A2 Bilona Ghee?">🧈 Ghee benefits</div>'
    + '<div class="pr-chip" data-q="How to identify genuine Kashmiri saffron?">🌸 Real saffron?</div>'
    + '<div class="pr-chip" data-q="Delivery time and shipping details?">🚚 Delivery?</div>'
    + '<div class="pr-chip" data-q="Gift ideas from Himachal Pradesh?">🎁 Gift ideas</div>'
    + '<div class="pr-chip" data-q="Tell me about Himachal Pradesh and its famous products">🏔️ Himachal</div>'
    + '<div class="pr-chip" data-q="What superfoods grow in the Himalayas?">🌿 Superfoods</div>'
    + '</div>'
    + '<div class="pr-msgs" id="pr-msgs"></div>'
    + '<div class="pr-ia"><div class="pr-ir">'
    + '<button id="pr-voice" title="Voice input"><svg viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1 1.93c-3.94-.49-7-3.85-7-7.93H2c0 4.57 3.13 8.37 7.26 9.58V21h5.48v-3.42C18.87 16.37 22 12.57 22 8h-2c0 4.08-3.06 7.44-7 7.93V15.93z"/></svg></button>'
    + '<textarea id="pr-ti" rows="1" placeholder="Ask anything — products, Himachal, health tips…"></textarea>'
    + '<button id="pr-sb" aria-label="Send"><svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg></button>'
    + '</div><div class="pr-ft">Pahadi Roots AI · Himalayan Guide</div></div>';
  document.body.appendChild(panel);

  const toast = document.createElement('div');
  toast.className = 'pr-toast';
  document.body.appendChild(toast);

  /* Apply theme after DOM is ready */
  setTimeout(applyTheme, 50);

  /* ── RESIZE HANDLES ─────────────────────────────────── */
  const dragBar    = document.getElementById('pr-drag');
  const leftEdge   = document.getElementById('pr-left-edge');
  const bottomEdge = document.getElementById('pr-bottom-edge');
  let resizing=false, resizeType='', rX0=0, rY0=0, rW0=0, rH0=0;

  function startResize(type, e) {
    resizing=true; resizeType=type;
    rX0=e.clientX; rY0=e.clientY;
    rW0=panel.offsetWidth; rH0=panel.offsetHeight;
    document.body.style.userSelect='none';
    document.body.style.cursor = type==='left' ? 'ew-resize' : type==='bottom' ? 'ns-resize' : 'row-resize';
    e.preventDefault();
  }
  dragBar.addEventListener('mousedown',    function(e){ startResize('top',    e); });
  leftEdge.addEventListener('mousedown',   function(e){ startResize('left',   e); });
  bottomEdge.addEventListener('mousedown', function(e){ startResize('bottom', e); });

  document.addEventListener('mousemove', function(e) {
    if (!resizing) return;
    var maxW = Math.min(700, window.innerWidth * 0.96);
    var maxH = window.innerHeight * 0.92;
    if (resizeType === 'top') {
      panel.style.height = Math.min(Math.max(rH0 + (rY0 - e.clientY), 380), maxH) + 'px';
    }
    if (resizeType === 'left') {
      panel.style.width = Math.min(Math.max(rW0 + (rX0 - e.clientX), 280), maxW) + 'px';
    }
    if (resizeType === 'bottom') {
      panel.style.height = Math.min(Math.max(rH0 - (rY0 - e.clientY), 380), maxH) + 'px';
    }
  });
  document.addEventListener('mouseup', function() {
    if (resizing) { resizing=false; document.body.style.userSelect=''; document.body.style.cursor=''; }
  });
  /* Touch - top bar */
  dragBar.addEventListener('touchstart', function(e){ var t=e.touches[0]; resizing=true; resizeType='top'; rY0=t.clientY; rH0=panel.offsetHeight; },{passive:true});
  leftEdge.addEventListener('touchstart', function(e){ var t=e.touches[0]; resizing=true; resizeType='left'; rX0=t.clientX; rW0=panel.offsetWidth; },{passive:true});
  document.addEventListener('touchmove', function(e) {
    if (!resizing) return;
    var t=e.touches[0];
    if (resizeType==='top')  panel.style.height = Math.min(Math.max(rH0+(rY0-t.clientY),380),window.innerHeight*.9)+'px';
    if (resizeType==='left') panel.style.width  = Math.min(Math.max(rW0+(rX0-t.clientX),280),700)+'px';
  },{passive:true});
  document.addEventListener('touchend', function(){ resizing=false; });

  /* ── STATE ──────────────────────────────────────────── */
  var isOpen=false, isThinking=false, history=[], lang='en', isRec=false, rec=null;
  var msgs  = document.getElementById('pr-msgs');
  var input = document.getElementById('pr-ti');
  var sb    = document.getElementById('pr-sb');
  var voice = document.getElementById('pr-voice');
  var langSel = document.getElementById('pr-lang');

  var LANG_NAMES = {
    en:'English', hi:'Hindi', pa:'Punjabi', bn:'Bengali', ta:'Tamil', te:'Telugu',
    mr:'Marathi', gu:'Gujarati', kn:'Kannada', ml:'Malayalam', or:'Odia', as:'Assamese',
    mai:'Maithili', ne:'Nepali', doi:'Dogri', sa:'Sanskrit',
    zh:'Chinese', ja:'Japanese', ko:'Korean', ar:'Arabic', fr:'French', de:'German',
    es:'Spanish', pt:'Portuguese', ru:'Russian', it:'Italian', tr:'Turkish',
    vi:'Vietnamese', th:'Thai', id:'Indonesian',
  };

  var VOICE_MAP = {
    en:'en-IN', hi:'hi-IN', pa:'pa-IN', bn:'bn-IN', ta:'ta-IN', te:'te-IN',
    mr:'mr-IN', gu:'gu-IN', kn:'kn-IN', ml:'ml-IN', or:'or-IN', as:'as-IN',
    ne:'ne-NP', zh:'zh-CN', ja:'ja-JP', ko:'ko-KR', ar:'ar-SA', fr:'fr-FR',
    de:'de-DE', es:'es-ES', pt:'pt-BR', ru:'ru-RU', it:'it-IT', tr:'tr-TR',
    vi:'vi-VN', th:'th-TH', id:'id-ID',
  };

  langSel.addEventListener('change', function() {
    lang = this.value;
    var placeholders = {
      hi:'कुछ भी पूछें — उत्पाद, हिमाचल, स्वास्थ्य…',
      pa:'ਕੁਝ ਵੀ ਪੁੱਛੋ — ਉਤਪਾਦ, ਹਿਮਾਚਲ…',
      bn:'যেকোনো কিছু জিজ্ঞেস করুন…',
      ta:'எதையும் கேளுங்கள்…',
      te:'ఏమైనా అడగండి…',
      mr:'काहीही विचारा…',
      gu:'કંઈ પણ પૂછો…',
    };
    input.placeholder = placeholders[lang] || 'Ask anything — products, Himachal, health tips…';
  });

  /* ── TOGGLE ─────────────────────────────────────────── */
  fab.addEventListener('click', function() {
    isOpen = !isOpen;
    fab.classList.toggle('open', isOpen);
    panel.classList.toggle('open', isOpen);
    var b = document.getElementById('pr-badge');
    if (b) b.remove();
    if (isOpen && !msgs.children.length) welcome();
    if (isOpen) setTimeout(function(){ input.focus(); }, 300);
    if (isOpen) setTimeout(applyTheme, 60);
  });
  document.addEventListener('click', function(e) {
    if (isOpen && !panel.contains(e.target) && !fab.contains(e.target)) {
      isOpen=false; fab.classList.remove('open'); panel.classList.remove('open');
    }
  });
  panel.querySelectorAll('.pr-chip').forEach(function(c) {
    c.addEventListener('click', function() {
      send(c.getAttribute('data-q'));
      document.getElementById('pr-chips').style.display='none';
    });
  });

  /* ── WELCOME ────────────────────────────────────────── */
  function welcome() {
    var w = {
      en: '🙏 Namaste! I am **' + AI_CFG.name + '** — your Himalayan guide!\n\nI can help with:\n• Our pure Himalayan products and health benefits\n• Himachal Pradesh, Kashmir, Ladakh, Northeast info\n• Budget-based product recommendations\n• Delivery, returns, gift ideas\n\nWhat would you like to know?',
      hi: '🙏 नमस्ते! मैं **' + AI_CFG.name + '** हूँ — आपका Himalayan guide!\n\nमैं इनमें मदद कर सकता हूँ:\n• शुद्ध Himalayan उत्पाद और उनके फायदे\n• हिमाचल, कश्मीर, लद्दाख की जानकारी\n• Budget के अनुसार product सुझाव\n• Delivery, returns, gift ideas\n\nआज क्या जानना है?',
      pa: '🙏 ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ **' + AI_CFG.name + '** ਹਾਂ — ਤੁਹਾਡਾ Himalayan guide!\n\nਦੱਸੋ ਕੀ ਚਾਹੀਦਾ ਹੈ?',
    };
    addMsg('bot', w[lang] || w.en, [], true);
  }

  /* ── ADD MESSAGE ────────────────────────────────────── */
  function addMsg(role, text, products, skipHistory) {
    products = products || [];
    skipHistory = skipHistory || false;
    var wrap = document.createElement('div');
    wrap.className = 'pr-m ' + (role==='user' ? 'u' : 'b');
    var av = document.createElement('div'); av.className = 'pr-mav';
    if (role==='user') { av.textContent='👤'; }
    else { av.innerHTML='<img src="' + AI_CFG.avatar + '" alt="AI">'; }
    var bbl = document.createElement('div'); bbl.className = 'pr-mb';
    if (role==='user') { bbl.style.background = 'linear-gradient(135deg,' + MID_GREEN + ',#3d6b42)'; }
    bbl.innerHTML = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n•/g, '<br>•')
      .replace(/\n/g, '<br>');

    if (products.length) {
      var pc = document.createElement('div'); pc.className='pr-pcs';
      products.forEach(function(p) {
        var card = document.createElement('div'); card.className='pr-pc';
        card.innerHTML = '<span class="pr-pce">' + (p.emoji||'🌿') + '</span>'
          + '<div><div class="pr-pcn">' + p.name + '</div><div class="pr-pcp" style="color:' + GOLD2 + '">₹' + p.price + ' · ' + p.variant + '</div></div>'
          + '<button class="pr-pcb" style="background:' + GOLD + ';color:#1a1a0a">Add</button>';
        card.querySelector('.pr-pcb').addEventListener('click', function() {
          window.dispatchEvent(new CustomEvent('pr-add-cart', {detail:{id:p.id,name:p.name}}));
          toast.textContent = '✅ ' + p.name + ' added to cart!';
          toast.classList.add('show');
          setTimeout(function(){ toast.classList.remove('show'); }, 2500);
        });
        pc.appendChild(card);
      });
      bbl.appendChild(pc);
    }

    wrap.appendChild(av); wrap.appendChild(bbl);
    msgs.appendChild(wrap);

    if (role==='bot' && !skipHistory) {
      var fb = document.createElement('div'); fb.className='pr-fb';
      fb.innerHTML = '<button>👍</button><button>👎</button>';
      fb.querySelectorAll('button').forEach(function(btn, i) {
        btn.addEventListener('click', function() {
          fb.querySelectorAll('button').forEach(function(b){ b.classList.remove('liked','disliked'); });
          btn.classList.add(i===0 ? 'liked' : 'disliked');
        });
      });
      msgs.appendChild(fb);
    }
    msgs.scrollTop = msgs.scrollHeight;
    if (!skipHistory) history.push({role: role==='user'?'user':'model', parts:[{text:text}]});
  }

  function showTyping() {
    var el=document.createElement('div'); el.id='pr-typ'; el.className='pr-m b';
    el.innerHTML='<div class="pr-mav"><img src="' + AI_CFG.avatar + '" alt="AI"></div>'
      +'<div class="pr-mb" style="background:#152018"><div class="pr-dots">'
      +'<span style="background:' + GOLD + '"></span>'
      +'<span style="background:' + GOLD + '"></span>'
      +'<span style="background:' + GOLD + '"></span>'
      +'</div></div>';
    msgs.appendChild(el); msgs.scrollTop=msgs.scrollHeight;
  }
  function hideTyping(){ var e=document.getElementById('pr-typ'); if(e) e.remove(); }

  /* ── SEND ───────────────────────────────────────────── */
  function send(txt) {
    var t = (txt || input.value).trim();
    if (!t || isThinking) return;
    input.value=''; input.style.height='auto';
    addMsg('user', t);
    isThinking=true; sb.disabled=true; showTyping();
    getReply(t).then(function(r) {
      hideTyping(); addMsg('bot', r.text, r.products||[]);
      isThinking=false; sb.disabled=false; input.focus();
    }).catch(function(err) {
      hideTyping();
      console.error('[Pahadi_AI]', err);
      var dr = getDemoReply(t);
      addMsg('bot', dr.text, dr.products||[]);
      isThinking=false; sb.disabled=false;
    });
  }

  /* ── AI CALL ────────────────────────────────────────── */
  function getReply(msg, attempt) {
    attempt = attempt || 1;
    if (DEMO) return Promise.resolve(getDemoReply(msg));
    var ctrl = new AbortController();
    var timer = setTimeout(function(){ ctrl.abort(); }, 18000);
    return fetch(EDGE_URL, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        message: msg,
        history: history.slice(-10),
        mode: 'customer',
        language: lang,
        languageName: LANG_NAMES[lang] || 'English',
      }),
      signal: ctrl.signal,
    }).then(function(res) {
      clearTimeout(timer);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    }).then(function(d) {
      if (!d.reply) throw new Error('Empty response');
      return {text: d.reply, products: d.products||[]};
    }).catch(function(e) {
      if (attempt < 2) {
        return new Promise(function(r){ setTimeout(r, 1200); }).then(function(){ return getReply(msg, 2); });
      }
      throw e;
    });
  }

  /* ── DEMO REPLIES (with Hindi support) ──────────────── */
  function getDemoReply(t) {
    var l = t.toLowerCase();
    var hi = (lang === 'hi' || lang === 'mai' || lang === 'doi');
    var pa = (lang === 'pa');
    var bn = (lang === 'bn');

    if (l.match(/himachal|shimla|manali|kullu|palampur|kangra|spiti|kinnaur|dharamsala/)) {
      return {
        text: hi
          ? '🏔️ **हिमाचल प्रदेश** — देवताओं की भूमि!\n\n**पालमपुर और हिमाचल के प्रसिद्ध उत्पाद:**\n• 🍵 **कांगड़ा चाय** — पालमपुर भारत की सबसे उत्तम हरी और काली चाय का केंद्र है\n• 🍯 **जंगली शहद** — कुल्लू और कांगड़ा के जंगली फूलों से\n• 🌿 **जड़ी-बूटियां** — ब्राह्मी, अश्वगंधा, तुलसी (स्पीति से)\n• 🍎 **हिमाचली सेब** — किन्नौर और शिमला के विश्व प्रसिद्ध सेब\n• 🌰 **चिलगोज़ा** — किन्नौर के जंगलों का दुर्लभ पाइन नट\n\n**हिमाचल के बारे में:**\nक्षेत्रफल: 55,673 km² · राजधानी: शिमला · 12 जिले\n\nक्या आप हमारे हिमाचल उत्पाद देखना चाहेंगे?'
          : '🏔️ **Himachal Pradesh** — Land of the Gods!\n\n**Best products from Palampur & Himachal:**\n• 🍵 **Kangra Tea** — Palampur is India finest green & black tea region\n• 🍯 **Wild Honey** — from Kullu & Kangra valley wildflowers\n• 🌿 **Medicinal herbs** — Brahmi, Ashwagandha from Spiti\n• 🍎 **Himachali Apples** — world-famous from Kinnaur and Shimla\n• 🌰 **Chilgoza Pine nuts** — rare, from Kinnaur forests\n\n**About Himachal:**\nArea: 55,673 km² · Capital: Shimla · 12 districts',
        products: [{id:'t1',name:'Kangra Green Tea',price:399,variant:'100g',emoji:'🍵'},{id:'h1',name:'Wild Honey',price:499,variant:'500g',emoji:'🍯'}]
      };
    }
    if (l.match(/honey|शहद|madh/)) {
      return {
        text: hi
          ? '🍯 **हिमालयी जंगली शहद** — कच्चा, अनप्रोसेस्ड, एंजाइम से भरपूर!\n\nहिमाचल प्रदेश की जंगली घाटियों से। कभी गर्म नहीं किया जाता।\n\n**फायदे:**\n• एंटी-बैक्टीरियल और इम्यूनिटी बूस्टर\n• एंटीऑक्सिडेंट और एंजाइम से भरपूर\n• पाचन और ऊर्जा के लिए बेहतरीन\n\n₹799 से ऊपर free shipping 🚚'
          : '🍯 **Himalayan Wild Honey** — raw, unprocessed, enzyme-rich!\n\nFrom wildflower fields in Himachal Pradesh. Never heated. No additives.\n\n**Benefits:** Anti-bacterial · Immunity · Digestion\n\nFree shipping above ₹799 🚚',
        products: [{id:'h1',name:'Wild Honey',price:499,variant:'500g',emoji:'🍯'},{id:'h2',name:'Wild Honey',price:899,variant:'1kg',emoji:'🍯'}]
      };
    }
    if (l.match(/ghee|घी/)) {
      return {
        text: hi
          ? '🧈 **A2 बिलोना घी** — पारंपरिक तरीके से हाथ से मथा हुआ।\n\nहिमालयी देसी गाय के A2 दूध से बना।\n\n**फायदे:**\n• आसान पाचन (ब्यूटिरिक एसिड)\n• विटामिन A, D, E, K से भरपूर\n• दिमाग और जोड़ों के लिए फायदेमंद'
          : '🧈 **A2 Bilona Ghee** — traditional hand-churned from Himalayan desi cows.\n\n**Benefits:** Easy digestion · Vitamins A,D,E,K · Brain health',
        products: [{id:'g1',name:'A2 Bilona Ghee',price:749,variant:'500ml',emoji:'🧈'},{id:'g2',name:'A2 Bilona Ghee',price:1399,variant:'1L',emoji:'🧈'}]
      };
    }
    if (l.match(/saffron|kesar|केसर/)) {
      return {
        text: hi
          ? '🌸 **कश्मीरी केसर** — Pampore से, दुनिया का सबसे उत्तम।\n\n**असली केसर पहचानें:** गर्म पानी में डालें — धीरे-धीरे सुनहरा-पीला रंग छोड़े तो असली है।\n\nहमारा केसर Grade-A, lab-certified है।'
          : '🌸 **Kashmiri Saffron** from Pampore — world finest.\n\n**Authenticity test:** In warm water, real saffron releases golden-yellow slowly.\n\nOurs is Grade-A, lab-certified.',
        products: [{id:'s1',name:'Kashmiri Saffron',price:599,variant:'1g',emoji:'🌸'},{id:'s2',name:'Kashmiri Saffron',price:1099,variant:'2g',emoji:'🌸'}]
      };
    }
    if (l.match(/shilajit|शिलाजीत/)) {
      return {
        text: hi
          ? '⚡ **लद्दाखी शिलाजीत** — 16,000 फीट की ऊंचाई से।\n\n• 60%+ Fulvic acid\n• ऊर्जा और शक्ति बढ़ाता है\n• हार्मोन संतुलन\n• इम्यूनिटी और anti-aging\n\nरोज़ सुबह गर्म दूध में मटर के बराबर मात्रा में लें। 💪'
          : '⚡ **Ladakhi Shilajit** from 16,000ft altitude.\n\n• 60%+ Fulvic acid · Energy & stamina · Hormonal balance · Immunity',
        products: [{id:'sh1',name:'Ladakhi Shilajit',price:999,variant:'20g resin',emoji:'⚡'}]
      };
    }
    if (l.match(/500|budget|under|सस्ता|किफायती/i)) {
      return {
        text: hi
          ? '💰 **₹500 से कम के बेहतरीन उत्पाद:**\n\nसीधे हिमालयी किसानों से — शुद्ध गुणवत्ता!'
          : '💰 **Best products under ₹500:**\n\nDirect from Himalayan farmers — pure quality!',
        products: [{id:'h1',name:'Wild Honey',price:499,variant:'500g',emoji:'🍯'},{id:'t2',name:'Lakadong Turmeric',price:299,variant:'200g',emoji:'🌿'},{id:'t1',name:'Kangra Green Tea',price:399,variant:'100g',emoji:'🍵'},{id:'c1',name:'Large Cardamom',price:349,variant:'100g',emoji:'🫚'}]
      };
    }
    if (l.match(/deliver|ship|कब|दिन|डिलीवरी/)) {
      return {
        text: hi
          ? '🚚 **Delivery की जानकारी:**\n\n• पूरे भारत में — 4 से 7 कार्य दिवस\n• ₹799 से ऊपर free shipping\n• Payment के 24 घंटे में ship\n• SMS + email tracking\n• J&K और पूर्वोत्तर में भी!'
          : '🚚 **Delivery Details:**\n\n• Pan India — 4-7 business days · Free shipping above ₹799 · 24hr dispatch · SMS tracking',
        products: []
      };
    }
    if (l.match(/gift|उपहार|तोहफा/)) {
      return {
        text: hi
          ? '🎁 **हिमालयी Gift Ideas:**\n\n🥇 **Premium (₹1500+):** Saffron + A2 Ghee + Wild Honey\n🥈 **Mid-range (₹800-1200):** Shilajit + Honey\n🥉 **Budget (₹500 से कम):** Turmeric + Cardamom + Tea'
          : '🎁 **Himalayan Gift Ideas:**\n\n🥇 Premium (₹1500+): Saffron + Ghee + Honey\n🥈 Mid-range (₹800-1200): Shilajit + Honey\n🥉 Budget (under ₹500): Turmeric + Cardamom + Tea',
        products: [{id:'h1',name:'Wild Honey',price:499,variant:'500g',emoji:'🍯'},{id:'s1',name:'Kashmiri Saffron',price:599,variant:'1g',emoji:'🌸'},{id:'sh1',name:'Ladakhi Shilajit',price:999,variant:'20g',emoji:'⚡'}]
      };
    }
    return {
      text: hi
        ? '🌿 नमस्ते! मैं इनमें मदद कर सकता हूँ:\n• **हिमालयी उत्पाद** — फायदे, sourcing, उपयोग\n• **क्षेत्रीय जानकारी** — हिमाचल, कश्मीर, लद्दाख, पूर्वोत्तर\n• **स्वास्थ्य लक्ष्य** — इम्यूनिटी, ऊर्जा, पाचन\n• **Budget filter** — आपके budget में सबसे अच्छे उत्पाद\n\nआज क्या जानना है आपको?'
        : '🌿 Namaste! I can help with:\n• **Himalayan products** — benefits, sourcing, how to use\n• **Regional info** — Himachal, Kashmir, Ladakh, Northeast\n• **Health goals** — immunity, energy, digestion\n• **Budget filters** — best products in your range\n\nWhat would you like to know?',
      products: []
    };
  }

  /* ── VOICE ──────────────────────────────────────────── */
  voice.addEventListener('click', function() {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      addMsg('bot','🎤 Voice input works in Chrome. Please type your question!'); return;
    }
    if (isRec) { if(rec) rec.stop(); voice.classList.remove('rec'); isRec=false; return; }
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    rec = new SR(); rec.lang = VOICE_MAP[lang]||'en-IN'; rec.interimResults=false;
    rec.onresult = function(e){ input.value=e.results[0][0].transcript; autoR(input); voice.classList.remove('rec'); isRec=false; };
    rec.onerror = function(){ voice.classList.remove('rec'); isRec=false; };
    rec.start(); voice.classList.add('rec'); isRec=true;
  });

  input.addEventListener('keydown', function(e){ if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();} });
  input.addEventListener('input',   function(){ autoR(input); });
  sb.addEventListener('click',      function(){ send(); });
  function autoR(el){ el.style.height='auto'; el.style.height=Math.min(el.scrollHeight,100)+'px'; }

})();
