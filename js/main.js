// ═══════════════════════════════════════════════════════════════════════
// PAHADI ROOTS — COMPLETE STORE JAVASCRIPT
// All data defined first, then functions, then boot
// ═══════════════════════════════════════════════════════════════════════

// ── FALLBACK DATA ─────────────────────────────────────────────────────
const FALLBACK_STATES = [
  {id:"hp", name:"Himachal Pradesh", emoji:"🏔️", tagline:"Dev Bhoomi",
   panel_bg:"linear-gradient(135deg,#1a3a1e,#2d5233)",
   description:"Himachal Pradesh — Dev Bhoomi, the Land of Gods. Ancient Shiva temples cling to cliff faces above apple orchards that bloom white every spring. The Kangra valley, cradle of a 5,000-year-old civilisation, produces an orthodox tea so delicate it was once reserved for royalty. From Kinnaur's snowbound heights come the rare Chilgoza pine nuts — hand-gathered from ancient forests above 2,500 metres. And wild Himalayan honey, harvested from cliffside rock hives by fearless Gaddi tribesmen, carries the nectar of a hundred mountain wildflowers.",
   pills:["🍎 Apple & ACV","🍯 Pine Honey","🍵 Kangra Tea","🥛 Bilona Ghee","🌰 Chilgoza Nuts"],
   cover_photo_url:"", tab_photo_url:""},
  {id:"uk", name:"Uttarakhand", emoji:"🏔️", tagline:"Dev Bhoomi",
   panel_bg:"linear-gradient(135deg,#1a3a1e,#2d5233)",
   description:"Kumaon and Garhwal — sacred Himalayan land of ancient temples, dense forests, and glacial rivers. The vibrant Garhwali dance tradition in colourful tartan costumes is part of a living culture that also produces wild multifloral honey, deep-red Pahadi rajma, and precious Badri cow ghee from meadows above 3,000 metres.",
   pills:["🍯 Wild Honey","🌾 Pahadi Rajma","🌸 Buransh Juice","🥛 Badri Ghee","🌿 Jakhiya"],
   cover_photo_url:"", tab_photo_url:""},
  {id:"jk", name:"J&K / Kashmir", emoji:"🌷", tagline:"Paradise on Earth",
   panel_bg:"linear-gradient(135deg,#1e3a8a,#2d4fa3)",
   description:"Kashmir — Jannat, as the Mughals called it — where saffron fields turn the Pampore plains a deep violet every October, harvested flower by flower before sunrise. The same hands that embroider intricate Pheran shawls beside the shimmering Dal Lake also tend the ancient walnut orchards of Wular and the almond groves of Pahalgam. Mongra saffron — Grade A, thread by thread — is the world's most precious spice. Kagzi walnuts, with paper-thin shells and a sweet, oily kernel, are prized by pastry chefs from Paris to Mumbai. And Kahwa, brewed with cardamom, cinnamon, saffron strands, and dried rose petals, is a cup of warmth that has greeted Himalayan guests for a thousand years.",
   pills:["🌸 Kashmiri Kesar","🌰 Kagzi Walnuts","🍵 Kahwa Tea","🌶️ Kashmiri Mirchi","🥜 Almonds"],
   cover_photo_url:"", tab_photo_url:""},
  {id:"la", name:"Ladakh", emoji:"❄️", tagline:"Land of High Passes",
   panel_bg:"linear-gradient(135deg,#4a2c10,#6b3a18)",
   description:"Ladakh — the roof of the world, where the sky is impossibly blue, the air is thin, and every living thing that survives here does so with extraordinary potency. At 3,500 metres above sea level, Seabuckthorn berries ripen on thorny bushes along the Indus river — bright orange clusters so loaded with Vitamin C, Omega-7, and antioxidants that Tibetan monks have used them medicinally for centuries. Shilajit, the ancient 'destroyer of weakness', oozes from granite rocks during summer thaw — a mineral resin found only in the highest Himalayan ranges. And wild apricots from Kargil and Nubra valley, sun-dried on stone rooftops at altitude, are nature's most concentrated energy food — sweet, tangy, and unlike any apricot grown in the plains.",
   pills:["🫐 Seabuckthorn","🪨 Shilajit","🍑 Wild Apricots","⚡ Black Buckwheat","🧂 Rock Salt"],
   cover_photo_url:"", tab_photo_url:""},
  {id:"sk", name:"Sikkim", emoji:"🌺", tagline:"India's First Organic State",
   panel_bg:"linear-gradient(135deg,#1a3a1e,#2a5230)",
   description:"Sikkim — India's first and only fully organic state, where chemical fertilisers have been completely banned since 2016. On mist-covered hillsides at 1,500 metres, Lepcha and Bhutia women in vibrant striped Bakhu dresses tend cardamom groves under the shade of forest trees — a centuries-old agroforestry system that produces Large Cardamom of extraordinary quality. Smoky, camphor-sweet, and revered in Ayurveda, Sikkim's cardamom accounts for over 30% of global supply. The Temi Tea Estate — the only government-run tea garden in the Himalayas — yields a delicate, floral orthodox tea from bushes grown at altitude above the clouds. And organic turmeric from Sikkim's mineral-rich volcanic soil carries nearly twice the curcumin of anything grown in the plains.",
   pills:["🫚 Large Cardamom","🌿 Organic Turmeric","🍵 Temi Tea","🌱 Organic Ginger","🥬 Gundruk"],
   cover_photo_url:"", tab_photo_url:""},
  {id:"as", name:"Assam", emoji:"🍵", tagline:"Tea Capital of the World",
   panel_bg:"linear-gradient(135deg,#1a3a1e,#2d5233)",
   description:"Assam — where the Brahmaputra runs wide and golden, and every April, the Bihu harvest festival turns the valley into a river of colour, dance, and feast. The same red-clay floodplain soil that grows the world's most recognised black tea — full-bodied, malty, brisk — also nurtures Black Joha rice, an aromatic short-grain heirloom variety with a scent like pandan leaf, cooked only on festival days and now recognised as a GI heritage crop. From the dense forest corridors along the river, Bodo tribespeople harvest wild honey using smoke and bare hands — raw, dark, and powerfully medicinal. And bamboo shoot pickle, fermented in mustard with dried chilli, is the backbone of Assamese home cooking.",
   pills:["🍵 Orthodox Tea","⚡ Black Joha Rice","🫙 Bamboo Pickle","🍯 Forest Honey","🍍 Queen Pineapple"],
   cover_photo_url:"", tab_photo_url:""},
  {id:"ml", name:"Meghalaya", emoji:"🌧️", tagline:"Abode of Clouds",
   panel_bg:"linear-gradient(135deg,#1e3a8a,#2d4fa3)",
   description:"Meghalaya — Abode of Clouds, the wettest land on earth. Khasi women in flowing orange Jainsem dresses own land, run markets, and carry family surnames — one of the last matrilineal societies on the planet, where women have held economic power for a thousand years. The same 12,000mm of annual rainfall that feeds the legendary living root bridges of Nongriat also nurtures Lakadong turmeric — a small, stubby rhizome from the East Jaintia Hills carrying up to 7.5% curcumin, the highest of any turmeric variety on earth. Wild black pepper climbs ancient forest trees untouched by pesticide. Bay leaves gathered from Khasi hilltop groves carry an aroma so intense, one leaf perfumes an entire pot. And wild forest honey, gathered from rock hives by Khasi collectors using only smoke and patience, is dark, resinous, and medicinal.",
   pills:["🌿 Lakadong Turmeric","🌑 Wild Black Pepper","🍯 Wild Honey","🍃 Bay Leaf","🫚 Hill Ginger"],
   cover_photo_url:"", tab_photo_url:""},
  {id:"nl", name:"Nagaland", emoji:"🌶️", tagline:"Land of Festivals & Fire",
   panel_bg:"linear-gradient(135deg,#3a0a0a,#5c1a1a)",
   description:"Nagaland — Land of the Hornbill, where 16 distinct tribes gather each December in a festival of war dances, tribal cuisine, and living tradition. Naga warriors once wore the feathers of the Great Hornbill into battle; today those feathers crown the Hornbill Festival headgear. The same fierce spirit lives in the food: Bhut Jolokia, the Ghost Pepper — once the world's hottest chilli, still ranked among the top five — grows wild in Naga villages. Axone, fermented soybean wrapped in banana leaf, is a condiment so complex and aromatic that Northeast chefs now serve it in fine dining restaurants. And wild hill honey, gathered from rock hives in Nagaland's cloud forests, is dark, resinous, and deeply medicinal.",
   pills:["🌶️ Bhut Jolokia","🍯 Wild Hill Honey","🫙 Axone (Fermented)","🌿 Wild Herbs","🧂 Tribal Salt"],
   cover_photo_url:"", tab_photo_url:""},
  {id:"mn", name:"Manipur", emoji:"💃", tagline:"Land of Dance & Heritage",
   panel_bg:"linear-gradient(135deg,#1a1e3a,#2d3353)",
   description:"Manipur — the Jewelled Land, where the Ras Lila dance form is so sacred it is performed only in temples, and the floating islands of Loktak Lake are home to the last Sangai deer on earth. Manipuri women weave Moirang Phee cloth on handlooms passed down through generations — the same patient hands that harvest Chakhao, the black rice of Manipur. This purple-grain heirloom rice, cooked for royal feasts and Buddhist ceremonies for centuries, is now recognised as one of India's most antioxidant-rich foods. Bamboo shoots fermented in mustard leaf, foraged wild herbs from the Senapati hills, and forest honey from Mao Naga villages complete a food culture that is utterly unlike anywhere else in India.",
   pills:["🌾 Black Rice","🎋 Bamboo Shoots","🌿 Wild Herbs","🍯 Wild Honey","🧵 Handloom"],
   cover_photo_url:"", tab_photo_url:""},
   {id:"tr", name:"Tripura", emoji:"🏛️", tagline:"Land of Fourteen Tribes",
    panel_bg:"linear-gradient(135deg,#0d3320,#1a5c3a)",
    description:"Where Culture Meets Nature — the queen pineapple here is so sweet it needs no sugar. Wild forest honey gathered by Chakma & Tripuri tribes using centuries-old bark hives. And Berma — fermented fish paste — the Northeast's best-kept culinary secret.",
    pills:["🍍 Queen Pineapple","🍯 Wild Forest Honey","🎋 Bamboo Shoots","🌿 Matai Peas","🫙 Berma (Fermented Fish)"],
    cover_photo_url:"", tab_photo_url:""},
];

const FALLBACK_PRODUCTS = [
  {id:1,name:"Himalayan Wild Honey",slug:"himalayan-wild-honey",emoji:"🍯",description:"Raw forest honey from Himachal Pradesh — dark, medicinal & intensely floral.",price:549,original_price:699,unit:"/500g",badge_type:"bs",badge_label:"Bestseller",card_bg:"#fdf3e3",state_id:"hp",region:"Kullu Valley, Himachal Pradesh",stock:35,gst_rate:5,
   image_url:"https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop&q=80"},
  {id:2,name:"Bilona A2 Cow Ghee",slug:"bilona-a2-cow-ghee",emoji:"🥛",description:"Traditional hand-churned bilona ghee from indigenous cows. Golden, grainy & deeply aromatic.",price:849,original_price:1100,unit:"/500g",badge_type:"og",badge_label:"Organic",card_bg:"#f5f5e6",state_id:"uk",region:"Tehri Garhwal, Uttarakhand",stock:18,gst_rate:5,
   image_url:"https://images.unsplash.com/photo-1631897642056-97a7abebacb2?w=400&h=400&fit=crop&q=80"},
  {id:3,name:"Kashmir Mongra Saffron",slug:"kashmir-mongra-saffron",emoji:"🌸",description:"Grade-A Pampore saffron threads — hand-harvested. Pure gold in every strand.",price:399,original_price:550,unit:"/0.5g",badge_type:"pm",badge_label:"Premium",card_bg:"#fff0f5",state_id:"jk",region:"Pampore, Kashmir",stock:4,gst_rate:5,
   image_url:"https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?w=400&h=400&fit=crop&q=80"},
  {id:4,name:"Ladakh Apricot Kernel Oil",slug:"ladakh-apricot-kernel-oil",emoji:"🌼",description:"Cold-pressed from sun-dried Ladakhi apricots. A centuries-old Himalayan beauty & cooking secret.",price:449,original_price:599,unit:"/100ml",badge_type:"nw",badge_label:"New Arrival",card_bg:"#fff8e1",state_id:"la",region:"Nubra Valley, Ladakh",stock:22,gst_rate:5,
   image_url:"https://images.unsplash.com/photo-1526399232581-2ab803f91e84?w=400&h=400&fit=crop&q=80"},
  {id:5,name:"Sikkim Organic Cardamom",slug:"sikkim-organic-cardamom",emoji:"🌿",description:"Large green pods from Sikkim's UNESCO-certified organic farms — bold, camphor-sweet & aromatic.",price:299,original_price:399,unit:"/100g",badge_type:"bs",badge_label:"Bestseller",card_bg:"#e8f5e8",state_id:"sk",region:"Gangtok Hills, Sikkim",stock:60,gst_rate:5,
   image_url:"https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop&q=80"},
  {id:6,name:"Assam First Flush Black Tea",slug:"assam-first-flush-black-tea",emoji:"🍵",description:"Single-estate Assam tea plucked at first flush — full-bodied, malty & bright in the cup.",price:349,original_price:480,unit:"/250g",badge_type:"nw",badge_label:"New",card_bg:"#f5ecd8",state_id:"as",region:"Jorhat Estate, Assam",stock:45,gst_rate:5,
   image_url:"https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop&q=80"},
];

// ── RUNTIME STATE ─────────────────────────────────────────────────
let STATES = [], PRODUCTS = [], PRODUCT_VARIANTS = [];
let cart = [];
try { cart = JSON.parse(localStorage.getItem('pr_cart')||'[]'); } catch(e){ cart=[]; }
const sv = () => {
  localStorage.setItem('pr_cart', JSON.stringify(cart));
  // Save to DB for abandoned cart recovery (only if logged in)
  try {
    var tok = localStorage.getItem('pr_auth_token');
    var usr = JSON.parse(localStorage.getItem('pr_auth_user') || 'null');
    if (tok && usr && cart.length > 0) {
      var total = cart.reduce(function(s,i){ return s + (i.price||0)*(i.qty||1); }, 0);
      var cartData = cart.map(function(i){
        var prod = PRODUCTS.find(function(p){ return String(p.id) === String(i.id); });
        var freshImage = (prod && prod.image_url) ? prod.image_url : (i.image || '');
        return { id:i.id, name:i.name, price:i.price, qty:i.qty||1, emoji:i.emoji||'🌿', variant:i.variant||'', image:freshImage, gst_rate:i.gst_rate || (prod ? prod.gst_rate : 5) || 5 };
      });
      fetch('/api/abandoned-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save', token: tok, cart_items: cartData, cart_total: total })
      }).catch(function(){});
    }
  } catch(e) {}
};

// ── WISHLIST STATE ─────────────────────────────────────────────────
let wishlist = [];
try { wishlist = JSON.parse(localStorage.getItem('pr_wishlist')||'[]'); } catch(e){ wishlist=[]; }
const svWL = () => localStorage.setItem('pr_wishlist', JSON.stringify(wishlist));

// ── RECENTLY VIEWED ────────────────────────────────────────────────
let recentIds = [];
try { recentIds = JSON.parse(localStorage.getItem('pr_recent')||'[]'); } catch(e){ recentIds=[]; }

// ── COUPON STATE — loaded from DB via store-data ───────────────────
const COUPONS = {};  // populated from DB in loadData()
let activeCoupon = null;
let _orderProcessing = false;  // prevents double order submission

// ── SHIPPING CONFIG — loaded from site_settings ────────────────────
var FREE_SHIP_THRESHOLD = 799;   // overridden from DB
var FLAT_SHIP_CHARGE    = 99;    // overridden from DB
var WHATSAPP_NUMBER     = '919899984895'; // overridden from DB
var _RAZORPAY_KEY       = 'rzp_live_SNFVJBHdd3dYRQ'; // overridden from store-data
var MIN_ORDER_AMOUNT    = 0;     // overridden from DB — 0 means no minimum

