import { riskRules } from '../data/riskRules';

/**
 * Analyzes input text against known investor manipulation patterns.
 * Produces structured results with exact matched substrings, claims,
 * explainable signals, and risk categorization.
 */
export function analyzeContentWithRules(text, sourcePlatform = 'Other', language = 'en') {
  const cleanText = (text || '').trim();

  // Edge case: Very short or insufficient input
  if (cleanText.length < 12) {
    return {
      mode: 'heuristic_rules',
      category: 'insufficient_evidence',
      categoryLabel: 'Insufficient Evidence',
      summary: 'The submitted content is too brief to extract meaningful financial claims or risk signals. Please provide the full message or context.',
      highlights: [],
      signals: [],
      claims: [],
      evidenceMatrix: [],
      actions: [
        'Provide the complete message or full context for a reliable evaluation.',
        'Never send funds based on brief, anonymous messages.'
      ],
      limitations: [
        'Content length under minimum threshold for pattern detection.'
      ],
      timestamp: new Date().toISOString()
    };
  }

  const matchedSignals = [];
  const highlights = [];
  const detectedClaims = [];

  // Match against our rules library
  for (const rule of riskRules) {
    let ruleMatched = false;

    for (const pattern of rule.patterns) {
      const match = cleanText.match(pattern);
      if (match && !ruleMatched) {
        ruleMatched = true;
        const matchedText = match[0];
        const startIndex = match.index;
        const endIndex = startIndex + matchedText.length;

        // Add highlight for interactive inspector
        highlights.push({
          id: `${rule.id}-${startIndex}`,
          text: matchedText,
          startIndex,
          endIndex,
          type: rule.highlightCategory,
          label: rule.title[language] || rule.title.en,
          explanation: rule.explanation[language] || rule.explanation.en,
          whyItMatters: rule.whyItMatters[language] || rule.whyItMatters.en,
          missingEvidence: rule.missingEvidence[language] || rule.missingEvidence.en,
          nextStep: rule.nextStep[language] || rule.nextStep.en
        });

        // Add to explainable warning signals list
        matchedSignals.push({
          ruleId: rule.id,
          title: rule.title[language] || rule.title.en,
          severity: rule.severity,
          matchedExcerpt: matchedText,
          whyItMatters: rule.whyItMatters[language] || rule.whyItMatters.en,
          missingEvidence: rule.missingEvidence[language] || rule.missingEvidence.en,
          nextStep: rule.nextStep[language] || rule.nextStep.en
        });

        // Formulate claim extraction based on signal type
        if (rule.type === 'return_promise') {
          detectedClaims.push({
            text: matchedText,
            classification: 'High-concern return claim',
            explanation: 'The message promises specific or guaranteed returns. Regulated market instruments cannot assure fixed profits.',
            status: 'not_independently_verified',
            evidence: 'Supporting audited track record not provided. SEBI Intermediary regulations strictly prohibit guaranteed returns.'
          });
        } else if (rule.type === 'authority_claim') {
          detectedClaims.push({
            text: matchedText,
            classification: 'Regulatory authority invocation',
            explanation: 'The message cites regulatory standing (e.g., SEBI/RBI). A text assertion does not prove genuine licensed status.',
            status: 'verification_required',
            evidence: 'No verifiable SEBI registration number (e.g. INH...) provided. Cross-check required on sebi.gov.in.'
          });
        } else if (rule.type === 'payment_request') {
          detectedClaims.push({
            text: matchedText,
            classification: 'Advance payment solicitation',
            explanation: 'Direct solicitation of upfront fees or membership charges through private unverified channels.',
            status: 'warning_identified',
            evidence: 'Payment requested without formal client agreement or statutory tax invoice.'
          });
        } else if (rule.type === 'credential_request') {
          detectedClaims.push({
            text: matchedText,
            classification: 'Authentication credential request',
            explanation: 'Requesting OTP, PIN, or login credentials under the guise of bonuses or account clearance.',
            status: 'high_danger',
            evidence: 'No legitimate financial institution is permitted to request private authentication credentials.'
          });
        }
      }
    }
  }

  // Determine Overall Risk Category
  let category = 'no_known_warning_signs';
  let categoryLabel = 'No Known Warning Signs Detected';
  let summary = 'No prominent manipulative keywords or classic scam patterns were detected in this excerpt. However, always exercise personal diligence.';

  if (matchedSignals.length >= 2 || matchedSignals.some(s => s.severity === 'high')) {
    category = 'multiple_warning_signs';
    categoryLabel = 'Multiple Warning Signs Found';
    summary = 'This message contains significant warning indicators, such as unverified claims, financial pressure, or unrealistic return promises. Independent verification is strongly advised before taking any action.';
  } else if (matchedSignals.length === 1) {
    category = 'some_warning_signs';
    categoryLabel = 'Some Warning Signs Found';
    summary = 'At least one cautionary pattern was identified. Review the specific indicator below and proceed with caution.';
  }

  // Evidence matrix items
  const evidenceMatrix = [];

  const authoritySignal = matchedSignals.find(s => s.ruleId === 'regulatory_claim');
  if (authoritySignal) {
    evidenceMatrix.push({
      claim: authoritySignal.matchedExcerpt,
      status: 'Live official verification unavailable',
      badgeType: 'unverified',
      sourceName: 'SEBI Recognized Intermediaries Portal',
      sourceUrl: 'https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognisedFpi=yes&intmId=14',
      explanation: 'No live SEBI API lookup was performed in this demo. The claim remains unverified until manually confirmed on sebi.gov.in.'
    });
  }

  const returnSignal = matchedSignals.find(s => s.ruleId === 'guaranteed_return');
  if (returnSignal) {
    evidenceMatrix.push({
      claim: returnSignal.matchedExcerpt,
      status: 'Contradicted by regulatory standards',
      badgeType: 'contradicted',
      sourceName: 'SEBI (Research Analysts) Regulations, 2014',
      sourceUrl: 'https://www.sebi.gov.in',
      explanation: 'SEBI regulations explicitly prohibit licensed entities from promising or guaranteeing fixed returns on equity or derivatives.'
    });
  }

  const channelSignal = matchedSignals.find(s => s.ruleId === 'private_channel');
  if (channelSignal) {
    evidenceMatrix.push({
      claim: 'Private VIP Group Legitimacy',
      status: 'Source unavailable',
      badgeType: 'unavailable',
      sourceName: 'Encrypted Private Group (Telegram/WhatsApp)',
      sourceUrl: null,
      explanation: 'Private closed chats offer no regulatory oversight or public audit trail.'
    });
  }

  // Default action checklist
  const actions = [
    'Do not send money or advance fees under pressure.',
    'Never share OTPs, UPI PINs, or net banking passwords with anyone.',
    'Independently verify advisor registration on the official SEBI directory (sebi.gov.in).',
    'Preserve full chat screenshots and phone numbers if you suspect foul play.'
  ];

  return {
    mode: 'heuristic_rules',
    category,
    categoryLabel,
    summary,
    originalText: cleanText,
    sourcePlatform,
    highlights,
    signals: matchedSignals,
    claims: detectedClaims,
    evidenceMatrix,
    actions,
    limitations: [
      'This analysis is based on static linguistic pattern rules and does not connect to live broker databases.',
      'A message with no detected warning signs is not guaranteed to be safe or genuine.',
      'Does not constitute legal proof of fraud or official SEBI regulatory determination.'
    ],
    timestamp: new Date().toISOString()
  };
}

