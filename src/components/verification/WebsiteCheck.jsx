import React, { useState } from 'react';
import { Globe, AlertCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';

export function WebsiteCheck({ onSubmit, isAnalyzing }) {
  const { t } = useLanguage();
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanUrl = url.trim();
    if (!cleanUrl) {
      setError('Please enter a website address.');
      return;
    }
    // Basic URL validation
    try {
      new URL(cleanUrl.startsWith('http') ? cleanUrl : `https://${cleanUrl}`);
    } catch {
      setError('Please enter a valid website address (e.g. https://example.com).');
      return;
    }

    setError('');
    onSubmit({
      type: 'website',
      content: cleanUrl,
      platform: 'Website'
    });
  };

  const loadSampleUrl = () => {
    setUrl('https://secure-rbi-approved-wealth-trade.top/login');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="website-url"
          className="block text-sm font-semibold text-[#34251F] mb-2"
        >
          {t('websiteLabel')}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#806D63]">
            <Globe className="w-5 h-5" />
          </div>
          <input
            id="website-url"
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (error) setError('');
            }}
            placeholder={t('websitePlaceholder')}
            className="w-full pl-12 pr-4 py-3.5 rounded-[18px] bg-[#FFF9F5] border border-[#E8D9D0] text-[#34251F] placeholder-[#806D63]/60 focus:outline-none focus:ring-2 focus:ring-[#784331]/30 focus:border-[#784331] text-sm"
          />
        </div>
        {error && (
          <p className="mt-1.5 text-xs text-[#A84037] font-medium flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            {error}
          </p>
        )}
      </div>

      {/* Note on safe external check */}
      <div className="p-4 bg-[#F1E3D9]/70 rounded-[18px] border border-[#E8D9D0] text-xs text-[#806D63] leading-relaxed flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-[#784331] shrink-0 mt-0.5" />
        <div>
          <strong className="text-[#34251F]">Safe Inspection: </strong>
          {t('websiteNote')}
        </div>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
        <Button
          type="submit"
          disabled={isAnalyzing}
          size="lg"
          icon={Globe}
          className="w-full sm:w-auto"
        >
          {t('analyzeBtn')}
        </Button>

        <Button
          type="button"
          variant="secondary"
          size="lg"
          onClick={loadSampleUrl}
          disabled={isAnalyzing}
          icon={Sparkles}
          className="w-full sm:w-auto"
        >
          Try Sample Suspicious URL
        </Button>
      </div>
    </form>
  );
}