// ── AUTH STATE ─────────────────────────────────────────────────────
var _authToken   = null;
var _authUser    = null;
var _authProfile = null;
try { _authToken = localStorage.getItem('pr_auth_token') || null; } catch(e) {}
function getAuthHeaders() {
  return _authToken ? { 'Authorization': 'Bearer ' + _authToken } : {};
}
async function callAuth(action, body = {}, useAuthHeader = false) {
  var headers = { 'Content-Type': 'application/json' };
  if (useAuthHeader && _authToken) headers['Authorization'] = 'Bearer ' + _authToken;
  var controller = new AbortController();
  var _t = setTimeout(function() { controller.abort(); }, 12000);
  try {
    var res = await fetch(getStoreApiBase() + '/auth', {
      method: 'POST',
      headers,
      body: JSON.stringify({ action, ...body }),
      signal: controller.signal,
    });
    clearTimeout(_t);
    var data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Auth error');
    return data;
  } catch(e) {
    clearTimeout(_t);
    throw e;
  }
}
function saveAuthSession(data) {
  _authToken   = data.access_token;
  _authUser    = data.user;
  _authProfile = data.profile;
  try {
    localStorage.setItem('pr_auth_token',   data.access_token);
    localStorage.setItem('pr_auth_refresh', data.refresh_token || '');
    localStorage.setItem('pr_auth_user',    JSON.stringify(data.user));
    localStorage.setItem('pr_auth_profile', JSON.stringify(data.profile));
  } catch(e) {}
  // Bug #4 fix: check if user was redirected to login from cart, then reopen cart
  try {
    var returnTo = localStorage.getItem('pr_return_to');
    if (returnTo === 'cart') {
      localStorage.removeItem('pr_return_to');
      setTimeout(function() { openCart(); }, 200);
    }
  } catch(e) {}
}
function clearAuthSession() {
  _authToken = null; _authUser = null; _authProfile = null;
  try {
    localStorage.removeItem('pr_auth_token');
    localStorage.removeItem('pr_auth_refresh');
    localStorage.removeItem('pr_auth_user');
    localStorage.removeItem('pr_auth_profile');
  } catch(e) {}
}
// Restore session from localStorage on page load
try {
  var _savedUser    = localStorage.getItem('pr_auth_user');
  var _savedProfile = localStorage.getItem('pr_auth_profile');
  if (_authToken && _savedUser) {
    _authUser    = JSON.parse(_savedUser);
    _authProfile = _savedProfile ? JSON.parse(_savedProfile) : null;
  }
} catch(e) {}

// ── FILTER/SORT STATE ──────────────────────────────────────────────
let activeFilter = 'all';
let activeSortOrder = 'default';

// ── COMPARE STATE ──────────────────────────────────────────────────
let compareIds = [];

// ── DARK MODE ──────────────────────────────────────────────────────
let darkMode = false;
try { darkMode = localStorage.getItem('pr_dark') === '1'; } catch(e){}
function applyDark() {
  document.body.classList.toggle('dark', darkMode);
  var b = document.getElementById('darkBtn');
  if (b) b.textContent = darkMode ? '☀️' : '🌙';
}
function toggleDark() {
  darkMode = !darkMode;
  try { localStorage.setItem('pr_dark', darkMode ? '1' : '0'); } catch(e){}
  applyDark();
  applyTheme(currentTheme);
}

// ── API BASE ───────────────────────────────────────────────────────
function getStoreApiBase() {
  var override = localStorage.getItem('pr_api_base');
  if (override) return override.replace(/\/$/, '');
  var host = location.hostname;
  if (host.includes('.vercel.app') || host.includes('.vercel.sh')) return '/api';
  return '/api';
}

// ── DATA LOADING ───────────────────────────────────────────────────

// ══════════════════════════════════════════════════════════════
// FULL-WIDTH HERO SLIDER  (3 banners, auto-rotate every 5s)
// Settings keys: hero_slide_1_img, hero_slide_1_eyebrow, hero_slide_1_title,
//   hero_slide_1_sub, hero_slide_1_cta_text, hero_slide_1_cta_link,
//   hero_slide_1_cta2_text, hero_slide_1_cta2_link,
//   hero_slide_1_coupon_label, hero_slide_1_coupon_offer, hero_slide_1_coupon_code
//   (repeat for _2_ and _3_)
// ══════════════════════════════════════════════════════════════
var _heroSlideIndex = 0;
var _heroSlideTimer = null;
var _heroSlideCount = 0;

function esc2(s) { return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

function buildSlide(s, idx) {
  var img = s.img || '';
  var hasCoupon = s.coupon_offer || s.coupon_code;
  var html = '<div class="hslide' + (idx === 0 ? ' active' : '') + '"'
    + (img ? ' style="background-image:url(' + esc2(img) + ')"' : ' style="background:linear-gradient(150deg,#071a09 0%,#0d2410 30%,#1a3a1e 65%,#2d5233 100%)"')
    + '>';
  html += '<div class="hslide-overlay"></div>';
  html += '<div class="hslide-content">';
  if (s.eyebrow) {
    var eyeStyle = s.eyebrow_colour ? ' style="color:' + esc2(s.eyebrow_colour) + ';border-color:' + esc2(s.eyebrow_colour) + '44"' : '';
    html += '<div class="hslide-eyebrow"' + eyeStyle + '>' + esc2(s.eyebrow) + '</div>';
  }
  if (s.title) {
    var titleStyle = s.title_colour ? ' style="color:' + esc2(s.title_colour) + '"' : '';
    html += '<h1 class="hslide-title"' + titleStyle + '>' + s.title.replace(/\*([^*]+)\*/g, '<em>$1</em>') + '</h1>';
  }
  if (s.sub) {
    var subStyle = s.sub_colour ? ' style="color:' + esc2(s.sub_colour) + '"' : '';
    html += '<p class="hslide-sub"' + subStyle + '>' + esc2(s.sub) + '</p>';
  }
  if (hasCoupon) {
    html += '<div class="hslide-coupon">';
    if (s.coupon_label) html += '<span class="hslide-coupon-label">' + esc2(s.coupon_label) + '</span>';
    if (s.coupon_offer) html += '<span class="hslide-coupon-offer">' + esc2(s.coupon_offer) + '</span>';
    if (s.coupon_code)  html += '<span class="hslide-coupon-code">USE CODE: ' + esc2(s.coupon_code) + '</span>';
    html += '</div>';
  }
  html += '<div class="hslide-btns">';
  html += '<a href="' + esc2(s.cta_link || '#shop') + '" class="hslide-btn-primary">' + esc2(s.cta_text || 'Explore Our Store') + '</a>';
  if (s.cta2_text) html += '<a href="' + esc2(s.cta2_link || '/our-story') + '" class="hslide-btn-secondary">' + esc2(s.cta2_text) + '</a>';
  html += '</div></div></div>';
  return html;
}

function initHeroSlider(settings) {
  var track = document.getElementById('hsliderTrack');
  var dotsEl = document.getElementById('hsliderDots');
  if (!track) return;
  var slides = [];
  for (var n = 1; n <= 3; n++) {
    var img = settings && settings['hero_slide_' + n + '_img'];
    if (!img) continue;
    slides.push({
      img:          img,
      eyebrow:      (settings && settings['hero_slide_' + n + '_eyebrow'])       || '',
      title:        (settings && settings['hero_slide_' + n + '_title'])          || '',
      sub:          (settings && settings['hero_slide_' + n + '_sub'])            || '',
      cta_text:     (settings && settings['hero_slide_' + n + '_cta_text'])       || 'Explore Our Store',
      cta_link:     (settings && settings['hero_slide_' + n + '_cta_link'])       || '#shop',
      cta2_text:    (settings && settings['hero_slide_' + n + '_cta2_text'])      || '',
      cta2_link:    (settings && settings['hero_slide_' + n + '_cta2_link'])      || '',
      coupon_label:    (settings && settings['hero_slide_' + n + '_coupon_label'])    || '',
      coupon_offer:    (settings && settings['hero_slide_' + n + '_coupon_offer'])    || '',
      coupon_code:     (settings && settings['hero_slide_' + n + '_coupon_code'])     || '',
      eyebrow_colour:  (settings && settings['hero_slide_' + n + '_eyebrow_colour'])  || '',
      title_colour:    (settings && settings['hero_slide_' + n + '_title_colour'])    || '',
      sub_colour:      (settings && settings['hero_slide_' + n + '_sub_colour'])      || '',
    });
  }
  if (!slides.length) {
    _heroSlideCount = 1;
    if (dotsEl) dotsEl.style.display = 'none';
    var pa = document.getElementById('hsliderPrev'); if (pa) pa.style.display = 'none';
    var na = document.getElementById('hsliderNext'); if (na) na.style.display = 'none';
    return;
  }
  track.innerHTML = slides.map(function(s, i) { return buildSlide(s, i); }).join('');
  _heroSlideCount = slides.length;
  _heroSlideIndex = 0;
  if (dotsEl) {
    if (slides.length < 2) {
      dotsEl.style.display = 'none';
      var pa2 = document.getElementById('hsliderPrev'); if (pa2) pa2.style.display = 'none';
      var na2 = document.getElementById('hsliderNext'); if (na2) na2.style.display = 'none';
    } else {
      dotsEl.innerHTML = slides.map(function(_, i) {
        return '<button class="hslider-dot' + (i===0?' active':'') + '" onclick="heroGoTo(' + i + ')" aria-label="Slide ' + (i+1) + '"></button>';
      }).join('');
      startHeroAutoplay();
    }
  }
}

function heroGoTo(idx) {
  var slides = document.querySelectorAll('.hslide');
  var dots   = document.querySelectorAll('.hslider-dot');
  if (!slides.length) return;
  if (slides[_heroSlideIndex]) slides[_heroSlideIndex].classList.remove('active');
  if (dots[_heroSlideIndex])   dots[_heroSlideIndex].classList.remove('active');
  _heroSlideIndex = ((idx % _heroSlideCount) + _heroSlideCount) % _heroSlideCount;
  if (slides[_heroSlideIndex]) slides[_heroSlideIndex].classList.add('active');
  if (dots[_heroSlideIndex])   dots[_heroSlideIndex].classList.add('active');
}

function heroSlide(dir) { stopHeroAutoplay(); heroGoTo(_heroSlideIndex + dir); startHeroAutoplay(); }

function startHeroAutoplay() {
  stopHeroAutoplay();
  if (_heroSlideCount < 2) return;
  _heroSlideTimer = setInterval(function() { heroGoTo(_heroSlideIndex + 1); }, 5000);
}
function stopHeroAutoplay() { if (_heroSlideTimer) { clearInterval(_heroSlideTimer); _heroSlideTimer = null; } }

document.addEventListener('DOMContentLoaded', function() {
  var slider = document.querySelector('.hero-slider');
  if (!slider) return;
  slider.addEventListener('mouseenter', stopHeroAutoplay);
  slider.addEventListener('mouseleave', function() { if (_heroSlideCount > 1) startHeroAutoplay(); });
  var tx = 0;
  slider.addEventListener('touchstart', function(e) { tx = e.touches[0].clientX; }, {passive:true});
  slider.addEventListener('touchend', function(e) {
    var dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 40) heroSlide(dx < 0 ? 1 : -1);
  }, {passive:true});
});

// Backwards-compat — called from loadData()
function initHeroPanel(settings) { initHeroSlider(settings || {}); }
function initHeroSlideshow()     { initHeroSlider({}); }
// ── COLLECTION CATEGORY IMAGES ─────────────────────────────────────
// Reads all coll_img_* keys from settings — dynamic, matches any category slug
function initCollectionImages(settings) {
  if (!settings) return;
  Object.keys(settings).forEach(function(key) {
    if (!key.startsWith('coll_img_')) return;
    var slug = key.replace('coll_img_', '');
    var url = settings[key];
    if (!url) return;
    var img = document.getElementById('ccat-img-' + slug);
    var emo = document.getElementById('ccat-emo-' + slug);
    if (!img) return;
    img.src = url;
    img.style.display = 'block';
    img.onerror = function() { img.style.display='none'; if(emo) emo.style.display='block'; };
    if (emo) emo.style.display = 'none';
  });
}

