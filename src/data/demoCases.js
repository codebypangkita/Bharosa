export const demoCases = [
  {
    id: "sample_classic_scam",
    label: "Sample 1: VIP Stock Group (High Risk)",
    text: "SEBI approved analyst. Guaranteed 30% monthly returns. Join our VIP group before 8 PM. Pay ₹2,999 today.",
    sourcePlatform: "Telegram",
    category: "multiple_warning_signs",
    summary: {
      en: "This message combines unverified regulatory claims, promises of unusually high guaranteed returns, artificial time pressure, and an advance fee request.",
      hi: "इस संदेश में अपुष्ट सेबी अनुमोदन का दावा, अत्यधिक गारंटीकृत रिटर्न, समय सीमा का दबाव और अग्रिम सदस्यता शुल्क की मांग शामिल है।",
      as: "এই বাৰ্তাত অপ্ৰমাণিত চৰকাৰী দাবী, অস্বাভাৱিক নিশ্চিত লাভ, লৰালৰি কৰাৰ হেঁচা আৰু আগতীয়া ধন দাবী কৰা হৈছে।"
    },
    highlights: [
      {
        text: "SEBI approved analyst",
        type: "authority",
        label: "Authority Claim",
        explanation: {
          en: "The sender claims regulatory sanction. Official SEBI research analyst registration requires independent validation and does not permit guaranteeing returns.",
          hi: "प्रेषक सेबी अनुमोदन का दावा करता है। वास्तविक पंजीकरण की स्वतंत्र पुष्टि जरूरी है और सेबी कभी गारंटीड रिटर्न की अनुमति नहीं देता।",
          as: "প্ৰেৰকে ছেবিৰ অনুমোদন থকা বুলি কৈছে। এই পঞ্জীয়ন নম্বৰ চৰকাৰী ৱেবছাইটত পৰীক্ষা কৰা দৰকাৰ।"
        },
        missingEvidence: "No Registration Number (e.g. INH00000XXXX) or official email domain matching SEBI records.",
        nextStep: "Check SEBI's official directory of registered research analysts at sebi.gov.in."
      },
      {
        text: "Guaranteed 30% monthly returns",
        type: "return",
        label: "Unrealistic Return",
        explanation: {
          en: "A 30% monthly return compounds to over 2,200% annually. No legitimate financial instrument can guarantee such yields without extreme risk or fraud.",
          hi: "30% मासिक लाभ साल में 2,200% से अधिक हो जाता है। शेयर बाजार में कोई भी वैध साधन ऐसा रिटर्न गारंटी नहीं दे सकता।",
          as: "মাহেকীয়া ৩০% লাভ মানে বছৰত ২২০০% তকৈ অধিক। এনে লাভৰ প্ৰতিশ্ৰুতি সম্পূৰ্ণ মিছা আৰু প্ৰৱঞ্চনামূলক।"
        },
        missingEvidence: "Audited track record, regulated offer documents, or statutory risk disclosures.",
        nextStep: "Understand that legitimate equity investments always fluctuate with market conditions."
      },
      {
        text: "before 8 PM",
        type: "urgency",
        label: "Urgency / Pressure",
        explanation: {
          en: "Artificial deadline designed to induce fear of missing out (FOMO) and prevent you from thinking critically or consulting others.",
          hi: "कृत्रिम समय सीमा ताकि आप घबराकर बिना सोचे या परिवार से पूछे तुरंत निर्णय ले लें।",
          as: "চিন্তা কৰিবলৈ সময় নিদি লৰালৰিকৈ সিদ্ধান্ত ল'বলৈ বাধ্য কৰোৱাৰ মানসিক কৌশল।"
        },
        missingEvidence: "No legitimate investment window closes arbitrarily at 8 PM on a private chat app.",
        nextStep: "Take 24 to 48 hours to evaluate any financial opportunity. Genuine offers do not expire overnight."
      },
      {
        text: "Pay ₹2,999 today",
        type: "payment",
        label: "Upfront Payment",
        explanation: {
          en: "Direct demand for immediate advance funds, usually requested to a personal UPI QR or non-corporate bank account.",
          hi: "अग्रिम भुगतान की मांग, जो आमतौर पर किसी व्यक्तिगत यूपीआई या बैंक खाते में मांगी जाती है।",
          as: "ব্যক্তিগত একাউণ্টত আগতীয়াকৈ ধন জমা কৰিবলৈ দিয়া হেঁচা।"
        },
        missingEvidence: "GST compliant tax invoice, registered corporate entity agreement, refund policy.",
        nextStep: "Never transfer money to personal UPI IDs for access to financial advice or trading calls."
      }
    ],
    claims: [
      {
        text: "Guaranteed 30% monthly returns",
        classification: "High-concern claim",
        explanation: "An unusually high guaranteed-return promise is a significant warning sign. Legitimate investments involve market risk and uncertain outcomes.",
        status: "not_independently_verified",
        evidence: "Supporting audited track record not provided. SEBI Intermediary regulations expressly prohibit guaranteed returns."
      },
      {
        text: "SEBI approved analyst",
        classification: "Regulatory authority claim",
        explanation: "The message invokes regulatory authority to build trust. Mentioning SEBI alone does not establish that the sender is genuine.",
        status: "verification_required",
        evidence: "No valid registration number provided in message. Live official verification was not performed in demo mode."
      },
      {
        text: "Pay ₹2,999 to join today",
        classification: "Payment request and urgency",
        explanation: "The sender is asking for an upfront payment while creating artificial pressure to act quickly.",
        status: "warning_identified",
        evidence: "Payment requested via private channel without client agreement or statutory disclosure."
      }
    ],
    signals: [
      {
        ruleId: "guaranteed_return",
        title: "Guaranteed or Unusually High Returns",
        severity: "high",
        matchedExcerpt: "Guaranteed 30% monthly returns",
        whyItMatters: "Equity and derivative markets fluctuate. Guaranteeing 30% monthly returns is mathematically unsustainable and strongly correlates with Ponzi mechanisms.",
        missingEvidence: "Audited financial disclosure or registered offer document.",
        nextStep: "Ask for their registered firm name and cross-verify with SEBI records."
      },
      {
        ruleId: "regulatory_claim",
        title: "Regulatory Impersonation Risk",
        severity: "high",
        matchedExcerpt: "SEBI approved analyst",
        whyItMatters: "Scammers frequently misappropriate regulator names or copy public SEBI registration numbers to deceive first-time investors.",
        missingEvidence: "Official SEBI Registration Number matching banking records.",
        nextStep: "Do not trust logos or text alone. Verify the entity independently on sebi.gov.in."
      },
      {
        ruleId: "urgency_fomo",
        title: "Artificial Urgency Deadline",
        severity: "medium",
        matchedExcerpt: "before 8 PM",
        whyItMatters: "High-pressure tactics are designed to disable critical thinking and prevent victims from seeking second opinions.",
        missingEvidence: "Valid commercial reason for an intraday deadline.",
        nextStep: "Pause for at least 24 hours before sending any funds."
      },
      {
        ruleId: "upfront_fee",
        title: "Advance Fee Solicitation",
        severity: "high",
        matchedExcerpt: "Pay ₹2,999 today",
        whyItMatters: "Advance fees for 'VIP groups' or 'exclusive calls' are a primary revenue model for unregistered tipsters.",
        missingEvidence: "Formal invoice with GSTIN and registered corporate banking channel.",
        nextStep: "Do not transfer funds to personal UPI QR codes."
      }
    ],
    evidenceMatrix: [
      {
        claim: "Guaranteed 30% monthly return",
        status: "Contradicted by market standards",
        badgeType: "contradicted",
        sourceName: "SEBI (Research Analysts) Regulations, 2014 & Market Principles",
        sourceUrl: "https://www.sebi.gov.in",
        explanation: "SEBI regulations prohibit intermediaries from providing profit-sharing or guaranteed yield assurances on securities."
      },
      {
        claim: "SEBI approved analyst",
        status: "Not independently verified",
        badgeType: "unverified",
        sourceName: "SEBI Recognized Intermediaries Portal",
        sourceUrl: "https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognisedFpi=yes&intmId=14",
        explanation: "Live official registry lookup was unavailable in demo mode. The claim remains unverified without an official Registration Number."
      },
      {
        claim: "Private VIP Group legitimacy",
        status: "Source unavailable",
        badgeType: "unavailable",
        sourceName: "Unregulated Messaging Platform (Telegram/WhatsApp)",
        sourceUrl: null,
        explanation: "Closed messaging channels cannot be audited for fraud prevention or compliance."
      }
    ]
  },
  {
    id: "sample_crypto_url",
    label: "Sample 2: Suspicious Trading Website",
    text: "https://secure-rbi-approved-wealth-trade.top/login",
    sourcePlatform: "Website",
    category: "multiple_warning_signs",
    summary: {
      en: "This website link uses deceptive brand keywords ('rbi-approved'), an untrusted top-level domain (.top), and an impersonation structure.",
      hi: "यह वेबसाइट लिंक भ्रामक शब्दों ('rbi-approved') और अविश्वसनीय डोमेन (.top) का उपयोग करके केंद्रीय बैंक की नकल कर रहा है।",
      as: "এই ৱেবছাইটটোৱে ভুৱা নাম ('rbi-approved') আৰু সন্দেহজনক ডমেইন ব্যৱহাৰ কৰি প্ৰৱঞ্চনা কৰাৰ চেষ্টা কৰিছে।"
    },
    highlights: [
      {
        text: "secure-rbi-approved-wealth-trade.top",
        type: "authority",
        label: "Regulatory Impersonation",
        explanation: {
          en: "The Reserve Bank of India (RBI) never operates trading platforms or approves private high-yield investment websites.",
          hi: "भारतीय रिज़र्व बैंक (RBI) कभी भी कोई ट्रेडिंग प्लेटफॉर्म या निजी निवेश वेबसाइट संचालित नहीं करता।",
          as: "RBI-য়ে কেতিয়াও কোনো ব্যক্তিগত ট্ৰেডিং ৱেবছাইটৰ অনুমোদন নিদিয়ে।"
        },
        missingEvidence: "No legitimate RBI Sachet or SEBI registry entry.",
        nextStep: "Never input banking credentials or phone numbers on this domain."
      }
    ],
    claims: [
      {
        text: "rbi-approved trading portal",
        classification: "Impersonation claim",
        explanation: "Central banks do not sponsor or approve retail wealth trading platforms.",
        status: "contradicted",
        evidence: "RBI Sachet portal explicitly warns against unauthorized entities claiming RBI affiliation."
      }
    ],
    signals: [
      {
        ruleId: "regulatory_claim",
        title: "Central Bank Impersonation",
        severity: "high",
        matchedExcerpt: "rbi-approved",
        whyItMatters: "Attackers embed regulatory names into subdomains or URLs to make phishing links appear legitimate.",
        missingEvidence: "Official .gov.in or .nic.in domain hierarchy.",
        nextStep: "Verify legitimate banking institutions on rbi.org.in or sachet.rbi.org.in."
      }
    ],
    evidenceMatrix: [
      {
        claim: "RBI Approved Website",
        status: "Contradicted by official records",
        badgeType: "contradicted",
        sourceName: "RBI Caution List & Sachet Portal",
        sourceUrl: "https://sachet.rbi.org.in/",
        explanation: "RBI maintains an alert list of entities unauthorized to conduct forex or deposit schemes."
      }
    ]
  }
];
