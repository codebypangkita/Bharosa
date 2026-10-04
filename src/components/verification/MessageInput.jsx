import React, { useState } from 'react';
import { MessageSquareWarning, ShieldAlert, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';

export function MessageInput({ onSubmit, onTrySample, isAnalyzing }) {
  const { t } = useLanguage();
  const [text, setText] = useState('');
  const [platform, setPlatform] = useState('WhatsApp');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('Please paste or type the message content before analyzing.');
      return;
    }
    setError('');
    onSubmit({ type: 'text', content: text, platform });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="message-text"
            className="block text-sm font-semibold text-[#34251F]"
          >
            {t('messageInputLabel')}
          </label>
          <span className="text-xs text-[#806D63]">
            {text.length} characters
          </span>
        </div>

        <textarea
          id="message-text"
          rows={5}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError('');
          }}
          placeholder={t('messagePlaceholder')}
          className="w-full p-4 rounded-[18px] bg-[#FFF9F5] border border-[#E8D9D0] text-[#34251F] placeholder-[#806D63]/60 focus:outline-none focus:ring-2 focus:ring-[#784331]/30 focus:border-[#784331] transition-all resize-y text-sm leading-relaxed"
        />

        {error && (
          <p className="mt-1.5 text-xs text-[#A84037] font-medium flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5" />
            {error}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        <div>
          <label
            htmlFor="source-platform"
            className="block text-xs font-semibold text-[#806D63] mb-1.5"
          >
            {t('sourcePlatformLabel')}
          </label>
          <select
            id="source-platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-[14px] bg-[#FFF9F5] border border-[#E8D9D0] text-[#34251F] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#784331]/30"
          >
            <option value="WhatsApp">{t('platformWhatsapp')}</option>
            <option value="Telegram">{t('platformTelegram')}</option>
            <option value="Instagram">{t('platformInstagram')}</option>
            <option value="YouTube">{t('platformYoutube')}</option>
            <option value="SMS">{t('platformSms')}</option>
            <option value="Email">{t('platformEmail')}</option>
            <option value="Website">{t('platformWebsite')}</option>
            <option value="Other">{t('platformOther')}</option>
          </select>
        </div>

        <div className="text-xs text-[#806D63] bg-[#F1E3D9]/60 p-3 rounded-[14px] border border-[#E8D9D0]/60 leading-relaxed">
          {t('privacyTip')}
        </div>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
        <Button
          type="submit"
          disabled={isAnalyzing}
          size="lg"
          icon={MessageSquareWarning}
          className="w-full sm:w-auto"
        >
          {t('analyzeBtn')}
        </Button>

        <Button
          type="button"
          variant="secondary"
          size="lg"
          onClick={onTrySample}
          disabled={isAnalyzing}
          icon={Sparkles}
          className="w-full sm:w-auto"
        >
          {t('trySampleBtn')}
        </Button>
      </div>
    </form>
  );
}