async function loadData() {
  // Step 1: render states fallback only — skip fake products to avoid price flash
  STATES   = FALLBACK_STATES.map(s => Object.assign({}, s));
  renderStates(); uCart(); observeRv();
  initAllStateSlides(); initProductHoverImages();
  // Open cart instantly if redirected from product page
  if (window.location.search.includes('opencart=1')) {
    history.replaceState(null, '', '/');
    var cp = document.getElementById('cartPage');
    if (cp) { cp.classList.add('open'); document.body.style.overflow = 'hidden'; }
    // Auth + address fill (async, non-blocking)
    if (_authToken && !_authProfile) {
      callAuth('get_profile', {}, true).then(function(d) {
        _authProfile = d.profile; prefillDelivery(); renderSavedAddresses();
      }).catch(function(){});
    } else {
      prefillDelivery(); renderSavedAddresses();
    }
  }

  // Step 2: try DB
  try {
    var r = await fetch(getStoreApiBase() + '/store-data');
    if (!r.ok) throw new Error('store-data HTTP ' + r.status);
    var data = await r.json();
    var dbStates = data.states;
    var dbProds  = data.products;
    // Load DB coupons
    if (Array.isArray(data.coupons) && data.coupons.length) {
      data.coupons.forEach(function(c) {
        if (!c.code) return;
        var expOk = !c.expires_at || new Date(c.expires_at) > new Date();
        var usesOk = !c.max_uses || (c.uses_count||0) < c.max_uses;
        if (expOk && usesOk) {
          COUPONS[c.code.toUpperCase()] = {
            type: c.type === 'percent' ? 'pct' : 'flat',
            val:  parseFloat(c.value) || 0,
            min:  parseFloat(c.min_order) || 0,
            maxDiscount: parseFloat(c.max_discount) || null,
            firstOrderOnly: c.first_order_only || false,
            label: c.type === 'percent' ? c.value+'% off' : '₹'+c.value+' off'
          };
        }
      });
    }
    // ── Load shipping + WhatsApp from settings ──
    if (data.settings) {
      if (data.settings.free_shipping_min    !== undefined && data.settings.free_shipping_min    !== null) FREE_SHIP_THRESHOLD = parseInt(data.settings.free_shipping_min,    10);
      if (data.settings.flat_shipping_charge !== undefined && data.settings.flat_shipping_charge !== null) FLAT_SHIP_CHARGE    = parseInt(data.settings.flat_shipping_charge, 10);
      if (data.settings.min_order_amount     !== undefined && data.settings.min_order_amount     !== null) MIN_ORDER_AMOUNT    = parseInt(data.settings.min_order_amount,     10);
      if (data.settings.whatsapp_number)      WHATSAPP_NUMBER     = data.settings.whatsapp_number;
      if (data.razorpay_key)                  _RAZORPAY_KEY       = data.razorpay_key;
      // ── SEO meta tags → <head> ──
      (function() {
        var s = data.settings;
        if (s.meta_title)       { var t = document.getElementById('meta-title'); if(t) t.textContent = s.meta_title; document.title = s.meta_title; }
        if (s.meta_description) { var md = document.getElementById('meta-description'); if(md) md.setAttribute('content', s.meta_description); var ogd = document.getElementById('og-description'); if(ogd) ogd.setAttribute('content', s.meta_description); }
        if (s.meta_keywords)    { var mk = document.getElementById('meta-keywords'); if(mk) mk.setAttribute('content', s.meta_keywords); }
        if (s.site_name)        { var ogn = document.getElementById('og-site-name'); if(ogn) ogn.setAttribute('content', s.site_name); var ogt = document.getElementById('og-title'); if(ogt) ogt.setAttribute('content', s.site_name); }
        if (s.og_image)         { var ogi = document.getElementById('og-image'); if(ogi) ogi.setAttribute('content', s.og_image); }
        // Inject Google Tag (GA4 / GTM) dynamically
        if (s.google_tag_id && s.google_tag_id.trim()) {
          var tagId = s.google_tag_id.trim();
          var existing = document.getElementById('google-tag-placeholder');
          if (existing && !document.getElementById('gtag-script')) {
            var gScript = document.createElement('script');
            gScript.id = 'gtag-script';
            gScript.async = true;
            gScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + tagId;
            document.head.appendChild(gScript);
            window.dataLayer = window.dataLayer || [];
            window.gtag = function(){ window.dataLayer.push(arguments); };
            window.gtag('js', new Date());
            window.gtag('config', tagId);
          }
        }
      })();
      // ── Contact info → footer ──
      (function() {
        var s = data.settings;
        // Email
        var fEmail = document.getElementById('footer-email');
        if (fEmail && s.contact_email) { fEmail.href = 'mailto:' + s.contact_email; fEmail.textContent = s.contact_email; }
        // Phone
        var fPhone = document.getElementById('footer-phone');
        if (fPhone && s.contact_phone) { fPhone.href = 'tel:' + s.contact_phone.replace(/\s/g,''); fPhone.textContent = s.contact_phone; }
        // Address
        var fAddr = document.getElementById('footer-address');
        if (fAddr && s.contact_address) fAddr.innerHTML = s.contact_address.replace(/\n/g,'<br>');
        // Social links
        var socials = { instagram: 'social-instagram', facebook: 'social-facebook', twitter: 'social-twitter', youtube: 'social-youtube', pinterest: 'social-pinterest' };
        Object.keys(socials).forEach(function(key) {
          var el = document.getElementById(socials[key]);
          var url = s['social_' + key];
          if (el && url) el.href = url;
          if (el && url === '') el.style.display = 'none'; // hide if cleared
        });
        // WhatsApp float button
        var waBtn = document.getElementById('waFloatBtn');
        if (waBtn && s.whatsapp_number) waBtn.href = 'https://wa.me/' + s.whatsapp_number.replace(/[^0-9]/g,'');
      })();
      // ── Store closed / maintenance mode ──
      if (data.settings.store_open === 'false') {
        var msg = data.settings.maintenance_message || "We'll be back soon! 🌿";
        document.body.innerHTML = '<div style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#f7f4ef;font-family:sans-serif;padding:32px;text-align:center">' +
          '<div style="font-size:56px;margin-bottom:16px">🌿</div>' +
          '<div style="font-size:26px;font-weight:800;color:#1b4332;margin-bottom:10px">Pahadi Roots</div>' +
          '<div style="font-size:16px;color:#555;max-width:400px;line-height:1.6">' + msg + '</div>' +
          '<div style="margin-top:24px;font-size:12px;color:#aaa">For help: <a href="mailto:hello@pahadiroots.com" style="color:#2d6a4f">hello@pahadiroots.com</a></div>' +
        '</div>';
        return; // stop all further JS execution
      }
      // Hide Razorpay button if disabled in admin settings
      var rzpBtn = document.getElementById('btn-razorpay');
      if (rzpBtn) rzpBtn.style.display = (data.settings.upi_enabled === 'false') ? 'none' : '';
      // Hide COD button if disabled in admin settings
      var codBtn = document.getElementById('btn-cod');
      if (codBtn) codBtn.style.display = (data.settings.cod_enabled === 'false') ? 'none' : '';
      updateShipAmountDisplays();
      uCart(); // Recalculate cart total with correct shipping settings from DB
      initHeroPanel(data.settings); // Hero panel images + sale badge
      initCollectionImages(data.settings); // Category card images
      initHeroStats(data.settings);  // Editable stats counters
      initTrustBar(data.settings);   // Editable trust bar
    }
    var updated  = false;

    if (Array.isArray(dbStates) && dbStates.length) {
      STATES = FALLBACK_STATES.map(function(local) {
        var db = dbStates.find(function(d) { return d.id === local.id; });
        if (!db) return local;
        return Object.assign({}, local, {
          name:            db.name         || local.name,
          description:     db.description  || local.description,
          cover_photo_url: db.image_path   || local.cover_photo_url,
          tab_photo_url:   db.image_path   || local.tab_photo_url,
        });
      });
      dbStates.forEach(function(db) {
        if (!STATES.find(function(s) { return s.id === db.id; })) {
          STATES.push({
            id: db.id, name: db.name, emoji: '🗺️', tagline: '',
            description: db.description || '',
            panel_bg: 'linear-gradient(135deg,#1a3a1e,#2d5233)',
            pills: [], cover_photo_url: db.image_path || '', tab_photo_url: db.image_path || '',
          });
        }
      });
      updated = true;
    }

    if (Array.isArray(dbProds) && dbProds.length) {
      var localById = {};
      FALLBACK_PRODUCTS.forEach(function(p) { localById[p.id] = p; });
      var badgeMap = {bs:'Bestseller', og:'Organic', pm:'Premium', nw:'New Arrival'};
      PRODUCTS = dbProds.map(function(db) {
        var loc = localById[db.id] || {};
        var bt  = loc.badge_type || 'bs';
        // Parse badges array from DB
        var dbBadges = Array.isArray(db.badges) ? db.badges : (typeof db.badges === 'string' ? [db.badges] : []);
        if (dbBadges.includes('bestseller')) bt = 'bs';
        else if (dbBadges.includes('organic')) bt = 'og';
        else if (dbBadges.includes('new')) bt = 'nw';
        return {
          id:             db.id,
          name:           db.name,
          slug:           db.slug            || null,
          description:    db.short_description || loc.description || '',
          price:          db.price,
          original_price: db.mrp             || loc.original_price || null,
          unit:           db.unit_label      || loc.unit           || '/unit',
          state_id:       db.state_id,
          region:         db.region          || loc.region         || '',
          gst_rate:       db.gst_rate        || loc.gst_rate       || 5,
          image_url:      db.image_url       || loc.image_url      || '',
          stock:          (db.available_stock !== null && db.available_stock !== undefined)
                            ? Number(db.available_stock)
                            : (loc.stock !== undefined ? loc.stock : 99),
          emoji:          db.emoji           || loc.emoji          || '🌿',
          badge_type:     bt,
          badge_label:    loc.badge_label    || badgeMap[bt]       || 'Bestseller',
          card_bg:        loc.card_bg        || '#f9f4ec',
          active:         db.status === 'active',
          category_id:    db.category_id,
          sku:            db.sku,
          tags:           db.tags,
          extra_image_url: db.extra_image_url || null,
          _images:        [],  // populated from product_images table after load
        };
      });
      updated = true;
    }

    // ── Apply state_images from store-data response ──
    if (Array.isArray(data.state_images) && data.state_images.length) {
      var byState = {};
      data.state_images.forEach(function(row) {
        if (!byState[row.state_id]) byState[row.state_id] = [];
        byState[row.state_id].push(row);
      });
      Object.keys(byState).forEach(function(sid) {
        var imgs = byState[sid].sort(function(a,b){ return (a.sort_order||0)-(b.sort_order||0); });
        var urls = imgs.map(function(r){ return r.image_url; }).filter(Boolean);
        if (!urls.length) return;
        var st = STATES.find(function(s){ return s.id === sid; });
        if (st) {
          st._uploadedImgs = urls;
          st.cover_photo_url = urls[0];
          st.tab_photo_url   = urls[0];
        }
      });
      updated = true;
    }

    // ── Hero slideshow — use product images ──
    // Hero panel loaded from settings below

    // ── Apply product_images from store-data response ──
    if (Array.isArray(data.product_images) && data.product_images.length) {
      var byProd = {};
      data.product_images.forEach(function(row) {
        if (!byProd[row.product_id]) byProd[row.product_id] = [];
        byProd[row.product_id].push(row);
      });
      Object.keys(byProd).forEach(function(pid) {
        var imgs = byProd[pid].sort(function(a,b){ return (a.sort_order||0)-(b.sort_order||0); });
        var urls = imgs.map(function(r){ return r.image_url; }).filter(Boolean);
        if (!urls.length) return;
        var pr = PRODUCTS.find(function(p){ return String(p.id) === String(pid); });
        if (pr) {
          pr._images = urls;
          if (urls[0]) pr.image_url = urls[0]; // first image = main
        }
      });
      updated = true;
    }

    // ── Render everything now that all data (including images) is ready ──
    if (updated) {
      // Preserve currently active state before re-render
      var activeStateEl = document.querySelector('.spnl.active');
      var activeStateId = activeStateEl ? activeStateEl.id.replace('p-','') : null;
      renderProds(); renderStates(); observeRv(); injectProductSchema(); renderUpsell();
      // Restore active state if user had clicked one
      if (activeStateId && activeStateId !== STATES[0].id) {
        swState(activeStateId);
      }
      initAllStateSlides(); initProductHoverImages();
    }

    // ── Product Variants ──
    if (Array.isArray(data.product_variants) && data.product_variants.length) {
      PRODUCT_VARIANTS = data.product_variants;
      PRODUCTS.forEach(function(p) {
        p.variants = PRODUCT_VARIANTS.filter(function(v) { return String(v.product_id) === String(p.id); });
      });
      // No re-render needed — variants shown on product detail page
    }


  } catch(e) {
    console.error('loadData failed:', e);
    showToast('⚠️ Could not load latest products — showing cached data');
  }
}

// ── PRODUCT CARD ───────────────────────────────────────────────────
var FILTER_MAP = {
  honey:   function(p) { return /honey/i.test(p.name + ' ' + (p.description||'')); },
  ghee:    function(p) { return /ghee|butter/i.test(p.name + ' ' + (p.description||'')); },
  spices:  function(p) { return /spice|cardamom|turmeric|pepper|saffron|chilli|ginger/i.test(p.name + ' ' + (p.description||'')); },
  tea:     function(p) { return /tea|chai/i.test(p.name + ' ' + (p.description||'')); },
  saffron: function(p) { return /saffron|kesar/i.test(p.name + ' ' + (p.description||'')); },
  oil:     function(p) { return /oil|ghee/i.test(p.name + ' ' + (p.description||'')); },
};

function mkProd(p) {
  var pct    = p.original_price ? Math.round((1 - p.price / p.original_price) * 100) : 0;
  var bc     = p.badge_type || 'bs';
  var stock  = (p.stock !== undefined && p.stock !== null) ? p.stock : 99;
  var sClass = stock > 20 ? 'high' : stock > 5 ? 'mid' : stock > 0 ? 'low' : 'low';
  var sPct   = Math.min(100, Math.round(stock / 50 * 100));
  var sLbl   = stock <= 0 ? 'Out of Stock' : stock > 20 ? 'In Stock' : ('Only ' + stock + ' left');
  var inWL   = wishlist.findIndex(function(x){ return String(x) === String(p.id); }) > -1;
  var slug   = getProductSlug(p);
  var imgHtml = p.image_url
    ? '<img src="' + p.image_url + '" alt="' + p.name + '" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:1" onerror="this.style.display=\'none\'">'
    : '';
  var img = '<div class="piw" style="background:' + (p.card_bg||'#f9f4ec') + '">' +
    imgHtml +
    '<span class="pemo" style="position:relative;z-index:0">' + (p.emoji||'🌿') + '</span>' +
    '<div class="piw-hover-overlay">' +
      '<button class="piw-qv-btn" onclick="event.stopPropagation();openQV(\'' + p.id + '\')">👁 Quick View</button>' +
    '</div>' +
    '<button class="piw-wl-btn' + (inWL?' active':'') + '" onclick="event.stopPropagation();toggleWishlist(\'' + p.id + '\')">' + (inWL ? '❤️' : '❤') + '</button>' +
    '</div>';
  var badgePart = p.badge_label ? '<div class="pbadge-wrap"><span class="pbadge-dot pbd-' + bc + '"></span><span class="pbadge-text">' + p.badge_label + '</span></div>' : '';
  var ctTagPart = p.checkout_offer ? '<div class="pcard-checkout-tag">10% Off At Checkout</div>' : '';
  var discBadge = pct ? '<div class="pdisc-ribbon">-' + pct + '%</div>' : '';
  var notifyBtn = stock <= 0 ? '<button class="notify-btn pcard-atc-full" onclick="event.stopPropagation();openNotify(\'' + p.id + '\')">🔔 Notify Me</button>' : '';
  var footerBtns = stock <= 0 ? notifyBtn :
    '<div class="pcard-actions">' +
      '<button class="atc pcard-atc-full" onclick="event.stopPropagation();quickAddToCart(\'' + p.id + '\')" id="atcBtn-' + p.id + '">🛒 Add to Cart</button>' +
      '<span class="atc-hint view-details-link" data-slug="' + slug + '" onclick="event.stopPropagation();goToProductPage(this.dataset.slug)">View Details →</span>' +
    '</div>';
  return '<div class="pcard" data-slug="' + slug + '" style="position:relative" onclick="goToProductPage(this.dataset.slug)">' +
    badgePart + ctTagPart + discBadge +
    img +
    '<div class="pbody">' +
      '<div class="pregion">📍 ' + (p.region||'') + '</div>' +
      '<div class="pname">' + p.name + '</div>' +
      '<div class="prating"><span class="pstars">★★★★★</span><span class="prc">(' + (Math.floor(Math.random()*80+20)) + ')</span></div>' +
      '<div class="pdesc">' + (p.description||'') + '</div>' +
      '<div class="stock-bar"><div class="stock-fill ' + sClass + '" style="width:' + sPct + '%"></div></div>' +
      '<div class="stock-label ' + sClass + '">' + sLbl + '</div>' +
      '<div class="pfoot" style="margin-top:8px">' +
        '<div class="prow"><span class="pnow" id="pnow-' + p.id + '">₹' + p.price + '</span>' +
          (p.original_price ? '<span class="pwas">₹' + p.original_price + '</span>' : '') +
          '<span class="punt">' + (p.unit||'') + '</span></div>' +
      '</div>' +
      footerBtns +
    '</div>' +
    (p.checkout_offer ? '<div class="checkout-strip">🏷️ 10% off applied at checkout</div>' : '') +
  '</div>';
}


function renderProds() {
  var g  = document.getElementById('pgrid');
  var nr = document.getElementById('noResults');
  if (!g) return;
  var list = PRODUCTS.slice();
  if (activeFilter && activeFilter !== 'all' && FILTER_MAP[activeFilter]) {
    list = list.filter(FILTER_MAP[activeFilter]);
  }
  if (activeSortOrder === 'price_asc')  list.sort(function(a,b) { return a.price - b.price; });
  if (activeSortOrder === 'price_desc') list.sort(function(a,b) { return b.price - a.price; });
  if (activeSortOrder === 'discount')   list.sort(function(a,b) {
    var da = a.original_price ? Math.round((1-a.price/a.original_price)*100) : 0;
    var db = b.original_price ? Math.round((1-b.price/b.original_price)*100) : 0;
    return db - da;
  });
  if (activeSortOrder === 'name') list.sort(function(a,b) { return a.name.localeCompare(b.name); });
  if (!list.length) {
    g.innerHTML = '';
    if (nr) nr.style.display = 'block';
    return;
  }
  if (nr) nr.style.display = 'none';
  g.innerHTML = list.map(function(p) { return mkProd(p); }).join('');
  updateAllWLButtons();
  setTimeout(initProductHoverImages, 50);
}

function setFilter(f, btn) {
  activeFilter = f;
  document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  renderProds();
}
function setSortOrder(s) { activeSortOrder = s; renderProds(); }