/**
 * Validates a website URL and extracts heuristic risk indicators.
 */
export function analyzeWebsiteUrl(urlStr) {
  let parsedUrl;
  try {
    parsedUrl = new URL(urlStr.startsWith('http') ? urlStr : `https://${urlStr}`);
  } catch {
    return {
      isValid: false,
      error: 'Please enter a valid web address (e.g., https://example.com).'
    };
  }

  const hostname = parsedUrl.hostname.toLowerCase();
  const protocol = parsedUrl.protocol;
  const isHttps = protocol === 'https:';

  const riskFactors = [];
  const highlights = [];

  // 1. Insecure protocol
  if (!isHttps) {
    riskFactors.push({
      title: 'Insecure Connection (HTTP)',
      severity: 'high',
      matchedExcerpt: 'http://',
      whyItMatters: 'Financial websites must use encrypted HTTPS to safeguard passwords and banking tokens from interception.',
      missingEvidence: 'Valid TLS/SSL certificate.',
      nextStep: 'Never enter bank details, passwords, or personal credentials on an unencrypted HTTP page.'
    });
  }

  // 2. Regulatory name squatting in domain
  const suspiciousKeywords = ['sebi', 'rbi', 'nse', 'bse', 'sbi-wealth', 'secure-trade', 'guaranteed', 'jackpot'];
  for (const kw of suspiciousKeywords) {
    if (hostname.includes(kw) && !hostname.endsWith('.gov.in') && !hostname.endsWith('.nic.in')) {
      riskFactors.push({
        title: `Possible Brand/Regulator Impersonation (${kw})`,
        severity: 'high',
        matchedExcerpt: kw,
        whyItMatters: `The domain includes '${kw}' but is not an official government (.gov.in) or exchange domain. Scammers use brand names in URLs to fake authority.`,
        missingEvidence: 'Official verified organization domain ownership.',
        nextStep: 'Check whether the genuine entity publishes this URL on their verified social media or official portal.'
      });
      highlights.push({
        text: kw,
        type: 'authority',
        label: 'Brand Squatting',
        explanation: `Using '${kw}' in an unofficial domain to deceive visitors into believing this is an official regulator or bank.`,
        missingEvidence: 'Official .gov.in or .nic.in registry entry.',
        nextStep: 'Access official portals directly by typing their known addresses.'
      });
    }
  }

  // 3. High-risk or cheap TLDs often abused in investment phishing
  const highRiskTlds = ['.top', '.xyz', '.club', '.online', '.site', '.click', '.live', '.buzz', '.vip'];
  const hasSuspiciousTld = highRiskTlds.some(tld => hostname.endsWith(tld));
  if (hasSuspiciousTld) {
    const matchedTld = highRiskTlds.find(tld => hostname.endsWith(tld));
    riskFactors.push({
      title: `High-Risk Top Level Domain (${matchedTld})`,
      severity: 'medium',
      matchedExcerpt: matchedTld,
      whyItMatters: 'Disruptive investment and phishing websites frequently register low-cost TLDs (.top, .xyz) for short-lived scam campaigns.',
      missingEvidence: 'Established business domain registration with public WHOIS history.',
      nextStep: 'Be extremely cautious before downloading apps or logging in on unusual domain extensions.'
    });
    highlights.push({
      text: matchedTld,
      type: 'other',
      label: 'Suspicious Domain Extension',
      explanation: `The domain ends in '${matchedTld}', which is statistically overrepresented in disposable phishing campaigns.`,
      missingEvidence: 'Verifiable corporate registration records.',
      nextStep: 'Avoid sharing sensitive credentials on disposable domain names.'
    });
  }

  // 4. IP address instead of domain
  const isIpAddress = /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname);
  if (isIpAddress) {
    riskFactors.push({
      title: 'Direct IP Address Used Instead of Domain',
      severity: 'high',
      matchedExcerpt: hostname,
      whyItMatters: 'Legitimate investment institutions always use registered domain names. Bare IP addresses indicate unmonitored temporary servers.',
      missingEvidence: 'Corporate domain certificate.',
      nextStep: 'Do not proceed to bare IP addresses.'
    });
  }

  const category = riskFactors.length > 0 ? 'multiple_warning_signs' : 'no_known_warning_signs';
  const categoryLabel = riskFactors.length > 0 ? 'Multiple Warning Signs Found' : 'No Known Warning Signs Detected';

  return {
    isValid: true,
    mode: 'website_heuristic',
    category,
    categoryLabel,
    summary: riskFactors.length > 0
      ? `Website analysis detected ${riskFactors.length} warning indicator(s) including protocol or domain structure anomalies.`
      : 'No obvious phishing keywords or insecure protocols were detected in this web address. Still verify company registration before depositing funds.',
    originalText: parsedUrl.href,
    sourcePlatform: 'Website',
    highlights,
    signals: riskFactors,
    claims: [
      {
        text: parsedUrl.hostname,
        classification: 'Website domain presence',
        explanation: 'The provided web address was checked for domain hygiene, structure, and impersonation flags.',
        status: riskFactors.length > 0 ? 'warning_identified' : 'not_independently_verified',
        evidence: 'Syntactic and domain structure inspection performed.'
      }
    ],
    evidenceMatrix: [
      {
        claim: `URL Protocol: ${parsedUrl.protocol.replace(':', '').toUpperCase()}`,
        status: isHttps ? 'Confirmed encrypted (HTTPS)' : 'Contradicted (Insecure HTTP)',
        badgeType: isHttps ? 'verified' : 'contradicted',
        sourceName: 'Browser Transport Security Protocol',
        sourceUrl: null,
        explanation: isHttps ? 'Connection supports basic transport layer encryption.' : 'Connection lacks modern encryption.'
      },
      {
        claim: 'Official Regulatory License for Website',
        status: 'Not independently verified',
        badgeType: 'unverified',
        sourceName: 'SEBI & RBI Web Registries',
        sourceUrl: 'https://www.sebi.gov.in',
        explanation: 'Live domain whitelist check was unavailable in demo mode.'
      }
    ],
    actions: [
      'Do not enter passwords, OTPs, or debit/credit card details on this site.',
      'Check if the company is officially listed on sebi.gov.in or rbi.org.in.',
      'Never download APK installation files directly from unverified sites.'
    ],
    limitations: [
      'This heuristic check analyzes URL strings and does not crawl or execute external web content.',
      'A website without warning flags is not certified as safe.'
    ],
    timestamp: new Date().toISOString()
  };
}
