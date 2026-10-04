import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquareWarning, ShieldCheck, SearchCheck, ArrowRight, Shield, Sparkles, CheckCircle2, Lock, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useLanguage } from '../context/LanguageContext';

export function HomePage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleQuickDemo = () => {
    navigate('/verify?sample=true');
  };

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="pt-8 sm:pt-14 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headline and Call-to-Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-[#F1E3D9] text-[#784331] px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border border-[#E8D9D0]">
              <Sparkles className="w-3.5 h-3.5 text-[#784331]" />
              <span>{t('heroEyebrow')}</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#34251F] leading-[1.12]">
              {t('heroTitle')}
            </h1>

            <p className="text-base sm:text-lg text-[#806D63] max-w-xl leading-relaxed">
              {t('heroSubtitle')}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Button
                size="lg"
                onClick={() => navigate('/verify')}
                icon={ArrowRight}
                iconPosition="right"
                className="shadow-md"
              >
                {t('heroVerifyCta')}
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate('/learn')}
              >
                {t('heroLearnCta')}
              </Button>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#806D63] font-medium">
              <Shield className="w-4 h-4 text-[#536D4D] shrink-0" />
              <span>{t('heroTrustStatement')}</span>
            </div>
          </div>

          {/* Right Column: Product-Preview Card (Inspired by reference aesthetic) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm sm:max-w-md">
              {/* Subtle background glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#E9D1C3] to-[#F1E3D9] rounded-[32px] blur-xl opacity-70 -z-10" />

              <div className="bg-[#FFF9F5] border border-[#E8D9D0] rounded-[28px] p-6 sm:p-7 shadow-xl space-y-5">
                {/* Header of Preview */}
                <div className="flex items-center justify-between pb-3 border-b border-[#E8D9D0]">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-[#784331] text-white flex items-center justify-center">
                      <Shield className="w-4 h-4" />
                    </div>
                    <span className="font-serif text-sm font-bold tracking-wider text-[#784331]">
                      {t('previewTag')}
                    </span>
                  </div>
                  <Badge variant="warning" size="sm">
                    {t('previewStatus')}
                  </Badge>
                </div>

                {/* Claim Box */}
                <div className="p-4 bg-[#F8F0EB] rounded-2xl border border-[#E8D9D0] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#A84037]">
                      {t('previewDetected')}
                    </span>
                    <span className="text-[10px] text-[#806D63]">Chat Analysis</span>
                  </div>
                  <p className="font-serif text-lg font-bold text-[#34251F]">
                    "{t('previewClaim')}"
                  </p>
                </div>

                {/* Three Signal Chips */}
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold text-[#806D63] block">
                    Detected Signals:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-[#F7E4DF] text-[#A84037] text-xs font-semibold rounded-full border border-[#A84037]/20 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A84037]" />
                      Guaranteed Returns
                    </span>
                    <span className="px-3 py-1 bg-[#F5EBD6] text-[#A56B25] text-xs font-semibold rounded-full border border-[#A56B25]/20 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A56B25]" />
                      Urgency Pressure
                    </span>
                    <span className="px-3 py-1 bg-[#E9D1C3] text-[#784331] text-xs font-semibold rounded-full border border-[#784331]/20 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#784331]" />
                      Upfront Payment
                    </span>
                  </div>
                </div>

                {/* Interactive Demo CTA */}
                <div className="pt-2">
                  <button
                    onClick={handleQuickDemo}
                    className="w-full py-3 px-4 rounded-xl bg-[#784331] text-[#FFF9F5] text-xs font-semibold hover:bg-[#613424] transition-all flex items-center justify-center gap-2 group shadow-sm cursor-pointer"
                  >
                    <span>Run Full Sample Check</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-[10px] text-center text-[#806D63] mt-2 italic">
                    {t('previewDisclaimer')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Main Action Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Check Message */}
          <div
            onClick={() => navigate('/verify?mode=message')}
            className="group bg-[#FFF9F5] border border-[#E8D9D0] rounded-[26px] p-7 shadow-soft hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-13 h-13 rounded-2xl bg-[#F7E4DF] text-[#A84037] flex items-center justify-center group-hover:scale-105 transition-transform">
                <MessageSquareWarning className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#34251F]">
                {t('card1Title')}
              </h3>
              <p className="text-sm text-[#806D63] leading-relaxed">
                {t('card1Desc')}
              </p>
            </div>
            <div className="pt-6 flex items-center gap-2 text-sm font-bold text-[#784331] group-hover:gap-3 transition-all">
              <span>Inspect Message</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 2: Check Website */}
          <div
            onClick={() => navigate('/verify?mode=website')}
            className="group bg-[#FFF9F5] border border-[#E8D9D0] rounded-[26px] p-7 shadow-soft hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-13 h-13 rounded-2xl bg-[#E5EEE2] text-[#426C4D] flex items-center justify-center group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#34251F]">
                {t('card2Title')}
              </h3>
              <p className="text-sm text-[#806D63] leading-relaxed">
                {t('card2Desc')}
              </p>
            </div>
            <div className="pt-6 flex items-center gap-2 text-sm font-bold text-[#426C4D] group-hover:gap-3 transition-all">
              <span>Inspect Web Address</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 3: Understand Claim */}
          <div
            onClick={() => navigate('/learn')}
            className="group bg-[#FFF9F5] border border-[#E8D9D0] rounded-[26px] p-7 shadow-soft hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-13 h-13 rounded-2xl bg-[#F5EBD6] text-[#A56B25] flex items-center justify-center group-hover:scale-105 transition-transform">
                <SearchCheck className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#34251F]">
                {t('card3Title')}
              </h3>
              <p className="text-sm text-[#806D63] leading-relaxed">
                {t('card3Desc')}
              </p>
            </div>
            <div className="pt-6 flex items-center gap-2 text-sm font-bold text-[#A56B25] group-hover:gap-3 transition-all">
              <span>Explore Concepts</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>

      {/* How BHAROSA Helps (Numbered Steps) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-[#F1E3D9]/60 border border-[#E8D9D0] rounded-[30px] p-8 sm:p-12">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#784331]">
              The 3-Step Protection Protocol
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#34251F]">
              {t('howBharosaHelps')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-[#FFF9F5] p-6 rounded-[22px] border border-[#E8D9D0] space-y-3 relative shadow-xs">
              <span className="w-10 h-10 rounded-xl bg-[#784331] text-[#FFF9F5] font-serif font-bold text-lg flex items-center justify-center">
                1
              </span>
              <h3 className="font-serif text-xl font-bold text-[#34251F]">
                {t('step1Title')}
              </h3>
              <p className="text-xs text-[#806D63] leading-relaxed">
                {t('step1Desc')}
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#FFF9F5] p-6 rounded-[22px] border border-[#E8D9D0] space-y-3 relative shadow-xs">
              <span className="w-10 h-10 rounded-xl bg-[#784331] text-[#FFF9F5] font-serif font-bold text-lg flex items-center justify-center">
                2
              </span>
              <h3 className="font-serif text-xl font-bold text-[#34251F]">
                {t('step2Title')}
              </h3>
              <p className="text-xs text-[#806D63] leading-relaxed">
                {t('step2Desc')}
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#FFF9F5] p-6 rounded-[22px] border border-[#E8D9D0] space-y-3 relative shadow-xs">
              <span className="w-10 h-10 rounded-xl bg-[#784331] text-[#FFF9F5] font-serif font-bold text-lg flex items-center justify-center">
                3
              </span>
              <h3 className="font-serif text-xl font-bold text-[#34251F]">
                {t('step3Title')}
              </h3>
              <p className="text-xs text-[#806D63] leading-relaxed">
                {t('step3Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Made for Every Indian Investor */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#784331]">
            Accessibility & Trust
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#34251F]">
            {t('madeForEveryoneTitle')}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-[22px] bg-[#FFF9F5] border border-[#E8D9D0] space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#F1E3D9] text-[#784331] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-base font-bold text-[#34251F]">
              {t('feature1Title')}
            </h4>
            <p className="text-xs text-[#806D63] leading-relaxed">
              {t('feature1Desc')}
            </p>
          </div>

          <div className="p-6 rounded-[22px] bg-[#FFF9F5] border border-[#E8D9D0] space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#E5EEE2] text-[#426C4D] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-base font-bold text-[#34251F]">
              {t('feature2Title')}
            </h4>
            <p className="text-xs text-[#806D63] leading-relaxed">
              {t('feature2Desc')}
            </p>
          </div>

          <div className="p-6 rounded-[22px] bg-[#FFF9F5] border border-[#E8D9D0] space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#F5EBD6] text-[#A56B25] flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-base font-bold text-[#34251F]">
              {t('feature3Title')}
            </h4>
            <p className="text-xs text-[#806D63] leading-relaxed">
              {t('feature3Desc')}
            </p>
          </div>

          <div className="p-6 rounded-[22px] bg-[#FFF9F5] border border-[#E8D9D0] space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#F7E4DF] text-[#A84037] flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-base font-bold text-[#34251F]">
              {t('feature4Title')}
            </h4>
            <p className="text-xs text-[#806D63] leading-relaxed">
              {t('feature4Desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Safety First Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-[#784331] text-[#FFF9F5] rounded-[28px] p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="font-serif text-2xl font-bold">
              {t('safetyFirstTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-[#E9D1C3] leading-relaxed">
              {t('safetyFirstDesc')}
            </p>
          </div>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate('/verify')}
            className="shrink-0"
          >
            {t('heroVerifyCta')}
          </Button>
        </div>
      </section>
    </div>
  );
}
