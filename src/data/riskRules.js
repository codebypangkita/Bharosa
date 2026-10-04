export const riskRules = [
  {
    id: "guaranteed_return",
    type: "return_promise",
    severity: "high",
    highlightCategory: "return",
    patterns: [
      /guaranteed\s+\d+%/i,
      /guaranteed\s+(?:monthly|daily|weekly|annual|returns)/i,
      /assured\s+returns?/i,
      /100%\s+profit/i,
      /risk\s*free\s+profit/i,
      /fixed\s+monthly\s+income\s+guarantee/i,
      /पक्का\s+रिटर्न/i,
      /गारंटीकृत\s+रिटर्न/i,
      /নিশ্চিত\s+লাভ/i,
      /নিশ্চিত\s+আয়/i,
    ],
    title: {
      en: "Guaranteed or Unusually High Returns",
      hi: "गारंटीकृत या अत्यधिक रिटर्न का वादा",
      as: "নিশ্চিত বা অস্বাভাৱিক লাভৰ প্ৰতিশ্ৰুতি",
    },
    explanation: {
      en: "The message promises specific or guaranteed financial returns without risk.",
      hi: "संदेश में बिना किसी जोखिम के निश्चित या अत्यधिक लाभ का वादा किया गया है।",
      as: "বাৰ্তাত কোনো ক্ষতিৰ আশংকা নোহোৱাকৈ নিশ্চিত লাভৰ প্ৰতিশ্ৰুতি দিয়া হৈছে।",
    },
    whyItMatters: {
      en: "Legitimate market investments are subject to market risks. SEBI regulations prohibit registered intermediaries from guaranteeing returns on equities or derivatives.",
      hi: "शेयर बाजार में कोई भी रिटर्न निश्चित नहीं हो सकता। सेबी के नियमों के अनुसार कोई भी पंजीकृत संस्था गारंटीड रिटर्न का वादा नहीं कर सकती।",
      as: "বজাৰৰ বিনিয়োগ সদায় শংকাৰ অধীন। ছেবিৰ নিয়ম অনুসৰি কোনো বৈধ মধ্যস্থতাকাৰীয়ে নিশ্চিত লাভৰ প্ৰতিশ্ৰুতি দিব নোৱাৰে।",
    },
    missingEvidence: {
      en: "No registered Offer Document, Key Information Memorandum (KIM), or prospectus backing the claim.",
      hi: "दावे के समर्थन में कोई पंजीकृत प्रॉस्पेक्टस या आधिकारिक नियामक दस्तावेज उपलब्ध नहीं है।",
      as: "দাবীৰ সমৰ্থনত কোনো পঞ্জীয়নভুক্ত চৰকাৰী নথি বা প্ৰস্পেকটাছ নাই।",
    },
    nextStep: {
      en: "Treat all guaranteed-return equity offers with extreme caution. Ask for their official SEBI registration certificate and verify it on sebi.gov.in.",
      hi: "अत्यधिक रिटर्न के वादों से सावधान रहें। संस्था का सेबी पंजीकरण प्रमाण पत्र मांगें और जांचें।",
      as: "অস্বাভাৱিক লাভৰ প্ৰতিশ্ৰুতিৰ পৰা সাৱধান হওক। তেওঁলোকৰ SEBI পঞ্জীয়ন নম্বৰ লৈ চৰকাৰী ৱেবছাইটত পৰীক্ষা কৰক।",
    }
  },
  {
    id: "regulatory_claim",
    type: "authority_claim",
    severity: "high",
    highlightCategory: "authority",
    patterns: [
      /sebi\s+approved/i,
      /sebi\s+registered/i,
      /sebi\s+certified/i,
      /rbi\s+approved/i,
      /govt\s+approved\s+scheme/i,
      /सेबी\s+अनुमोदित/i,
      /सेबी\s+रजिस्टर्ड/i,
      /ছেবি\s+অনুমোদিত/i,
      /ছেবি\s+পঞ্জীয়নভুক্ত/i,
    ],
    title: {
      en: "Unverified Regulatory Approval Claim",
      hi: "अपुष्ट नियामक अनुमोदन का दावा",
      as: "অপ্ৰমাণিত চৰকাৰী বা ছেবি অনুমোদনৰ দাবী",
    },
    explanation: {
      en: "The message invokes regulatory authority (e.g. SEBI or RBI) to build instant trust.",
      hi: "संदेश में विश्वास पैदा करने के लिए नियामक प्राधिकरण (जैसे सेबी या आरबीआई) का नाम लिया गया है।",
      as: "বিশ্বাস জন্মাবলৈ বাৰ্তাত নিয়ামক সংস্থাৰ (যেনে SEBI বা RBI) নাম ব্যৱহাৰ কৰা হৈছে।",
    },
    whyItMatters: {
      en: "Scammers frequently forge registration certificates or misappropriate real analysts' registration numbers. SEBI does not endorse specific returns or investment schemes.",
      hi: "धोखेबाज अक्सर असली विश्लेषकों का पंजीकरण नंबर चुराकर या फर्जी सर्टिफिकेट दिखाकर भ्रमित करते हैं। सेबी किसी स्कीम का प्रचार नहीं करता।",
      as: "প্ৰৱঞ্চকে সঘনাই আনৰ পঞ্জীয়ন নম্বৰ অপব্যৱহাৰ কৰে বা ভুৱা প্ৰমাণপত্ৰ দেখুৱায়। SEBI-য়ে কোনো নিৰ্দিষ্ট লাভৰ অনুমোদন নকৰে।",
    },
    missingEvidence: {
      en: "SEBI registration number matching the sender's banking name and registered email domain.",
      hi: "प्रेषक के बैंक खाते के नाम और आधिकारिक ईमेल से मेल खाने वाला सेबी पंजीकरण नंबर उपलब्ध नहीं है।",
      as: "প্ৰেৰকৰ বেংক একাউণ্টৰ নাম আৰু পঞ্জীয়নভুক্ত ইমেইলৰ সৈতে মেলা SEBI পঞ্জীয়ন তথ্য নাই।",
    },
    nextStep: {
      en: "Independently cross-reference the name on SEBI's Recognized Intermediaries Portal before interacting.",
      hi: "सेबी की वेबसाइट पर 'Recognised Intermediaries' सूची में नाम और संपर्क विवरण की स्वयं जांच करें।",
      as: "যোগাযোগ কৰাৰ পূৰ্বে SEBI-ৰ চৰকাৰী তালিকাত নাম আৰু পঞ্জীয়ন নম্বৰ নিজে পৰীক্ষা কৰক।",
    }
  },
  {
    id: "urgency_fomo",
    type: "urgency",
    severity: "medium",
    highlightCategory: "urgency",
    patterns: [
      /before\s+\d+(?::\d+)?\s*(?:am|pm)/i,
      /today\s+only/i,
      /limited\s+seats?/i,
      /hurry\s+up/i,
      /offer\s+expires/i,
      /last\s+chance/i,
      /don't\s+miss\s+out/i,
      /आज\s+ही/i,
      /सीमित\s+समय/i,
      /जल्दी\s+करें/i,
      /আজিৰ\s+ভিতৰত/i,
      /সীমিত\s+সুযোগ/i,
      /পলম\s+নকৰিব/i,
    ],
    title: {
      en: "Artificial Urgency & Deadline Pressure",
      hi: "कृत्रिम तात्कालिकता और जल्दबाजी का दबाव",
      as: "কৃত্ৰিম জৰুৰী পৰিস্থিতি আৰু হেঁচা",
    },
    explanation: {
      en: "The sender imposes strict time limits to force a decision without critical reflection.",
      hi: "भेजने वाला कड़ा समय सीमा तय कर रहा है ताकि आप बिना सोचे-समझे जल्दबाजी में निर्णय ले लें।",
      as: "চিন্তা-চৰ্চা কৰিবলৈ সময় নিদি লৰালৰিকৈ সিদ্ধান্ত ল'বলৈ বাধ্য কৰা হৈছে।",
    },
    whyItMatters: {
      en: "Urgency prevents investors from conducting due diligence, consulting family, or verifying credentials.",
      hi: "जल्दबाजी के कारण निवेशक जांच-पड़ताल नहीं कर पाते और आसानी से जालसाजी के शिकार हो जाते हैं।",
      as: "হেঁচাৰ বাবে বিনিয়োগকাৰীয়ে পৰীক্ষা-নিৰীক্ষা কৰিবলৈ বা আনৰ পৰামৰ্শ ল'বলৈ সময় নাপায়।",
    },
    missingEvidence: {
      en: "No legitimate business reason for a private investment offer to expire within hours.",
      hi: "चंद घंटों में निवेश का अवसर समाप्त होने का कोई तार्किक या कानूनी आधार नहीं है।",
      as: "কেইবা ঘণ্টাত সুযোগ নাইকিয়া হোৱাৰ কোনো যুক্তিসঙ্গত বা আইনী কাৰণ নাই।",
    },
    nextStep: {
      en: "Step back. Legitimate financial opportunities do not evaporate if you take 24 hours to verify.",
      hi: "रुकें। कोई भी वास्तविक वित्तीय अवसर एक दिन सोचने या जांच करने से खत्म नहीं होता।",
      as: "ৰওক। এটা দিন পৰীক্ষা-নিৰীক্ষা কৰিলে কোনো সঁচা সুযোগ নষ্ট হৈ নাযায়।",
    }
  },
  {
    id: "upfront_fee",
    type: "payment_request",
    severity: "high",
    highlightCategory: "payment",
    patterns: [
      /pay\s*(?:₹|rs\.?|inr)?\s*[\d,]+/i,
      /fees?\s*(?:₹|rs\.?|inr)?\s*[\d,]+/i,
      /deposit\s*(?:₹|rs\.?|inr)?\s*[\d,]+/i,
      /charge\s*(?:₹|rs\.?|inr)?\s*[\d,]+/i,
      /₹\s*[\d,]+\s*(?:today|only|fee|charge)/i,
      /भुगतान\s*करें/i,
      /फीस/i,
      /টকা\s*দিয়ক/i,
      /মাচুল/i,
    ],
    title: {
      en: "Upfront Fee or Joining Payment",
      hi: "अग्रिम भुगतान या सदस्यता शुल्क की मांग",
      as: "আগতীয়া ধন বা সদস্যভৰ্তি মাচুলৰ দাবী",
    },
    explanation: {
      en: "Direct request for an immediate advance payment via personal UPI, crypto, or private QR code.",
      hi: "व्यक्तिगत यूपीआई, क्यूआर कोड या खाते में तत्काल अग्रिम भुगतान करने का अनुरोध किया गया है।",
      as: "ব্যক্তিগত UPI বা কিউআৰ কোডত লগে লগে ধন জমা কৰিবলৈ কোৱা হৈছে।",
    },
    whyItMatters: {
      en: "Registered advisory fees must follow strict disclosure norms and be paid into corporate bank accounts with official invoices, not anonymous UPI handles.",
      hi: "पंजीकृत सलाहकारों की फीस के लिए आधिकारिक बिल और कॉर्पोरेट खाता होना अनिवार्य है, व्यक्तिगत यूपीआई नहीं।",
      as: "বৈধ পৰামৰ্শ মাচুলৰ বাবে চৰকাৰী ৰচিদ আৰু বেংক একাউণ্টৰ প্ৰয়োজন, কোনো ব্যক্তিগত UPI নহয়।",
    },
    missingEvidence: {
      en: "GST invoice, detailed client agreement, and formal risk disclosure statement.",
      hi: "जीएसटी चालान, ग्राहक अनुबंध और वैधानिक जोखिम प्रकटीकरण दस्तावेज गायब हैं।",
      as: "GST ৰচিদ, ক্লায়েণ্ট চুক্তি আৰু আনুষ্ঠানিক বিপদ প্ৰকাশৰ নথি নাই।",
    },
    nextStep: {
      en: "Never transfer money to personal UPI handles or private bank accounts for 'VIP tips'.",
      hi: "वीआईपी टिप्स या गुप्त ग्रुप के नाम पर कभी भी व्यक्तिगत यूपीआई पर पैसे न भेजें।",
      as: "ভিআইপি টিপছৰ বাবে ব্যক্তিগত একাউণ্ট বা UPI-ত কেতিয়াও টকা নিদিব।",
    }
  },
  {
    id: "private_channel",
    type: "channel_isolation",
    severity: "medium",
    highlightCategory: "other",
    patterns: [
      /join\s+(?:our\s+)?(?:vip|premium|exclusive|secret)\s+group/i,
      /telegram\s+channel/i,
      /whatsapp\s+group/i,
      /secret\s+channel/i,
      /वीआईपी\s+ग्रुप/i,
      /टेलीग्राम\s+चैनल/i,
      /ভিআইপি\s+গ্ৰুপ/i,
      /টেলিগ্ৰাম\s+চেনেল/i,
    ],
    title: {
      en: "Funneling into Private Channels (VIP / Telegram)",
      hi: "निजी समूहों (VIP / टेलीग्राम) में ले जाने का प्रयास",
      as: "গোপন চেনেল বা ভিআইপি গ্ৰুপলৈ লৈ যোৱাৰ চেষ্টা",
    },
    explanation: {
      en: "Directing users from open platforms to unregulated private chats where fake social proof can be staged.",
      hi: "खुले मंचों से हटाकर ऐसे निजी ग्रुप में ले जाना जहां फर्जी लाभ के स्क्रीनशॉट दिखाकर फंसाया जा सके।",
      as: "মুকলি মঞ্চৰ পৰা গোপন গ্ৰুপলৈ নিয়া হয় য'ত ভুৱা লাভৰ ছবি দেখুৱাই প্ৰলোভন দিয়া হয়।",
    },
    whyItMatters: {
      en: "Private messaging apps lack public accountability. Bad actors use fabricated testimonials and bot networks to manufacture consensus.",
      hi: "निजी ग्रुपों में अन्य 'सदस्य' अक्सर बॉट या साथी होते हैं जो नकली मुनाफे की तारीफ करते हैं।",
      as: "গোপন গ্ৰুপত ভুৱা একাউণ্ট আৰু ফটোৰ জৰিয়তে মিছা লাভৰ প্ৰচাৰ চলোৱা হয়।",
    },
    missingEvidence: {
      en: "Public audit trail, verifiable client performance logs, and SEBI compliance registration.",
      hi: "सार्वजनिक ऑडिट रिकॉर्ड, वास्तविक प्रदर्शन इतिहास और सेबी अनुपालन रिकॉर्ड का अभाव।",
      as: "ৰাজহুৱা হিচাপ পৰীক্ষাৰ ৰেকৰ্ড আৰু SEBI নিয়ম মানি চলাৰ প্ৰমাণ নাই।",
    },
    nextStep: {
      en: "Exit unverified stock tip groups. Do not rely on chat screenshots showing massive gains.",
      hi: "अपुष्ट स्टॉक टिप ग्रुप्स से तुरंत बाहर निकलें। स्क्रीनशॉट्स पर भरोसा न करें।",
      as: "অনুমোদিত নোহোৱা টিপছ গ্ৰুপৰ পৰা ওলাই আহক। লাভৰ ভুৱা ফটো বিশ্বাস নকৰিব।",
    }
  },
  {
    id: "credential_theft",
    type: "credential_request",
    severity: "high",
    highlightCategory: "payment",
    patterns: [
      /share\s+otp/i,
      /send\s+otp/i,
      /tell\s+me\s+pin/i,
      /upi\s+pin/i,
      /password/i,
      /ओटीपी\s+शेयर/i,
      /पिन\s+बताएं/i,
      /পাছৱৰ্ড/i,
      /পিন\s+দিয়ক/i,
    ],
    title: {
      en: "Credential or PIN Request",
      hi: "ओटीपी या पिन साझा करने का अनुरोध",
      as: "গোপন OTP বা PIN খোজাৰ প্ৰয়াস",
    },
    explanation: {
      en: "Asking for one-time passwords, UPI PINs, or trading portal credentials under the guise of account setup or bonus credit.",
      hi: "खाता सक्रिय करने या बोनस देने के नाम पर ओटीपी, यूपीआई पिन या पासवर्ड की मांग।",
      as: "একাউণ্ট খোলা বা লাভ পোৱাৰ নামত OTP বা PIN বিচৰা হৈছে।",
    },
    whyItMatters: {
      en: "UPI PIN is solely used for deducting money from your account, never for receiving money. No bank or advisor ever asks for your OTP.",
      hi: "यूपीआई पिन केवल पैसे भेजने के लिए दर्ज किया जाता है, पैसे प्राप्त करने के लिए कभी नहीं।",
      as: "টকা লাভ কৰিবলৈ কেতিয়াও UPI PIN দিব নালাগে, PIN কেৱল টকা কাটিবলৈহে ব্যৱহাৰ হয়।",
    },
    missingEvidence: {
      en: "No financial institution or advisory is legally permitted to ask for your private authentication credentials.",
      hi: "किसी भी वित्तीय संस्था को आपका पासवर्ड या ओटीपी मांगने की अनुमति नहीं है।",
      as: "কোনো বৈধ বিত্তীয় প্ৰতিষ্ঠানে আপোনাৰ গোপন PIN বিচৰাৰ অনুমতি নাই।",
    },
    nextStep: {
      en: "IMMEDIATELY STOP communication. Never enter your UPI PIN to receive money.",
      hi: "तुरंत बात बंद करें। पैसे प्राप्त करने के लिए कभी यूपीआई पिन न डालें।",
      as: "লগে লগে যোগাযোগ বন্ধ কৰক। টকা পাবলৈ কেতিয়াও PIN নিদিব।",
    }
  },
  {
    id: "remote_access",
    type: "remote_access",
    severity: "high",
    highlightCategory: "other",
    patterns: [
      /anydesk/i,
      /teamviewer/i,
      /rustdesk/i,
      /quicksupport/i,
      /screen\s*share/i,
      /install\s+apk/i,
      /स्क्रीन\s*शेयर/i,
      /অ্যাপ\s*ইনস্টল/i,
    ],
    title: {
      en: "Remote Device Access Software",
      hi: "रिमोट एक्सेस ऐप इंस्टॉल करने का दबाव",
      as: "ৰিফট স্ক্ৰীণশ্বেয়াৰ বা এপ্প ইনষ্টলৰ দাবী",
    },
    explanation: {
      en: "Instructions to install screen sharing tools (AnyDesk, TeamViewer) or unverified APK files.",
      hi: "मोबाइल या कंप्यूटर पर एनीडेस्क जैसी स्क्रीन-शेयरिंग ऐप डाउनलोड करने का निर्देश।",
      as: "ম'বাইলত AnyDesk বা অচিনাকি এপ্প ডাউনলোড কৰিবলৈ কোৱা হৈছে।",
    },
    whyItMatters: {
      en: "Remote access tools grant attackers direct visual and interactive control over your phone, enabling them to read incoming SMS OTPs and drain bank accounts.",
      hi: "यह ऐप हमलावर को आपके फोन का पूरा नियंत्रण दे देती है, जिससे वे आपके बैंक खाते से पैसे निकाल सकते हैं।",
      as: "এই এপ্পৰ সহায়ত প্ৰৱঞ্চকে আপোনাৰ ফোনৰ নিয়ন্ত্ৰণ লৈ বেংক একাউণ্টৰ পৰা টকা উলিয়াব পাৰে।",
    },
    missingEvidence: {
      en: "Legitimate investment brokers operate through official Play Store/App Store apps, never remote screen sharing.",
      hi: "अधिकृत ब्रोकर कभी भी स्क्रीन शेयरिंग के जरिए खाता खोलने की मांग नहीं करते।",
      as: "চৰকাৰী ব্ৰ'কাৰে কেতিয়াও স্ক্ৰীণশ্বেয়াৰ কৰিবলৈ নকয়।",
    },
    nextStep: {
      en: "Do NOT install remote apps or download unofficial APK files. Disconnect immediately.",
      hi: "कोई भी अनजान ऐप इंस्टॉल न करें। तुरंत कॉल या चैट काट दें।",
      as: "কোনো অচিনাকি এপ্প ইনষ্টল নকৰিব। লগে লগে যোগাযোগ বন্ধ কৰক।",
    }
  }
];