// ── STATES SECTION ─────────────────────────────────────────────────
function renderStates() {
  var tb = document.getElementById('stabs');
  var pn = document.getElementById('spnls');
  if (!tb || !pn) return;

  // Merge localStorage uploaded images into STATES before rendering
  STATES.forEach(function(s) {
    try {
      var up = localStorage.getItem('pr_state_img_' + s.id);
      if (up) { s._uploadedImg = up; }
    } catch(e) {}
  });

  tb.innerHTML = STATES.map(function(s, i) {
    var imgSrc = (s._uploadedImgs && s._uploadedImgs[0]) || s._uploadedImg || s.tab_photo_url || '';
    var imgHtml = imgSrc
      ? '<div class="stab-thumb"><img src="' + imgSrc + '" alt="' + s.name + '" onerror="this.parentNode.style.display=\'none\'" loading="lazy"></div>'
      : '<div class="stab-thumb stab-thumb-emo">' + s.emoji + '</div>';
    return '<button class="stab' + (i===0?' active':'') + '" onclick="swState(\'' + s.id + '\')" id="t-' + s.id + '">' +
      imgHtml +
      '<div class="stab-label"><span class="stab-name">' + s.name + '</span><span class="stab-tag">' + (s.tagline||'') + '</span></div>' +
    '</button>';
  }).join('');

  pn.innerHTML = STATES.map(function(s, i) {
    var stProds = PRODUCTS.filter(function(p) { return p.state_id === s.id; });
    var pills   = (s.pills||[]).map(function(p) { return '<span class="sstate-pill">' + p + '</span>'; }).join('');
    var bg      = s.panel_bg || 'linear-gradient(135deg,#1a3a1e,#2d5233)';
    var coverSrc = (s._uploadedImgs && s._uploadedImgs[0]) || s._uploadedImg || s.cover_photo_url || '';
    // Gather all images for this state (multi-image slideshow support)
    var stateImgs = [];
    if (s._uploadedImgs && s._uploadedImgs.length) {
      stateImgs = s._uploadedImgs;  // Use DB images array (already sorted by sort_order)
    } else if (s._uploadedImg) {
      stateImgs = [s._uploadedImg];
    } else if (s.cover_photo_url) {
      stateImgs = [s.cover_photo_url];
    }
    var photoHtml;
    if (stateImgs.length > 1) {
      var slidesHtml = stateImgs.map(function(url, si) {
        return '<img class="sshdr-img' + (si===0?' active':'') + '" src="' + url + '" alt="' + s.name + '" loading="lazy" onerror="this.style.display=\'none\'" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center top;display:block;opacity:' + (si===0?'1':'0') + ';transition:opacity 1s ease;z-index:1">';
      }).join('');
      var dotsHtml = stateImgs.map(function(_,si){
        return '<span class="sshdr-dot' + (si===0?' active':'') + '" onclick="event.stopPropagation();goStateSlide(\'' + s.id + '\',' + si + ')"></span>';
      }).join('');
      photoHtml = '<div class="shdr-img-col sshdr" id="sshdr-' + s.id + '" data-sid="' + s.id + '" data-total="' + stateImgs.length + '" data-cur="0" style="position:relative;background:' + bg + '">' +
        '<div class="shdr-fallback" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:80px;opacity:.25">' + s.emoji + '</div>' +
        slidesHtml +
        '<div style="position:absolute;inset:0;background:linear-gradient(to right,rgba(0,0,0,.15),transparent);z-index:2;pointer-events:none"></div>' +
        '<div class="sshdr-dots" style="position:absolute;bottom:12px;left:50%;transform:translateX(-50%);display:flex;gap:6px;z-index:3">' + dotsHtml + '</div>' +
      '</div>';
    } else {
      photoHtml = '<div class="shdr-img-col" style="position:relative;background:' + bg + '">' +
        '<div class="shdr-fallback" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:80px;opacity:.35">' + s.emoji + '</div>' +
        (coverSrc ? '<img src="' + coverSrc + '" alt="' + s.name + ' culture" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center top;display:block" loading="lazy" onerror="this.style.display=\'none\'">' : '') +
        '<div style="position:absolute;inset:0;background:linear-gradient(to right,rgba(0,0,0,.15),transparent)"></div>' +
      '</div>';
    }
    var prodsHtml = stProds.length
      ? stProds.map(function(p) { return mkProd(p); }).join('')
      : '<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--tx3);font-family:\'Playfair Display\',serif;font-style:italic">🏔️ Products coming soon from ' + s.name + '…</div>';
    return '<div class="spnl' + (i===0?' active':'') + '" id="p-' + s.id + '">' +
      '<div class="shdr">' + photoHtml +
        '<div class="shdr-info-col" style="background:' + bg + '">' +
          '<div class="sstate-title">' + s.emoji + ' ' + s.name + '<span style="font-size:12px;font-weight:400;opacity:.7;display:block;margin-top:2px;font-style:italic">' + (s.tagline||'') + '</span></div>' +
          '<div class="sstate-desc">' + (s.description||'') + '</div>' +
          '<div class="sstate-pills">' + pills + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="spgrid">' + prodsHtml + '</div>' +
    '</div>';
  }).join('');
}


// ── STORY CARDS ──────────────────────────────────────────────
var _storySnippets = {
  hp: 'Dev Bhoomi — Deodar forests hide cliff-hive honey & Kangra tea perfumes alpine air.',
  uk: 'Sacred rivers, ancient temples & meadows above 3,000m yielding wild honey and Badri ghee.',
  jk: 'Saffron fields turn violet each October. The world\'s finest spice, harvested before sunrise.',
  la: 'Roof of the world. Shilajit oozes from granite at 3,500m. Seabuckthorn lines the Indus.',
  sk: 'India\'s only fully organic state. Cardamom groves under forest shade, Temi tea above clouds.',
  as: 'Brahmaputra valley — world-famous malty black tea & Black Joha rice with a pandan scent.',
  ml: 'Wettest land on earth. Lakadong turmeric with 7.5% curcumin — highest on the planet.',
  nl: 'Ghost Pepper country. Hornbill Festival, 16 tribes, and fermented Axone — fierce & proud.',
  mn: 'Purple Chakhao rice, Loktak Lake, and a matrilineal society where women rule the market.',
  tr: 'Queen pineapple so sweet it needs no sugar. Wild honey from ancient Chakma bark hives.'
};
function renderStoryCards(activeId) {
  var el = document.getElementById('storyCards');
  if (!el) return;
  el.innerHTML = STATES.map(function(s) {
    var imgSrc = (s._uploadedImgs && s._uploadedImgs[0]) || s._uploadedImg || s.tab_photo_url || '';
    var imgHtml = imgSrc
      ? '<img class="story-card-img" src="' + imgSrc + '" alt="' + s.name + '" loading="lazy" onerror="this.style.display=\'none\">'
      : '<div class="story-card-emo" style="background:' + (s.panel_bg||'linear-gradient(135deg,#1a3a1e,#2d5233)') + '">' + s.emoji + '</div>';
    var snippet = _storySnippets[s.id] || s.description.substring(0, 90) + '…';
    var isActive = s.id === (activeId || STATES[0].id);
    return '<div class="story-card' + (isActive ? ' active-state' : '') + '" onclick="swState(\''+s.id+'\');renderStoryCards(\''+s.id+'\')">'+
      imgHtml +
      '<div class="story-card-body">'+
        '<div class="story-card-name">' + s.emoji + ' ' + s.name + '</div>'+
        '<div class="story-card-tag">' + (s.tagline||'') + '</div>'+
        '<div class="story-card-line">' + snippet + '</div>'+
      '</div>'+
    '</div>';
  }).join('');
}

function swState(id) {
  document.querySelectorAll('.stab').forEach(function(t) { t.classList.remove('active'); });
  document.querySelectorAll('.spnl').forEach(function(p) { p.classList.remove('active'); });
  var t = document.getElementById('t-' + id);
  var p = document.getElementById('p-' + id);
  if (t) t.classList.add('active');
  if (p) p.classList.add('active');
  // Update story cards active state
  document.querySelectorAll('.story-card').forEach(function(c) {
    c.classList.toggle('active-state', c.getAttribute('onclick') && c.getAttribute('onclick').includes("'"+id+"'"));
  });
}

// ── STATE IMAGE SLIDESHOW ────────────────────────────────────────────
var _stateTimers = {};
function goStateSlide(sid, idx) {
  var el = document.getElementById('sshdr-' + sid);
  if (!el) return;
  var imgs = el.querySelectorAll('.sshdr-img');
  var dots = el.querySelectorAll('.sshdr-dot');
  imgs.forEach(function(img, i) { img.style.opacity = i === idx ? '1' : '0'; img.classList.toggle('active', i===idx); });
  dots.forEach(function(d, i) { d.classList.toggle('active', i===idx); });
  el.setAttribute('data-cur', idx);
}
function initStateSlideshow(sid, total) {
  if (_stateTimers[sid]) clearInterval(_stateTimers[sid]);
  if (total <= 1) return;
  _stateTimers[sid] = setInterval(function() {
    var el = document.getElementById('sshdr-' + sid);
    var panel = document.getElementById('p-' + sid);
    if (!el || !panel || !panel.classList.contains('active')) return;
    var cur = parseInt(el.getAttribute('data-cur') || '0', 10);
    goStateSlide(sid, (cur + 1) % total);
  }, 2500);

  // Touch/swipe support on mobile
  var sshdrEl = document.getElementById('sshdr-' + sid);
  if (sshdrEl && !sshdrEl._touchInited) {
    sshdrEl._touchInited = true;
    var _tx = 0;
    sshdrEl.addEventListener('touchstart', function(e) { _tx = e.touches[0].clientX; }, {passive:true});
    sshdrEl.addEventListener('touchend', function(e) {
      var dx = e.changedTouches[0].clientX - _tx;
      if (Math.abs(dx) < 40) return; // ignore tiny taps
      var cur = parseInt(sshdrEl.getAttribute('data-cur') || '0', 10);
      if (dx < 0) goStateSlide(sid, (cur + 1) % total);       // swipe left → next
      else        goStateSlide(sid, (cur - 1 + total) % total); // swipe right → prev
    }, {passive:true});
  }
}
function initAllStateSlides() {
  document.querySelectorAll('.sshdr').forEach(function(el) {
    var sid = el.getAttribute('data-sid');
    var total = parseInt(el.getAttribute('data-total') || '1', 10);
    if (total > 1) initStateSlideshow(sid, total);
  });
}

// ── PRODUCT HOVER IMAGE SWAP ─────────────────────────────────────────
// Adds a second hover image to product cards that have extra images stored
// Called after renderProds/renderStates
function initProductHoverImages() {
  var isMobile = window.matchMedia('(hover:none)').matches || ('ontouchstart' in window);

  PRODUCTS.forEach(function(p) {
    // Collect all hover images
    var hoverImgs = [];
    if (p._images && p._images.length > 1) {
      hoverImgs = p._images.slice(1); // images after first (main)
    } else if (p.extra_image_url) {
      hoverImgs = [p.extra_image_url];
    }
    if (!hoverImgs.length) return;

    document.querySelectorAll('.pcard').forEach(function(card) {
      if (card.getAttribute('data-slug') !== getProductSlug(p)) return;
      var piw = card.querySelector('.piw');
      if (!piw || piw.querySelector('.phover-img')) return;

      // Inject hover images
      hoverImgs.forEach(function(src, hi) {
        var img = document.createElement('img');
        img.className = 'phover-img';
        img.src = src; img.alt = p.name; img.loading = 'lazy';
        if (hoverImgs.length > 1) {
          img.style.animationDelay = (hi * 2) + 's';
          img.style.animationDuration = (hoverImgs.length * 2) + 's';
          img.classList.add('phover-cycle');
        }
        piw.appendChild(img);
      });

      // MOBILE: tap card image to cycle through hover images
      if (isMobile && hoverImgs.length >= 1) {
        var _tapIdx = 0;
        var _allImgs = [piw.querySelector('img:not(.phover-img)')].concat(Array.from(piw.querySelectorAll('.phover-img'))).filter(Boolean);
        piw.style.cursor = 'pointer';
        piw.addEventListener('click', function(e) {
          e.stopPropagation();
          if (_allImgs.length < 2) return;
          _tapIdx = (_tapIdx + 1) % _allImgs.length;
          _allImgs.forEach(function(im, ii) {
            im.style.opacity = ii === _tapIdx ? '1' : '0';
            im.style.zIndex  = ii === _tapIdx ? '3' : (ii === 0 ? '1' : '2');
          });
        });
      }
    });
  });
}


// ── Get clean slug for any product — never returns numeric ID ──
function getProductSlug(p) {
  if (!p) return '';
  // Use slug if set and not numeric
  if (p.slug && !/^\d+$/.test(p.slug)) return p.slug;
  // Generate from name as fallback
  if (p.name) return p.name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
  // Last resort — numeric id (should never happen if products have names)
  return String(p.id || '');
}

function goToProductPage(slug) {
  // Never use numeric ID in URL — generate slug from name if needed
  var s = String(slug || '');
  if (!s || /^\d+$/.test(s)) {
    // Numeric ID passed — find product and use its slug or generate from name
    var prod = PRODUCTS.find(function(p){ return String(p.id) === s; });
    if (prod) {
      s = getProductSlug(prod);
    }
  }
  window.location.href = '/products/' + s;
}

function updateCardPrice(prodId, sel) {
  var opt = sel.options[sel.selectedIndex];
  var price = parseFloat(opt.dataset.price);
  var priceEl = document.getElementById('pnow-' + prodId);
  if (priceEl && price) priceEl.textContent = '₹' + price;
}


// ── QUICK ADD TO CART (with button feedback) ─────────────────────
function quickAddToCart(id) {
  var success = addToCart(id);
  if (!success) return;
  var btn = document.getElementById('atcBtn-' + id);
  if (btn) {
    var orig = btn.innerHTML;
    btn.innerHTML = '✓ Added!';
    btn.style.background = 'var(--g2)';
    setTimeout(function() { btn.innerHTML = orig; btn.style.background = ''; }, 1800);
  }
}

// ── QUICK VIEW — openQV() / closeQV() / chQvQty() defined below ──

// ── THEME SWITCHER ───────────────────────────────────────────────
var currentTheme = 'pahadi';
try { currentTheme = localStorage.getItem('pr_theme') || 'pahadi'; } catch(e) {}

function applyTheme(theme) {
  currentTheme = theme;
  document.body.setAttribute('data-theme', theme);
  try { localStorage.setItem('pr_theme', theme); } catch(e) {}
  document.querySelectorAll('.theme-opt').forEach(function(btn) {
    btn.classList.toggle('active', btn.dataset.theme === theme);
  });
}
function openThemeSwitcher() {
  var panel = document.getElementById('themeSwitcherPanel');
  if (panel) panel.classList.toggle('open');
}
function closeThemeSwitcher() {
  var panel = document.getElementById('themeSwitcherPanel');
  if (panel) panel.classList.remove('open');
}

function addToCart(id) {
  var sid = String(id);
  var p = PRODUCTS.find(function(x) { return String(x.id) === sid; });
  if (!p) { showToast('⚠️ Product not found. Please refresh the page.'); return false; }
  // Check if variant selected
  var varSel = document.getElementById('vs-' + id);
  var variantId = null, variantLabel = '', price = p.price, stock = p.stock;
  if (varSel && varSel.options.length > 0) {
    var opt = varSel.options[varSel.selectedIndex];
    variantId = opt.value;
    variantLabel = opt.text.split(' — ')[0];
    price = parseFloat(opt.dataset.price) || p.price;
    stock = parseInt(opt.dataset.stock);
  }
  // Unique cart key = productId + variantId
  var cartKey = variantId ? (sid + '_' + variantId) : sid;
  var ex = cart.find(function(x) { return String(x.cartKey) === String(cartKey); });
  var currentQty = ex ? ex.qty : 0;
  // Stock check — only block if stock is a real number AND is 0 or exceeded
  var stockNum = (stock !== undefined && stock !== null) ? Number(stock) : null;
  if (stockNum !== null && !isNaN(stockNum) && stockNum <= 0) {
    showToast('⚠️ This product is out of stock!'); return false;
  }
  if (stockNum !== null && !isNaN(stockNum) && currentQty >= stockNum) {
    showToast('⚠️ Only ' + stockNum + ' in stock!'); return false;
  }
  var displayName = p.name + (variantLabel ? ' (' + variantLabel + ')' : '');
  if (ex) ex.qty++;
  else cart.push({cartKey:cartKey, id:p.id, variantId:variantId||null, name:displayName, emoji:p.emoji, image:p.image_url||'', price:price, gst_rate:p.gst_rate||5, qty:1});
  sv(); uCart(); openCart();
  showToast('✅ ' + displayName + ' added!');
  return true;
}
function rmCart(id) { var sid=String(id); cart = cart.filter(function(x) { return String(x.cartKey||x.id) !== sid; }); sv(); uCart(); }
function chQty(id, d) {
  var sid = String(id);
  var i = cart.find(function(x) { return String(x.cartKey||x.id) === sid; });
  if (i) { i.qty += d; if (i.qty < 1) { rmCart(id); return; } }
  sv(); uCart();
}

// ── GST Calculation (GST inclusive) ──
function calcGST(cartItems) {
  // GST is already included in price — extract it
  // Formula: GST amount = price - (price / (1 + gst_rate/100))
  var gstByRate = {};
  var totalGST = 0;
  (cartItems || []).forEach(function(item) {
    var rate = item.gst_rate || 5;
    var priceExGST = item.price / (1 + rate / 100);
    var gstAmt = (item.price - priceExGST) * item.qty;
    if (gstAmt > 0) {
      gstByRate[rate] = (gstByRate[rate] || 0) + gstAmt;
      totalGST += gstAmt;
    }
  });
  return { total: Math.round(totalGST), byRate: gstByRate };
}

function calcDiscount(subtotal) {
  if (!activeCoupon) return 0;
  if (activeCoupon.min && subtotal < activeCoupon.min) return 0;
  if (activeCoupon.type === 'pct') {
    var disc = Math.round(subtotal * activeCoupon.val / 100);
    if (activeCoupon.maxDiscount) disc = Math.min(disc, activeCoupon.maxDiscount);
    return disc;
  }
  if (activeCoupon.type === 'flat') return Math.min(activeCoupon.val, subtotal);
  return 0;
}

