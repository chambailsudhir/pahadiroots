/**
 * ═══════════════════════════════════════════════════════════════
 * PAHADI BHAI — Embeddable Widget Script
 * Usage: <script src="pahadi-bhai-embed.js" data-edge-url="YOUR_SUPABASE_EDGE_URL"></script>
 * 
 * Drop this ONE script tag before </body> on any page of pahadiroots.com
 * That's all it takes. The widget self-injects.
 * ═══════════════════════════════════════════════════════════════
 */
(function () {
  'use strict';

  const EDGE_URL = document.currentScript?.getAttribute('data-edge-url') || '';
  const CONFIG_URL = document.currentScript?.getAttribute('data-config-url') || '';

  // AI Assistant config — loaded from admin settings or uses defaults
  const AI_CONFIG = {
    name: document.currentScript?.getAttribute('data-name') || '5Roots Guide',
    tagline: document.currentScript?.getAttribute('data-tagline') || 'Himalayan Shopping Guide · Online',
    avatar: document.currentScript?.getAttribute('data-avatar') || '🌿',
    primaryColor: document.currentScript?.getAttribute('data-color') || '#2d7a4f',
  };
  const DEMO_MODE = !EDGE_URL;

  // Inject styles
  const style = document.createElement('style');
  style.textContent = `
  #pb-fab{position:fixed;bottom:24px;right:24px;width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#2d7a4f,#4aad72);border:none;cursor:pointer;z-index:2147483646;box-shadow:0 6px 24px rgba(45,122,79,.5);display:flex;align-items:center;justify-content:center;transition:transform .25s cubic-bezier(.34,1.56,.64,1);animation:pb-pulse 2.5s ease-out infinite;font-family:sans-serif}
  #pb-fab:hover{transform:scale(1.1)}
  #pb-fab.open{animation:none}
  @keyframes pb-pulse{0%{box-shadow:0 0 0 0 rgba(74,173,114,.5),0 6px 24px rgba(45,122,79,.5)}70%{box-shadow:0 0 0 14px rgba(74,173,114,0),0 6px 24px rgba(45,122,79,.5)}100%{box-shadow:0 0 0 0 rgba(74,173,114,0),0 6px 24px rgba(45,122,79,.5)}}
  #pb-fab .pb-icon{font-size:26px;color:#fff;transition:all .2s}
  #pb-fab .pb-close{display:none;font-size:20px;color:#fff}
  #pb-fab.open .pb-icon{display:none}
  #pb-fab.open .pb-close{display:block}
  #pb-fab .pb-badge{position:absolute;top:-3px;right:-3px;background:#ff5252;color:#fff;border-radius:50%;width:18px;height:18px;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;border:2px solid #fff}
  
  #pb-window{position:fixed;bottom:100px;right:20px;width:380px;max-height:580px;background:#0f1f14;border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,.55);z-index:2147483645;display:flex;flex-direction:column;transform:scale(.88) translateY(16px);opacity:0;pointer-events:none;transition:all .28s cubic-bezier(.34,1.2,.64,1);overflow:hidden;border:1px solid rgba(74,173,114,.15)}
  #pb-window.open{transform:scale(1) translateY(0);opacity:1;pointer-events:all}
  @media(max-width:430px){#pb-window{width:calc(100vw - 20px);right:10px;bottom:96px}}
  
  .pb-h{background:linear-gradient(135deg,#1a3a2a,#2d5a3d);padding:16px 18px;display:flex;align-items:center;gap:12px;border-bottom:1px solid rgba(74,173,114,.12)}
  .pb-av{width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,#3d9e61,#6bc98a);display:flex;align-items:center;justify-content:center;font-size:20px;position:relative;flex-shrink:0}
  .pb-av::after{content:'';position:absolute;bottom:2px;right:2px;width:9px;height:9px;background:#4aad72;border-radius:50%;border:2px solid #1a3a2a}
  .pb-hn{font-size:15px;font-weight:700;color:#e8f5ec;line-height:1.2}
  .pb-hs{font-size:10.5px;color:#7ab88a}
  
  .pb-chips{padding:8px 12px;display:flex;gap:6px;overflow-x:auto;scrollbar-width:none}
  .pb-chips::-webkit-scrollbar{display:none}
  .pb-chip{white-space:nowrap;background:rgba(74,173,114,.1);border:1px solid rgba(74,173,114,.22);border-radius:16px;padding:4px 10px;font-size:11px;color:#8dd4a8;cursor:pointer;transition:all .15s;flex-shrink:0}
  .pb-chip:hover{background:rgba(74,173,114,.2);color:#c8efd8}
  
  .pb-msgs{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;scrollbar-width:thin;scrollbar-color:rgba(74,173,114,.15) transparent}
  .pb-msgs::-webkit-scrollbar{width:3px}
  .pb-msgs::-webkit-scrollbar-thumb{background:rgba(74,173,114,.15);border-radius:3px}
  .pb-m{display:flex;gap:7px;align-items:flex-end;animation:pb-mi .25s ease-out}
  @keyframes pb-mi{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
  .pb-m.u{flex-direction:row-reverse}
  .pb-mav{width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;background:linear-gradient(135deg,#2d7a4f,#4aad72)}
  .pb-m.u .pb-mav{background:rgba(255,255,255,.1)}
  .pb-mb{max-width:80%;padding:9px 13px;border-radius:16px;font-size:13px;line-height:1.5}
  .pb-m.b .pb-mb{background:#1a3a2a;color:#d4edda;border:1px solid rgba(74,173,114,.1);border-bottom-left-radius:4px}
  .pb-m.u .pb-mb{background:linear-gradient(135deg,#2d7a4f,#3d9e61);color:#fff;border-bottom-right-radius:4px}
  
  .pb-pcards{display:flex;flex-direction:column;gap:6px;margin-top:7px}
  .pb-pc{background:rgba(0,0,0,.18);border:1px solid rgba(74,173,114,.18);border-radius:10px;padding:8px 10px;display:flex;align-items:center;gap:8px;cursor:pointer;transition:all .15s}
  .pb-pc:hover{background:rgba(74,173,114,.1)}
  .pb-pce{font-size:22px;flex-shrink:0}
  .pb-pcn{font-size:12px;color:#c8efd8;font-weight:600}
  .pb-pcp{font-size:11px;color:#7ab88a;margin-top:1px}
  .pb-pcb{margin-left:auto;background:linear-gradient(135deg,#2d7a4f,#4aad72);color:#fff;border:none;border-radius:6px;padding:4px 9px;font-size:11px;cursor:pointer;font-weight:600;flex-shrink:0}
  
  .pb-td{display:flex;gap:4px;padding:2px 0}
  .pb-td span{width:6px;height:6px;background:#4aad72;border-radius:50%;animation:pb-db .8s ease-in-out infinite}
  .pb-td span:nth-child(2){animation-delay:.15s}
  .pb-td span:nth-child(3){animation-delay:.3s}
  @keyframes pb-db{0%,80%,100%{transform:scale(.65);opacity:.3}40%{transform:scale(1);opacity:1}}
  
  .pb-ia{padding:10px 12px;border-top:1px solid rgba(74,173,114,.1);background:#0c1a10}
  .pb-ir{display:flex;gap:6px;align-items:flex-end}
  #pb-ti{flex:1;background:rgba(255,255,255,.05);border:1px solid rgba(74,173,114,.18);border-radius:14px;padding:9px 12px;font-size:13px;color:#e8f5ec;resize:none;outline:none;font-family:inherit;max-height:100px;line-height:1.4;scrollbar-width:none;transition:border-color .2s}
  #pb-ti:focus{border-color:rgba(74,173,114,.4)}
  #pb-ti::placeholder{color:rgba(255,255,255,.22)}
  #pb-ti::-webkit-scrollbar{display:none}
  #pb-sb{width:38px;height:38px;flex-shrink:0;border-radius:50%;background:linear-gradient(135deg,#2d7a4f,#4aad72);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .15s;font-size:16px}
  #pb-sb:hover:not(:disabled){transform:scale(1.1)}
  #pb-sb:disabled{opacity:.4;cursor:not-allowed}
  .pb-ft{text-align:center;font-size:9.5px;color:rgba(255,255,255,.15);margin-top:6px}
  `;
  document.head.appendChild(style);

  // Create FAB
  const fab = document.createElement('button');
  fab.id = 'pb-fab';
  fab.setAttribute('aria-label', 'Chat with Pahadi Bhai');
  fab.innerHTML = `<span class="pb-icon">🌿</span><span class="pb-close">✕</span><span class="pb-badge">1</span>`;
  document.body.appendChild(fab);

  // Create window
  const win = document.createElement('div');
  win.id = 'pb-window';
  win.setAttribute('role', 'dialog');
  win.innerHTML = `
  <div class="pb-h">
    <div class="pb-av" id="ai-avatar">🌿</div>
    <div>
      <div class="pb-hn" id="ai-name">Loading…</div>
      <div class="pb-hs" id="ai-tagline">Himalayan Shopping Guide · Online</div>
    </div>
    <select id="pb-lang" title="Choose Language" style="margin-left:auto;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:4px 6px;font-size:10.5px;color:#a8d8b8;cursor:pointer;outline:none;max-width:108px">
      <optgroup label="🇮🇳 Indian"><option value="en">English</option><option value="hi">हिंदी</option><option value="pa">ਪੰਜਾਬੀ</option><option value="bn">বাংলা</option><option value="ta">தமிழ்</option><option value="te">తెలుగు</option><option value="mr">मराठी</option><option value="gu">ગુજરાતી</option><option value="kn">ಕನ್ನಡ</option><option value="ml">മലയാളം</option><option value="or">ଓଡ଼ିଆ</option><option value="as">অসমীয়া</option><option value="mai">मैथिली</option><option value="ne">नेपाली</option><option value="kok">कोंकणी</option><option value="doi">डोगरी</option><option value="sa">संस्कृत</option><option value="mni">মৈতৈলোন্</option><option value="brx">बड़ो</option><option value="sat">संताली</option><option value="ks">कॉशुर</option><option value="sd">سنڌي</option></optgroup>
      <optgroup label="🌍 International"><option value="zh">中文</option><option value="ja">日本語</option><option value="ko">한국어</option><option value="ar">العربية</option><option value="fr">Français</option><option value="de">Deutsch</option><option value="es">Español</option><option value="pt">Português</option><option value="ru">Русский</option><option value="it">Italiano</option><option value="nl">Nederlands</option><option value="tr">Türkçe</option><option value="vi">Tiếng Việt</option><option value="th">ภาษาไทย</option><option value="id">Bahasa Indonesia</option><option value="ms">Bahasa Melayu</option><option value="sw">Kiswahili</option><option value="pl">Polski</option><option value="uk">Українська</option><option value="he">עברית</option></optgroup>
    </select>
  </div>
  <div class="pb-chips" id="pb-chips">
    <div class="pb-chip" data-q="Best honey recommendation?">🍯 Best honey</div>
    <div class="pb-chip" data-q="Show me products under ₹500">💰 Under ₹500</div>
    <div class="pb-chip" data-q="What are the benefits of A2 Bilona Ghee?">🧈 Ghee benefits</div>
    <div class="pb-chip" data-q="How to check if saffron is genuine?">🌸 Saffron authentic?</div>
    <div class="pb-chip" data-q="How long does delivery take?">🚚 Delivery time</div>
    <div class="pb-chip" data-q="Suggest a gift idea under ₹1000">🎁 Gift ideas</div>
  </div>
  <div class="pb-msgs" id="pb-msgs"></div>
  <div class="pb-ia">
    <div class="pb-ir">
      <textarea id="pb-ti" rows="1" placeholder="Ask about our Himalayan products…"></textarea>
      <button id="pb-sb" aria-label="Send">➤</button>
    </div>
    <div class="pb-ft">Pahadi Roots AI · Himalayan Shopping Guide</div>
  </div>`;
  document.body.appendChild(win);

  applyConfig();

  let isOpen = false, isThinking = false, history = [], selectedLang = 'en';

  const voiceLangMap = {
    en:'en-IN',hi:'hi-IN',pa:'pa-IN',bn:'bn-IN',ta:'ta-IN',te:'te-IN',
    mr:'mr-IN',gu:'gu-IN',kn:'kn-IN',ml:'ml-IN',or:'or-IN',as:'as-IN',
    ne:'ne-NP',sa:'sa-IN',mai:'hi-IN',kok:'hi-IN',doi:'hi-IN',
    mni:'bn-IN',brx:'hi-IN',sat:'hi-IN',ks:'hi-IN',sd:'hi-IN',
    zh:'zh-CN',ja:'ja-JP',ko:'ko-KR',ar:'ar-SA',fr:'fr-FR',de:'de-DE',
    es:'es-ES',pt:'pt-BR',ru:'ru-RU',it:'it-IT',nl:'nl-NL',tr:'tr-TR',
    vi:'vi-VN',th:'th-TH',id:'id-ID',ms:'ms-MY',sw:'sw-KE',
    pl:'pl-PL',uk:'uk-UA',he:'he-IL',
  };

  // Toggle
  // Apply config to UI — checks localStorage for admin-saved settings
  function applyConfig() {
    // Admin can override name/tagline/avatar from admin panel — stored in localStorage
    try {
      const saved = localStorage.getItem('pahadi_ai_config');
      if (saved) {
        const adminConfig = JSON.parse(saved);
        if (adminConfig.name) AI_CONFIG.name = adminConfig.name;
        if (adminConfig.tagline) AI_CONFIG.tagline = adminConfig.tagline;
        if (adminConfig.avatar) AI_CONFIG.avatar = adminConfig.avatar;
      }
    } catch(e) {}

    const nameEl = document.getElementById('ai-name');
    const tagEl = document.getElementById('ai-tagline');
    const avEl = document.getElementById('ai-avatar');
    if (nameEl) nameEl.textContent = AI_CONFIG.name;
    if (tagEl) tagEl.textContent = AI_CONFIG.tagline;
    if (avEl) avEl.textContent = AI_CONFIG.avatar;
  }

  fab.addEventListener('click', () => {
    isOpen = !isOpen;
    fab.classList.toggle('open', isOpen);
    win.classList.toggle('open', isOpen);
    const badge = fab.querySelector('.pb-badge');
    if (badge) badge.remove();
    if (isOpen && !document.getElementById('pb-msgs').children.length) welcome();
    if (isOpen) setTimeout(() => document.getElementById('pb-ti').focus(), 300);
  });

  // Language select
  document.getElementById('pb-lang').addEventListener('change', function(){ selectedLang = this.value; });

  // Chips
  win.querySelectorAll('.pb-chip').forEach(c => c.addEventListener('click', () => {
    send(c.dataset.q);
    document.getElementById('pb-chips').style.display = 'none';
  }));

  // Input
  const ti = document.getElementById('pb-ti');
  const sb = document.getElementById('pb-sb');
  ti.addEventListener('keydown', e => { if (e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();} });
  ti.addEventListener('input', () => { ti.style.height='auto'; ti.style.height=Math.min(ti.scrollHeight,100)+'px'; });
  sb.addEventListener('click', () => send());

  function welcome() {
    addMsg('bot', `🙏 Namaste! I'm **${AI_CONFIG.name}** — your personal Himalayan shopping guide!\n\nTell me your need or budget, and I'll find the perfect product for you from our pure Himalayan collection.`);
  }

  function addMsg(role, text, products=[]) {
    const msgs = document.getElementById('pb-msgs');
    const m = document.createElement('div');
    m.className = `pb-m ${role==='user'?'u':'b'}`;
    const av = document.createElement('div');
    av.className = 'pb-mav';
    av.textContent = role==='user'?'👤':'🌿';
    const bbl = document.createElement('div');
    bbl.className = 'pb-mb';
    bbl.innerHTML = text.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>');
    if (products.length) {
      const pc = document.createElement('div');
      pc.className = 'pb-pcards';
      products.forEach(p => {
        pc.innerHTML += `<div class="pb-pc" onclick="window.dispatchEvent(new CustomEvent('pb-add-cart',{detail:{id:'${p.id}',name:'${p.name}'}}))">
          <span class="pb-pce">${p.emoji||'🌿'}</span>
          <div><div class="pb-pcn">${p.name}</div><div class="pb-pcp">₹${p.price} · ${p.variant}</div></div>
          <button class="pb-pcb">Add</button></div>`;
      });
      bbl.appendChild(pc);
    }
    m.appendChild(av); m.appendChild(bbl);
    msgs.appendChild(m);
    msgs.scrollTop = msgs.scrollHeight;
    if (role==='user') history.push({role:'user',parts:[{text}]});
    else history.push({role:'model',parts:[{text}]});
  }

  function showTyping() {
    const msgs = document.getElementById('pb-msgs');
    const el = document.createElement('div');
    el.className='pb-m b'; el.id='pb-typ';
    el.innerHTML='<div class="pb-mav">🌿</div><div class="pb-mb"><div class="pb-td"><span></span><span></span><span></span></div></div>';
    msgs.appendChild(el); msgs.scrollTop=msgs.scrollHeight;
  }
  function hideTyping(){const e=document.getElementById('pb-typ');if(e)e.remove();}

  async function send(txt) {
    const t=(txt||ti.value).trim();
    if(!t||isThinking)return;
    ti.value=''; ti.style.height='auto';
    addMsg('user',t); isThinking=true; sb.disabled=true;
    showTyping();
    try{
      const r=await getReply(t);
      hideTyping(); addMsg('bot',r.text,r.products||[]);
    }catch{hideTyping();addMsg('bot','🙏 Small issue — please try again!');}
    isThinking=false; sb.disabled=false;
  }

  async function getReply(msg) {
    if(DEMO_MODE) return getDemoReply(msg);
    const res=await fetch(EDGE_URL,{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({message:msg,history:history.slice(-8),mode:'customer',language:selectedLang})});
    if(!res.ok)throw new Error();
    const d=await res.json();
    return {text:d.reply,products:d.products||[]};
  }

  function getDemoReply(t){
    const l=t.toLowerCase();
    if(l.match(/honey|शहद/))return{text:'🍯 Our **Himalayan Wild Honey** is raw, enzyme-rich, sourced from Himachal Pradesh.\n\nWant to add it to your cart?',products:[{id:'h1',name:'Wild Honey',price:499,variant:'500g',emoji:'🍯'},{id:'h2',name:'Wild Honey',price:899,variant:'1kg',emoji:'🍯'}]};
    if(l.match(/ghee|घी/))return{text:'🧈 **A2 Bilona Ghee** — hand-churned the traditional way from Himalayan desi cows. Rich in butyric acid, easy to digest.',products:[{id:'g1',name:'A2 Bilona Ghee',price:749,variant:'500ml',emoji:'🧈'}]};
    if(l.match(/500|budget|₹.*500|under/))return{text:'💰 **Best products under ₹500:**',products:[{id:'h1',name:'Wild Honey',price:499,variant:'500g',emoji:'🍯'},{id:'t1',name:'Lakadong Turmeric',price:299,variant:'200g',emoji:'🌿'},{id:'c1',name:'Kangra Green Tea',price:399,variant:'100g',emoji:'🍵'}]};
    if(l.match(/deliver|ship/))return{text:'🚚 We deliver across India in **4–7 business days**.\n\nFree shipping on orders above ₹799. You get SMS/email tracking!',products:[]};
    return{text:'🌿 I\'m here to help you find the perfect Himalayan product!\n\nTell me your health goal or budget and I\'ll recommend the best option from our collection.',products:[]};
  }

  // Close on outside click
  document.addEventListener('click', e => {
    if(isOpen && !win.contains(e.target) && !fab.contains(e.target)){
      isOpen=false; fab.classList.remove('open'); win.classList.remove('open');
    }
  });
})();
