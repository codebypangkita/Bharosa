import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ShieldAlert, ArrowRight } from 'lucide-react';
import { Badge } from '../ui/Badge';

export function WarningSignalCard({ signal }) {
  const [expanded, setExpanded] = useState(true);

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'high':
        return <Badge variant="danger">High Concern</Badge>;
      case 'medium':
        return <Badge variant="warning">Medium Concern</Badge>;
      default:
        return <Badge variant="neutral">Caution</Badge>;
    }
  };

  return (
    <div className="bg-[#FFF9F5] border border-[#E8D9D0] rounded-[22px] overflow-hidden shadow-xs transition-all duration-200">
      {/* Header bar */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#F1E3D9]/40 transition-colors focus:outline-none focus:ring-1 focus:ring-[#784331]/30"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F7E4DF] text-[#A84037] flex items-center justify-center shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif text-base sm:text-lg font-bold text-[#34251F]">
              {signal.title}
            </h4>
            <p className="text-xs text-[#806D63] font-mono mt-0.5 truncate max-w-xs sm:max-w-md">
              "{signal.matchedExcerpt}"
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {getSeverityBadge(signal.severity)}
          {expanded ? (
            <ChevronUp className="w-5 h-5 text-[#806D63]" />
          ) : (
            <ChevronDown className="w-5 h-5 text-[#806D63]" />
          )}
        </div>
      </button>

      {/* Expanded details */}
      {expanded && (
        <div className="px-5 pb-5 pt-2 border-t border-[#E8D9D0]/60 space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 bg-[#F8F0EB] rounded-xl border border-[#E8D9D0]">
              <span className="font-bold text-[#784331] uppercase tracking-wider text-[10px] block mb-1">
                Why It Matters
              </span>
              <p className="text-[#806D63] leading-relaxed">
                {signal.whyItMatters}
              </p>
            </div>

            <div className="p-3.5 bg-[#F8F0EB] rounded-xl border border-[#E8D9D0]">
              <span className="font-bold text-[#A84037] uppercase tracking-wider text-[10px] block mb-1">
                What Information Is Missing
              </span>
              <p className="text-[#806D63] leading-relaxed">
                {signal.missingEvidence}
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-[#E5EEE2] rounded-xl border border-[#89A27D]/30 flex items-start gap-2 text-[#426C4D]">
            <ArrowRight className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-[#536D4D]">Practical Next Step:</span>
              <p className="text-[#34251F] font-medium leading-relaxed">
                {signal.nextStep}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
