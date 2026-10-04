import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare, Square, Shield, LifeBuoy, Printer, BookmarkCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';

export function ActionChecklist({ onNewCheck, onPrintReport, onSaveReport, hasSaved }) {
  const { t } = useLanguage();
  const [checkedItems, setCheckedItems] = useState([false, false, false, false, false]);

  const toggleCheck = (index) => {
    setCheckedItems(prev => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const actions = [
    t('action1'),
    t('action2'),
    t('action3'),
    t('action4'),
    t('action5')
  ];

  return (
    <div className="bg-[#784331] text-[#FFF9F5] rounded-[28px] p-6 sm:p-10 shadow-xl space-y-8 relative overflow-hidden">
      {/* Decorative subtle organic shape in background */}
      <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-[#613424]/40 pointer-events-none blur-2xl" />

      <div className="relative z-10 space-y-2">
        <div className="inline-flex items-center gap-2 bg-[#E9D1C3]/20 text-[#E9D1C3] px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide">
          <Shield className="w-3.5 h-3.5" />
          <span>Immediate Defense Protocol</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
          {t('pauseBeforeYouPayTitle')}
        </h3>
        <p className="text-sm text-[#E9D1C3] max-w-xl">
          {t('pauseBeforeYouPaySubtitle')}
        </p>
      </div>

      {/* Interactive Safety Checklist */}
      <div className="relative z-10 space-y-3">
        {actions.map((act, index) => {
          const isDone = checkedItems[index];
          return (
            <div
              key={index}
              onClick={() => toggleCheck(index)}
              className={`p-4 rounded-[18px] transition-all duration-150 cursor-pointer flex items-start gap-3.5 border ${
                isDone
                  ? 'bg-[#613424] border-[#E9D1C3]/30 text-white font-medium'
                  : 'bg-[#613424]/40 border-white/10 text-[#F1E3D9] hover:bg-[#613424]/70'
              }`}
            >
              <div className="mt-0.5 shrink-0 text-[#E9D1C3]">
                {isDone ? (
                  <CheckSquare className="w-5 h-5 text-[#89A27D]" />
                ) : (
                  <Square className="w-5 h-5 opacity-60" />
                )}
              </div>
              <span className={`text-xs sm:text-sm leading-relaxed ${isDone ? 'line-through opacity-80' : ''}`}>
                {act}
              </span>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="relative z-10 pt-4 flex flex-wrap items-center gap-3 border-t border-white/15">
        <Link to="/safety" className="w-full sm:w-auto">
          <Button
            variant="sage"
            size="lg"
            icon={LifeBuoy}
            className="w-full sm:w-auto"
          >
            {t('viewSafetyToolkit')}
          </Button>
        </Link>

        <Button
          variant="secondary"
          size="lg"
          onClick={onPrintReport}
          icon={Printer}
          className="w-full sm:w-auto"
        >
          {t('printReportBtn')}
        </Button>

        {onSaveReport && (
          <Button
            variant="secondary"
            size="lg"
            onClick={onSaveReport}
            icon={BookmarkCheck}
            className="w-full sm:w-auto"
          >
            {hasSaved ? 'Report Saved!' : 'Save Report'}
          </Button>
        )}

        <Button
          variant="outline"
          size="lg"
          onClick={onNewCheck}
          className="w-full sm:w-auto text-[#FFF9F5] border-[#FFF9F5] hover:bg-white/10"
        >
          {t('checkAnotherBtn')}
        </Button>
      </div>
    </div>
  );
}
