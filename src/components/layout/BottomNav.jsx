import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ShieldAlert, BookOpen, LifeBuoy, History } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function BottomNav() {
  const { t } = useLanguage();

  const items = [
    { to: '/', label: t('navHome'), icon: Home },
    { to: '/verify', label: t('navVerify'), icon: ShieldAlert },
    { to: '/learn', label: t('navLearn'), icon: BookOpen },
    { to: '/safety', label: t('navSafety'), icon: LifeBuoy },
    { to: '/history', label: t('navHistory'), icon: History }
  ];

  return (
    <nav className="bottom-nav md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFF9F5]/95 backdrop-blur-lg border-t border-[#E8D9D0] px-2 py-2 safe-area-bottom shadow-lg">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-150 ${
                  isActive
                    ? 'text-[#784331] font-bold scale-105'
                    : 'text-[#806D63] hover:text-[#34251F]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`p-1 rounded-xl transition-colors ${
                      isActive ? 'bg-[#E9D1C3]' : 'bg-transparent'
                    }`}
                  >
                    <Icon className="w-5 h-5 stroke-[2]" />
                  </div>
                  <span className="text-[11px] mt-0.5 tracking-tight truncate max-w-[64px]">
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
