import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#F1E3D9] border-t border-[#E8D9D0] mt-20 pt-16 pb-24 md:pb-16 text-[#34251F]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#E8D9D0]">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#784331] text-[#FFF9F5] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#34251F]">
                {t('appName')}
              </span>
            </div>
            <p className="text-sm text-[#806D63] max-w-md leading-relaxed">
              BHAROSA helps first-time Indian retail investors identify suspicious financial advice, assess misleading promises, uncover warning signs, and verify relevant claims against official sources.
            </p>
            <div className="text-xs text-[#784331] font-semibold tracking-wider uppercase">
              Tagline: {t('appTagline')}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-serif text-base font-bold text-[#34251F] mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#806D63]">
              <li>
                <Link to="/" className="hover:text-[#784331] transition-colors">
                  {t('navHome')}
                </Link>
              </li>
              <li>
                <Link to="/verify" className="hover:text-[#784331] transition-colors">
                  {t('navVerify')}
                </Link>
              </li>
              <li>
                <Link to="/learn" className="hover:text-[#784331] transition-colors">
                  {t('navLearn')}
                </Link>
              </li>
              <li>
                <Link to="/safety" className="hover:text-[#784331] transition-colors">
                  {t('navSafety')}
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-[#784331] transition-colors">
                  {t('navHistory')}
                </Link>
              </li>
              <li>
                <Link to="/trust" className="hover:text-[#784331] transition-colors">
                  {t('navTrust')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Verification Portals */}
          <div>
            <h4 className="font-serif text-base font-bold text-[#34251F] mb-3">
              Official Portals
            </h4>
            <ul className="space-y-2.5 text-sm text-[#806D63]">
              <li>
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#784331] transition-colors"
                >
                  <span>Cyber Crime (1930)</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://scores.sebi.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#784331] transition-colors"
                >
                  <span>SEBI SCORES 2.0</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.sebi.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#784331] transition-colors"
                >
                  <span>SEBI Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://sachet.rbi.org.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#784331] transition-colors"
                >
                  <span>RBI Sachet Alert List</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#806D63]">
          <p className="max-w-2xl leading-relaxed text-center md:text-left">
            <strong className="text-[#34251F]">Disclaimer:</strong> BHAROSA is an educational investor protection initiative designed for the SANGYAN Investor Resilience Hackathon. It does not provide trading advice, investment recommendations, or official regulatory rulings.
          </p>
          <div className="flex items-center gap-1 shrink-0">
            <span>Built with care for Indian retail investors</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
