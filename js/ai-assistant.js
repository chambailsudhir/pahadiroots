/**
 * 5 Pahadi Roots — AI Assistant v5.0
 * js/ai-assistant.js
 *
 * FIXES:
 *  1. Multilingual — AI auto-responds in selected language
 *  2. Real Gemini API called directly — no Edge Function needed
 *  3. Google Search grounding enabled — web search works
 *  4. getDemoReply() removed — real AI only
 *  5. Security restrictions in system prompt only — nothing else blocked
 *
 * USAGE in HTML:
 *   <script src="js/ai-assistant.js"
 *           data-whatsapp="919XXXXXXXXX">
 *   </script>
 */
(function () {
  'use strict';

  // No API key in frontend — key lives in Vercel environment variable only
  const script = document.currentScript
              || document.querySelector('script[data-whatsapp]');
  const WA_NUM = (script && script.getAttribute('data-whatsapp')) || '919000000000';

  /* ── API ENDPOINT — server proxy, key never exposed to browser ── */
  const API_URL = '/api/chat';

  /* ── THEME from site CSS vars ─────────────────────────── */
  const R = getComputedStyle(document.documentElement);
  const DARK_GREEN = (R.getPropertyValue('--g')   || '#1a3a1e').trim();
  const MID_GREEN  = (R.getPropertyValue('--g2')  || '#2d5233').trim();
  const GOLD       = (R.getPropertyValue('--gd')  || '#c8920a').trim();
  const GOLD2      = (R.getPropertyValue('--gd2') || '#e8b84b').trim();

  /* ── AI CONFIG ────────────────────────────────────────── */
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

  /* ── SYSTEM PROMPT ────────────────────────────────────── */
  // This is the ONLY place restrictions live.
  // The AI itself handles everything else freely via web search + knowledge.
  function buildSystemPrompt(langCode, langName) {
    return `You are Pahadi_AI — the friendly, knowledgeable AI shopping assistant for "5 Pahadi Roots" (pahadiroots.com), an Indian ecommerce brand selling authentic Himalayan natural products.

LANGUAGE RULE (HIGHEST PRIORITY):
You MUST respond in ${langName} (language code: ${langCode}).
- If langCode is "hi" → respond in Hindi (Devanagari script: हिंदी)
- If langCode is "pa" → respond in Punjabi (Gurmukhi: ਪੰਜਾਬੀ)
- If langCode is "bn" → respond in Bengali (বাংলা)
- If langCode is "ta" → respond in Tamil (தமிழ்)
- If langCode is "te" → respond in Telugu (తెలుగు)
- If langCode is "mr" → respond in Marathi (मराठी)
- If langCode is "gu" → respond in Gujarati (ગુજરાતી)
- If langCode is "kn" → respond in Kannada (ಕನ್ನಡ)
- If langCode is "ml" → respond in Malayalam (മലയാളം)
- If langCode is "kngr" → respond ONLY in Kangri/Himachali Pahari boli.

  COMPLETE KANGRI (हिमाचली कांगड़ी) VOCABULARY from "Himachali Kangri Shabdawali" by Karmchand Shramik:

GRAMMAR RULES (Critical):
• है/हैं = हाई/ऐ/हन (NEVER छा/छां — छां = past tense था/थे only)
• हूँ = हां (मई खरा हां = I am fine)
• हम = असां | मैं = मई | तुम/आप = तुसां | वह = सि/उनी
• हमारा = म्हारा/साड़े | तुम्हारा = थुआड़ा/तुहाड़ा | मेरा = म्हारा/मेरा

AUTHENTIC KANGRI WORD LIST (Kangri word → Hindi meaning):

[अ]: अक्रामक=होकर मुट्ठी बंद कर किसी पर | अखराजात=आवश्यकताएं/खर्चे | अखरोट=के छिलके जो स्त्रियां दांतो | अखाड़ा=पहलवानों का दंगल स्थल | अचानक=गिरना | अचेत=होना/ओला वृष्टि | अच्छाई=गुण | अच्छे=से मल जाना | अडणा=फैलना, आगे करना, रुकावट पैदा करना | अड़चन/व्यवधान=“खलबली | अड़यो=जी | अड़ी=जिद्द | अणसुध=बेअन्दाज़ | अत्यधिक=क्रोध से निहारना | अदला=बदला | अदी=आधी | अधपीस्सा=आटा | अधिकतर=पानी में रहने वाला सांप | अनसूई=मैंस | अनाज=को हानी पंहुचाने वाला कीड़ा/सिलवरफिश | अनावश्यक=चीजें/अलूल जलूल/ | अनुमान=लगा लेना | अन्तः=वस्त्र/कच्छा | अन्हां=अन्धा | अप=पिच्छै आपस में अफणा हांफना | अपण=लेकिन | अपणी=अपनी | अपने=इष्टदेव/परमेंश्वर के प्रति/संयोग बनना | अपर=लेकिन | अप्पू=स्वयं | अबकी=बार/अब | अभी=तक | अम्मा=वृद्ध महिला के लिए सम्बोधन/मां | अरबी=के पत्तों का व्यंजन | अरबी/कचालू=के पत्तों का साग | अर्पित=किए जाने वाले मुट्ठी भर चावल | अलख=आलस | अल्दा=आस | अल्प=निद्रा/झपकी लेना | अवसर=तलाशने वाला | अशरीरी=रोग दूर करने वाला | अशुभ=नक्षत्र/अशुभ का सूचक | असल=असली | असां=हमने /हम | अस्भय,अनिच्छित=व्यक्ति
[आ]: आंख=मारना | आंखों=के एकदम सामने | आंसू=/अश्रु | आग=की लपट से झुलसना | आगे=चलने वाला/लीडर/मुखिया | आटा=गूंधने हेतु लकड़ी की परात | आने=वाला तीसरा दिन | आफत/दशा/किसी=काम का लम्बा पड़ जाना। | आलसी,=जिस पर बोलने का भी असर न हो। | आलोचना=करना | आवश्यकता=से अधिक भरना | आवाज=देना/पुकारना/अधिकार | आस=पड़ोस | आस/अभिलाषा/मन=में कोई बात होना | आसमानी=बिजली का चमकना | आह=भरना
[इ]: इंची=/इनची | इंचै=/इनचैं/इन्नीचैं | इकट्ठे=करना | इक्कठे=होना | इक्ट्टा=करना | इतने=बड़े | इधर,=उधर की | इधर-उधर=हाथ मारना | इस=तरफ वाला
[ई]: ईलाज=करना
[उ]: उगना»पैदा=होना | उगाने=के लिए छोटा भू-भाग | उगाया=गया हो/विरान | उच्चण=गाहटी | उट्ूट=पटांग | उठा=हुआ भाग | उत्सुकता,=जिज्ञासा, जल्दबाजी | उन्हें=व्यवस्थित रूप से रोपना | उपर=से हटा देना | उपरी=चांटा | उपला=(सूखे गोबर का ढेला) | उपस्थित=होना/पंहुचना | उफान=से हृदय को भयभीत करने वाला शोर | उबलने=से पहले आने वाली आवाज | उबाल/बादल=का गरजना | उलझाना/एक=ही बात को बार-बार कहना | उल्टी=/फट जाना | उस=ओर
[ऊ]: ऊपर=चढ़ना
[ए]: एकत्रित=करना
[ऐ]: ऐबी=/ऐबी | ऐमे=ही | ऐसा=औजार जो तेज न हो
[ओ]: ओखली=में कूटने हेतु डाले गए धान की
[औ]: औनणी=औदंणी | औरत=(निःसंतान) की संपत्ति
[क]: कंटीली=डालियां | कच्चे=आम के कटे टुकड़े | कठिन=समय | कठिन/कठोर/बिना=थके काम करना | कदूं=कराकड़ी | कन्याओं=द्वारा लोहड़ी पर गाए जाने वाले गीत | कपड़ा=जो के शिशु को पोटी | कपड़ा/सोते=समय ऊपर लेने वाला | कब=से | कभी=कभार | कम=से कम | कमाई/लाभ=अर्जित करना | करना=या सिलना/कपड़े का छोटा पीस | करने=हेतु पहनाया जाता है | कर्त्रों=का गट्‌ठा | कल=का/कभी का | कलोडू=कलौका | कस=कर | कसना/बात=मनमाने की प्रक्रिया | कागज=में लपेट कर कुछ चीज देना | काटना/डंक=मारना | काटने=की मुद्रा व भौंकना | काढ़कर=तैयार की खटाई | कान=की बलियां | काम=हो जाना/समाधान निकालना | काम-काज=में कुशल स्त्री | काष्ठ=/ंत्र | किण=किणात | किन=दिनों/कब | किनारे/एक=ओर | किस=लिए | किसी=वादन पर चढ़ना | कीड़ी=लेकिन/पंख | कुंडेदार=छड़ी | कुट्ट=का बना हुआ तंग | कुड़माई=/सगाई | कुड़ी=कुन्नी | कुतकी=/कुर्थी | कुल=देवता के पास एकत्रित होकर | कुलजा/कुल=देवी | कुलथ=की बनी/पकी दाल | कुल्हाड़ी=से | कुल्हाड़ी,=तलवार, दराट से वार करना | कुशल=मंगल | कुश्ती=या भिड़ना | केवल=नमकीन | कोई=वस्तु सिर के उपर घुमाकर फैंकना | कोक़ोच=कीड़ा | कोखी/कोहखी=/कोहकी | कोधित=होना | कोयले=का प्रज्वलित होना | कोस=(दूरी) कोशिश | कोह्‌=कोसस | क्यूं=कठरूणा | क्रोध=में होंठ भीचना | क्षमा/यह=नहीं होगा/किसी वस्तु के बिना ही अच्छे
[ख]: खंड=खप्पर | खख़ु=खुरक | खग्गा=बांस की छाल जो सूखने पर झड़ जाती है | खज्जल=परेशान | खड़=खड़पा | खड़ड=दरिया/नदी | खड़े=होना | खड़ोणा=खड़े होना | खबर=लेना/झूठा ठहराना | खबर/गुस्ताखी=की सजा | खरा=टीक/सही | खरीद=बहुत सा सामान खरीदना | खरेड़ना=खड़ा करना | खल=चमड़ी/खाल | खलारा=बिखरा हुआ सामान | खसम=पति/मालिक | खसरा=खुरदरा/एक रोग का नाम | खांस=कर सचेत करना | खाख=गाल | खाने=से बची सामग्री | खाने-पीने=में माहिर | खामी=कमी | खार=बैर रखना/नमक अधिक होना | खाहमखाह=बिना मतलब का | खिंडणा=अलग हो जाना | खिंद-खंदोलू=2 कपड़ों का बनाए विछोने | खिट=ड़ | खिद्दड़=तेल की मैल | खिन्नू=गेन्द | खिरड़-फिरड़=इधर-उधर हो जाना,भाग जाना | खिर्द-फिर्द=इधर-उधर हो जाना | खिलखिला=कर हंसना/बदनामी | खिलवासा=उजाड़ /घासफूस उगाना | खिल्ली=जिस भू-भाग पर कुछ भी न | खींखर=पत्थर/स्लेट का पैना टुकड़ा | खींचातानी=करते हुए लड़ना | खीसा=जेब | खीहसा=जेब | खुरचना/छिलका=उतारना | खुर्चना/छिलका=उतारना | खुले=में तापने हेतु मोटे बालन का जलना | खुशी=दिखाना | खूंटी=(कपड़े टांगने के लिए) | खूब=सारा उड़ेल देना | खेत=में फसल झाड़ने हेतु निश्चित स्थान | खेतों=क्यारियों में (सूखा/हरा) घासफूस | खैर=खबर | खो=देना | खोजबीन=/ढूँढना | खोपड़ी=/सिर | खोहश=बोलना
[ग]: गई=जगह। | गड़ढा,जिसमें=गोबर डाला जाता है | गडिढा=मस्ती करना | गत=वर्ष | गतोलू=- छोटा सा खड़डा | गत्‌=गढ़ढ़ा | गन्दे=और लम्बे समय तक रूके पानी में बना शैवाल | गपां=बातें | गपोड़=ज्यादा बातें करने वाला | गब्बण=गर्भावस्‍था में पशु | गमणा=पसंद आना | गरणत=दरिया में अत्यधिक पानी आ जाने | गराईयां=अपने गांव में रहने वाला | गरी,बादाम=किसमिस(मिश्रण) | गर्द/बारीक=उडार | गर्दन=का पिछला भाग | गर्मियों=में वृक्ष से प्राप्त होने वाली सब्जि | गल=बात | गलगल=आदि फलों के रस को | गलत=आदत | गलाणा=बताना | गले=में अटके पानी को अंदर ले जाना | गश=खाना बेहोश होना | गहरी=नींद/नींद का झौंका/नशा | गांठ=बांधना | गांव=का पत्थर से बना रास्ता | गांह्‌=आगे | गाए=के बच्चे | गाए/मैंस=का गर्भधारण करना | गाखड़=अंगारे | गाचणी=तख्ती लिपाई करने वाली मिट्टी | गाजला=जल्दबाज | गाजली=जल्दबाजी | गाणी=गिनती में | गादा/गादड़िया=पीठ पर | गाय/मैंस=जब कम दूध देने लगे | गारू=अंगारा | गालों=पर स्नेह का हाथ फेरना/प्यार जताना | गास=गोला अकस्मात्‌ विकट समस्या | गाहक=ग्राहक | गाहूदा=बच्चे को पीठ ऊपर उठाना | गाहूली=जंग लगना | गिट्टि=कंकर | गितलू=गुदगुदी | गिरना/पीठ=लग जाना | गीला=(जिसमें पानी आवश्यकता | गु=गुन्हणा | गुटना,=गोडा | गुड़,सौंफ,गरी=बुरादा युक्त आटे से | गुप्त=कमरा | गुलगुले=गुआचणा | गुलेलियां=खेलने/गुल्लीडंडा खेलने हेतु खोदकर बनाई | गुस्सा=आना | गुस्से=वाला | गू=गूहरिया | गूंगा/जो=बोल नहीं सकता | गेंहू=का सड़ा कर एक लम्बी प्रक्रिया | गेडें=होना | गेहुंआ=रंग | गेहूंआ=रंग | गोदी=में | गोबर=से लिपाई | गोश्त=को तड़का/मसाले में भूनना | गोहटू=/गोहठू /गोहठा | गौ=मूत्र/शुद्धि संस्कार | गौशाला,=पशुघर | ग्रह=शांती दान दिया जाता है | ग्रां=गांव | ग्राह=ग्रास/निवाला
[घ]: घमण्ड=होना | घर=के पास साग सब्जी उगाने की जगह | घरीसना/रगड़ना=/धान की एक किस्म | घरेलू=उपयोग हेतु साग-सब्जि | घरैंचो=घरैंची | घात=लगाकर बैठना | घाव=भरना/ठीक होना | घास=का गट्ठा | घासफूस=वाला मैदार | घिस=कर तेज करना (चाकू, दराती इत्यादि) | घिसापिटा=पुराना/अनुभवी | घुंडी=/धागा या रस्सी उलझना | घुट्ठी=ने | घुदर्‌टी=घुप | घुरड़ी=घुलना /घुल्ाटी / घोल | घुरे=तिकर | घूमने=वाला लटूटू | घोच्चू=घोचणा/घोखण | घोड़े=पर सामान लादने/लाने ले जाने वाला
[च]: चकित=होना | चक्कर=काट कर नाचना | चक्की=में पिसवाने हेतु बोरे में डाला गया गेंहू | चखने=वाला | चढ़ाई=का पथरीला रास्ता/खड़ी पगडंडी | चना,=रेबड़ी इत्यादि खाने को देना | चपाती=बेलते हुए सूखे आटे का प्रयोग | चबरही=/चतुरवरसी | चमड़ी=में तिल के समान। | चर्चा=/दोषारोपण | चर्म=रोग/खुजली | चलते=हुए बीच से रास्ता देना | चसका=लगाना/लगना/लुभाना | चानह=तां | चार=सेर | चारों=ओर से मकानों से घिरा हुआ | चाहें=तो | चिन्तन=की स्थिति | चिपकना/सांप=आदि द्वारा काटना | चींग=पलींगा | चीचू=चीट | चीड़=वृक्ष के पत्ते | चुंग=देना | चुंगड़=लुखवाणा | चुक्स=नुक्कर | चुगली=चुक | चुटकी=काटना | चुप=करवाना/हौंसला देना | चुपके=से निकल जाना | चुभती=बात बोलना | चुल्हे=के साथ बना छोटा चुल्हा | चूट्टी=रे | चूल्हें=में जली हुई लकड़ी | चूहादानी/जंदरी=जिसमें जंगली जानवर पकड़े | चूहे=द्वारा मिट्टी निकालकर | चोंच=मारना | चोट=लगने पर सूजन होना
[छ]: छल॒ना/कपड़ों=को अधूरा धोना | छाती=में जलन होना | छिटकना/झूठा=आरोप लगाना | छिपना=/अदृश्य | छिपने=योग्य बनाया गया बसेरा | छिलका/खाल=उतारना | छु/छो=/छौ | छूट=जाना/कपड़ों के अन्दर चलने का आभास | छेड़छाड़=/शरारत | छोटा=टुकड़ा | छोटी=माता/चिकन पोक्‍्स | छोटी-पतली=लकड़ी, घास का तिनका | छोटी-बड़ी=वस्तुएं | छोटी/धीरे=से | छोटे=आकार की (कलाकारी) वाली
[ज]: जख्म=का ठीक होना | जगह=जहां प्रायः जहरीले जानवर | जच्चा=/प्रसूता | जदूं=/जाहूलू | जन्म=मास | जन्मदिवस=पूजा पर आटे का बना मीठा व्यंजन | जरूरत=से ज्यादा भरना | जरूरी=सामान | जर्णी=तां | जल=प्रयोग हेतु मिट्टी का छोटा वर्तन | जलधारा=या अन्य द्रव्य का लगातार बहना | जलने=की गंध | जलाने=हेतु लकड़ियां | जल्द=बाज | जल्हू=जलेड | जहां=से खेत को पानी लगाया जाता है/ | ज़रूरत=से ज्यादा पूछ-ताछ करना | ज़्यादा=चुस्ती दिखाना, मस्ती करना | जाते=है | जान=पड़ना | जानना/आग=का मंद हो जाना | जानबूझ=कर | जाना/मन्नौति=मनाने जाना | जाने=वाला नृत्य गीत | जामणू=महीना | जाहणी=मुच्ची | जाहूलू=तांई | जिद/पहरा/ताक=में | जिम्मेदार=व्यक्ति | जिस=गाय»मैंस ने थोड़े दिन पहले | जिसके=सभी अंग सही हों। | जिसे=खटाई हेतु सुखाया जाता है | जीजू=जीजला | जुंग=जुंगला | जुगत=जुआड़ | जुड़ी-मुढ़ी=जुआन | जुल्तु=गुंदणा | जूठली=जूठ | जूते=पड़ना/मारना | जेठानी=का बेटा | जैसे=कि | जैसे-तैसे/किसी=तरह से काम पूरा करना | जोर=से खिलखिला कर हंसना | ज्येष्ठ=पुत्र
[झ]: झपकी=/नींद आगमन का संकेत | झाड़=फूंक करने वाला | झाड़ू=लगाना आदि | झुका=हुआ/बर्तन उल्टा करके रखना | झुण्ड=/झूण्ड | झूठ=बोलना/टरकाना | झूठ-मूठ/मन=रखने के लिए
[ञ]: ञ्र्ख=रुल
[ट]: टुकड़ा/अत्यतं=बारीक लकड़ी का छिलका | टूटे=हुए चावल | टेढ़ा=देखने/चलने वाला | टेहड़ापर=/टेढ़ापर | टोटा/टुकड़ों=में
[ठ]: ठरक=ठरना | ठाठ=मारना | ठूस=मार
[ड]: डंगरे=पशु | डमरू=जैसा वाद्य | डरा=कर देखना | डाली=का झुकना | डु/डू=डुंडसु जिसके हाथ न हों | डुघ/डुघा=गहराई /गहरा | डुसकणा=धीरे,खूकते हुए रोना/सिसकना | डूनू=हरे पत्तों की बनी कटोरी | डूब=जाना | डेला=आंख/पुतली | डॉका=छोटी मछली की प्रजाति | डोई=लकड़ी की बनी कड़छी | डोडे=रीठे | ड्रग=ढुक
[ढ]: ढउए=पैसे | ढकोंसला=तुक | ढक्का=धक्का | ढफैल=जो बैंच/भूमि/बिस्तर पर बैठने के लिए | ढमाका=चोट/गिरना | ढलकना=ढलना/कमजोर होना | ढलाका=चोट/पटाखा | ढलौल=फुर्सत | ढहणा=गिरना | ढाक=कमर | ढाणा=पीठ लगा देना (मल्लयुद्ध में) | ढासणा=सहारा/बिना वजह रुके रहना | ढेर=सारे पत्त्े/वृक्षों से काटी हरी डालियां | ढेलू=ढेरा | ढ्ब=आदत | ढ्बला=गुनगुना
[त]: तड़का=लगाना | तत्ते=तोंए | तन्त्र=मन्त्र | तरकड़ी=/तकड़ी | तरफ=(मूंह की तरफ) | तरबूज/लाल=कपड़ा पूजार्थ | तली=हुई रोटी (एक पकवान) | तहस=नहस | तहैड़ी=/तदयाड़ी | तार/रस्सी=जिस पर कपड़े | ताली/मिटूटी=का वर्तन | तीन=दिन बाद | तीनों=में दूसरे नम्बर वाला भाई | तीव्र=गति से | तीसरी=बार/तिगुना | तूफानी=हवा | तृड़ी=कीड़ा | तैयार=करना, मनाना | तोलने=की प्रक्रिया | त्यार/लड़ने=पर उतारू | त्‌दूं=तम्हातड़
[थ]: थप्पड़=/चांटा | थापी=(थापूषी) | थोड़ी=देर के लिए बैठना
[द]: दंडित=करना | दंदाल=/दंदराल | दधूनू=दन्द करीड़ना | दरया=के पानी की लहर | दरार=पड़ना/टूटना | दरिया=पार करने हेतु पानी के | दरेल=/देहल | दर्द=में रोना | दवाई=इत्यादि पिलाई जाती है | दवात=में कलम डुबोना | दही=का व्यंजन | दाँतों=की पंक्ति | दांत=से काटना | दाने=संवारना/छांटना | दान्त=से काट कर अलग करना | दान्तों=से काट कर खाना | दिक्कत=पैदा करना | दिखाई=देना | दिया/दीया/दीपक=(मिट्टी के तेल वाला) | दुःख=/बिछुड़ना | दुःख/परेशानी=/खीझ | दुगुना=[ना | दुर्गध=फैलाती आवाज | दुल्हन=और बहुओं द्वारा दुपटूटे | दूध=दोहने हेतु थनों को सहलाना | दूरी=बनाए रखना/आंख न मिलाना/बिरला | दूसरी=बार/दो परतों में | दृढ़=संकल्प | दृष्टि=दोष के कारण जिसे कम | देखादेखी=नकल/मुकाबला | देखे=नालकू | देवस्थल=पर जा कर अर्पित किया जाने | दो=वर्ष पूर्व | दोषपूर्ण=गलत आदमी
[ध]: धग्गड़=ग्ग गड़ | धर्म=का रिश्ता | धागे=का गोला | धान=की नस्ल | धिड़धिड़=होना (मुहावरा) | धीरे-धीरे=काम करने वाला | धीरे/रूक=कर | धुंधला/गंदा=पानी | धूप/आग=सेकना | धूल,=मिट्टी | धूल/गर्द/मिट्टी=का उड़ना/पक्षियों | ध्यान/मनोदशा=/सुधी | ध्यान/सुधी=/मनोदशा
[न]: नंगे=पांव | नकंढी=/नकंढा | नकथोड़ी=/नकथोड़ | नकली=/बनावटी | नजदीक=तक | नवजात=बच्चों का मां के थनों से दूध पीना | नष्ट=होना/खोना | ना=समझ लड़का/गदूदी भाषा में | नाक=से बहता गाढ़ा द्रव्य | नाक/कान=में छेद करना/छेदना | नाखून=द्वारा लगी खरोच | नाराज=होकर गुस्सा करना/ उछलना | नाली=जिसमें पानी चलता हो | निरन्तर=खांसना | निराश/अत्यधिक=थकावट से अचेत जैसी स्थिति | निवृत=होना | नींद=की झपकी | नीचे=फर्श पर/भूमि पर | नुक्सान=/हानि | नूसणा=तूहणा | नौ=प्रकार के वाद्य यंत्र बजना | नौलू=नौणी | न्हैरना=उलटना/उड़ेलना न्हाठ भागमभाग
[प]: पक्का=/कठोर | पक्की=गांठ | पक्षियों=का समूह में उड़ना | पजामे=में नाड़ा डालने की लकड़ी | पतला=खाद्य पदार्थ | पता=लगाना/जानकारी हाथ लगना | पति=का बड़ा भाई | पत्थर=की दीवार | पत्थरों=झाड़ियों से घिरी असुक्षित | पत्नि=की बहन का पति | परमेश्वर=/भगवान | परसो=से | पराली=का विशाल ढेर | परिणाम=भुगतना | परेशान=करना/होना | पलटा=मारना | पवन/हवा=का वहाव | पशु=प्रसव | पशुओं=को ठहराने/थूप, वारिश से | पहाड़ो=पर उगने वाली सब्जी | पहाड़ों=पर उगने वाली साग-सब्जि | पांव=स्पर्श कर आर्शिवाद लेना | पागल=हो जाना/ मस्तणा | पानी=के अत्यधिक गर्म होने पर | पार=करना | पालतु=पशु | पालथी=/चौकड़ी मारकर बैठना | पिछले=कल का | पिटाई=करना/संभोग करना | पिदूदू=पिलपिला | पिस्सू=चिपकना | पीछा=छुड़ाना | पीछे=से | पीठ=पर हाथ से मारना | पीड़ियों=वाला कुआं | पीतल=का बड़ा व भारी वर्तन जो बड़ी रसोई में | पीला=रंग | पूजना-मनौति=मनाना | पूणी=की कताई से निकलती तार | पूरा=जोर लगाकर रोना | पूरी=तरह गले तक भरा हुआ नहीं | पूर्ण=रूप से भरा हुआ | पेचीदा=/समस्या /अड़चन | पेट=भर जाना | पेड़=की टहनीयां ओढनी का लहराना | पैंठ=/पंगत | पैन=/परैणा | पैरी=पोणा | पैहर=सवेला | पौण=छुआई/पौण-छौण | प्यास=से गला सूखना | प्रतीक्षा=करना | प्रवेश=द्वार | प्रहार=करना
[फ]: फंग=पंख | फंड=मार/पीटना | फटकार=डांट डपट/रगड़ | फलीदार=सब्जी का नाम | फलों=से डाली का झुकना | फसल=कटाई | फांए=टंगोणा | फूंक/मुंह=से हवा करना | फूटना/अंकुरित=होना | फेकला=वेस्वाद | फेट्ट=तिरछा | फेरना=घूमना | फो,=फौ फोका बेअसर/बेकार /खाली | फोलणी=पहेली | फोहकी=गीदड़ | फौजण=फौजी की पत्नी
[ब]: बंजर=भूमि जहां बरसात में घास होता है। | बंजूड़ी=/बणजोड़ी | बकबक=करना | बकरा-बकरी-भेड़=आदि | बकरी=जैसा वन पशु | बकरे=के लहु से बना व्यंजन | बगैर=बिना किसी के बसों /बसोणा विश्राम | बचने=हेतु अस्थाई प्रबन्ध | बच्चे=की कमर में बांधने वाला संस्कारी धागा | बच्चों=का सामूहिक रूप से बतियाना | बच्छू=/बैहडू /बच्छी | बछड़े=को जन्म दिया हो | बजकणा=टकराना | बजिया=मालिक | बटोलणा=एकत्रित करना | बट्ू्टी=दो सेर | बड़का=- बड़ा भाई | बड़ा=खाना बनाने वाला | बड़ी=मूछों वाला | बड़ी-बड़ी=डींगे हांकने वाला | बड़े=ग्रास/बेढंग से खाना | बढणा=काटना | बणौट=मेलजोल/व्यवहार | बतेहरा=बहुत सारा | बदशक्ल/आवारा=कुत्ता | बदाण/पत्थर=तोड़ने वाला बड़ा हत्थौड़ा | बन्द=करना/मुख बन्द करना | बन्हणा=बांधना | बब/बब्ब=बाप | बमुश्किल=से | बर्फले=पहाड़ों में पाया जाने वाला पक्षी | बलिष्ठ=/कठोर | बल्द=बैल | बहती=नहर का वह स्थान | बहुत=पतला गोबर | बहुतायत=संख्या में | बांए=हाथ से लिखने और | बांस=के टोकरे का बना पालना | बाद=में/अन्तिम रोटी | बादल=जिसके बरसने के आसार लग रहे हों | बार-बार=शौच जाने वाला | बारिश=में पूर्ण रूप से भीग जाना | बालक=की मूत्रनली | बालन,=घास आदि का गद्गठा | बालों=का झड़ना | बाहरी=भाग का जलाना | बाहों=में भर लेना | बिगड़ना/खराब=होना | बिगाड़=/खेल में अंड़गा | बिछोना=(बैठने हेतु) | बिना=बजह यहां-वहां घूमना | बिल्कुल=नया | बीच=रखे विशाल पत्थर/स्टैप | बीज=का फूटना/अंकुरित होना | बुढ़ा=' बुढ़क खुद बुलकणा | बुत्ता=सरना | बुरा=सा लटका हुआ मुख | बुरी=आदत | बुरे=समय काम आना/साथ देना/मदद करना | बू=आना/दुर्गन्‍्ध | बून्दा=बान्दी | बे=औलाद/निःसंतान | बेकार/जिसे=कोई काम न हो | बेकार/व्यर्थ=ही | बेजती=होना | बेझिझक=कुछ भी कह देने वाला | बेतुकी=बातें | बेबजह=कहीं भी घूमते रहना | बैठने=हेतु बना लकड़ी का फटटा | बैर=भाव | बोहड़=/बीहूड़ | ब्याड़/व्याड़ी=एड़ियों का फटना
[भ]: भड़कना/उग्र=होना | भतर्सना/बुराई=करना | भर=देना | भरपूर=प्रयास/जबरदस्ती प्रयास करना | भलया=लोका | भला=आदमी | भलिये=लोके | भली=औरत | भांग=का नशा करने वाला | भांप=जाना | भाईदूज=या शादी में लगाया जाने वाला टीका | भिंडी=सब्जी | भिण्डू=भिंबलना | भीड़=में कहीं खो जाना | भूखे=रह जाना | भूतल=कक्ष/घर का मुख्य कमरा | भूल=होना | भेड़=/बकरी के बाल उतारना | भेड़-बकरियों=का बड़ा समूह | भेड़/बकरी=या जानवर की खाल का बना थैला | भैंठू=भैड़ी मत | भोजन=का कार्य | भोजनोपरान्त=मुख साफ करना
[म]: मंगल=कामना | मकान=का पिछला भाग | मछली=फंसाने वाला कांटा | मड़ा/बेचारा/मर=गया | मधुमक्खियों=का छत्ता | मध्य=भाग से कटा हुआ | मन=नहीं लगना / घुटन होना | मनगरेंदा=/मनभांदा | मभामे=का लड़का | मवेशियों=द्वारा फसलों को वर्बाद करना | मस्ती,हंसी=खुशी का वातावरण | महिलाओं=द्वारा नाक में डालने वाला (नथ जैसा) | मां=को संबोधन | मात्र=एक | माथे=पर बल डालना | मान=न मान मैं तेरा मेहमान | मार=या पिटाई | मिट्टी=के छोटे मटके के उपर | मिठाई=या खाने के लिए बच्चों के लिए कुछ चीजें | मिननत=करना | मुंह=वाला पात्र | मुखडू=मुच | मुझे=मेथी | मुट्ठी=बंद कर जोरदार प्रहार | मुफ्त=में | मुश्किल=में डालना | मूंह=फैलाना/खोलना | मूर्ख=/ना समझ | मृत्यु=पर सर मुंडाई | मेल=जोल रखने वाला | मेलजोल=/सम्बन्ध | मेला=जहां दंगल हो | मेहमान=/अतिथि | मैने=कहा - ? | मोसेरा=भाई | म्हांजो=/सांझो
[य]: यहां=से | युलेल=जो रस्सी की चनी होती है | यूं=ही
[र]: रखना-उठाना,=इधर-उधर रखना | रखा=जाने वाला मिट्टी का बना ढकना | रट=लगाना/कहानी/लम्बी बात जीत | रसोइए=की सहायता हेतु काम पर लगाया गया मजदूर | रसोई=कार्य में प्रयुक्त होने वाला कपड़ा | रस्सी=से बंधा,पीठ पर उठाया | रात=का चौथा भाग | रास्ते=में | रिश्ते=के लिए बात करने वाला (बिचौला) | रीठे=का दाना/आंख की पुतली | रूई=का छोटा सा फाहा/एक तारा वाद्य यंत्र | रूमाल=अथवा रूमाल जितना कपड़ा | रेजगारी=/छुट्टे पैसे | रोक/कठिनाई=पैदा करना | रोक/कुछ=नहीं | रोते=बच्चे को चुप कराने के लिए बोलना | रोना=या बोलना | रोशनी=/प्रकाश
[ल]: लकड़=/लक्कड़ | लकड़ियों=का गद्रठा | लकड़ी=को लगने वाला कीड़ा/दीमक/मांस का टुकड़ा | लकडी=की पुलियां | लक्ष्य=तक | लटकते=कपड़े को ऊपर उठाना | लड़कियों=द्वारा छोटे पत्थरों को उछालकर खेला | लड़की=किसने | लड़ाई=झगड़ा करना | लम्बाई=में छोटा/तंग/पहनने वाला छोटा वस्त्र | लाठी=जिससे हल में जुटे बैलों को हांका जाता है | लाड़=लड़ाना/खुश करने की कोशिश करना | लात=मारना/अन्दर से खाली होना | लात,पांव=से विकलांग | लाता=है। | लिए=लम्बाई में दी समानांतर जगह | लिखित=समझौता | लिया=जाने वाला अनाज | लुकड़ी=लुआहणा | लुक्का=छुपी का खेल | ले=आना | लोक=गायन/कथा गीत | लोकल=वादूय यन्त्र | लोहका=/लौहका | लोहार,=बढ़ई द्वारा किसान से काम के बदले | लोहे=या लकड़ी का छोटा पाइप जिससे आग जलाने | लौहार=द्वारा लोहे को गर्म करने का स्थान
[व]: वनौषधि=जो काहड़ा बनाने के काम आती है। | वर्खी=(मूंहें बखी) | वर्तन=में चिपकी भात की जली हुई पपड़ी | वर्षा=का पानी जो छत से टपकता है | वस्त्र=जहां से फट गया हो वहां रफ्फू | वहां=की/दूर की | वापस=आना | वारी=लेना/ऐंठना | वाला=हरे रंग का मेंढक | वालों=वाला रेंगने वाला कीड़ा जो | विधवा=(अपशब्द) | विभिन्‍न=प्रकार का सामान | विवाह,=समारोह के सुअवसर पर | विवाहित=बेटी | विश्वासपूर्ण=हां | विस्तर=का निचला भाग | वृक्ष=की छंटाई कर चारा लेना | वृद्ध/वरिष्ठ=नागरिक | वेमन=बात | वैसे=ही | व्यंजन=बनाने के काम आता है | व्यर्थ=का विवाद | व्याह-शादी=में काम करने वालों को कमाई देना | व्याहता=लडकी के साथ जाती स्त्री
[श]: शक्तिशाली=/स्थूल | शरीर=का निर्बल होते जाना | शर्द=ऋतु | शादी=की तारीक | शैल्फ=(मिट्टी का बनाया) | शोक=प्रकट करना | शोच=पश्चात जिसने अंग न धोएं हों | शोर/बात=आगे और आगे फैलते जाना | शौच=इच्छा
[स]: संजो=कर रखना | सख्त/हिम्मत=वाला | सजाना/तैयार=होना | सज्जर=सुई | सफेद=रंग की विशेष मिट्टी जिसे | सब=तरफ | सबसे=आगे | समधी/बेटा-बेटी=के सास-ससुर | समय=से/जल्दी | समाप्त=होना | समारोहों=में हरे बड़े आकार के पत्तों की बनी पलेट | सर्द=ऋतु बच्चियों का खेल | सलेट=(छत बनाने के लिए) | सलेट/समतल=पत्थर का टुकड़ा | सस्नेह=चुप कराना | सांप=की एक प्रजाति जो हानि नहीं पंहुचाती | सांयकाल=से पहले | सांयकाल/सूर्यास्त=समय | साग=की सब्जी | साथ=में | साधन=सम्पन्न | साफ=मौसम | सामने=वाला/जिससे बात हो रही है/तुम जैसा | सामान्यता=बरसात के दिनों में खेतों में पाया जाने | सामूहिक=देवयात्रा में जाने वाले लोग | सावधान=करना/रोकना/समझाना | साहस=/ताकत | सिकूकड़=सियोआ | सिक्का,=जो कभी प्रयोग होता था। | सिर=चमराना | सिलाई=का खुल जाना | सीधा=साधा | सीधा-सादा=व्यक्ति | सीधी=/आसान | सुख-आनन्द=भेजना | सुखाने=हेतु डाले जाते हैं | सुनने=/सुन्न | सुनमसुन्नी=सुलगाट | सुनाई=देना | सुप्रसिद्ध=व्यंजन | सुबह=से | सुस्त=सा | सुस्त/यूंही=समय व्यतीत करने वाला | सूक्ष्म=लम्बे आकार का पहाड़ी फल | सूखने=की स्थिति/सुधार | सूखा=घास | सूखी=टहनियां | सूद,=जाति विशेष | सूर्यास्त=के समय | सोचा=हुआ | सोतेली=मां | सोने=की तार में मोती डला गहना | सोये=हुए | सोहड़=सलीत्ता | स्कूल=के बच्चे | स्फूर्ति=न रहना | स्वयं=की प्रशंसा/बड़ा बनना | स्वयं/अपने=लिए संबोधन
[ह]: हथकरघा=में बना ऊनी कम्बल | हद=/सीमा | हर=रोज निश्चित दूध देना | हलजुताई=करते समय बैल के कंधे पर रखा | हाथ=से उड़ेलना/छटूटा देना | हाथ/पांव=में अत्यधिक गर्माहट/गर्मी | हिमाचली=(कांगड़ी) शब्दावली शब्द अर्थ | हिम्मत=बन्धवाना | हिलना=/हिलाना | हुड़मुच्ची=हयूंद /हियूंद | हेतु=फूंक मारी जाती है

  CONVERSATION EXAMPLES (use these patterns):
  "राम राम जी! तुसां किदे हान?" = Hello! How are you?
  "मई खरा हां, थुआड़ा कुसा हाल हाई?" = I am fine, what is your news?
  "म्हारे कोल असल पहाड़ी माल हाई" = We have authentic Pahadi products
  "दस्सो, किसी चीज़ दी लोड़ हाई?" = Tell me, what do you need?
  "खरा हाई!" = That is good!
  "गल सुणो" = Listen to this
  "इत आओ" = Come here
  "गपां करीए" = Let us chat
- If langCode is "garh" → respond ONLY in Garhwali dialect (गढ़वाली — Uttarakhand).
  STRICT RULES: Use "छु/छ" for हूँ/है, "मि" for मैं, "तुम" stays same, "क्वे" for कौन, "कख" for कहाँ, "ह्वे" for हो, "आ जा" for आओ, "बटे" for से.
  Example: "नमस्कार! मि Pahadi_AI छु — तुमारो Himalayan गाइड। मि यख मदद करण छु — शहद, घी, केसर सब बटे। बताओ क्या चयेंद?"
  DO NOT use Hindi. Use Devanagari script only.

- If langCode is "kum" → respond ONLY in Kumaoni dialect (कुमाऊँनी — Uttarakhand).
  Use words: "छु/छ" for है, "मैं" stays, "तुमर" for तुम्हारा, "हमर" for हमारा, "क्या" stays, "बताओ" stays, "चनो" for चाहिए.
  Example: "नमस्कार! मैं Pahadi_AI छु — तुमर Himalayan गाइड। हमर पास असली पहाड़ी चीज़ें छन — शहद, घी, केसर। बताओ क्या चनो?"
  DO NOT use Hindi. Use Devanagari only.

- If langCode is "doi" → respond ONLY in Dogri (डोगरी — Jammu).
  Use words: "आं" for हूँ, "ऐ" for है, "म्हेंगी" for मुझे, "तुंदा" for तुम्हारा, "साड्डा" for हमारा, "दस्सो" for बताओ, "लोड़" for जरूरत.
  Example: "राम राम! मैं Pahadi_AI आं — तुंदा Himalayan गाइड। साड्डे कोल शुद्ध पहाड़ी माल ऐ। दस्सो की चाहिदा?"
  DO NOT use Hindi or Punjabi. Use Devanagari only.

- If langCode is "lad" → respond in Ladakhi language (simple words with Hindi mix is okay for Ladakhi).
- If langCode is "ur" → respond in Urdu (use Nastaliq script: اردو)
- If langCode is "mai" → respond in Maithili (मैथिली)
- If langCode is "kok" → respond in Konkani (कोंकणी)
- If langCode is "as" → respond ONLY in Assamese (অসমীয়া) using AUTHENTIC vocabulary from Assamese dictionary:
  PRONOUNS: মই (I), তুমি/আপুনি (you), সি (he/she), আমাৰ (our), মোৰ (my), তোমাৰ (your)
  KEY WORDS: বাৰু (good), দুখ (sad/sorrow), উপকাৰ (help), ভোক (hunger), হাত (hand), বায়ু (air), পানী (water)
  COMMON: এতিয়া (now), কেনেকৈ (how), কেতিয়া (when), ভাল (good/fine), নমস্কাৰ (greeting)
  VERBS: আহে (comes), যাওঁ (I go), দিওঁ (I give), কওঁ (I say), খাওঁ (I eat)
  EXAMPLE: "নমস্কাৰ! মই আপোনাৰ Himalayan guide। মই উপকাৰ কৰিব পাৰোঁ। কি বিচাৰে কওক!"
  Use proper Assamese script (অসমীয়া) throughout. DO NOT use Bengali script.
- If langCode is "mni" → respond in Manipuri/Meitei
- If langCode is "si" → respond in Sinhala (සිංහල)
- If langCode is "nag" → respond in Nagamese (Nagaland creole — mix of Nagamese Assamese base with simple English words, friendly tone)
- If langCode is "bodo" → respond in Bodo language (Assam) — use simple Bodo words with Hindi/English mix
- If langCode is "mizo" → respond in Mizo language (Mizoram) — use Mizo words naturally
- If langCode is "khasi" → respond in Khasi language (Meghalaya) — use Khasi words naturally  
- If langCode is "sikkimese" → respond in Sikkimese/Nepali dialect (Sikkim)
- If langCode is "ru" → respond in Russian
- If langCode is "pt" → respond in Portuguese
- If langCode is "en" → respond in English
- For any other language → respond in that language
NEVER mix languages. If user writes in a different language than selected, still respond in the SELECTED language (${langName}).

ABOUT 5 PAHADI ROOTS:
- Sells authentic Himalayan natural products sourced directly from mountain farmers
- Products: Wild Honey (Himachal), A2 Bilona Ghee, Kashmiri Saffron, Ladakhi Shilajit, Assam Tea, Kangra Tea, Lakadong Turmeric, Bamboo Shoot, Joha Rice, Bhut Jolokia, Black Rice, Large Cardamom, Cold Pressed Mustard Oil, Basmati Rice
- Free shipping above ₹799 | Delivery: 4-7 business days | Returns: within 7 days
- Website: pahadiroots.com

YOU CAN ANSWER FREELY:
- ANY question about Himalayan products, superfoods, health benefits, how to use them
- ANY regional question — weather in Shimla, temperature in Manali, trek info, culture, festivals
- ANY general knowledge question using your web search capability
- Product comparisons, cooking tips, nutrition facts
- Current news, weather, events related to Himalayan states
- Gift recommendations, budget-based suggestions

STRICT RESTRICTIONS (never cross these):
1. COMPETITORS: Never recommend any competitor brand, Amazon/Flipkart listings, or other product brands. Always bring focus back to 5 Pahadi Roots products.
2. PERSONAL INFO: If anyone shares phone/email/Aadhaar/bank details, do NOT store, repeat, or use them. Say: "Please don't share personal info — I'm a product guide only."
3. MEDICAL ADVICE: Never diagnose illness or prescribe treatment/dosage. You can mention general health benefits of products (e.g. honey boosts immunity), but say "consult a doctor" for medical conditions.
4. FINANCIAL ADVICE: Never give investment, insurance, or stock market advice.
5. LEGAL ADVICE: Never give legal interpretation or advice.
6. POLITICAL CONTENT: Never discuss political parties, elections, or politicians.
7. RELIGIOUS CONTROVERSY: Never engage in religious debates or comparisons.

TONE: Warm, helpful, like a knowledgeable Pahadi friend. Use relevant emojis naturally. Keep responses concise but complete. Always mention relevant 5 Pahadi Roots products when appropriate.

USE WEB SEARCH: You have Google Search available. Use it for current weather, temperatures, latest news, trek conditions, seasonal availability, and any factual questions.`;
  }

  /* ── STYLES ───────────────────────────────────────────── */
  const css = document.createElement('style');
  css.textContent = `
  #pr-wa {
    position:fixed; right:90px; bottom:30px;
    width:52px; height:52px; border-radius:50%;
    background:#25D366; border:none; cursor:pointer;
    box-shadow:0 4px 16px rgba(37,211,102,.45);
    display:flex; align-items:center; justify-content:center;
    transition:transform .2s cubic-bezier(.34,1.56,.64,1);
    z-index:2147483645;
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
    overflow:hidden; background:#ffffff; border-radius:18px;
    box-shadow:0 8px 40px rgba(0,0,0,.18), 0 0 0 1px rgba(0,0,0,.06);
    display:flex; flex-direction:column;
    z-index:2147483644;
    transform:scale(.87) translateY(18px); opacity:0; pointer-events:none;
    transition:transform .28s cubic-bezier(.34,1.2,.64,1), opacity .28s;
  }
  #pr-panel.open { transform:scale(1) translateY(0); opacity:1; pointer-events:all }
  @media(max-width:440px) { #pr-panel { width:calc(100vw - 16px) !important; right:8px; bottom:108px } }

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
  .pr-hav { width:72px; height:72px; border-radius:50%; overflow:hidden; flex-shrink:0; border:2px solid rgba(200,146,10,.5); }
  .pr-hav img { width:100%; height:100%; object-fit:cover }
  .pr-hn { font-size:14px; font-weight:700; color:#f0ede0; line-height:1.2; font-family:inherit }
  .pr-hs { font-size:10px; font-family:inherit }
  .pr-dot { width:7px; height:7px; border-radius:50%; background:#4aad72; display:inline-block; margin-right:4px; animation:pr-blink 2s ease-in-out infinite }
  @keyframes pr-blink { 0%,100%{opacity:1} 50%{opacity:.3} }
  /* Custom Language Dropdown */
  .pr-lang-wrap {
    margin-left:auto; position:relative; flex-shrink:0;
  }
  .pr-lang-btn {
    display:flex; align-items:center; gap:5px;
    background:#ffffff; color:#1a3a1e;
    border:1.5px solid rgba(200,146,10,.8);
    border-radius:8px; padding:5px 10px;
    font-size:11.5px; font-weight:700; cursor:pointer;
    font-family:inherit; white-space:nowrap;
    min-width:80px; justify-content:space-between;
  }
  .pr-lang-btn:hover { background:#f0f7f1; }
  .pr-lang-arrow { font-size:9px; opacity:0.7; }
  .pr-lang-menu {
    display:none; position:absolute; right:0; top:calc(100% + 4px);
    background:#ffffff; border:1.5px solid #2d5233;
    border-radius:10px; overflow:hidden; z-index:99999;
    box-shadow:0 8px 24px rgba(0,0,0,.18);
    max-height:260px; overflow-y:auto; min-width:130px;
    scrollbar-width:thin; scrollbar-color:#2d5233 #f0f7f1;
  }
  .pr-lang-menu.open { display:block; }
  .pr-lang-group {
    padding:5px 10px 2px; font-size:9.5px; font-weight:800;
    color:#9ca3af; text-transform:uppercase; letter-spacing:.5px;
    background:#f9fafb; border-bottom:1px solid #e5e7eb;
  }
  .pr-lang-opt {
    padding:8px 14px; font-size:12px; font-weight:600;
    color:#1a3a1e; cursor:pointer; transition:all .12s;
    font-family:inherit;
  }
  .pr-lang-opt:hover { background:#d4ecd9; color:#1a3a1e; }
  .pr-lang-opt.active { background:#2d5233; color:#ffffff; }

  .pr-chips-toggle {
    padding:5px 12px; display:flex; align-items:center; gap:6px;
    background:#f0f7f1; border-bottom:1px solid #e5e7eb; flex-shrink:0;
    cursor:pointer; font-size:11px; font-weight:700; color:#1a3a1e;
    user-select:none;
  }
  .pr-chips-toggle:hover { background:#d4ecd9; }
  .pr-chips-arrow { font-size:9px; margin-left:auto; transition:transform .2s; }
  .pr-chips-arrow.open { transform:rotate(180deg); }
  .pr-chips { padding:7px 10px; flex-direction:row; flex-wrap:nowrap; gap:6px; overflow-x:auto; overflow-y:hidden; flex-shrink:0; scrollbar-width:none; border-bottom:1px solid #f3f4f6; background:#ffffff; display:none; }
  .pr-chips::-webkit-scrollbar { display:none }
  .pr-chips.open { display:flex !important; }
  .pr-chip { display:inline-flex; align-items:center; white-space:nowrap; border-radius:20px; padding:5px 12px; font-size:11px; cursor:pointer; transition:all .15s; flex-shrink:0; flex-grow:0; font-family:inherit; border:1.5px solid #2d5233; background:#f0f7f1; color:#1a3a1e; font-weight:600; }
  .pr-chip:hover { background:#d4ecd9; border-color:#1a3a1e; color:#1a3a1e; }

  .pr-msgs { flex:1; overflow-y:auto; padding:12px; display:flex; flex-direction:column; gap:10px; background:#fafafa; scrollbar-width:thin; scrollbar-color:rgba(0,0,0,.1) transparent }
  .pr-msgs::-webkit-scrollbar { width:3px }
  .pr-msgs::-webkit-scrollbar-thumb { background:#d1d5db; border-radius:3px }
  .pr-m { display:flex; gap:7px; align-items:flex-end; animation:pr-in .25s ease-out }
  @keyframes pr-in { from{opacity:0;transform:translateY(7px)} to{opacity:1;transform:translateY(0)} }
  .pr-m.u { flex-direction:row-reverse }
  .pr-mav { width:28px; height:28px; border-radius:50%; flex-shrink:0; overflow:hidden; display:flex; align-items:center; justify-content:center }
  .pr-m.b .pr-mav img { width:100%; height:100%; object-fit:cover; border-radius:50% }
  .pr-m.u .pr-mav { background:rgba(255,255,255,.1); font-size:13px }
  .pr-mb { max-width:82%; padding:9px 13px; border-radius:15px; font-size:13px; line-height:1.55; font-family:inherit }
  .pr-m.b .pr-mb { background:#f3f4f6; color:#1a1a1a; border:1px solid rgba(0,0,0,.06); border-bottom-left-radius:4px }
  .pr-m.u .pr-mb { border-bottom-right-radius:4px; color:#fff }

  .pr-pcs { display:flex; flex-direction:column; gap:6px; margin-top:8px }
  .pr-pc { background:#f9fafb; border:1px solid #e5e7eb; border-radius:9px; padding:8px 10px; display:flex; align-items:center; gap:8px }
  .pr-pce { font-size:20px; flex-shrink:0 }
  .pr-pcn { font-size:12px; color:#111827; font-weight:600; line-height:1.3 }
  .pr-pcp { font-size:11px; margin-top:1px }
  .pr-pcb { margin-left:auto; border:none; border-radius:6px; padding:4px 9px; font-size:11px; cursor:pointer; font-weight:700; flex-shrink:0; transition:transform .15s; font-family:inherit }
  .pr-pcb:hover { transform:scale(1.05) }

  .pr-fb { display:flex; gap:4px; padding-left:35px; margin-top:2px }
  .pr-fb button { background:none; border:1px solid #e5e7eb; border-radius:5px; padding:2px 7px; font-size:11px; color:#9ca3af; cursor:pointer; transition:all .15s; font-family:inherit }
  .pr-fb button.liked { border-color:#4aad72; color:#4aad72 }
  .pr-fb button.disliked { border-color:#ff5252; color:#ff5252 }

  .pr-dots { display:flex; gap:4px; padding:2px 0 }
  .pr-dots span { width:6px; height:6px; border-radius:50%; animation:pr-db .8s ease-in-out infinite }
  .pr-dots span:nth-child(2) { animation-delay:.15s }
  .pr-dots span:nth-child(3) { animation-delay:.3s }
  @keyframes pr-db { 0%,80%,100%{transform:scale(.6);opacity:.3} 40%{transform:scale(1);opacity:1} }

  .pr-ia { padding:10px 12px; border-top:1px solid rgba(0,0,0,.08); background:#ffffff; flex-shrink:0 }
  .pr-ir { display:flex; gap:7px; align-items:flex-end }
  #pr-ti { flex:1; background:#f3f4f6; border:1.5px solid #e5e7eb; border-radius:13px; padding:9px 12px; font-size:13px; color:#1a1a1a; resize:none; outline:none; font-family:inherit; max-height:100px; line-height:1.4; scrollbar-width:none; transition:border-color .2s }
  #pr-ti:focus { border-color:#2d5233; }
  #pr-ti::placeholder { color:#9ca3af; }
  #pr-ti::-webkit-scrollbar { display:none }
  #pr-voice { background:none; border:1px solid #e5e7eb; border-radius:50%; width:35px; height:35px; cursor:pointer; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:all .2s }
  #pr-voice svg { width:15px; height:15px }
  #pr-voice.rec { border-color:#ff5252; animation:pr-rec .8s ease-in-out infinite }
  @keyframes pr-rec { 0%,100%{box-shadow:0 0 0 0 rgba(255,82,82,.4)} 50%{box-shadow:0 0 0 7px rgba(255,82,82,0)} }
  #pr-sb { width:35px; height:35px; flex-shrink:0; border-radius:50%; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:transform .15s }
  #pr-sb:hover:not(:disabled) { transform:scale(1.1) }
  #pr-sb:disabled { opacity:.35; cursor:not-allowed }
  #pr-sb svg { width:15px; height:15px }
  .pr-ft { text-align:center; font-size:9px; color:#9ca3af; margin-top:6px; font-family:inherit }

  .pr-toast { position:fixed; bottom:115px; left:50%; transform:translateX(-50%) translateY(14px); border-radius:9px; padding:8px 18px; font-size:12px; font-weight:600; opacity:0; transition:all .28s; z-index:2147483647; pointer-events:none; font-family:inherit; white-space:nowrap }
  .pr-toast.show { opacity:1; transform:translateX(-50%) translateY(0) }
  .pr-src { font-size:10px; color:#9ca3af; margin-top:4px; padding-left:35px; }
  .pr-src a { color:#2d5233; text-decoration:none }
  .pr-src a:hover { color:#1a3a1e; }
  `;
  document.head.appendChild(css);

  /* ── Apply theme colors ───────────────────────────────── */
  function applyTheme() {
    const fab2 = document.getElementById('pr-ai-fab');
    if(fab2){ fab2.style.background = DARK_GREEN; fab2.style.boxShadow = '0 6px 22px rgba(26,58,30,.5)'; }
    const hd = document.querySelector('.pr-hd');
    if(hd) hd.style.background = 'linear-gradient(135deg,' + DARK_GREEN + ',' + MID_GREEN + ')';
    const drag = document.getElementById('pr-drag');
    if(drag) drag.style.background = 'linear-gradient(135deg,' + DARK_GREEN + ',' + MID_GREEN + ')';
    // chip colors handled by CSS — no override needed
    // custom dropdown — no override needed
    const hs = document.querySelector('.pr-hs');
    if(hs) hs.style.color = GOLD2;
    const sb2 = document.getElementById('pr-sb');
    if(sb2){ sb2.style.background = GOLD; }
    const sbSvg = sb2 ? sb2.querySelector('svg') : null;
    if(sbSvg) sbSvg.style.fill = '#1a1a0a';
    const vSvg = document.querySelector('#pr-voice svg');
    if(vSvg) vSvg.style.fill = '#6b7280';
    document.querySelectorAll('.pr-dots span').forEach(s => s.style.background = GOLD);
    document.querySelectorAll('.pr-pcb').forEach(b => { b.style.background=GOLD; b.style.color='#1a1a0a'; });
  }

  /* ── WhatsApp button ──────────────────────────────────── */
  const waBtn = document.createElement('button');
  waBtn.id = 'pr-wa';
  waBtn.setAttribute('aria-label', 'WhatsApp');
  waBtn.innerHTML = '<span class="pr-wa-tip">WhatsApp us</span><svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
  waBtn.addEventListener('click', () => {
    window.open('https://wa.me/' + WA_NUM + '?text=' + encodeURIComponent('Namaste! I want to know more about your Himalayan products'), '_blank');
  });
  document.body.appendChild(waBtn);

  /* ── AI FAB ───────────────────────────────────────────── */
  const fab = document.createElement('button');
  fab.id = 'pr-ai-fab';
  fab.setAttribute('aria-label', 'Chat with Pahadi_AI');
  fab.innerHTML = '<img class="pr-fi" src="' + AI_CFG.avatar + '" alt="AI"><span class="pr-fc">✕</span><span class="pr-badge" id="pr-badge">1</span>';
  document.body.appendChild(fab);

  /* ── Panel ────────────────────────────────────────────── */
  const panel = document.createElement('div');
  panel.id = 'pr-panel';
  panel.innerHTML = '<div id="pr-left-edge"></div><div id="pr-bottom-edge"></div><div id="pr-drag"></div>'
    + '<div class="pr-hd">'
    + '<div class="pr-hav"><img src="' + AI_CFG.avatar + '" alt="AI"></div>'
    + '<div><div class="pr-hn" id="pr-name">' + AI_CFG.name + '</div>'
    + '<div class="pr-hs"><span class="pr-dot"></span><span id="pr-tagline">' + AI_CFG.tagline + '</span></div></div>'
    + '<div class="pr-lang-wrap" id="pr-lang-wrap">'
    + '<button class="pr-lang-btn" id="pr-lang-btn"><span id="pr-lang-label">English</span><span class="pr-lang-arrow">▼</span></button>'
    + '<div class="pr-lang-menu" id="pr-lang-menu">'
    + '<div class="pr-lang-group">🇮🇳 Major Indian Languages</div>'
    + '<div class="pr-lang-opt active" data-lang="en">🇬🇧 English</div>'
    + '<div class="pr-lang-opt" data-lang="hi">हिंदी — Hindi</div>'
    + '<div class="pr-lang-opt" data-lang="pa">ਪੰਜਾਬੀ — Punjabi</div>'
    + '<div class="pr-lang-opt" data-lang="bn">বাংলা — Bengali</div>'
    + '<div class="pr-lang-opt" data-lang="ta">தமிழ் — Tamil</div>'
    + '<div class="pr-lang-opt" data-lang="te">తెలుగు — Telugu</div>'
    + '<div class="pr-lang-opt" data-lang="mr">मराठी — Marathi</div>'
    + '<div class="pr-lang-opt" data-lang="gu">ગુજરાતી — Gujarati</div>'
    + '<div class="pr-lang-opt" data-lang="kn">ಕನ್ನಡ — Kannada</div>'
    + '<div class="pr-lang-opt" data-lang="ml">മലയാളം — Malayalam</div>'
    + '<div class="pr-lang-opt" data-lang="or">ଓଡ଼ିଆ — Odia</div>'
    + '<div class="pr-lang-opt" data-lang="as">অসমীয়া — Assamese</div>'
    + '<div class="pr-lang-opt" data-lang="ur">اردو — Urdu</div>'
    + '<div class="pr-lang-opt" data-lang="ne">नेपाली — Nepali</div>'
    + '<div class="pr-lang-opt" data-lang="mai">मैथिली — Maithili</div>'
    + '<div class="pr-lang-opt" data-lang="kok">कोंकणी — Konkani</div>'
    + '<div class="pr-lang-opt" data-lang="mni">মৈতৈ — Manipuri</div>'
    + '<div class="pr-lang-opt" data-lang="sa">संस्कृत — Sanskrit</div>'
    + '<div class="pr-lang-opt" data-lang="si">සිංහල — Sinhala</div>'
    + '<div class="pr-lang-group">🏔️ Pahadi Bolis</div>'
    + '<div class="pr-lang-opt" data-lang="kngr">कांगड़ी/हिमाचली — Kangri Pahari (HP)</div>'
    + '<div class="pr-lang-opt" data-lang="garh">गढ़वाली — Garhwali (Uttarakhand)</div>'
    + '<div class="pr-lang-opt" data-lang="kum">कुमाऊँनी — Kumaoni (Uttarakhand)</div>'
    + '<div class="pr-lang-opt" data-lang="doi">डोगरी — Dogri (J&K)</div>'
    + '<div class="pr-lang-opt" data-lang="lad">Ladakhi — Ladakhi (Ladakh)</div>'
    + '<div class="pr-lang-group">🌿 Northeast India</div>'
    + '<div class="pr-lang-opt" data-lang="as">অসমীয়া — Assamese</div>'
    + '<div class="pr-lang-opt" data-lang="mni">মৈতৈ — Manipuri</div>'
    + '<div class="pr-lang-opt" data-lang="nag">Nagamese — Nagamese (Nagaland)</div>'
    + '<div class="pr-lang-opt" data-lang="bodo">बड़ो — Bodo (Assam)</div>'
    + '<div class="pr-lang-opt" data-lang="mizo">Mizo — Mizo (Mizoram)</div>'
    + '<div class="pr-lang-opt" data-lang="khasi">Khasi — Khasi (Meghalaya)</div>'
    + '<div class="pr-lang-opt" data-lang="sikkimese">Sikkimese — Sikkimese (Sikkim)</div>'
    + '<div class="pr-lang-group">🌍 Global Languages</div>'
    + '<div class="pr-lang-opt" data-lang="zh">中文 — Chinese</div>'
    + '<div class="pr-lang-opt" data-lang="ja">日本語 — Japanese</div>'
    + '<div class="pr-lang-opt" data-lang="ko">한국어 — Korean</div>'
    + '<div class="pr-lang-opt" data-lang="ar">العربية — Arabic</div>'
    + '<div class="pr-lang-opt" data-lang="fr">Français — French</div>'
    + '<div class="pr-lang-opt" data-lang="de">Deutsch — German</div>'
    + '<div class="pr-lang-opt" data-lang="es">Español — Spanish</div>'
    + '<div class="pr-lang-opt" data-lang="ru">Русский — Russian</div>'
    + '<div class="pr-lang-opt" data-lang="pt">Português — Portuguese</div>'
    + '</div></div></div>'
    + '<div class="pr-chips-toggle" id="pr-chips-toggle"><span>💬 Quick Questions</span><span class="pr-chips-arrow" id="pr-chips-arrow">▼</span></div>'
    + '<div class="pr-chips" id="pr-chips">'
    + '<div class="pr-chip" data-q="Best honey recommendation?">🍯 Best honey</div>'
    + '<div class="pr-chip" data-q="Show products under 500 rupees">💰 Under ₹500</div>'
    + '<div class="pr-chip" data-q="Benefits of A2 Bilona Ghee?">🧈 Ghee benefits</div>'
    + '<div class="pr-chip" data-q="How to identify genuine Kashmiri saffron?">🌸 Real saffron?</div>'
    + '<div class="pr-chip" data-q="Delivery time and shipping details?">🚚 Delivery?</div>'
    + '<div class="pr-chip" data-q="What is the weather in Shimla today?">🌤️ Shimla weather</div>'
    + '<div class="pr-chip" data-q="Gift ideas from Himachal Pradesh?">🎁 Gift ideas</div>'
    + '<div class="pr-chip" data-q="What superfoods grow in the Himalayas?">🌿 Superfoods</div>'
    + '</div>'
    + '<div class="pr-msgs" id="pr-msgs"></div>'
    + '<div class="pr-ia"><div class="pr-ir">'
    + '<button id="pr-voice" title="Voice input"><svg viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1 1.93c-3.94-.49-7-3.85-7-7.93H2c0 4.57 3.13 8.37 7.26 9.58V21h5.48v-3.42C18.87 16.37 22 12.57 22 8h-2c0 4.08-3.06 7.44-7 7.93V15.93z"/></svg></button>'
    + '<textarea id="pr-ti" rows="1" placeholder="Ask anything — products, weather, health…"></textarea>'
    + '<button id="pr-sb" aria-label="Send"><svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg></button>'
    + '</div><div class="pr-ft">Pahadi Roots AI · Powered by Google Gemini</div></div>';
  document.body.appendChild(panel);

  const toast = document.createElement('div');
  toast.className = 'pr-toast';
  document.body.appendChild(toast);

  setTimeout(applyTheme, 50);

  /* ── RESIZE ───────────────────────────────────────────── */
  const dragBar    = document.getElementById('pr-drag');
  const leftEdge   = document.getElementById('pr-left-edge');
  const bottomEdge = document.getElementById('pr-bottom-edge');
  let resizing=false, resizeType='', rX0=0, rY0=0, rW0=0, rH0=0;

  function startResize(type, e) {
    resizing=true; resizeType=type;
    rX0=e.clientX; rY0=e.clientY;
    rW0=panel.offsetWidth; rH0=panel.offsetHeight;
    document.body.style.userSelect='none';
    document.body.style.cursor = type==='left' ? 'ew-resize' : 'ns-resize';
    e.preventDefault();
  }
  dragBar.addEventListener('mousedown',    function(e){ startResize('top',e); });
  leftEdge.addEventListener('mousedown',   function(e){ startResize('left',e); });
  bottomEdge.addEventListener('mousedown', function(e){ startResize('bottom',e); });
  document.addEventListener('mousemove', function(e) {
    if (!resizing) return;
    var maxW=Math.min(700,window.innerWidth*.96), maxH=window.innerHeight*.92;
    if (resizeType==='top')    panel.style.height=Math.min(Math.max(rH0+(rY0-e.clientY),380),maxH)+'px';
    if (resizeType==='left')   panel.style.width =Math.min(Math.max(rW0+(rX0-e.clientX),280),maxW)+'px';
    if (resizeType==='bottom') panel.style.height=Math.min(Math.max(rH0-(rY0-e.clientY),380),maxH)+'px';
  });
  document.addEventListener('mouseup', function() {
    if(resizing){ resizing=false; document.body.style.userSelect=''; document.body.style.cursor=''; }
  });
  dragBar.addEventListener('touchstart', function(e){ var t=e.touches[0]; resizing=true; resizeType='top'; rY0=t.clientY; rH0=panel.offsetHeight; },{passive:true});
  leftEdge.addEventListener('touchstart', function(e){ var t=e.touches[0]; resizing=true; resizeType='left'; rX0=t.clientX; rW0=panel.offsetWidth; },{passive:true});
  document.addEventListener('touchmove', function(e){
    if(!resizing) return; var t=e.touches[0];
    if(resizeType==='top')  panel.style.height=Math.min(Math.max(rH0+(rY0-t.clientY),380),window.innerHeight*.9)+'px';
    if(resizeType==='left') panel.style.width =Math.min(Math.max(rW0+(rX0-t.clientX),280),700)+'px';
  },{passive:true});
  document.addEventListener('touchend', function(){ resizing=false; });

  /* ── STATE ────────────────────────────────────────────── */
  var isOpen=false, isThinking=false, history=[], lang='en', isRec=false, rec=null;
  var msgs    = document.getElementById('pr-msgs');
  var input   = document.getElementById('pr-ti');
  var sb      = document.getElementById('pr-sb');
  var voice   = document.getElementById('pr-voice');
  // langSel removed — using custom dropdown now

  var LANG_NAMES = {
    en:'English', hi:'Hindi', pa:'Punjabi', bn:'Bengali', ta:'Tamil', te:'Telugu',
    mr:'Marathi', gu:'Gujarati', kn:'Kannada', ml:'Malayalam', or:'Odia', as:'Assamese',
    ne:'Nepali', doi:'Dogri', kngr:'Kangri Pahari (Himachali)', garh:'Garhwali',
    kum:'Kumaoni', lad:'Ladakhi',
    ur:'Urdu', sa:'Sanskrit', mai:'Maithili', kok:'Konkani', mni:'Manipuri', si:'Sinhala',
    nag:'Nagamese', bodo:'Bodo', mizo:'Mizo', khasi:'Khasi', sikkimese:'Sikkimese',
    zh:'Chinese', ja:'Japanese', ko:'Korean', ar:'Arabic',
    fr:'French', de:'German', es:'Spanish', ru:'Russian', pt:'Portuguese',
  };

  var VOICE_MAP = {
    en:'en-IN', hi:'hi-IN', pa:'pa-IN', bn:'bn-IN', ta:'ta-IN', te:'te-IN',
    mr:'mr-IN', gu:'gu-IN', kn:'kn-IN', ml:'ml-IN', or:'or-IN', as:'as-IN',
    ne:'ne-NP', kngr:'hi-IN', garh:'hi-IN', doi:'hi-IN', kum:'hi-IN', lad:'hi-IN',
    nag:'en-IN', bodo:'hi-IN', mizo:'en-IN', khasi:'en-IN', sikkimese:'ne-NP',
    ur:'ur-PK', si:'si-LK', zh:'zh-CN', ru:'ru-RU', pt:'pt-BR', ja:'ja-JP', ko:'ko-KR', ar:'ar-SA', fr:'fr-FR',
    de:'de-DE', es:'es-ES',
  };

  var PLACEHOLDERS = {
    hi:'कुछ भी पूछें — उत्पाद, मौसम, स्वास्थ्य…',
    pa:'ਕੁਝ ਵੀ ਪੁੱਛੋ — ਉਤਪਾਦ, ਮੌਸਮ…',
    bn:'যেকোনো কিছু জিজ্ঞেস করুন…',
    ta:'எதையும் கேளுங்கள்…',
    te:'ఏమైనా అడగండి…',
    mr:'काहीही विचारा…',
    gu:'કંઈ પણ પૂછો…',
    kn:'ಏನಾದರೂ ಕೇಳಿ…',
    ml:'എന്തും ചോദിക്കൂ…',
    ar:'اسأل أي شيء…',
    zh:'请随便问…',
    ja:'何でも聞いてください…',
  };

  /* ── CUSTOM LANGUAGE DROPDOWN ─────────────────────────── */
  var langBtn  = document.getElementById('pr-lang-btn');
  var langMenu = document.getElementById('pr-lang-menu');
  var langLabel = document.getElementById('pr-lang-label');

  langBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    langMenu.classList.toggle('open');
  });

  document.addEventListener('click', function() {
    langMenu.classList.remove('open');
  });

  langMenu.addEventListener('click', function(e) {
    var opt = e.target.closest('.pr-lang-opt');
    if (!opt) return;
    var newLang = opt.getAttribute('data-lang');
    // Update active state
    langMenu.querySelectorAll('.pr-lang-opt').forEach(function(o) { o.classList.remove('active'); });
    opt.classList.add('active');
    // Update button label
    langLabel.textContent = opt.textContent;
    langMenu.classList.remove('open');
    // Apply language
    lang = newLang;
    input.placeholder = PLACEHOLDERS[lang] || 'Ask anything — products, weather, health…';
    history = [];
    msgs.innerHTML = '';
    welcome();
  });

  /* ── TOGGLE ───────────────────────────────────────────── */
  fab.addEventListener('click', function() {
    isOpen = !isOpen;
    fab.classList.toggle('open', isOpen);
    panel.classList.toggle('open', isOpen);
    var b = document.getElementById('pr-badge');
    if(b) b.remove();
    if(isOpen && !msgs.children.length) welcome();
    if(isOpen) setTimeout(function(){ input.focus(); }, 300);
    if(isOpen) setTimeout(applyTheme, 60);
  });
  document.addEventListener('click', function(e) {
    if(isOpen && !panel.contains(e.target) && !fab.contains(e.target)) {
      isOpen=false; fab.classList.remove('open'); panel.classList.remove('open');
    }
  });
  // Toggle chips
  var chipsToggle = document.getElementById('pr-chips-toggle');
  var chipsDiv    = document.getElementById('pr-chips');
  var chipsArrow  = document.getElementById('pr-chips-arrow');

  // Null-safe — hide chips on load
  if (chipsDiv) chipsDiv.style.display = 'none';

  if (chipsToggle) {
    chipsToggle.addEventListener('click', function() {
      if (!chipsDiv) return;
      var isOpen = chipsDiv.style.display === 'flex';
      chipsDiv.style.display = isOpen ? 'none' : 'flex';
      if (chipsArrow) chipsArrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
    });
  }

  panel.querySelectorAll('.pr-chip').forEach(function(c) {
    c.addEventListener('click', function() {
      send(c.getAttribute('data-q'));
      if (chipsDiv) chipsDiv.style.display = 'none';
      if (chipsArrow) chipsArrow.style.transform = 'rotate(0deg)';
    });
  });

  /* ── WELCOME MESSAGE ──────────────────────────────────── */
  function welcome() {
    var w = {
      en: '🙏 Namaste! I am **' + AI_CFG.name + '** — your Himalayan guide!\n\nI can help with:\n• Our Himalayan products — benefits, how to use, authenticity\n• Weather in Shimla, Manali, Ladakh (live search!)\n• Budget recommendations, gift ideas\n• Delivery, returns, any questions\n\nWhat would you like to know?',
      hi: '🙏 नमस्ते! मैं **' + AI_CFG.name + '** हूँ — आपका Himalayan guide!\n\nमैं इनमें मदद कर सकता हूँ:\n• हमारे शुद्ध Himalayan उत्पाद\n• शिमला, मनाली का मौसम (live!)\n• Budget के अनुसार सुझाव\n• Delivery और returns\n\nआज क्या जानना है?',
      pa: '🙏 ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ **' + AI_CFG.name + '** ਹਾਂ!\n\nਮੈਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ:\n• ਸਾਡੇ Himalayan ਉਤਪਾਦ\n• ਮੌਸਮ ਦੀ ਜਾਣਕਾਰੀ\n• Budget ਅਨੁਸਾਰ ਸੁਝਾਅ\n\nਦੱਸੋ ਕੀ ਚਾਹੀਦਾ ਹੈ?',
      bn: '🙏 নমস্কার! আমি **' + AI_CFG.name + '** — আপনার Himalayan গাইড!\n\nআমি সাহায্য করতে পারি:\n• Himalayan পণ্য ও উপকারিতা\n• আবহাওয়ার তথ্য\n• বাজেট অনুযায়ী পরামর্শ\n\nকী জানতে চান?',
      ta: '🙏 வணக்கம்! நான் **' + AI_CFG.name + '** — உங்கள் Himalayan வழிகாட்டி!\n\nநான் உதவலாம்:\n• Himalayan தயாரிப்புகள்\n• வானிலை தகவல்\n• பட்ஜெட் பரிந்துரைகள்\n\nஎன்ன தெரிந்துகொள்ள விரும்புகிறீர்கள்?',
      te: '🙏 నమస్కారం! నేను **' + AI_CFG.name + '** — మీ Himalayan గైడ్!\n\nనేను సహాయపడగలను:\n• Himalayan ఉత్పత్తులు\n• వాతావరణ సమాచారం\n• బడ్జెట్ సూచనలు\n\nమీకు ఏమి తెలుసుకోవాలి?',
      mr: '🙏 नमस्कार! मी **' + AI_CFG.name + '** — तुमचा Himalayan मार्गदर्शक!\n\nमी मदत करू शकतो:\n• Himalayan उत्पादने\n• हवामान माहिती\n• Budget नुसार सूचना\n\nकाय जाणून घ्यायचे आहे?',
      gu: '🙏 નમસ્તે! હું **' + AI_CFG.name + '** — તમારો Himalayan ગાઇડ!\n\nહું મદદ કરી શકું:\n• Himalayan ઉત્પાદનો\n• હવામાનની માહિતી\n• Budget મુજબ સૂચनो\n\nशું જаणвू  છे?',
      kngr: '🙏 राम राम जी! मई **' + AI_CFG.name + '** हां — थुआड़ा Himachali गाइड!\n\nमई इत मदद करी सकदा हां:\n• साड़े असल पहाड़ी माल — मखीर (शहद), घियो (घी), केसर\n• शिमले, मनाली दा मौसम (live!)\n• Budget दे हिसाब नाल सलाह\n• Delivery ते returns\n\nदस्सो, किसी चीज़ दी लोड़ हाई?',
      garh: '🙏 नमस्कार! मी **' + AI_CFG.name + '** छूं — तुमारो Himalayan गाइड!\n\nमी यूँ मदद करी सकदूं:\n• हमारा Himalayan उत्पाद\n• शिमला, मनाली को मौसम\n• Budget क हिसाब से सलाह\n• Delivery अर returns\n\nबताओ, क्या जाणनो छ?',
      doi: '🙏 राम राम! मैं **' + AI_CFG.name + '** आं — तुंदा Himalayan guide!\n\nमैं इत्थें मदद करी सकदा आं:\n• साडे Himalayan उत्पाद\n• मौसम दी जानकारी\n• Budget मताबक सलाह\n\nदस्सो की जानना ऐ?',
      kum: '🙏 नमस्कार! मैं **' + AI_CFG.name + '** छु — तुमर Himalayan गाइड!\n\nमैं यूँ मदद करि सकूँ:\n• हमर असली पहाड़ी उत्पाद\n• मौसम की जानकारी\n• Budget क हिसाब से सलाह\n\nबताओ क्या चनो?',
      lad: '🙏 Juley! I am **' + AI_CFG.name + '** — your Himalayan guide!\n\nI can help with:\n• Our pure Ladakhi & Himalayan products\n• Weather in Leh, Ladakh\n• Budget suggestions\n\nYang cho dukpo? (What do you need?)',
      or: '🙏 ନମସ୍କାର! ମୁଁ **' + AI_CFG.name + '** — ଆପଣଙ୍କର Himalayan ଗାଇଡ଼!\n\nମୁଁ ସାହାଯ୍ୟ କରିପାରିବି:\n• Himalayan ଉତ୍ପାଦ\n• ମୌସମ ସୂଚନା\n• Budget ପରାମର୍ଶ\n\nଆପଣ କଣ ଜାଣିବାକୁ ଚାହୁଁଛନ୍ତି?',
      as: '🙏 নমস্কাৰ! মই **' + AI_CFG.name + '** — আপোনাৰ Himalayan গাইড!\n\nমই উপকাৰ কৰিব পাৰোঁ:\n• আমাৰ বিশুদ্ধ Himalayan সামগ্ৰী — মৌ (শহদ), ঘিউ, কেচৰ\n• বতৰৰ খবৰ (live!)\n• Budget অনুযায়ী পৰামৰ্শ\n• Delivery আৰু returns\n\nআপুনি কি বিচাৰে? কওক!\n(আপোনাৰ = Your, মোৰ = My, বাৰু = Good, দুখ = Sad, উপকাৰ = Help)',
      ne: '🙏 नमस्ते! म **' + AI_CFG.name + '** हुँ — तपाईंको Himalayan गाइड!\n\nमैले मद्दत गर्न सक्छु:\n• हाम्रा Himalayan उत्पादनहरू\n• मौसमको जानकारी\n• Budget अनुसार सुझाव\n\nके जान्न चाहनुहुन्छ?',
      ur: '🙏 آداب! میں **' + AI_CFG.name + '** ہوں — آپ کا Himalayan گائیڈ!\n\nمیں مدد کر سکتا ہوں:\n• ہمارے خالص Himalayan مصنوعات\n• موسم کی معلومات\n• Budget کے مطابق مشورہ\n\nبتائیں، کیا جاننا ہے?',
      nag: '🙏 Namaste! Me **' + AI_CFG.name + '** — tumhara Himalayan guide!\n\nMe help dibo pari:\n• Hamara pure Himalayan product — shahad, ghee, kesar\n• Mausam ki jankari\n• Budget hisab se suggestion\n\nBolo, ki chahiye?',
      bodo: '🙏 Namaskar! Mwi **' + AI_CFG.name + '** — nwngni Himalayan guide!\n\nMwi help dibo:\n• Himalayan products — shahad, ghee, kesar\n• Mausam jankari\n• Budget suggestion\n\nBolo ki chahiye?',
      mizo: '🙏 Chibai! Ka hming chu **' + AI_CFG.name + '** — i Himalayan guide!\n\nKa tanpui theih:\n• Himalayan products — shahad, ghee, kesar\n• Weather info\n• Budget suggestion\n\nHe la, i duh engzat nge?',
      khasi: '🙏 Khublei! Nga **' + AI_CFG.name + '** — ngi Himalayan guide!\n\nNga sngewbha:\n• Himalayan products — shahad, ghee, kesar\n• Mausam info\n• Budget suggestion\n\nLa hap, ia la leh?',
    };
    addMsg('bot', w[lang] || w.en, [], true);
  }

  /* ── ADD MESSAGE ──────────────────────────────────────── */
  function addMsg(role, text, sources, skipHistory) {
    sources = sources || [];
    skipHistory = skipHistory || false;
    var wrap = document.createElement('div');
    wrap.className = 'pr-m ' + (role==='user' ? 'u' : 'b');
    var av = document.createElement('div'); av.className='pr-mav';
    if(role==='user') { av.textContent='👤'; }
    else { av.innerHTML='<img src="' + AI_CFG.avatar + '" alt="AI">'; }
    var bbl = document.createElement('div'); bbl.className='pr-mb';
    if(role==='user') { bbl.style.background='linear-gradient(135deg,'+MID_GREEN+',#3d6b42)'; }
    bbl.innerHTML = text
      .replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')
      .replace(/\n•/g,'<br>•')
      .replace(/\n/g,'<br>');
    wrap.appendChild(av); wrap.appendChild(bbl);
    msgs.appendChild(wrap);

    // Show search sources if any
    if(sources && sources.length) {
      var srcDiv = document.createElement('div');
      srcDiv.className = 'pr-src';
      srcDiv.innerHTML = '🔍 ' + sources.slice(0,2).map(function(s){
        return '<a href="' + s.uri + '" target="_blank" rel="noopener">' + (s.title||s.uri).substring(0,40) + '…</a>';
      }).join(' · ');
      msgs.appendChild(srcDiv);
    }

    if(role==='bot' && !skipHistory) {
      var fb = document.createElement('div'); fb.className='pr-fb';
      fb.innerHTML='<button>👍</button><button>👎</button>';
      fb.querySelectorAll('button').forEach(function(btn,i){
        btn.addEventListener('click', function(){
          fb.querySelectorAll('button').forEach(function(b){ b.classList.remove('liked','disliked'); });
          btn.classList.add(i===0?'liked':'disliked');
        });
      });
      msgs.appendChild(fb);
    }
    msgs.scrollTop = msgs.scrollHeight;
    if(!skipHistory) history.push({role:'user'===role?'user':'model', parts:[{text:text}]});
  }

  function showTyping(){
    var el=document.createElement('div'); el.id='pr-typ'; el.className='pr-m b';
    el.innerHTML='<div class="pr-mav"><img src="'+AI_CFG.avatar+'" alt="AI"></div>'
      +'<div class="pr-mb" style="background:#152018"><div class="pr-dots">'
      +'<span style="background:'+GOLD+'"></span><span style="background:'+GOLD+'"></span><span style="background:'+GOLD+'"></span>'
      +'</div></div>';
    msgs.appendChild(el); msgs.scrollTop=msgs.scrollHeight;
  }
  function hideTyping(){ var e=document.getElementById('pr-typ'); if(e) e.remove(); }

  /* ── SEND ─────────────────────────────────────────────── */
  function send(txt) {
    var t = (txt || input.value).trim();
    if(!t || isThinking) return;
    input.value=''; input.style.height='auto';
    addMsg('user', t);
    isThinking=true; sb.disabled=true; showTyping();
    callGemini(t).then(function(r){
      hideTyping();
      addMsg('bot', r.text, r.sources||[]);
      isThinking=false; sb.disabled=false; input.focus();
    }).catch(function(err){
      hideTyping();
      console.error('[Pahadi_AI]', err);
      var errMsg = {
        en: '🙏 Sorry, I had trouble connecting. Please try again in a moment.',
        hi: '🙏 माफ़ करें, connection में कुछ दिक्कत आई। दोबारा try करें।',
        pa: '🙏 ਮਾਫ਼ ਕਰੋ, connection ਵਿੱਚ ਸਮੱਸਿਆ ਆਈ। ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।',
      };
      addMsg('bot', errMsg[lang] || errMsg.en);
      isThinking=false; sb.disabled=false;
    });
  }

  /* ── GEMINI API CALL ──────────────────────────────────── */
  function callGemini(userMsg) {
    var systemPrompt = buildSystemPrompt(lang, LANG_NAMES[lang] || 'English');

    // Build conversation — last 10 turns for context
    var contents = history.slice(-10).concat([
      { role:'user', parts:[{ text: userMsg }] }
    ]);

    var body = {
      system_instruction: {
        parts: [{ text: systemPrompt }]
      },
      contents: contents,
      tools: [{ google_search: {} }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      }
    };

    // Call our secure server proxy — key never in browser
    return fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    .then(function(res){
      if(!res.ok) return res.json().then(function(e){ throw new Error(e.error?.message || 'HTTP '+res.status); });
      return res.json();
    })
    .then(function(data){
      var candidate = data.candidates && data.candidates[0];
      if(!candidate) throw new Error('No candidates in response');

      // Extract text from parts
      var text = '';
      if(candidate.content && candidate.content.parts) {
        candidate.content.parts.forEach(function(p){
          if(p.text) text += p.text;
        });
      }
      if(!text) throw new Error('Empty text response');

      // Extract search sources if Gemini used web search
      var sources = [];
      if(candidate.groundingMetadata && candidate.groundingMetadata.groundingChunks) {
        candidate.groundingMetadata.groundingChunks.forEach(function(chunk){
          if(chunk.web && chunk.web.uri) {
            sources.push({ uri: chunk.web.uri, title: chunk.web.title || '' });
          }
        });
      }

      // Add to conversation history
      history.push({ role:'model', parts:[{ text: text }] });

      return { text: text, sources: sources };
    });
  }

  /* ── VOICE ────────────────────────────────────────────── */
  voice.addEventListener('click', function(){
    if(!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)){
      addMsg('bot','🎤 Voice works in Chrome. Please type your question!'); return;
    }
    if(isRec){ if(rec) rec.stop(); voice.classList.remove('rec'); isRec=false; return; }
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    rec=new SR(); rec.lang=VOICE_MAP[lang]||'en-IN'; rec.interimResults=false;
    rec.onresult=function(e){ input.value=e.results[0][0].transcript; autoR(input); voice.classList.remove('rec'); isRec=false; };
    rec.onerror=function(){ voice.classList.remove('rec'); isRec=false; };
    rec.start(); voice.classList.add('rec'); isRec=true;
  });

  input.addEventListener('keydown', function(e){ if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();} });
  input.addEventListener('input', function(){ autoR(input); });
  sb.addEventListener('click', function(){ send(); });
  function autoR(el){ el.style.height='auto'; el.style.height=Math.min(el.scrollHeight,100)+'px'; }

})();