function uCart() {
  var cnt = cart.reduce(function(a, i) { return a + i.qty; }, 0);
  var tot = cart.reduce(function(a, i) { return a + i.price * i.qty; }, 0);
  var discount = calcDiscount(tot);
  var final    = Math.max(0, tot - discount);

  if (activeCoupon) {
    var cs = document.getElementById('coupSaving');
    if (cs) cs.textContent = discount;
  }

  var totalSavings = cart.reduce(function(a, i) {
    var orig = (PRODUCTS.find(function(x) { return String(x.id) === String(i.id); }) || {original_price: i.price}).original_price || i.price;
    return a + (orig - i.price) * i.qty;
  }, 0) + discount;

  var savEl  = document.getElementById('cartSavings');
  var savAmt = document.getElementById('savingAmt');
  if (savEl && savAmt) {
    if (totalSavings > 0) { savEl.classList.add('show'); savAmt.textContent = totalSavings; }
    else savEl.classList.remove('show');
  }

  var cc = document.getElementById('cartCount');
  if (cc) cc.textContent = cnt;
  // ── Dynamic shipping ──
  var threshold   = (!isNaN(FREE_SHIP_THRESHOLD)) ? FREE_SHIP_THRESHOLD : 799;
  // If settings not yet loaded from DB, default to free shipping to avoid flash
  var settingsLoaded = (FREE_SHIP_THRESHOLD !== 799 || FLAT_SHIP_CHARGE !== 99);
  var shipCharge  = settingsLoaded ? ((final > 0 && threshold > 0 && final < threshold) ? ((!isNaN(FLAT_SHIP_CHARGE)) ? FLAT_SHIP_CHARGE : 99) : 0) : 0;
  var grandTotal  = final + shipCharge;
  var cv = document.getElementById('ctval');
  if (cv) cv.textContent = '₹' + final.toLocaleString('en-IN');
  // Update shipping row label
  var shipLbl = document.getElementById('shipLabel');
  if (shipLbl) {
    if (final <= 0)          shipLbl.textContent = 'Free';
    else if (shipCharge > 0) shipLbl.textContent = '₹' + shipCharge;
    else                     shipLbl.textContent = 'Free 🎉';
  }
  var cv2 = document.getElementById('ctvalTotal');
  if (cv2) cv2.textContent = '₹' + grandTotal.toLocaleString('en-IN');

  // ── GST breakdown in cart ──
  var gstInfo = calcGST(cart);
  var gstRow = document.getElementById('gstRow');
  var gstAmt = document.getElementById('gstAmt');
  var gstLbl = document.getElementById('gstLabel');
  if (gstRow && gstAmt && gstInfo.total > 0) {
    // Build label: "GST included (5%: ₹14, 12%: ₹24)"
    var rates = Object.keys(gstInfo.byRate);
    var lbl = 'GST included';
    if (rates.length === 1) {
      lbl = 'GST @' + rates[0] + '% (included)';
    } else if (rates.length > 1) {
      lbl = 'GST (included): ' + rates.map(function(r) {
        return r + '%=₹' + Math.round(gstInfo.byRate[r]);
      }).join(', ');
    }
    if (gstLbl) gstLbl.textContent = lbl;
    gstAmt.textContent = '₹' + gstInfo.total.toLocaleString('en-IN');
    gstRow.style.display = '';
  } else if (gstRow) {
    gstRow.style.display = 'none';
  }

  updateShipProgress(final);
  renderUpsell();

  // ── Min order amount banner ──
  var minBanner = document.getElementById('minOrderBanner');
  if (minBanner) {
    if (MIN_ORDER_AMOUNT > 0 && final < MIN_ORDER_AMOUNT && cart.length > 0) {
      var needed = MIN_ORDER_AMOUNT - final;
      minBanner.innerHTML = '🛒 Add <strong>₹' + needed + ' more</strong> to meet the minimum order of <strong>₹' + MIN_ORDER_AMOUNT + '</strong>';
      minBanner.style.display = '';
    } else {
      minBanner.style.display = 'none';
    }
  }

  var ciw = document.getElementById('ciw');
  if (!ciw) return;
  if (!cart.length) {
    ciw.innerHTML = '<div class="cempty"><span class="ceit">🛒</span><p>Your cart is empty</p><p style="font-size:12px;color:var(--tx3);margin-top:6px">Add some mountain goodness!</p></div>';
    return;
  }
  ciw.innerHTML = cart.map(function(i) {
    return '<div class="ci">' +
      '<div class="cimg">' + (i.image ? '<img src="' + i.image + '" alt="' + i.name + '" loading="lazy" style="width:100%;height:100%;object-fit:cover">' : '<span style="font-size:26px">' + (i.emoji||'🌿') + '</span>') + '</div>' +
      '<div class="cinf">' +
        '<div class="cname">' + i.name + '</div>' +
        '<div class="cprice">₹' + i.price + ' each</div>' +
        '<div class="cctrl">' +
          '<button class="qb" onclick="chQty(\'' + (i.cartKey||i.id) + '\',-1)">−</button>' +
          '<span class="qn">' + i.qty + '</span>' +
          '<button class="qb" onclick="chQty(\'' + (i.cartKey||i.id) + '\',1)">+</button>' +
          '<span class="crm" onclick="rmCart(\'' + (i.cartKey||i.id) + '\')">✕</span>' +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');
}

function showCartLoginBanner() {
  // Hide checkout buttons, show login banner
  var banner = document.getElementById('cart-login-banner');
  if (banner) {
    banner.style.display = 'block';
    banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  // Save intent to return to cart after login
  try { localStorage.setItem('pr_return_to', 'cart'); } catch(e) {}
  showToast('⚠️ Pehle login karo, cart safe hai!');
}

function cartLoginRedirect() {
  // Save cart state and open auth
  try { localStorage.setItem('pr_return_to', 'cart'); } catch(e) {}
  closeCart();
  openAuth();
}

function openCart() {
  var cp = document.getElementById('cartPage');
  if (cp) { cp.classList.add('open'); document.body.style.overflow = 'hidden'; }
  // Hide login banner if user is now logged in
  if (_authToken) {
    var banner = document.getElementById('cart-login-banner');
    if (banner) banner.style.display = 'none';
    // Always re-render addresses when cart opens (profile might have updated)
    if (_authProfile) { prefillDelivery(); renderSavedAddresses(); }
    else if (_authToken) {
      callAuth('get_profile', {}, true).then(function(d) {
        if (d && d.profile) {
          _authProfile = d.profile;
          try { localStorage.setItem('pr_auth_profile', JSON.stringify(d.profile)); } catch(e) {}
          prefillDelivery(); renderSavedAddresses();
        }
      }).catch(function(){});
    }
  }
  // If logged in but profile not loaded yet, fetch it first
  if (_authToken && !_authProfile) {
    callAuth('get_profile', {}, true).then(function(data) {
      _authProfile = data.profile;
      prefillDelivery();
      renderSavedAddresses();
    }).catch(function(){});
  } else {
    prefillDelivery();
    renderSavedAddresses();
  }
}

function getSavedAddresses() {
  // Get from profile (DB) - saved_addresses column in customers table
  try { return JSON.parse((_authProfile && _authProfile.saved_addresses) || '[]'); } catch(e) { return []; }
}

async function setSavedAddresses(addrs) {
  // Save to DB via update_profile
  var json = JSON.stringify(addrs);
  if (_authProfile) _authProfile.saved_addresses = json;
  if (_acctData && _acctData.profile) _acctData.profile.saved_addresses = json;
  try { await callAuth('update_profile', { saved_addresses: json }, true); } catch(e) { console.warn('Address save failed:', e); }
}

function renderSavedAddresses() {
  var bar   = document.getElementById('saved-addr-bar');
  var cards = document.getElementById('saved-addr-cards');
  if (!bar || !cards) return;
  if (!_authProfile) { bar.style.display = 'none'; return; }

  // Build address list
  var allAddrs = [];

  // 1. Default from profile fields
  var defPhone = (_authProfile.phone || '').replace(/^\+91/, '').replace(/\D/g,'').slice(-10);
  if (_authProfile.address_line1 || defPhone) {
    allAddrs.push({
      label: 'Default',
      name:  [_authProfile.first_name, _authProfile.last_name].filter(Boolean).join(' '),
      phone: defPhone,
      addr:  _authProfile.address_line1 || '',
      city:  _authProfile.city || '',
      state: _authProfile.state || '',
      pin:   _authProfile.postal_code || '',
      email: _authProfile.email || (_authUser && _authUser.email) || '',
    });
  }

  // 2. Extra saved addresses
  var extras = getSavedAddresses().filter(function(a){ return a.label !== 'Default'; });
  allAddrs = allAddrs.concat(extras);

  if (!allAddrs.length) { bar.style.display = 'none'; return; }
  bar.style.display = 'block';
  window._savedAddresses = allAddrs;

  // Render as clickable cards
  cards.innerHTML = allAddrs.map(function(a, idx) {
    var icon = a.label === 'Default' ? '🏠' : a.label === 'Parents' ? '👨‍👩‍👦' : a.label === 'Office' ? '🏢' : '📍';
    var addrLine = [a.addr, a.city, a.pin].filter(Boolean).join(', ');
    return '<div class="addr-card" id="addr-card-' + idx + '" onclick="selectAddressCard(' + idx + ')" style="border:2px solid #e8e8e8;border-radius:12px;padding:11px 14px;cursor:pointer;transition:all .2s;background:#fafafa">' +
      '<div style="display:flex;align-items:center;justify-content:space-between">' +
        '<div style="display:flex;align-items:center;gap:8px">' +
          '<span style="font-size:18px">' + icon + '</span>' +
          '<span style="font-weight:800;font-size:13px;color:#1a3a1e">' + (a.label || 'Address '+(idx+1)) + '</span>' +
        '</div>' +
        '<div id="addr-tick-' + idx + '" style="display:none;color:#2d6a4f;font-weight:900;font-size:16px">✓</div>' +
      '</div>' +
      '<div style="font-size:12px;color:#555;margin-top:4px;padding-left:26px">' + (a.name ? a.name + ' · ' : '') + addrLine + '</div>' +
    '</div>';
  }).join('');

  // Auto-select first address
  selectAddressCard(0);
}

function selectAddressCard(idx) {
  // Reset all cards
  (window._savedAddresses || []).forEach(function(_, i) {
    var card = document.getElementById('addr-card-' + i);
    var tick = document.getElementById('addr-tick-' + i);
    if (card) { card.style.border = '2px solid #e8e8e8'; card.style.background = '#fafafa'; }
    if (tick) tick.style.display = 'none';
  });
  // Highlight selected
  var selCard = document.getElementById('addr-card-' + idx);
  var selTick = document.getElementById('addr-tick-' + idx);
  if (selCard) { selCard.style.border = '2px solid #2d6a4f'; selCard.style.background = '#f0f7f4'; }
  if (selTick) selTick.style.display = 'block';
  // Fill form
  fillSavedAddress(idx);
}

function fillSavedAddress(idx) {
  if (idx === '' || idx === null || idx === undefined) return;
  var a = (window._savedAddresses || [])[parseInt(idx)];
  if (!a) return;
  var phone = (a.phone || '').replace(/^\+91/, '').replace(/\D/g,'').slice(-10);
  var map = { 'del-name': a.name, 'del-phone': phone, 'del-addr': a.addr, 'del-city': a.city, 'del-state': a.state, 'del-pin': a.pin, 'del-email': a.email };
  Object.entries(map).forEach(function(kv) {
    var el = document.getElementById(kv[0]); if (!el) return;
    var val = kv[1] || '';
    if (el.tagName === 'SELECT') {
      var matched = false;
      for (var i = 0; i < el.options.length; i++) {
        if (el.options[i].value === val || el.options[i].text === val) { el.selectedIndex = i; matched = true; break; }
      }
      if (!matched) el.selectedIndex = 0;
    } else { el.value = val; }
  });
}

function showNewAddressForm() {
  // Clear fields for new address entry
  ['del-name','del-phone','del-addr','del-city','del-state','del-pin','del-email'].forEach(function(id){
    var el = document.getElementById(id); if(el) el.value = '';
  });
  document.getElementById('del-name') && document.getElementById('del-name').focus();
  showToast('Naya address daalo 👇');
}
function closeCart() {
  var cp = document.getElementById('cartPage');
  if (cp) { cp.classList.remove('open'); document.body.style.overflow = ''; }
  // Restore hero/main visibility (hidden when page loaded with ?opencart=1)
  document.querySelectorAll('.hero,.pgrid,.section,.trust,.ticker,.ann').forEach(function(el){
    el.style.visibility = '';
  });
  // Clean URL
  if (window.location.search.includes('opencart=1')) {
    history.replaceState(null, '', '/');
  }
}


// ── RAZORPAY PAYMENT ────────────────────────────────────────────────
async function checkoutRazorpay() {
  if (!cart.length) { showToast('🛒 Cart is empty!'); return; }
  if (!_authToken) { showCartLoginBanner(); return; }
  if (_orderProcessing) { showToast('⏳ Processing, please wait…'); return; }

  // Min order check
  var rzpSubtotal = cart.reduce(function(a,i){return a+i.price*i.qty;},0);
  if (MIN_ORDER_AMOUNT > 0 && rzpSubtotal < MIN_ORDER_AMOUNT) {
    showToast('🛒 Minimum order is ₹' + MIN_ORDER_AMOUNT + '. Add ₹' + (MIN_ORDER_AMOUNT - rzpSubtotal) + ' more.');
    return;
  }

  var name  = (document.getElementById('del-name') ||{}).value||'';
  var phone = (document.getElementById('del-phone')||{}).value||'';
  var addr  = (document.getElementById('del-addr') ||{}).value||'';
  var city  = (document.getElementById('del-city') ||{}).value||'';
  var pin   = (document.getElementById('del-pin')  ||{}).value||'';
  var state = (document.getElementById('del-state')||{}).value||'';
  var email = (document.getElementById('del-email')||{}).value||'';

  var err = false;
  ['del-name','del-phone','del-addr','del-city','del-pin'].forEach(function(id){
    var el = document.getElementById(id);
    if(el && !el.value.trim()){ el.classList.add('req-err'); err=true; }
    else if(el) el.classList.remove('req-err');
  });
  if(err){ showToast('📍 Please fill in all delivery details'); document.getElementById('del-form').scrollIntoView({behavior:'smooth',block:'center'}); return; }
  if(phone.replace(/\D/g,'').length < 10){ showToast('📱 Enter valid 10-digit phone'); return; }

  var t = cart.reduce(function(a,i){return a+i.price*i.qty;},0);
  var discount   = calcDiscount(t);
  var subtotal   = Math.max(0, t - discount);
  var threshold  = (!isNaN(FREE_SHIP_THRESHOLD)) ? FREE_SHIP_THRESHOLD : 799;
  var shipCharge = (subtotal > 0 && threshold > 0 && subtotal < threshold) ? ((!isNaN(FLAT_SHIP_CHARGE)) ? FLAT_SHIP_CHARGE : 99) : 0;
  var final      = subtotal + shipCharge;
  var gstAmount  = calcGST(cart).total; // GST already included in price

  // Issue 21 fix: re-fetch stock before opening Razorpay — frontend data may be stale
  try {
    var rzpStockRes = await fetch('/api/admin-api', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        action: 'check_stock',
        items: cart.map(function(i){ return {variantId:i.variantId||null, qty:i.qty, name:i.name||''}; })
      })
    });
    var rzpStockData = await rzpStockRes.json();
    if (!rzpStockRes.ok) {
      showToast('⚠️ ' + (rzpStockData.error || 'Some items are out of stock. Please update your cart.'));
      return;
    }
  } catch(e) { /* network error — proceed, server will validate at save */ }

  var options = {
    key: _RAZORPAY_KEY,
    amount: final * 100, // paise
    currency: 'INR',
    name: '5 Pahadi Roots',
    description: 'Himalayan Organic Products',
    image: 'https://pahadiroots.com/favicon.ico',
    prefill: {
      name: name.trim(),
      contact: phone.trim(),
      email: email.trim() || 'customer@pahadiroots.com'
    },
    notes: {
      address: addr.trim()+', '+city.trim()+', '+state+' - '+pin.trim()
    },
    theme: { color: '#2d6a4f' },
    handler: async function(response) {
      showToast('✅ Payment successful! Saving order...');
      var cartSnapshot = cart.slice(); // snapshot before clearing
      var orderResult = await saveOrderToDB(name, phone, email, addr, city, state, pin, final, discount, shipCharge, 'razorpay_online', response.razorpay_payment_id, cartSnapshot, gstAmount);
      var orderId = (orderResult && orderResult.orderId) || '';
      var orderNumber = (orderResult && orderResult.orderNumber) || '';
      // Send WhatsApp confirmation
      var shipLine = shipCharge > 0 ? '\n🚚 Shipping: ₹' + shipCharge : '\n🚚 Shipping: FREE';
      var msg = '✅ *Payment Confirmed — 5 Pahadi Roots* 🌿\n\n'+
        '✅ *Payment ID:* '+response.razorpay_payment_id+'\n'+
        '👤 *'+name.trim()+'*\n📱 '+phone.trim()+'\n\n'+
        '📍 '+addr.trim()+', '+city.trim()+' - '+pin.trim()+'\n\n'+
        '🛒 *Items*\n'+
        cartSnapshot.map(function(i){return '• '+i.name+' ×'+i.qty+' = ₹'+(i.price*i.qty);}).join('\n')+
        shipLine + '\n\n*Total Paid: ₹'+final+'*';
      cart = []; uCart();
      try{ localStorage.removeItem('pr_cart'); }catch(e){}
      try{ localStorage.removeItem('pr_cust_info'); }catch(e){}
      ['del-name','del-phone','del-addr','del-city','del-state','del-pin','del-email'].forEach(function(id){
        var el = document.getElementById(id); if(el) el.value='';
      });
      activeCoupon = null;
      // Mark abandoned cart as converted
      try { var _ct = localStorage.getItem('pr_auth_token'); if(_ct) fetch('/api/abandoned-cart',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'converted',token:_ct})}).catch(function(){}); } catch(e) {}
      var cf = document.getElementById('coupForm'); if(cf) cf.style.display='block';
      var ca = document.getElementById('coupApplied'); if(ca) ca.style.display='none';
      _orderProcessing = false;
      window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text='+encodeURIComponent(msg),'_blank');
      // Send confirmation email (non-blocking)
      sendOrderEmail({ email: email, orderNumber: orderNumber, orderId: orderId, name: name, items: cartSnapshot, total: final, discount: discount, shipping: shipCharge, gstAmount: gstAmount||0, address: addr, city: city, state: state, pin: pin, payMethod: 'razorpay_online' });
      // Redirect to order confirmation page
      var confUrl = '/order-confirmation?id=' + (orderId||'') + '&num=' + encodeURIComponent(orderNumber||'') + '&total=' + final + '&payment=' + encodeURIComponent(response.razorpay_payment_id||'');
      setTimeout(function(){ window.location.href = confUrl; }, 600);
    },
    modal: {
      ondismiss: function(){ _orderProcessing = false; showToast('Payment cancelled'); }
    }
  };

  var rzp = new Razorpay(options);
  _orderProcessing = true;
  rzp.on('payment.failed', function(){ _orderProcessing = false; });
  rzp.open();
}

