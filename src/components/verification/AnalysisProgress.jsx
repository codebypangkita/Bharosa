import React from 'react';
import { Shield, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function AnalysisProgress({ progressStatus, progressPercent }) {
  const { t } = useLanguage();

  const stages = [
    t('progressStep1'),
    t('progressStep2'),
    t('progressStep3'),
    t('progressStep4'),
    t('progressStep5')
  ];

  return (
    <div className="py-12 px-6 max-w-lg mx-auto text-center space-y-6">
      <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-[#E9D1C3] animate-ping opacity-40" />
        <div className="relative w-16 h-16 rounded-2xl bg-[#784331] text-[#FFF9F5] flex items-center justify-center shadow-lg">
          <Shield className="w-8 h-8 animate-pulse" />
        </div>
      </div>

      <div>
        <h3 className="font-serif text-2xl font-bold text-[#34251F] mb-2">
          {t('analyzingTitle')}
        </h3>
        <p className="text-xs text-[#806D63]">
          {t('analyzingSubtitle')}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="w-full bg-[#E8D9D0] h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-[#784331] h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progressPercent, 100)}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-xs font-semibold text-[#806D63]">
          <span className="text-[#784331] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            {progressStatus || 'Evaluating...'}
          </span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
      </div>

      {/* Visible Step Checklist */}
      <div className="bg-[#FFF9F5] border border-[#E8D9D0] rounded-[20px] p-4 text-left space-y-2.5 text-xs text-[#806D63]">
        {stages.map((stage, idx) => {
          const stepPercent = ((idx + 1) / stages.length) * 100;
          const isDone = progressPercent >= stepPercent;
          const isCurrent = progressPercent >= stepPercent - 20 && progressPercent < stepPercent;

          return (
            <div
              key={idx}
              className={`flex items-center gap-2.5 transition-colors ${
                isDone ? 'text-[#426C4D] font-medium' : isCurrent ? 'text-[#784331] font-bold' : 'opacity-40'
              }`}
            >
              <CheckCircle2 className={`w-4 h-4 shrink-0 ${isDone ? 'text-[#426C4D]' : 'text-[#806D63]'}`} />
              <span>{stage}</span>
            </div>
          );
        })}
      </div>

      <p className="text-[11px] text-[#806D63]">
        Transparent inspection demo: Analysis completes client-side without collecting personal data.
      </p>
    </div>
  );
}
