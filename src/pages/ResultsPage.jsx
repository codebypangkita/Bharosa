import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  RotateCcw,
  Printer,
  Calendar,
  Sparkles
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ManipulationHighlighter } from '../components/results/ManipulationHighlighter';
import { ClaimCard } from '../components/results/ClaimCard';
import { WarningSignalCard } from '../components/results/WarningSignalCard';
import { EvidenceMatrix } from '../components/results/EvidenceMatrix';
import { ActionChecklist } from '../components/results/ActionChecklist';
import { useAnalysis } from '../context/AnalysisContext';
import { useLanguage } from '../context/LanguageContext';
import { useHistory } from '../context/HistoryContext';
import { demoCases } from '../data/demoCases';

export function ResultsPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { currentReport } = useAnalysis();
  const { saveReport } = useHistory();
  const [hasSaved, setHasSaved] = useState(false);

  // If user navigated directly to /results without analyzing, load the sample demo
  const report = useMemo(() => {
    return currentReport || {
      id: 'report-demo-active',
      mode: 'demo',
      badgeLabel: 'DEMO ANALYSIS — NOT LIVE REGULATORY VERIFICATION',
      category: demoCases[0].category,
      categoryLabel: 'Multiple Warning Signs Found',
      summary: demoCases[0].summary.en,
      originalText: demoCases[0].text,
      sourcePlatform: demoCases[0].sourcePlatform,
      highlights: demoCases[0].highlights,
      claims: demoCases[0].claims,
      signals: demoCases[0].signals,
      evidenceMatrix: demoCases[0].evidenceMatrix,
      actions: [
        'Do not send money under pressure or tight deadlines.',
        'Do not share OTP, UPI PIN, bank passwords, or debit card details.',
        'Verify entity identity independently on the official SEBI directory (sebi.gov.in).'
      ],
      limitations: [
        'Demonstration scenario based on fictional investment solicitation.',
        'No live registry lookup was performed against official databases.'
      ],
      timestamp: '2026-10-02T19:30:00.000Z'
    };
  }, [currentReport]);

  const formattedDate = useMemo(() => {
    return new Date(report.timestamp).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, [report.timestamp]);

  const getCategoryDetails = (cat) => {
    switch (cat) {
      case 'multiple_warning_signs':
        return {
          title: t('catMultiple'),
          variant: 'danger',
          icon: ShieldAlert,
          bgStyle: 'bg-[#F7E4DF] border-[#A84037]/30 text-[#A84037]'
        };
      case 'some_warning_signs':
        return {
          title: t('catSome'),
          variant: 'warning',
          icon: AlertTriangle,
          bgStyle: 'bg-[#F5EBD6] border-[#A56B25]/30 text-[#A56B25]'
        };
      case 'insufficient_evidence':
        return {
          title: t('catInsufficient'),
          variant: 'neutral',
          icon: HelpCircle,
          bgStyle: 'bg-[#F1E3D9] border-[#E8D9D0] text-[#784331]'
        };
      default:
        return {
          title: t('catNoKnown'),
          variant: 'sage',
          icon: ShieldCheck,
          bgStyle: 'bg-[#E5EEE2] border-[#89A27D]/30 text-[#426C4D]'
        };
    }
  };

  const catDetails = getCategoryDetails(report.category);
  const CategoryIcon = catDetails.icon;

  const handlePrint = () => {
    window.print();
  };

  const handleSave = () => {
    saveReport(report);
    setHasSaved(true);
    setTimeout(() => setHasSaved(false), 2500);
  };

  const handleNewCheck = () => {
    navigate('/verify');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-20 space-y-8">
      {/* Persistent Demonstration Transparency Banner */}
      <div className="bg-[#F1E3D9] border border-[#E8D9D0] rounded-2xl px-4 py-2.5 flex items-center justify-between text-xs font-semibold text-[#784331] shadow-2xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#784331] shrink-0" />
          <span>{report.badgeLabel || t('badgeDemo')}</span>
        </div>
        <span className="text-[10px] uppercase tracking-wider bg-[#E9D1C3] px-2 py-0.5 rounded-full">
          Educational Mode
        </span>
      </div>

      {/* Report Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8D9D0]">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#34251F]">
            {t('resultsReportTitle')}
          </h1>
          <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-[#806D63]">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formattedDate}
            </span>
            <span>•</span>
            <span>Platform: <strong className="text-[#34251F]">{report.sourcePlatform || 'Direct Input'}</strong></span>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2.5 no-print">
          <Button
            variant="secondary"
            size="sm"
            onClick={handlePrint}
            icon={Printer}
          >
            {t('printReportBtn')}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleNewCheck}
            icon={RotateCcw}
          >
            {t('newCheckBtn')}
          </Button>
        </div>
      </div>

      {/* Category Overview Card */}
      <div className={`p-6 sm:p-8 rounded-[26px] border ${catDetails.bgStyle} shadow-soft space-y-4`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-xs flex items-center justify-center shrink-0 shadow-xs">
              <CategoryIcon className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider opacity-80 block">
                Primary Assessment
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                {catDetails.title}
              </h2>
            </div>
          </div>
          <Badge variant={catDetails.variant} size="md">
            Risk Evaluated
          </Badge>
        </div>

        <p className="text-sm leading-relaxed max-w-2xl font-medium">
          {report.summary}
        </p>

        <div className="pt-2 text-[11px] opacity-80 italic">
          Educational risk assessment — not an official regulatory determination.
        </div>
      </div>

      {/* SIGNATURE FEATURE: "Show Me the Manipulation" */}
      <ManipulationHighlighter
        originalText={report.originalText}
        highlights={report.highlights || []}
      />

      {/* Explainable Warning Signs ("What made us cautious?") */}
      {report.signals && report.signals.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E8D9D0]">
            <h3 className="font-serif text-2xl font-bold text-[#34251F]">
              {t('whatMadeUsCautious')}
            </h3>
            <span className="text-xs text-[#806D63] font-semibold bg-[#F1E3D9] px-3 py-1 rounded-full">
              {report.signals.length} Signal{report.signals.length === 1 ? '' : 's'}
            </span>
          </div>

          <div className="space-y-3">
            {report.signals.map((sig, idx) => (
              <WarningSignalCard key={idx} signal={sig} />
            ))}
          </div>
        </section>
      )}

      {/* Detected Claims */}
      {report.claims && report.claims.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E8D9D0]">
            <h3 className="font-serif text-2xl font-bold text-[#34251F]">
              {t('detectedClaimsTitle')}
            </h3>
            <span className="text-xs text-[#806D63] font-semibold bg-[#F1E3D9] px-3 py-1 rounded-full">
              {report.claims.length} Extracted
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {report.claims.map((claim, idx) => (
              <ClaimCard key={idx} claim={claim} />
            ))}
          </div>
        </section>
      )}

      {/* Evidence & Verification Matrix */}
      <EvidenceMatrix evidenceItems={report.evidenceMatrix || []} />

      {/* Final Action Card: "Pause before you pay." */}
      <ActionChecklist
        onNewCheck={handleNewCheck}
        onPrintReport={handlePrint}
        onSaveReport={handleSave}
        hasSaved={hasSaved}
      />

      {/* Report Footer Disclaimer */}
      <div className="text-center text-xs text-[#806D63] max-w-xl mx-auto pt-6 leading-relaxed">
        {t('resultsDisclaimer')}
      </div>
    </div>
  );
}