// ── SAVE ORDER TO DB (shared by both payment methods) ───────────────
async function saveOrderToDB(name, phone, email, addr, city, state, pin, final, discount, shipCharge, payMethod, paymentId, cartSnapshot, gstAmount) {
  try {
    var itemsToSave = (cartSnapshot || cart);
    var endpoint = '/api/admin-api';
    var res = await fetch(endpoint, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        action: 'save_order',
        name, phone, email, addr, city, state, pin,
        final, discount, shipCharge: shipCharge || 0, payMethod, paymentId,
        gstAmount: gstAmount || 0,
        couponCode: activeCoupon ? activeCoupon.code : null,
        auth_user_id: (_authUser && _authUser.id) ? _authUser.id : null,
        items: itemsToSave.map(function(i){ return {id:i.id||null, variantId:i.variantId||null, qty:i.qty, price:i.price, name:i.name||''}; })
      })
    });
    var data = await res.json();
    if(!res.ok) {
      // Surface stock error clearly to user
      var errMsg = (data && data.error) || 'Order could not be placed. Please try again.';
      showToast('⚠️ ' + errMsg);
      console.warn('Order save failed:', errMsg);
      return null;
    }
    return { orderId: data.orderId || null, orderNumber: data.orderNumber || null };
  } catch(e) {
    showToast('⚠️ Order could not be placed. Please check your connection.');
    console.warn('Order save failed:', e.message);
    return null;
  }
}


// ── Send Order Confirmation Email ────────────────────────────
async function sendOrderEmail(opts) {
  if (!opts.email || !opts.email.includes('@')) return; // skip if no valid email
  try {
    // Get email from auth profile or delivery form
    var emailTo = (opts.email || '').trim();
    if (!emailTo && _authUser && _authUser.email) emailTo = _authUser.email;
    if (!emailTo || !emailTo.includes('@')) return; // no email, skip silently
    await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'order_confirmation',
        to: emailTo,
        orderNumber: opts.orderNumber || '',
        orderId: opts.orderId || '',
        name: opts.name || '',
        items: opts.items || [],
        total: opts.total || 0,
        discount: opts.discount || 0,
        shipping: opts.shipping || 0,
        gstAmount: opts.gstAmount || 0,
        address: opts.address || '',
        city: opts.city || '',
        state: opts.state || '',
        pin: opts.pin || '',
        payMethod: opts.payMethod || ''
      })
    });
  } catch(e) { console.warn('Email send failed (non-critical):', e.message); }
}

async function checkout() {
  if (!cart.length) { showToast('🛒 Cart is empty!'); return; }
  if (!_authToken) { showCartLoginBanner(); return; }
  if (_orderProcessing) { showToast('⏳ Processing, please wait…'); return; }
  _orderProcessing = true;

  // Min order check
  var codSubtotal = cart.reduce(function(a,i){return a+i.price*i.qty;},0);
  if (MIN_ORDER_AMOUNT > 0 && codSubtotal < MIN_ORDER_AMOUNT) {
    _orderProcessing = false;
    showToast('🛒 Minimum order is ₹' + MIN_ORDER_AMOUNT + '. Add ₹' + (MIN_ORDER_AMOUNT - codSubtotal) + ' more.');
    return;
  }

  // Validate delivery fields
  var name  = (document.getElementById('del-name') ||{}).value||'';
  var phone = (document.getElementById('del-phone')||{}).value||'';
  var addr  = (document.getElementById('del-addr') ||{}).value||'';
  var city  = (document.getElementById('del-city') ||{}).value||'';
  var pin   = (document.getElementById('del-pin')  ||{}).value||'';
  var state = (document.getElementById('del-state')||{}).value||'';
  var email = (document.getElementById('del-email')||{}).value||'';

  var err = false;
  ['del-name','del-phone','del-addr','del-city','del-pin'].forEach(function(id){
    var el = document.getElementById(id);
    if(el && !el.value.trim()){ el.classList.add('req-err'); err=true; }
    else if(el) el.classList.remove('req-err');
  });
  if(err){ _orderProcessing = false; showToast('📍 Please fill in all delivery details'); document.getElementById('del-form').scrollIntoView({behavior:'smooth',block:'center'}); return; }
  if(phone.replace(/\D/g,'').length < 10){ _orderProcessing = false; showToast('📱 Enter a valid 10-digit phone number'); document.getElementById('del-phone').classList.add('req-err'); return; }

  var t = cart.reduce(function(a, i) { return a + i.price * i.qty; }, 0);
  var discount   = calcDiscount(t);
  var subtotal   = Math.max(0, t - discount);
  var threshold  = (!isNaN(FREE_SHIP_THRESHOLD)) ? FREE_SHIP_THRESHOLD : 799;
  var shipCharge = (subtotal > 0 && threshold > 0 && subtotal < threshold) ? ((!isNaN(FLAT_SHIP_CHARGE)) ? FLAT_SHIP_CHARGE : 99) : 0;
  var final      = subtotal + shipCharge;
  // Snapshot cart BEFORE gstAmount calc — must come first
  var cartSnapshot = cart.slice();
  var gstAmount  = calcGST(cartSnapshot).total; // GST inclusive — for invoice
  var couponLine = activeCoupon ? '\n🎟️ Coupon ' + activeCoupon.code + ': -₹' + discount : '';
  var shipLine   = shipCharge > 0 ? '\n🚚 Shipping: ₹' + shipCharge : '\n🚚 Shipping: FREE';

  var msg = '*New Order — 5 Pahadi Roots* 🌿\n\n' +
    '👤 *' + name.trim() + '*\n' +
    '📱 ' + phone.trim() + '\n' +
    (email ? '📧 ' + email.trim() + '\n' : '') +
    '\n📍 *Delivery Address*\n' +
    addr.trim() + ', ' + city.trim() +
    (state ? ', ' + state.trim() : '') +
    ' — ' + pin.trim() + '\n\n' +
    '🛒 *Items*\n' +
    cart.map(function(i) { return '• ' + i.name + ' ×' + i.qty + ' = ₹' + (i.price*i.qty); }).join('\n') +
    couponLine + shipLine + '\n\n*Total: ₹' + final + '*\n\nPlease confirm my order!';

  // Save customer info locally for repeat use
  try { localStorage.setItem('pr_cust_info', JSON.stringify({name:name.trim(),phone:phone.trim(),addr:addr.trim(),city:city.trim(),state:state.trim(),pin:pin.trim(),email:email.trim()})); } catch(e){}


  // Quick stock check before proceeding — avoids showing success then error
  try {
    var stockCheckRes = await fetch('/api/admin-api', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        action: 'check_stock',
        items: cartSnapshot.map(function(i){ return {variantId:i.variantId||null, qty:i.qty, name:i.name||''}; })
      })
    });
    var stockData = await stockCheckRes.json();
    if (!stockCheckRes.ok) {
      _orderProcessing = false;
      showToast('⚠️ ' + (stockData.error || 'Some items are out of stock. Please update your cart.'));
      return;
    }
  } catch(e) { /* network error — proceed, server will validate */ }

  // Open WhatsApp IMMEDIATELY — no waiting for DB
  var payMsg = msg + '\n\n💵 *Payment: Cash on Delivery*';
  window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(payMsg), '_blank');

  // Clear cart right away
  cart = []; uCart();
  try{ localStorage.removeItem('pr_cart'); }catch(e){}
  try{ localStorage.removeItem('pr_cust_info'); }catch(e){}
  ['del-name','del-phone','del-addr','del-city','del-state','del-pin','del-email'].forEach(function(id){
    var el = document.getElementById(id); if(el) el.value = '';
  });
  activeCoupon = null;
      // Mark abandoned cart as converted
      try { var _ct = localStorage.getItem('pr_auth_token'); if(_ct) fetch('/api/abandoned-cart',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'converted',token:_ct})}).catch(function(){}); } catch(e) {}
  var cf = document.getElementById('coupForm'); if(cf) cf.style.display='block';
  var ca = document.getElementById('coupApplied'); if(ca) ca.style.display='none';
  var ci = document.getElementById('coupInp'); if(ci) ci.value='';
  _orderProcessing = false;
  showToast('✅ Order placed! Redirecting...');

  // Save to DB and redirect to confirmation page
  saveOrderToDB(name, phone, email, addr, city, state, pin, final, discount, shipCharge, 'whatsapp_cod', null, cartSnapshot, gstAmount)
    .then(function(result) {
      var orderId = (result && result.orderId) || '';
      var orderNumber = (result && result.orderNumber) || '';
      // Send confirmation email (non-blocking)
      sendOrderEmail({ email: email, orderNumber: orderNumber, orderId: orderId, name: name, items: cartSnapshot, total: final, discount: discount, shipping: shipCharge, gstAmount: gstAmount||0, address: addr, city: city, state: state, pin: pin, payMethod: 'whatsapp_cod' });
      var confUrl = '/order-confirmation?id=' + orderId + '&num=' + encodeURIComponent(orderNumber) + '&total=' + final;
      setTimeout(function(){ window.location.href = confUrl; }, 600);
    })
    .catch(function(e) {
      console.warn('DB save failed:', e);
      setTimeout(function(){ window.location.href = '/order-confirmation?total=' + final; }, 600);
    });
}
// Pre-fill delivery form from saved info

// ── COUPON ──────────────────────────────────────────────────────────
function applyCoupon() {
  var code = (document.getElementById('coupInp')||{value:''}).value.trim().toUpperCase();
  var msg  = document.getElementById('coupMsg');
  if (!code) { if(msg){msg.className='coup-msg coup-bad';msg.textContent='Enter a coupon code';} return; }
  var c = COUPONS[code];
  if (!c) { if(msg){msg.className='coup-msg coup-bad';msg.textContent='❌ Invalid coupon code';} return; }
  var subtotal = cart.reduce(function(a,i){return a+i.price*i.qty;},0);
  if (c.min && subtotal < c.min) { if(msg){msg.className='coup-msg coup-bad';msg.textContent='❌ Min order ₹'+c.min+' required';} return; }
  // Bug #7 fix: validate first-order-only coupons
  if (c.firstOrderOnly) {
    if (!_authToken) {
      if(msg){msg.className='coup-msg coup-bad';msg.textContent='❌ Login required to use this coupon';}
      return;
    }
    // Check order history via auth API
    callAuth('get_profile', {}, true).then(function(d) {
      var profile = d && d.profile;
      var hasOrders = profile && profile.order_count && profile.order_count > 0;
      if (hasOrders) {
        if(msg){msg.className='coup-msg coup-bad';msg.textContent='❌ This coupon is valid for first order only';}
        return;
      }
      // First order — apply coupon
      _applyValidCoupon(code, c, msg);
    }).catch(function() {
      // If profile check fails, still allow — don't block checkout for API errors
      _applyValidCoupon(code, c, msg);
    });
    return;
  }
  _applyValidCoupon(code, c, msg);
}

function _applyValidCoupon(code, c, msg) {
  activeCoupon = Object.assign({code:code}, c);
  var cf = document.getElementById('coupForm');
  var ca = document.getElementById('coupApplied');
  var cc = document.getElementById('coupCode');
  if(cf) cf.style.display='none';
  if(ca) ca.style.display='block';
  if(cc) cc.textContent = code;
  uCart();
  showToast('🎟️ Coupon ' + code + ' applied!');
}
function resetOrderSummary() {
  // Reset coupon
  activeCoupon = null;
  var cf = document.getElementById('coupForm'); if(cf) cf.style.display='block';
  var ca = document.getElementById('coupApplied'); if(ca) ca.style.display='none';
  var ci = document.getElementById('coupInp'); if(ci) ci.value='';
  var cm = document.getElementById('coupMsg'); if(cm) cm.textContent='';
  // Reset delivery form
  ['del-name','del-phone','del-addr','del-city','del-state','del-pin','del-email'].forEach(function(id){
    var el = document.getElementById(id); if(el) el.value='';
  });
  uCart();
  showToast('Order summary reset!');
}

function removeCoupon() {
  activeCoupon = null;
  var cf = document.getElementById('coupForm');
  var ca = document.getElementById('coupApplied');
  var ci = document.getElementById('coupInp');
  var cm = document.getElementById('coupMsg');
  if(cf) cf.style.display='block';
  if(ca) ca.style.display='none';
  if(ci) ci.value = '';
  if(cm) cm.textContent = '';
  uCart();
}

// ── FREE SHIPPING PROGRESS ─────────────────────────────────────────
var FREE_SHIP_MIN = 799;  // legacy alias — real value is FREE_SHIP_THRESHOLD loaded from DB

// Update all hardcoded shipping amount displays after DB settings load
function updateShipAmountDisplays() {
  var amt = FREE_SHIP_THRESHOLD;
  if (!amt && amt !== 0) return;
  var freeAll = (amt === 0);
  // Update all .dynShipAmt spans
  document.querySelectorAll('.dynShipAmt').forEach(function(el) {
    el.textContent = freeAll ? 'all orders' : amt;
  });
  // Update announcement bar
  var ann = document.getElementById('annShipAmt');
  if (ann) {
    if (freeAll) {
      ann.parentElement.innerHTML = '🌿 Free Shipping on all orders! &nbsp;|&nbsp; <a href="#pay-sec">UPI · Cards · COD</a> &nbsp;|&nbsp; 10 Himalayan States Covered';
    } else {
      ann.textContent = amt;
    }
  }
  // Update ticker items
  document.querySelectorAll('.ticker-item').forEach(function(el) {
    if (el.textContent.indexOf('Free shipping') !== -1) {
      el.innerHTML = freeAll
        ? '🚚 Free shipping <span>·</span> On all orders — Pan India'
        : '🚚 Free shipping <span>·</span> On orders above ₹<span class="dynShipAmt">' + amt + '</span> — Pan India';
    }
  });
  // Update trust bar
  var tds = document.querySelector('.tc .tds');
  if (tds && tds.textContent.indexOf('orders above') !== -1) {
    tds.innerHTML = freeAll ? 'On all orders' : 'On orders above ₹<span class="dynShipAmt">' + amt + '</span>';
  }
  // Update shipLabel in cart
  var lbl = document.getElementById('shipLabel');
  if (lbl) {
    lbl.innerHTML = freeAll
      ? '🎉 Free on all orders!'
      : 'Free on ₹<span class="dynShipAmt">' + amt + '</span>+';
  }
  // Re-run progress bar with current cart
  var subtotal = cart.reduce(function(a,i){return a+i.price*i.qty;},0);
  var discount = calcDiscount(subtotal);
  updateShipProgress(Math.max(0, subtotal - discount));
}

