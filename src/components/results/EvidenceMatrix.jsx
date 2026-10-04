import React from 'react';
import { ExternalLink, CheckCircle2, XCircle, AlertCircle, HelpCircle } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { useLanguage } from '../../context/LanguageContext';

export function EvidenceMatrix({ evidenceItems = [] }) {
  const { t } = useLanguage();

  if (!evidenceItems || evidenceItems.length === 0) {
    return (
      <div className="bg-[#FFF9F5] border border-[#E8D9D0] rounded-[24px] p-6 text-center text-xs text-[#806D63]">
        No specific external claims to cross-verify in this excerpt.
      </div>
    );
  }

  const getStatusIcon = (badgeType) => {
    switch (badgeType) {
      case 'verified':
        return <CheckCircle2 className="w-4 h-4 text-[#426C4D]" />;
      case 'contradicted':
        return <XCircle className="w-4 h-4 text-[#A84037]" />;
      case 'unavailable':
        return <AlertCircle className="w-4 h-4 text-[#A56B25]" />;
      default:
        return <HelpCircle className="w-4 h-4 text-[#806D63]" />;
    }
  };

  const getBadgeVariant = (badgeType) => {
    switch (badgeType) {
      case 'verified':
        return 'sage';
      case 'contradicted':
        return 'danger';
      case 'unavailable':
        return 'warning';
      default:
        return 'neutral';
    }
  };

  return (
    <div className="bg-[#FFF9F5] border border-[#E8D9D0] rounded-[24px] p-6 sm:p-8 shadow-soft space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E8D9D0]">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#34251F]">
            {t('evidenceMatrixTitle')}
          </h3>
          <p className="text-xs text-[#806D63] mt-0.5">
            Cross-referencing stated claims against regulatory guidelines and official registries.
          </p>
        </div>

        <div className="text-xs bg-[#F1E3D9] text-[#784331] font-semibold px-3 py-1.5 rounded-full shrink-0">
          Source Verification Matrix
        </div>
      </div>

      <div className="space-y-4">
        {evidenceItems.map((item, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-5 rounded-[20px] bg-[#F8F0EB] border border-[#E8D9D0] space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="font-bold text-sm text-[#34251F]">
                Claim: "{item.claim}"
              </span>
              <div className="flex items-center gap-1.5">
                {getStatusIcon(item.badgeType)}
                <Badge variant={getBadgeVariant(item.badgeType)} size="sm">
                  {item.status}
                </Badge>
              </div>
            </div>

            <p className="text-xs text-[#806D63] leading-relaxed">
              <strong className="text-[#34251F]">Assessment: </strong>
              {item.explanation}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#E8D9D0]/70 text-[11px] text-[#806D63]">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-[#34251F]">Source Cited:</span>
                <span>{item.sourceName}</span>
              </div>

              {item.sourceUrl ? (
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#784331] font-bold hover:underline"
                >
                  <span>Open Official Source</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="italic text-[#806D63]">
                  No public registry URL available
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-3.5 bg-[#F1E3D9]/60 rounded-xl border border-[#E8D9D0] text-[11px] text-[#806D63] leading-relaxed">
        <strong className="text-[#34251F]">Transparency Notice: </strong>
        Live automated SEBI registry lookups are simulated or require manual lookup. A status of "Not independently verified" means no official registry response was retrieved in this session; it is not legal proof of fraud.
      </div>
    </div>
  );
}
