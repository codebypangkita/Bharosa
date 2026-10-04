import React from 'react';
import {
  ShieldCheck,
  XCircle,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function TrustPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-20 space-y-16">
      {/* Page Heading */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 bg-[#F1E3D9] text-[#784331] px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase border border-[#E8D9D0]">
          <ShieldCheck className="w-3.5 h-3.5" />
          Transparency & Principles
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#34251F]">
          {t('trustTitle')}
        </h1>
        <p className="text-sm text-[#806D63] leading-relaxed">
          {t('trustSubtitle')}
        </p>
      </div>

      {/* Grid: What BHAROSA Does vs What It Does Not Do */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* What BHAROSA Does */}
        <div className="bg-[#FFF9F5] border border-[#E8D9D0] rounded-[26px] p-6 sm:p-8 shadow-soft space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#E8D9D0]">
            <div className="w-8 h-8 rounded-xl bg-[#E5EEE2] text-[#426C4D] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-xl font-bold text-[#34251F]">
              What BHAROSA Does
            </h2>
          </div>

          <ul className="space-y-3 text-xs sm:text-sm text-[#34251F]">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#426C4D] mt-2 shrink-0" />
              <span>Identifies potentially manipulative wording, unrealistic returns, and artificial urgency.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#426C4D] mt-2 shrink-0" />
              <span>Explains common psychological persuasion tactics in everyday Hindi, Assamese, and English.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#426C4D] mt-2 shrink-0" />
              <span>Structures claims and distinguishes verified facts from missing evidence.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#426C4D] mt-2 shrink-0" />
              <span>Guides investors to official SEBI, RBI, and National Cybercrime grievance channels.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#426C4D] mt-2 shrink-0" />
              <span>Provides foundational financial literacy lessons to build permanent resilience.</span>
            </li>
          </ul>
        </div>

        {/* What BHAROSA Does NOT Do */}
        <div className="bg-[#FFF9F5] border border-[#E8D9D0] rounded-[26px] p-6 sm:p-8 shadow-soft space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#E8D9D0]">
            <div className="w-8 h-8 rounded-xl bg-[#F7E4DF] text-[#A84037] flex items-center justify-center shrink-0">
              <XCircle className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-xl font-bold text-[#34251F]">
              What BHAROSA Never Does
            </h2>
          </div>

          <ul className="space-y-3 text-xs sm:text-sm text-[#34251F]">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A84037] mt-2 shrink-0" />
              <span>Never generates stock tips, price predictions, or trading signals.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A84037] mt-2 shrink-0" />
              <span>Never advises what stocks, mutual funds, or assets to buy, sell, or hold.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A84037] mt-2 shrink-0" />
              <span>Never presents an automated risk score as an official regulatory verdict.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A84037] mt-2 shrink-0" />
              <span>Never asks for passwords, SMS OTPs, bank logins, or debit card PINs.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A84037] mt-2 shrink-0" />
              <span>Never promises recovery of funds for a fee or guarantees return of lost money.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* How Analysis Works */}
      <section className="bg-[#FFF9F5] border border-[#E8D9D0] rounded-[28px] p-6 sm:p-10 shadow-soft space-y-6">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#34251F]">
            Methodology: How BHAROSA Evaluates Content
          </h2>
          <p className="text-xs text-[#806D63] mt-1">
            Understanding the distinction between rule-based heuristics and external verification.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#F8F0EB] border border-[#E8D9D0] space-y-2">
            <span className="font-bold text-[#784331] uppercase tracking-wider text-[10px]">
              1. Content Extraction
            </span>
            <p className="text-[#806D63] leading-relaxed">
              Text is sanitized and extracted from pasted messages, transcribed screenshots, or website domain URLs.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8F0EB] border border-[#E8D9D0] space-y-2">
            <span className="font-bold text-[#784331] uppercase tracking-wider text-[10px]">
              2. Linguistic Rule Engine
            </span>
            <p className="text-[#806D63] leading-relaxed">
              A deterministic pattern library tests for high-risk signals: guaranteed returns, deadlines, advance payments, and unverified authority.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8F0EB] border border-[#E8D9D0] space-y-2">
            <span className="font-bold text-[#784331] uppercase tracking-wider text-[10px]">
              3. Evidence Cross-Check
            </span>
            <p className="text-[#806D63] leading-relaxed">
              Claims are compared against SEBI regulations and official portals. Missing records are transparently reported as unverified.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8F0EB] border border-[#E8D9D0] space-y-2">
            <span className="font-bold text-[#784331] uppercase tracking-wider text-[10px]">
              4. Safe Next Action
            </span>
            <p className="text-[#806D63] leading-relaxed">
              Instead of panic or trading advice, users receive actionable safety checklists and official dispute resolution channels.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Commitments */}
      <section className="bg-[#F1E3D9]/60 border border-[#E8D9D0] rounded-[28px] p-6 sm:p-10 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#784331] text-white flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#34251F]">
            Our Privacy Commitments
          </h2>
        </div>

        <div className="space-y-2 text-xs sm:text-sm text-[#806D63] leading-relaxed">
          <p>
            • <strong>Client-Side Evaluation:</strong> In this prototype, content analysis runs directly in your browser. We do not store your submitted text on external tracking servers.
          </p>
          <p>
            • <strong>No Identity Harvesting:</strong> You are never asked to register an account, link your bank, or upload identity documents.
          </p>
          <p>
            • <strong>Session Memory:</strong> Report history is kept in your current browser session only and can be permanently deleted with a single click.
          </p>
        </div>
      </section>
    </div>
  );
}
