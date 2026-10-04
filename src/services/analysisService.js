import { analyzeContentWithRules, analyzeWebsiteUrl } from './ruleEngine';
import { demoCases } from '../data/demoCases';

/**
 * Unified Analysis Orchestrator
 */
export async function performAnalysis({
  type = 'text', // 'text' | 'website' | 'demo'
  content = '',
  platform = 'WhatsApp',
  language = 'en',
  onProgress = null
}) {
  // Simulate progress sequence with realistic stages
  const steps = [
    { key: 'reading', label: 'Reading the content' },
    { key: 'claims', label: 'Identifying financial claims' },
    { key: 'signals', label: 'Examining warning signs' },
    { key: 'evidence', label: 'Checking available evidence' },
    { key: 'explanation', label: 'Preparing your explanation' }
  ];

  if (onProgress) {
    for (let i = 0; i < steps.length; i++) {
      onProgress(steps[i].label, ((i + 1) / steps.length) * 100);
      await new Promise(r => setTimeout(r, 260));
    }
  }

  // Handle Demo Mode specifically
  if (type === 'demo') {
    const demo = demoCases[0];
    return {
      id: `report-${Date.now()}`,
      mode: 'demo',
      badgeLabel: 'DEMO ANALYSIS — NOT LIVE REGULATORY VERIFICATION',
      category: demo.category,
      categoryLabel: 'Multiple Warning Signs Found',
      summary: demo.summary[language] || demo.summary.en,
      originalText: demo.text,
      sourcePlatform: demo.sourcePlatform,
      highlights: demo.highlights,
      claims: demo.claims,
      signals: demo.signals,
      evidenceMatrix: demo.evidenceMatrix,
      actions: [
        'Do not send money under pressure or tight deadlines.',
        'Do not share OTP, UPI PIN, bank passwords, or debit card details.',
        'Verify entity identity independently on the official SEBI directory (sebi.gov.in).',
        'Preserve chat messages, phone numbers, UPI IDs, and transaction receipts.',
        'If money has already been sent, immediately contact your bank and report to 1930 / cybercrime.gov.in.'
      ],
      limitations: [
        'Demonstration scenario based on fictional investment solicitation.',
        'No live registry lookup was performed against official databases.',
        'Provided solely for educational awareness.'
      ],
      timestamp: new Date().toISOString()
    };
  }

  // Handle Website Check
  if (type === 'website') {
    const websiteResult = analyzeWebsiteUrl(content);
    return {
      id: `report-${Date.now()}`,
      ...websiteResult,
      badgeLabel: 'HEURISTIC ANALYSIS — NOT OFFICIAL REGULATORY RULING'
    };
  }

  // Handle Text / Screenshot / Custom Input
  const ruleResult = analyzeContentWithRules(content, platform, language);
  return {
    id: `report-${Date.now()}`,
    ...ruleResult,
    badgeLabel: 'HEURISTIC ANALYSIS — NOT OFFICIAL REGULATORY RULING'
  };
}
