import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MessageSquareWarning, Image as ImageIcon, Globe, Shield } from 'lucide-react';
import { MessageInput } from '../components/verification/MessageInput';
import { ScreenshotUpload } from '../components/verification/ScreenshotUpload';
import { WebsiteCheck } from '../components/verification/WebsiteCheck';
import { AnalysisProgress } from '../components/verification/AnalysisProgress';
import { useLanguage } from '../context/LanguageContext';
import { useAnalysis } from '../context/AnalysisContext';

export function VerifyPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { runAnalysis, isAnalyzing, progressStatus, progressPercent } = useAnalysis();

  const [activeTab, setActiveTab] = useState(() => {
    const mode = searchParams.get('mode');
    if (mode === 'website' || mode === 'screenshot' || mode === 'message') {
      return mode;
    }
    return 'message';
  });

  const handleTriggerAnalysis = useCallback(async ({ type, content, platform }) => {
    try {
      await runAnalysis({ type, content, platform });
      navigate('/results');
    } catch (err) {
      console.error(err);
    }
  }, [runAnalysis, navigate]);

  const handleTriggerSample = useCallback(async () => {
    try {
      await runAnalysis({ type: 'demo', content: '', platform: 'Telegram' });
      navigate('/results');
    } catch (err) {
      console.error(err);
    }
  }, [runAnalysis, navigate]);

  useEffect(() => {
    const modeParam = searchParams.get('mode');
    if (modeParam && ['website', 'screenshot', 'message'].includes(modeParam)) {
      setActiveTab(modeParam);
    }

    if (searchParams.get('sample') === 'true') {
      handleTriggerSample();
    }
  }, [searchParams, handleTriggerSample]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-16 space-y-10">
      {/* Page Heading */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <span className="inline-flex items-center gap-1.5 bg-[#F1E3D9] text-[#784331] px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase border border-[#E8D9D0]">
          <Shield className="w-3.5 h-3.5" />
          {t('verifyEyebrow')}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#34251F]">
          {t('verifyTitle')}
        </h1>
        <p className="text-sm text-[#806D63] leading-relaxed">
          {t('verifyDesc')}
        </p>
      </div>

      {/* Main Container */}
      <div className="bg-[#FFF9F5] border border-[#E8D9D0] rounded-[28px] p-6 sm:p-10 shadow-soft">
        {isAnalyzing ? (
          <AnalysisProgress
            progressStatus={progressStatus}
            progressPercent={progressPercent}
          />
        ) : (
          <div className="space-y-8">
            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1.5 bg-[#F1E3D9] rounded-[20px] border border-[#E8D9D0]">
              <button
                type="button"
                onClick={() => setActiveTab('message')}
                className={`py-3 px-3 rounded-[16px] text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'message'
                    ? 'bg-[#784331] text-[#FFF9F5] shadow-xs'
                    : 'text-[#806D63] hover:text-[#34251F]'
                }`}
              >
                <MessageSquareWarning className="w-4 h-4 shrink-0" />
                <span className="truncate">{t('tabMessage')}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('screenshot')}
                className={`py-3 px-3 rounded-[16px] text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'screenshot'
                    ? 'bg-[#784331] text-[#FFF9F5] shadow-xs'
                    : 'text-[#806D63] hover:text-[#34251F]'
                }`}
              >
                <ImageIcon className="w-4 h-4 shrink-0" />
                <span className="truncate">{t('tabScreenshot')}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('website')}
                className={`py-3 px-3 rounded-[16px] text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'website'
                    ? 'bg-[#784331] text-[#FFF9F5] shadow-xs'
                    : 'text-[#806D63] hover:text-[#34251F]'
                }`}
              >
                <Globe className="w-4 h-4 shrink-0" />
                <span className="truncate">{t('tabWebsite')}</span>
              </button>
            </div>

            {/* Active Mode Form */}
            <div className="pt-2">
              {activeTab === 'message' && (
                <MessageInput
                  onSubmit={handleTriggerAnalysis}
                  onTrySample={handleTriggerSample}
                  isAnalyzing={isAnalyzing}
                />
              )}

              {activeTab === 'screenshot' && (
                <ScreenshotUpload
                  onSubmit={handleTriggerAnalysis}
                  isAnalyzing={isAnalyzing}
                />
              )}

              {activeTab === 'website' && (
                <WebsiteCheck
                  onSubmit={handleTriggerAnalysis}
                  isAnalyzing={isAnalyzing}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Trust Notice Below Form */}
      <div className="text-center text-xs text-[#806D63] max-w-lg mx-auto leading-relaxed">
        BHAROSA will examine psychological urgency, unverified claims, and known scam patterns. Your analysis is performed client-side and never stored without your consent.
      </div>
    </div>
  );
}
