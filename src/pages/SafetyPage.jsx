import React, { useState } from 'react';
import {
  LifeBuoy,
  PhoneCall,
  ExternalLink,
  ShieldAlert,
  CheckSquare,
  Square,
  Copy,
  Check
} from 'lucide-react';
import { emergencyPortals, evidenceChecklistItems } from '../data/safetyResources';
import { Badge } from '../components/ui/Badge';
import { useLanguage } from '../context/LanguageContext';

export function SafetyPage() {
  const { t, language } = useLanguage();
  const [checkedEvidence, setCheckedEvidence] = useState({});
  const [copiedNumber, setCopiedNumber] = useState(null);

  const toggleCheck = (id) => {
    setCheckedEvidence(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCopyPhone = (phone) => {
    navigator.clipboard.writeText(phone);
    setCopiedNumber(phone);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-20 space-y-16">
      {/* Page Heading */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 bg-[#F1E3D9] text-[#784331] px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase border border-[#E8D9D0]">
          <LifeBuoy className="w-3.5 h-3.5" />
          Safety & Rapid Response
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#34251F]">
          {t('safetyTitle')}
        </h1>
        <p className="text-sm text-[#806D63] leading-relaxed">
          {t('safetySubtitle')}
        </p>
      </div>

      {/* Emergency Lost Money Protocol Card */}
      <div className="bg-[#784331] text-[#FFF9F5] rounded-[28px] p-6 sm:p-10 shadow-lg space-y-6 relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#613424] flex items-center justify-center shrink-0 border border-white/20">
            <ShieldAlert className="w-6 h-6 text-[#E9D1C3]" />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E9D1C3]">
              Emergency Rapid Protocol
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold">
              {t('lostMoneyTitle')}
            </h2>
            <p className="text-sm text-[#F1E3D9] max-w-2xl leading-relaxed">
              {t('lostMoneyMessage')}
            </p>
          </div>
        </div>

        {/* 3 Urgent Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-[#613424]/60 border border-white/10 space-y-1.5">
            <span className="text-xs font-bold text-[#E9D1C3]">Step 1: Stop All Transfers</span>
            <p className="text-xs text-[#F1E3D9] leading-relaxed">
              Do not send additional "tax", "clearance fees", or "recovery charges" to unlock your funds.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#613424]/60 border border-white/10 space-y-1.5">
            <span className="text-xs font-bold text-[#E9D1C3]">Step 2: Dial 1930 Immediately</span>
            <p className="text-xs text-[#F1E3D9] leading-relaxed">
              Call within the first 2 to 24 hours. The Cyber Police can attempt to freeze bank accounts in the transit chain.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#613424]/60 border border-white/10 space-y-1.5">
            <span className="text-xs font-bold text-[#E9D1C3]">Step 3: Freeze with Bank</span>
            <p className="text-xs text-[#F1E3D9] leading-relaxed">
              Notify your bank fraud desk, dispute the UTR / transaction, and request an immediate account block.
            </p>
          </div>
        </div>
      </div>

      {/* Directory of Verified Official Portals */}
      <section className="space-y-6">
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#34251F]">
            Direct Official Assistance Lines
          </h3>
          <p className="text-xs text-[#806D63] mt-1">
            Verified Indian government, law enforcement, and regulatory grievance channels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {emergencyPortals.map((portal) => (
            <div
              key={portal.id}
              className="bg-[#FFF9F5] border border-[#E8D9D0] rounded-[24px] p-6 shadow-soft flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-serif text-xl font-bold text-[#34251F]">
                    {portal.name}
                  </h4>
                  <Badge variant="terracotta" size="sm">
                    {portal.badge}
                  </Badge>
                </div>

                <p className="text-xs text-[#806D63] leading-relaxed">
                  {portal.description[language] || portal.description.en}
                </p>

                <div className="p-3 bg-[#F8F0EB] rounded-xl border border-[#E8D9D0] text-xs text-[#784331] font-medium">
                  <strong>When to use: </strong>
                  {portal.useWhen[language] || portal.useWhen.en}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8D9D0] flex flex-wrap items-center justify-between gap-3">
                {portal.phone && (
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${portal.phone.replace(/\s+/g, '')}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#426C4D] bg-[#E5EEE2] px-3 py-1.5 rounded-full hover:bg-[#89A27D]/30 transition-colors"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>{portal.phone}</span>
                    </a>
                    <button
                      onClick={() => handleCopyPhone(portal.phone)}
                      className="p-1.5 text-[#806D63] hover:text-[#34251F] rounded-lg transition-colors cursor-pointer"
                      title="Copy helpline number"
                    >
                      {copiedNumber === portal.phone ? (
                        <Check className="w-4 h-4 text-[#426C4D]" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                )}

                <a
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#784331] hover:underline ml-auto"
                >
                  <span>{portal.secondaryCtaText}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Evidence Gathering Checklist */}
      <section className="bg-[#FFF9F5] border border-[#E8D9D0] rounded-[28px] p-6 sm:p-10 shadow-soft space-y-6">
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#34251F]">
            {t('checklistTitle')}
          </h3>
          <p className="text-xs text-[#806D63] mt-1">
            Collect these critical records before registering an FIR or filing a grievance with your bank or SEBI SCORES:
          </p>
        </div>

        <div className="space-y-3">
          {evidenceChecklistItems.map((item) => {
            const isChecked = Boolean(checkedEvidence[item.id]);
            const title = item.title[language] || item.title.en;
            const desc = item.description[language] || item.description.en;

            return (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-4 rounded-[20px] border transition-all cursor-pointer flex items-start gap-3.5 ${
                  isChecked
                    ? 'bg-[#E5EEE2] border-[#89A27D]/50 text-[#34251F]'
                    : 'bg-[#F8F0EB] border-[#E8D9D0] text-[#34251F] hover:bg-[#F1E3D9]'
                }`}
              >
                <div className="mt-0.5 shrink-0 text-[#784331]">
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-[#426C4D]" />
                  ) : (
                    <Square className="w-5 h-5 opacity-60" />
                  )}
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${isChecked ? 'line-through opacity-70' : ''}`}>
                    {title}
                  </h4>
                  <p className="text-xs text-[#806D63] mt-0.5 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 bg-[#F5EBD6] border border-[#A56B25]/20 rounded-2xl text-xs text-[#34251F] leading-relaxed">
          <strong className="text-[#A56B25]">Important Note: </strong>
          Official investigation procedures depend on the nature of the incident. Cyber fraud (stolen OTPs/impersonation) belongs with 1930 / Police. Disputes with legitimate registered brokers belong with SEBI SCORES.
        </div>
      </section>
    </div>
  );
}