function updateShipProgress(subtotal) {
  var threshold = (!isNaN(FREE_SHIP_THRESHOLD)) ? FREE_SHIP_THRESHOLD : 799;
  var fill = document.getElementById('shipFill');
  var txt  = document.getElementById('shipTxt');
  if (!fill || !txt) return;
  if (threshold === 0) {
    fill.style.width = '100%';
    txt.innerHTML = '🎉 <span>Free shipping on all orders!</span>';
    return;
  }
  var pct = Math.min(100, Math.round(subtotal / threshold * 100));
  fill.style.width = pct + '%';
  if (subtotal >= threshold) {
    txt.innerHTML = '🎉 <span>Free shipping unlocked!</span>';
  } else {
    txt.innerHTML = 'Add ₹<span>' + (threshold - subtotal) + '</span> more for FREE shipping 🚚';
  }
}

// ── CART UPSELL ─────────────────────────────────────────────────────
function renderUpsell() {
  var section = document.getElementById('cartUpsell');
  var strip   = document.getElementById('cuStrip');
  if (!section || !strip) return;
  var cartIds = new Set(cart.map(function(i) { return i.id; }));
  var suggestions = PRODUCTS.filter(function(p) { return !cartIds.has(p.id); }).slice(0, 5);
  if (!suggestions.length) { section.style.display = 'none'; return; }
  section.style.display = 'block';
  strip.innerHTML = suggestions.map(function(p) {
    var imgHtml = p.image_url ? ('<img src="'+p.image_url+'" loading="lazy" style="width:100%;height:100%;object-fit:cover">') : ('<span style="font-size:28px">'+(p.emoji||'🌿')+'</span>');
    var addBtn = '<button onclick="addToCart(\'' + p.id + '\')" style="margin-top:6px;background:var(--g);color:#fff;border:none;border-radius:6px;padding:4px 10px;font-size:11px;font-weight:600;cursor:pointer;width:100%">+ Add</button>';
    return '<div class="cu-item"><div class="cu-img">'+imgHtml+'</div><div class="cu-name">'+p.name+'</div><div class="cu-price">&#8377;'+p.price+'</div>'+addBtn+'</div>';
  }).join('');
}

// ── SEARCH ──────────────────────────────────────────────────────────
function openSearch() {
  document.getElementById('srchOverlay').classList.add('open');
  setTimeout(function() { var i = document.getElementById('srchInp'); if(i) i.focus(); }, 80);
}
function closeSearch() {
  document.getElementById('srchOverlay').classList.remove('open');
  var i = document.getElementById('srchInp');
  if (i) i.value = '';
  var r = document.getElementById('srchRes');
  if (r) r.innerHTML = '<div class="srch-hint">Start typing to search across all Himalayan products</div>';
}
function handleSrchOvClick(e) { if (e.target === document.getElementById('srchOverlay')) closeSearch(); }
function srchKey(e) { if (e.key === 'Escape') closeSearch(); }
function onSearch(q) {
  var res = document.getElementById('srchRes');
  q = q.trim().toLowerCase();
  if (!q) { if(res) res.innerHTML = '<div class="srch-hint">Start typing to search across all Himalayan products</div>'; return; }
  var hits = PRODUCTS.filter(function(p) {
    return p.name.toLowerCase().includes(q) || (p.description||'').toLowerCase().includes(q) || (p.region||'').toLowerCase().includes(q);
  }).slice(0, 7);
  if (!hits.length) { if(res) res.innerHTML = '<div class="srch-empty">No products found for "' + q + '"</div>'; return; }
  if (!res) return;
  res.innerHTML = hits.map(function(p) {
    return '<div class="srch-item" onclick="closeSearch();goToProductPage(\'' + getProductSlug(p) + '\')" style="cursor:pointer">' +
      '<div class="srch-thumb">' + (p.image_url ? '<img src="' + p.image_url + '" alt="' + p.name + '" loading="lazy">' : (p.emoji||'🌿')) + '</div>' +
      '<div><div class="srch-iname">' + p.name + '</div>' +
      '<div class="srch-iregion">📍 ' + (p.region||'') + '</div>' +
      '<div class="srch-iprice">₹' + p.price + (p.unit||'') + '</div></div>' +
    '</div>';
  }).join('') + '<div class="srch-hint">' + hits.length + ' result' + (hits.length>1?'s':'') + ' · Click to view details</div>';
}

// ── WISHLIST ─────────────────────────────────────────────────────────
function toggleWishlist(id) {
  var sid = String(id);
  var idx = wishlist.findIndex(function(x){ return String(x) === sid; });
  if (idx > -1) { wishlist.splice(idx, 1); showToast('💔 Removed from wishlist'); }
  else { wishlist.push(sid); showToast('❤️ Added to wishlist!'); }
  svWL(); updateWLBadge(); updateAllWLButtons();
}
function updateWLBadge() {
  var b = document.getElementById('wlBadge');
  if (!b) return;
  if (wishlist.length) { b.textContent = wishlist.length; b.classList.add('show'); }
  else b.classList.remove('show');
}
function updateAllWLButtons() {
  document.querySelectorAll('.wl-btn').forEach(function(btn) {
    var sid = String(btn.dataset.id || '');
    var inWL = wishlist.findIndex(function(x){ return String(x) === sid; }) > -1;
    btn.textContent = inWL ? '❤️' : '🤍';
    btn.classList.toggle('active', inWL);
  });
}
function openWishlist() {
  renderWishlist();
  document.getElementById('wlDrw').classList.add('open');
  document.getElementById('cov').style.display = 'block';
}
function closeWishlist() {
  document.getElementById('wlDrw').classList.remove('open');
  document.getElementById('cov').style.display = 'none';
}
function renderWishlist() {
  var body = document.getElementById('wlBody');
  if (!body) return;
  var items = PRODUCTS.filter(function(p) { return wishlist.findIndex(function(x){ return String(x) === String(p.id); }) > -1; });
  if (!items.length) {
    body.innerHTML = '<div class="wl-empty"><span style="font-size:48px;display:block;margin-bottom:12px;opacity:.3">🤍</span><p>Your wishlist is empty</p><p style="font-size:12px;color:var(--tx3);margin-top:6px">Tap 🤍 on any product to save it</p></div>';
    return;
  }
  body.innerHTML = '<div class="wl-grid">' + items.map(function(p) {
    return '<div class="wl-card" onclick="closeWishlist();goToProductPage(\'' + getProductSlug(p) + '\')" style="cursor:pointer">' +
      '<button class="wl-irm" onclick="event.stopPropagation();toggleWishlist(\'' + p.id + '\');renderWishlist()">✕</button>' +
      '<div class="wl-img">' + (p.image_url ? '<img src="' + p.image_url + '" alt="' + p.name + '" loading="lazy">' : (p.emoji||'🌿')) + '</div>' +
      '<div class="wl-info"><div class="wl-iname">' + p.name + '</div><div class="wl-iprice">₹' + p.price + '</div>' +
      '<button class="wl-iadd" onclick="event.stopPropagation();addToCart(\'' + p.id + '\')" >Add to Cart</button></div>' +
    '</div>';
  }).join('') + '</div>';
}

// ── QUICK VIEW ────────────────────────────────────────────────────────
var qvQty = 1;
function openQV(id) {
  var sid = String(id);
  var p = PRODUCTS.find(function(x) { return String(x.id) === sid; });
  if (!p) return;
  qvQty = 1;
  addToRecent(p);
  var pct = p.original_price ? Math.round((1 - p.price / p.original_price) * 100) : 0;
  var inWL = wishlist.findIndex(function(x){ return String(x) === String(p.id); }) > -1;
  var stock = (p.stock !== undefined && p.stock !== null) ? p.stock : 99;
  var stockClass = stock <= 0 ? 'out' : stock > 20 ? 'in' : 'low';
  var stockTxt   = stock <= 0 ? '❌ Out of Stock' : stock > 20 ? '✅ In Stock' : ('⚠️ Only ' + stock + ' left');
  var box = document.getElementById('qvBox');
  if (!box) return;
  box.innerHTML = '<div style="position:relative">' +
    '<button class="qv-close" onclick="closeQV()">✕</button>' +
    '<div class="qv-inner">' +
      '<div class="qv-img-col">' + (p.emoji||'🌿') +
        (p.image_url ? '<img src="' + p.image_url + '" alt="' + p.name + '" loading="lazy" onerror="this.style.display=\'none\'">' : '') +
      '</div>' +
      '<div class="qv-content">' +
        '<div class="qv-region">📍 ' + (p.region||'') + '</div>' +
        '<div class="qv-name">' + p.name + '</div>' +
        '<div class="qv-stars">★★★★★</div>' +
        '<div class="qv-price-row"><span class="qv-price">₹' + p.price + '</span>' +
          (p.original_price ? '<span class="qv-was">₹' + p.original_price + '</span><span class="qv-save">Save ' + pct + '%</span>' : '') +
        '</div>' +
        '<div class="qv-unit">' + (p.unit||'') + '</div>' +
        '<div class="qv-desc">' + (p.description||'') + '</div>' +
        '<div class="qv-stock ' + stockClass + '">' + stockTxt + '</div>' +
        '<div class="qv-qty-row">' +
          '<button class="qv-qb" onclick="chQvQty(-1)">−</button>' +
          '<span class="qv-qn" id="qvQtyDisplay">1</span>' +
          '<button class="qv-qb" onclick="chQvQty(1)">+</button>' +
          '<button class="qv-atc" onclick="addToCartQty(\'' + p.id + '\',qvQty);closeQV()">Add to Cart</button>' +
          '<button class="qv-wl" onclick="toggleWishlist(\'' + p.id + '\');this.textContent=wishlist.findIndex(function(x){return String(x)===String(\'' + p.id + '\')})>-1?\'❤️\':\'🤍\'" title="Wishlist">' + (inWL?'❤️':'🤍') + '</button>' +
        '</div>' +
        '<div class="pin-row">' +
          '<span style="font-size:12px;color:var(--tx3);white-space:nowrap">📦 Check delivery:</span>' +
          '<input class="pin-inp" id="pinInp" placeholder="Enter pincode" maxlength="6" onkeydown="if(event.key===\'Enter\')checkPin()">' +
          '<button class="pin-chk" onclick="checkPin()">Check</button>' +
        '</div>' +
        '<div class="pin-res" id="pinRes"></div>' +
        '<div class="qv-tags">' +
          (p.badge_label ? '<span class="qv-tag">' + p.badge_label + '</span>' : '') +
          '<span class="qv-tag">🌿 Natural</span><span class="qv-tag">🏔️ Himalayan</span><span class="qv-tag">🚚 Free Shipping ₹' + (FREE_SHIP_THRESHOLD || '') + (FREE_SHIP_THRESHOLD > 0 ? '+' : ' on all orders!') + '</span>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>';
  document.getElementById('qvOv').classList.add('open');
}
function closeQV() { document.getElementById('qvOv').classList.remove('open'); }
function handleQvClick(e) { if (e.target === document.getElementById('qvOv')) closeQV(); }
function chQvQty(d) { qvQty = Math.max(1, qvQty + d); var el = document.getElementById('qvQtyDisplay'); if(el) el.textContent = qvQty; }
function addToCartQty(id, qty) {
  var sid = String(id);
  var p = PRODUCTS.find(function(x) { return String(x.id) === sid; });
  if (!p) return;
  var stockNum = (p.stock !== undefined && p.stock !== null) ? Number(p.stock) : null;
  if (stockNum !== null && !isNaN(stockNum) && stockNum <= 0) {
    showToast('⚠️ This product is out of stock!'); return;
  }
  var cartKey = sid;
  var ex = cart.find(function(x) { return String(x.cartKey) === cartKey; });
  var currentQty = ex ? ex.qty : 0;
  var addQty = (stockNum !== null && !isNaN(stockNum)) ? Math.min(qty, stockNum - currentQty) : qty;
  if (addQty <= 0) { showToast('⚠️ Only ' + stockNum + ' in stock!'); return; }
  if (ex) ex.qty += addQty;
  else cart.push({id:p.id, name:p.name, emoji:p.emoji, image:p.image_url||'', price:p.price, gst_rate:p.gst_rate||5, qty:addQty, cartKey:cartKey, variantId:null});
  sv(); uCart(); openCart();
  showToast('✅ ' + p.name + ' × ' + addQty + ' added!');
}

// ── PINCODE CHECKER ────────────────────────────────────────────────
function checkPin() {
  var pin = (document.getElementById('pinInp')||{value:''}).value.trim();
  var res = document.getElementById('pinRes');
  if (!pin || pin.length !== 6 || isNaN(pin)) { if(res){res.className='pin-res fail';res.textContent='Enter a valid 6-digit pincode';res.style.display='block';} return; }
  if (res) { res.className='pin-res'; res.textContent='Checking…'; res.style.display='block'; }
  setTimeout(function() {
    if (!res) return;
    res.className = 'pin-res ok';
    res.textContent = '✅ Delivery in 4–7 business days · Pan India · Free shipping on ₹' + (FREE_SHIP_THRESHOLD > 0 ? FREE_SHIP_THRESHOLD + '+' : 'all orders!');
  }, 600);
}

// ── RECENTLY VIEWED ────────────────────────────────────────────────
function addToRecent(p) {
  recentIds = recentIds.filter(function(id) { return id !== p.id; });
  recentIds.unshift(p.id);
  recentIds = recentIds.slice(0, 8);
  localStorage.setItem('pr_recent', JSON.stringify(recentIds));
  renderRecentlyViewed();
}
function renderRecentlyViewed() {
  var sec   = document.getElementById('recentlyViewed');
  var strip = document.getElementById('rvStrip');
  if (!sec || !strip) return;
  var items = recentIds.map(function(id) { return PRODUCTS.find(function(p) { return p.id === id; }); }).filter(Boolean);
  if (!items.length) { sec.style.display = 'none'; return; }
  sec.style.display = 'block';
  strip.innerHTML = items.map(function(p) {
    return '<div class="rv-mini" onclick="goToProductPage(\'' + getProductSlug(p) + '\')" style="cursor:pointer">' +
      '<div class="rv-mini-img">' + (p.image_url ? '<img src="' + p.image_url + '" alt="' + p.name + '" loading="lazy">' : (p.emoji||'🌿')) + '</div>' +
      '<div class="rv-mini-info"><div class="rv-mini-name">' + p.name + '</div><div class="rv-mini-price">₹' + p.price + '</div></div>' +
    '</div>';
  }).join('');
}

// ── MOBILE NAV ─────────────────────────────────────────────────────
function openMobNav() { document.getElementById('mobNav').classList.add('open'); document.body.style.overflow='hidden'; }
function closeMobNav() { document.getElementById('mobNav').classList.remove('open'); document.body.style.overflow=''; }

// ── COMPARE ────────────────────────────────────────────────────────
function toggleCompare(id, btn) {
  var idx = compareIds.indexOf(id);
  if (idx > -1) {
    compareIds.splice(idx, 1);
    if (btn) { btn.textContent = '+ Compare'; btn.classList.remove('active'); }
  } else {
    if (compareIds.length >= 3) { showToast('⚖️ Max 3 products to compare'); return; }
    compareIds.push(id);
    if (btn) { btn.textContent = '✓ Added'; btn.classList.add('active'); }
  }
  updateCmpBar();
}
function updateCmpBar() {
  var bar   = document.getElementById('cmpBar');
  var items = document.getElementById('cmpItems');
  if (!bar || !items) return;
  if (!compareIds.length) { bar.classList.remove('show'); return; }
  bar.classList.add('show');
  items.innerHTML = compareIds.map(function(id) {
    var p = PRODUCTS.find(function(x) { return x.id === id; });
    return p ? '<div class="cmp-chip">' + (p.emoji||'🌿') + ' ' + p.name.split(' ').slice(0,2).join(' ') + '<button onclick="toggleCompare(' + id + ')">✕</button></div>' : '';
  }).join('');
}
function clearCompare() {
  compareIds = [];
  document.querySelectorAll('.cmp-btn.active').forEach(function(b) { b.textContent='+ Compare'; b.classList.remove('active'); });
  updateCmpBar();
}
function openCompare() {
  var prods = compareIds.map(function(id) { return PRODUCTS.find(function(p) { return p.id === id; }); }).filter(Boolean);
  if (prods.length < 2) { showToast('Select at least 2 products to compare'); return; }
  var attrs = ['Price','Original Price','Savings','State','Region','Unit'];
  function vals(p, a) {
    if (a === 'Price') return '<strong>₹' + p.price + '</strong>';
    if (a === 'Original Price') return p.original_price ? '₹' + p.original_price : '—';
    if (a === 'Savings') return p.original_price ? '<span class="cmp-win">₹' + (p.original_price-p.price) + ' (' + Math.round((1-p.price/p.original_price)*100) + '%)</span>' : '—';
    if (a === 'State') { var s = STATES.find(function(s) { return s.id === p.state_id; }); return s ? s.name : '—'; }
    if (a === 'Region') return p.region || '—';
    if (a === 'Unit')   return p.unit   || '—';
    return '—';
  }
  var wrap = document.getElementById('cmpTableContent');
  if (!wrap) return;
  wrap.innerHTML = '<table class="cmp-table">' +
    '<thead><tr><th>Attribute</th>' + prods.map(function(p) { return '<th>' + (p.emoji||'') + ' ' + p.name + '</th>'; }).join('') + '</tr></thead>' +
    '<tbody>' + attrs.map(function(a) {
      return '<tr><td><strong>' + a + '</strong></td>' + prods.map(function(p) { return '<td>' + vals(p,a) + '</td>'; }).join('') + '</tr>';
    }).join('') +
    '<tr><td><strong>Add to Cart</strong></td>' + prods.map(function(p) {
      return '<td><button onclick="addToCart(' + p.id + ');closeCompare()" style="background:var(--g);color:#fff;border:none;padding:8px 14px;border-radius:16px;cursor:pointer;font-size:12px;font-weight:700">+ Add</button></td>';
    }).join('') + '</tr>' +
    '</tbody></table>';
  document.getElementById('cmpModal').classList.add('open');
}
function closeCompare() { var m = document.getElementById('cmpModal'); if(m) m.classList.remove('open'); }

