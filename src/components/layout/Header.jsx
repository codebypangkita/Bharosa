import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShieldCheck, Globe, Menu, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { to: '/', label: t('navHome') },
    { to: '/verify', label: t('navVerify') },
    { to: '/learn', label: t('navLearn') },
    { to: '/safety', label: t('navSafety') },
    { to: '/history', label: t('navHistory') },
    { to: '/trust', label: t('navTrust') }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FFF9F5]/90 backdrop-blur-md border-b border-[#E8D9D0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Logo and Tagline */}
        <Link to="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#784331]/30 rounded-xl p-1">
          <div className="w-11 h-11 rounded-2xl bg-[#784331] text-[#FFF9F5] flex items-center justify-center shadow-xs group-hover:bg-[#613424] transition-colors">
            <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#34251F]">
                {t('appName')}
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest bg-[#E9D1C3] text-[#784331] px-2 py-0.5 rounded-full">
                Beta
              </span>
            </div>
            <p className="text-xs text-[#806D63] font-medium leading-none">
              {t('assistantSubtitle')}
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium px-3 py-1.5 rounded-full transition-all duration-150 ${
                  isActive
                    ? 'bg-[#784331] text-[#FFF9F5]'
                    : 'text-[#34251F] hover:bg-[#F1E3D9] hover:text-[#784331]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Tools: Language Selector + Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="relative flex items-center bg-[#F1E3D9] border border-[#E8D9D0] rounded-full p-1 shadow-2xs">
            <Globe className="w-3.5 h-3.5 text-[#784331] ml-2 mr-1 shrink-0" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              aria-label="Select Language"
              className="bg-transparent text-xs font-semibold text-[#34251F] pr-2 py-1 rounded-full cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#784331]"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="as">অসমীয়া</option>
            </select>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#34251F] hover:bg-[#F1E3D9] rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-[#784331]/30"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFF9F5] border-b border-[#E8D9D0] px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block text-base font-medium px-4 py-2.5 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-[#784331] text-[#FFF9F5]'
                    : 'text-[#34251F] hover:bg-[#F1E3D9]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
