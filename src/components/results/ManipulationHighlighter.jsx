import React, { useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function ManipulationHighlighter({ originalText, highlights = [] }) {
  const { t } = useLanguage();
  const [selectedHighlight, setSelectedHighlight] = useState(null);

  // If there are no highlights or empty text
  if (!originalText) {
    return null;
  }

  // Define highlight styling by category
  const getHighlightStyle = (type, isSelected) => {
    switch (type) {
      case 'return':
        return isSelected
          ? 'bg-[#A84037] text-white ring-2 ring-[#A84037]'
          : 'bg-[#F7E4DF] text-[#A84037] border-b-2 border-[#A84037] hover:bg-[#A84037]/20';
      case 'authority':
        return isSelected
          ? 'bg-[#784331] text-white ring-2 ring-[#784331]'
          : 'bg-[#E9D1C3] text-[#784331] border-b-2 border-[#784331] hover:bg-[#E9D1C3]/80';
      case 'urgency':
        return isSelected
          ? 'bg-[#A56B25] text-white ring-2 ring-[#A56B25]'
          : 'bg-[#F5EBD6] text-[#A56B25] border-b-2 border-[#A56B25] hover:bg-[#F5EBD6]/80';
      case 'payment':
        return isSelected
          ? 'bg-[#A84037] text-white ring-2 ring-[#A84037]'
          : 'bg-[#F7E4DF] text-[#A84037] border-b-2 border-[#A84037] hover:bg-[#A84037]/20';
      default:
        return isSelected
          ? 'bg-[#536D4D] text-white ring-2 ring-[#536D4D]'
          : 'bg-[#E5EEE2] text-[#426C4D] border-b-2 border-[#426C4D] hover:bg-[#E5EEE2]/80';
    }
  };

  // Build segmented render of the text:
  // Sort highlights by starting index to slice non-overlapping tokens
  const sortedHighlights = [...highlights].sort((a, b) => {
    const posA = originalText.indexOf(a.text);
    const posB = originalText.indexOf(b.text);
    return posA - posB;
  });

  const renderedSegments = [];
  let lastIndex = 0;

  sortedHighlights.forEach((hl, idx) => {
    const startIndex = originalText.indexOf(hl.text, lastIndex);
    if (startIndex !== -1) {
      // Preceding normal text
      if (startIndex > lastIndex) {
        renderedSegments.push({
          type: 'plain',
          text: originalText.slice(lastIndex, startIndex),
          key: `plain-${lastIndex}`
        });
      }

      // Highlighted match
      const isSelected = selectedHighlight && selectedHighlight.text === hl.text;
      renderedSegments.push({
        type: 'highlight',
        text: hl.text,
        highlight: hl,
        isSelected,
        key: `hl-${idx}-${startIndex}`
      });

      lastIndex = startIndex + hl.text.length;
    }
  });

  // Remaining normal text
  if (lastIndex < originalText.length) {
    renderedSegments.push({
      type: 'plain',
      text: originalText.slice(lastIndex),
      key: `plain-${lastIndex}`
    });
  }

  // If no highlights found in string
  if (highlights.length === 0) {
    renderedSegments.push({
      type: 'plain',
      text: originalText,
      key: 'plain-all'
    });
  }

  return (
    <div className="bg-[#FFF9F5] border border-[#E8D9D0] rounded-[24px] p-6 sm:p-8 shadow-soft space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E8D9D0]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-[#E9D1C3] text-[#784331]">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#34251F]">
              {t('signatureTitle')}
            </h3>
          </div>
          <p className="text-xs text-[#806D63] mt-1">
            {t('signatureSubtitle')}
          </p>
        </div>

        <div className="text-xs text-[#806D63] bg-[#F1E3D9] px-3 py-1.5 rounded-full shrink-0 font-medium">
          {highlights.length} pattern{highlights.length === 1 ? '' : 's'} identified
        </div>
      </div>

      {/* Legend so colors are never relied on alone */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
        <span className="text-[#806D63] mr-1">Legend:</span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#E9D1C3] text-[#784331] border border-[#784331]/30">
          <span className="w-2 h-2 rounded-full bg-[#784331]" />
          {t('legendAuthority')}
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F7E4DF] text-[#A84037] border border-[#A84037]/30">
          <span className="w-2 h-2 rounded-full bg-[#A84037]" />
          {t('legendReturn')}
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F5EBD6] text-[#A56B25] border border-[#A56B25]/30">
          <span className="w-2 h-2 rounded-full bg-[#A56B25]" />
          {t('legendUrgency')}
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F7E4DF] text-[#A84037] border border-[#A84037]/30">
          <span className="w-2 h-2 rounded-full bg-[#A84037]" />
          {t('legendPayment')}
        </span>
      </div>

      {/* Interactive Text Display */}
      <div className="bg-[#F8F0EB] border border-[#E8D9D0] rounded-[20px] p-5 sm:p-6 text-sm sm:text-base leading-relaxed text-[#34251F] font-mono tracking-tight select-text">
        {renderedSegments.map((seg) => {
          if (seg.type === 'plain') {
            return <span key={seg.key}>{seg.text}</span>;
          }
          const hl = seg.highlight;
          const isSelected = seg.isSelected;
          return (
            <button
              key={seg.key}
              type="button"
              onClick={() => setSelectedHighlight(isSelected ? null : hl)}
              className={`font-sans inline-block px-1.5 py-0.5 mx-0.5 rounded-md cursor-pointer transition-all duration-150 font-semibold text-xs sm:text-sm ${getHighlightStyle(
                hl.type,
                isSelected
              )}`}
              title="Click to view why this was flagged"
              aria-label={`Flagged text: ${seg.text}. Pattern: ${hl.label}`}
            >
              {seg.text}
            </button>
          );
        })}
      </div>

      {/* Popover / Explanation Drawer for Selected Highlight */}
      {selectedHighlight && (
        <div className="bg-[#FFF9F5] border-2 border-[#784331]/30 rounded-[20px] p-5 sm:p-6 shadow-md animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#E8D9D0]">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#806D63]">
                Tactical Breakdown
              </span>
              <h4 className="font-serif text-lg font-bold text-[#784331]">
                {selectedHighlight.label}
              </h4>
              <p className="text-xs font-mono text-[#34251F] bg-[#F1E3D9] px-2 py-0.5 rounded inline-block mt-1">
                "{selectedHighlight.text}"
              </p>
            </div>
            <button
              onClick={() => setSelectedHighlight(null)}
              className="p-1 rounded-full text-[#806D63] hover:text-[#34251F] hover:bg-[#F1E3D9]"
              aria-label="Close breakdown"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-xs text-[#34251F]">
            {/* Why It Matters */}
            <div className="space-y-1.5 p-3 rounded-xl bg-[#F8F0EB] border border-[#E8D9D0]">
              <span className="font-bold text-[#784331] uppercase tracking-wider text-[10px]">
                1. Why It Matters
              </span>
              <p className="text-[#806D63] leading-relaxed">
                {typeof selectedHighlight.whyItMatters === 'string'
                  ? selectedHighlight.whyItMatters
                  : selectedHighlight.explanation || 'This pattern represents high manipulative pressure.'}
              </p>
            </div>

            {/* Missing Evidence */}
            <div className="space-y-1.5 p-3 rounded-xl bg-[#F8F0EB] border border-[#E8D9D0]">
              <span className="font-bold text-[#A84037] uppercase tracking-wider text-[10px]">
                2. Missing Evidence
              </span>
              <p className="text-[#806D63] leading-relaxed">
                {selectedHighlight.missingEvidence || 'No audited disclosures or regulatory registration details supplied.'}
              </p>
            </div>

            {/* What You Can Do Next */}
            <div className="space-y-1.5 p-3 rounded-xl bg-[#E5EEE2] border border-[#89A27D]/30">
              <span className="font-bold text-[#426C4D] uppercase tracking-wider text-[10px]">
                3. What You Can Do
              </span>
              <p className="text-[#34251F] leading-relaxed font-medium">
                {selectedHighlight.nextStep || 'Pause and independently verify credentials on official portals.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {!selectedHighlight && (
        <p className="text-xs text-center text-[#806D63] italic">
          Tip: Tap any highlighted term above to see what evidence is missing and what you should do next.
        </p>
      )}
    </div>
  );
}