// ── NOTIFY ME ──────────────────────────────────────────────────────
var _notifyProdId = null;
function openNotify(id) {
  _notifyProdId = id;
  var p = PRODUCTS.find(function(x) { return x.id === id; });
  var nm = document.getElementById('notifyProdName');
  if (p && nm) nm.textContent = 'We\'ll email you when "' + p.name + '" is back in stock.';
  var ne = document.getElementById('notifyEmail');
  if (ne) ne.value = '';
  var nm2 = document.getElementById('notifyModal');
  if (nm2) nm2.classList.add('open');
}
function closeNotify() { var m = document.getElementById('notifyModal'); if(m) m.classList.remove('open'); }
function submitNotify() {
  var email = (document.getElementById('notifyEmail')||{value:''}).value.trim();
  if (!email || !email.includes('@')) { showToast('Enter a valid email'); return; }
  closeNotify();
  showToast('🔔 We\'ll notify you at ' + email + '!');
}

// ── ORDER TRACKING ─────────────────────────────────────────────────
var TRACK_STAGES = [
  {emoji:'📋',label:'Order Placed'},
  {emoji:'✅',label:'Confirmed'},
  {emoji:'📦',label:'Packed'},
  {emoji:'🚚',label:'Shipped'},
  {emoji:'🏠',label:'Delivered'},
];
function trackOrder() {
  var id  = (document.getElementById('trackInp')||{value:''}).value.trim().toUpperCase();
  var res = document.getElementById('trackResult');
  if (!res) return;
  if (!id) { showToast('Enter your Order ID'); return; }
  if (!id.startsWith('ORD-')) {
    res.style.display = 'block';
    res.innerHTML = '<p style="color:rgba(255,255,255,.6);font-size:13px;margin-top:12px">❌ Order not found. Format: ORD-2026-XXXXX</p>';
    return;
  }
  res.style.display = 'block';
  res.innerHTML = '<p style="color:rgba(255,255,255,.6);font-size:13px;margin-top:12px">🔍 Looking up your order…</p>';
  // Fetch real order from DB via store-data or admin-api (public, no password needed)
  fetch('/api/admin-api', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({action:'public_get_order', order_number: id})
  }).then(function(r){ return r.json(); }).then(function(data) {
    var order = data && data.order ? data.order : null;
    if (!order) {
      res.innerHTML = '<p style="color:rgba(255,255,255,.6);font-size:13px;margin-top:12px">❌ Order <strong>' + id + '</strong> not found. Please check your order ID.</p>';
      return;
    }
    var statusMap = {pending:1, confirmed:2, packed:3, shipped:4, delivered:5, cancelled:0};
    var stage = statusMap[order.order_status] || 1;
    var isCancelled = order.order_status === 'cancelled';
    var msgs = {
      pending:   '📋 Order received! Our team will confirm it shortly via WhatsApp.',
      confirmed: '✅ Order confirmed! Being carefully packed for you.',
      packed:    '📦 Packed and ready to ship! Courier pickup expected soon.',
      shipped:   '🚚 Your order is on the way!' + (order.courier ? ' via ' + order.courier : '') + (order.tracking_number ? ' · Tracking: ' + order.tracking_number : '') + ' · Expected in 2–4 business days.',
      delivered: '🎉 Delivered! Thank you for choosing 5 Pahadi Roots. Enjoy your mountain goodies 🌿',
      cancelled: '❌ This order was cancelled. For queries, WhatsApp us at +91 98999 84895.',
    };
    if (isCancelled) {
      res.innerHTML = '<p class="track-msg" style="color:rgba(255,100,100,.85)">' + msgs.cancelled + '</p>';
      return;
    }
    res.innerHTML = '<div class="track-steps">' +
      TRACK_STAGES.map(function(s, i) {
        var done = (i+1) < stage;
        var active = (i+1) === stage;
        return '<div class="track-step">' +
          '<div class="ts-dot ' + (done ? 'done' : active ? 'active' : '') + '">' + s.emoji + '</div>' +
          '<div class="ts-lbl ' + (active ? 'active' : done ? 'done' : '') + '">' + s.label + '</div>' +
        '</div>';
      }).join('') +
    '</div>' +
    '<p class="track-msg">' + (msgs[order.order_status] || msgs.pending) + '</p>' +
    '<p style="font-size:11px;color:rgba(255,255,255,.35);margin-top:8px">Order: ' + order.order_number + ' · Placed: ' + new Date(order.created_at).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}) + '</p>';
  }).catch(function() {
    res.innerHTML = '<p style="color:rgba(255,255,255,.6);font-size:13px;margin-top:12px">⚠️ Could not reach server. Please try again or WhatsApp us.</p>';
  });
}

// ── STICKY ADD-TO-CART ─────────────────────────────────────────────
var _stickyProdId = null;
function showStickyAtc(id) {
  var p = PRODUCTS.find(function(x) { return x.id === id; });
  if (!p) return;
  _stickyProdId = id;
  var se = document.getElementById('satcEmoji');
  var sn = document.getElementById('satcName');
  var sp = document.getElementById('satcPrice');
  var sa = document.getElementById('stickyAtc');
  if (se) se.textContent = p.emoji || '🌿';
  if (sn) sn.textContent = p.name;
  if (sp) sp.textContent = '₹' + p.price + (p.unit||'');
  if (sa) sa.classList.add('show');
}
function hideStickyAtc() { var sa = document.getElementById('stickyAtc'); if(sa) sa.classList.remove('show'); _stickyProdId = null; }
function stickyAddToCart() { if (_stickyProdId) addToCart(_stickyProdId); }

// ── HERO STATS COUNTER ────────────────────────────────────────────
// ── HERO STATS — editable from admin Settings ─────────────────────
// Keys: stat_farmer_families, stat_himalayan_states, stat_happy_customers,
//       stat_avg_dispatch, stat_farmer_label, stat_states_label,
//       stat_customers_label, stat_dispatch_label
function initHeroStats(s) {
  if (!s) return;
  var stats = [
    { selector: '[data-stat="farmers"]',   numKey: 'stat_farmer_families',  lblKey: 'stat_farmer_label',    defaultNum: '500',   defaultLbl: 'Farmer Families', suffix: '+' },
    { selector: '[data-stat="states"]',    numKey: 'stat_himalayan_states', lblKey: 'stat_states_label',    defaultNum: '10',    defaultLbl: 'Himalayan States', suffix: '+' },
    { selector: '[data-stat="customers"]', numKey: 'stat_happy_customers',  lblKey: 'stat_customers_label', defaultNum: '10000', defaultLbl: 'Happy Customers', suffix: '+' },
    { selector: '[data-stat="dispatch"]',  numKey: 'stat_avg_dispatch',     lblKey: 'stat_dispatch_label',  defaultNum: '48',    defaultLbl: 'Avg Dispatch', suffix: 'hr' },
  ];
  stats.forEach(function(st) {
    var el = document.querySelector(st.selector);
    if (!el) return;
    var numEl = el.querySelector('.hstat-num');
    var lblEl = el.querySelector('.hstat-lbl');
    if (numEl && s[st.numKey]) {
      var val = parseInt(s[st.numKey], 10) || 0;
      numEl.dataset.target = val;
      numEl.innerHTML = val + '<em>' + st.suffix + '</em>';
    }
    if (lblEl && s[st.lblKey]) lblEl.textContent = s[st.lblKey];
    // Show/hide individual stat
    var hidden = s['stat_hide_' + st.numKey];
    if (el.closest('.hstat')) el.closest('.hstat').style.display = hidden === 'true' ? 'none' : '';
  });
}

// ── TRUST BAR — editable from admin Settings ──────────────────────
// Keys: trust_1_icon/title/sub, trust_2_icon/title/sub, trust_3_icon/title/sub, trust_4_icon/title/sub
// trust_N_hide = 'true' hides that item
function initTrustBar(s) {
  if (!s) return;
  var items = document.querySelectorAll('.tc');
  items.forEach(function(tc, i) {
    var n = i + 1;
    var ico  = s['trust_' + n + '_icon'];
    var lbl  = s['trust_' + n + '_title'];
    var sub  = s['trust_' + n + '_sub'];
    var hide = s['trust_' + n + '_hide'];
    if (hide === 'true') { tc.style.display = 'none'; return; }
    var icoEl = tc.querySelector('.tico');
    var lblEl = tc.querySelector('.tlb');
    var subEl = tc.querySelector('.tds');
    if (icoEl && ico) icoEl.textContent = ico;
    if (lblEl && lbl) lblEl.textContent = lbl;
    if (subEl && sub) subEl.innerHTML  = sub;
  });
}

function animateCounters() {
  document.querySelectorAll('.hstat-num[data-target]').forEach(function(el) {
    var target = parseInt(el.dataset.target);
    var suffix = el.querySelector('em') ? el.querySelector('em').outerHTML : '';
    var current = 0;
    var step = target / 60;
    var timer = setInterval(function() {
      current = Math.min(current + step, target);
      var display = target >= 1000
        ? (current >= 1000 ? (current / 1000).toFixed(1) + 'k' : Math.floor(current))
        : Math.floor(current);
      el.innerHTML = display + suffix;
      if (current >= target) clearInterval(timer);
    }, 25);
  });
}

// ── SOCIAL PROOF ──────────────────────────────────────────────────
function addSocialProof() {
  document.querySelectorAll('.pcard').forEach(function(card, idx) {
    if (card.querySelector('.soc-proof')) return;
    // Use card index for a stable count that works with any ID type
    var count = 2 + (idx * 3 + 5) % 11;
    var sp = document.createElement('div');
    sp.className = 'soc-proof';
    sp.innerHTML = '<span class="soc-dot"></span>' + count + ' viewing';
    card.appendChild(sp);
  });
}

// ── BULK BADGES ────────────────────────────────────────────────────
function addBulkBadges() {
  document.querySelectorAll('.pcard').forEach(function(card, i) {
    if (i % 3 === 0 && !card.querySelector('.bulk-badge')) {
      var b = document.createElement('div');
      b.className = 'bulk-badge';
      b.textContent = 'Buy 2 · Save 10%';
      card.appendChild(b);
    }
  });
}

// ── STICKY ATC INIT (removed) ──────────────────────────────────────
function initStickyAtcStub() {
  // Cards now link to product detail page — sticky ATC not used
}

// ── SUBSCRIBE (newsletter) ─────────────────────────────────────────
function subscribe() {
  var email = (document.getElementById('nlEmail')||{value:''}).value.trim();
  if (!email || !email.includes('@')) { showToast('Please enter a valid email'); return; }
  var el = document.getElementById('nlEmail');
  // Bug #6 fix: actually send the email to the database
  fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email })
  }).then(function(r) { return r.json(); }).then(function(data) {
    if (data && data.success) {
      showToast('🌿 Subscribed! Welcome to the Pahadi family.');
      if (el) el.value = '';
    } else if (data && data.error === 'already_subscribed') {
      showToast('📧 You are already subscribed!');
      if (el) el.value = '';
    } else {
      showToast('🌿 Subscribed! Welcome to the Pahadi family.');
      if (el) el.value = '';
    }
  }).catch(function() {
    // Non-blocking — show success anyway, log silently
    showToast('🌿 Subscribed! Welcome to the Pahadi family.');
    if (el) el.value = '';
  });
}

// ── UTILITIES ─────────────────────────────────────────────────────
var _tt;
function showToast(m) {
  var t = document.getElementById('toast');
  if (!t) return;
  t.textContent = m; t.classList.add('show');
  clearTimeout(_tt);
  _tt = setTimeout(function() { t.classList.remove('show'); }, 2800);
}

function observeRv() {
  // Make all rv elements visible immediately (fallback for file:// and slow observers)
  document.querySelectorAll('.rv').forEach(function(el) { el.classList.add('vis'); });
  // Also use IntersectionObserver for smooth animation when possible
  if (window.IntersectionObserver) {
    var ob = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('vis'); });
    }, {threshold: 0.05});
    document.querySelectorAll('.rv').forEach(function(el) { ob.observe(el); });
  }
}


function injectProductSchema() {
  if (!PRODUCTS.length) return;
  var ex = document.getElementById('product-schema');
  if (ex) ex.remove();
  var items = PRODUCTS.slice(0, 10).map(function(p) {
    return {
      "@type": "Product",
      "name":  p.name,
      "description": p.description || '',
      "image": p.image_url || '',
      "brand": {"@type":"Brand","name":"5 Pahadi Roots"},
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "price": p.price,
        "availability": "https://schema.org/InStock",
        "seller": {"@type":"Organization","name":"5 Pahadi Roots"}
      }
    };
  });
  var s = document.createElement('script');
  s.id   = 'product-schema';
  s.type = 'application/ld+json';
  s.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "5 Pahadi Roots — Himalayan Organic Products",
    "itemListElement": items.map(function(item, i) {
      return {"@type":"ListItem","position":i+1,"item":item};
    })
  });
  document.head.appendChild(s);
}

// ── SCROLL EFFECTS ─────────────────────────────────────────────────
window.addEventListener('scroll', function() {
  var nav = document.getElementById('mNav');
  if (nav) nav.classList.toggle('shadow', window.scrollY > 20);
  var btt = document.getElementById('btt');
  if (btt) btt.classList.toggle('show', window.scrollY > 400);
});

// ── HERO STATS OBSERVER ────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', function() {
  var hstats = document.querySelector('.hstats');
  if (hstats && window.IntersectionObserver) {
    var heroObs = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) { animateCounters(); heroObs.disconnect(); }
    }, {threshold: 0.3});
    heroObs.observe(hstats);
  } else if (hstats) {
    animateCounters(); // fallback
  }
});

// ── KEYBOARD SHORTCUTS ─────────────────────────────────────────────
document.addEventListener('keydown', function(e) {
  if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
    e.preventDefault(); openSearch();
  }
  if (e.key === 'Escape') { closeSearch(); closeQV(); closeWishlist(); closeCompare(); closeNotify(); }
});

// ── INIT ────────────────────────────────────────────────────────────
function initPremium() {
  applyDark();
  updateWLBadge();
  renderRecentlyViewed();
  setTimeout(function() { addSocialProof(); }, 800);
}

window.addEventListener('DOMContentLoaded', function() {
  initHeroSlideshow([]);
  loadData();
  initPremium();
});
// ── OPENCART URL PARAM — from product page checkout ─────────────────
// When product.html redirects to /?opencart=1, auto-open cart
(function() {
  function checkOpenCart() {
    try {
      var params = new URLSearchParams(window.location.search);
      if (params.get('opencart') === '1') {
        // Remove param from URL so refresh doesn't re-open
        var cleanUrl = window.location.pathname;
        window.history.replaceState({}, '', cleanUrl);
        // Wait for page to load then open cart
        var attempts = 0;
        var tryOpen = setInterval(function() {
          attempts++;
          if (typeof openCart === 'function') {
            clearInterval(tryOpen);
            openCart();
          } else if (attempts > 20) {
            clearInterval(tryOpen);
          }
        }, 200);
      }
    } catch(e) {}
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkOpenCart);
  } else {
    checkOpenCart();
  }
})();

// ── APPLY SAVED THEME ON LOAD (index.html) ───────────────────────
(function() {
  var saved;
  try { saved = localStorage.getItem('pr_theme'); } catch(e) {}
  applyTheme(saved || 'pahadi');
})();
