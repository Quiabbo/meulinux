import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown, ChevronUp } from 'lucide-react';
import { getLocalizedPath } from '../utils/routeMap';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLang = (i18n.language || 'pt-br').toLowerCase().startsWith('pt') ? 'pt-br' : 'en';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (lang: 'pt-br' | 'en') => {
    if (lang === currentLang) {
      setIsOpen(false);
      return;
    }
    const nextPath = getLocalizedPath(location.pathname, lang);
    navigate(nextPath);
    setIsOpen(false);
  };

  const languages = [
    { code: 'en' as const, label: 'English', sigla: 'EN', flag: '🇺🇸' },
    { code: 'pt-br' as const, label: 'Português', sigla: 'PT-BR', flag: '🇧🇷' },
  ];

  const activeLanguage = languages.find(l => l.code === currentLang) || languages[1];

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      {/* Selector Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 rounded-[10px] border border-white/10 hover:border-primary/50 bg-[#161719] hover:bg-white/5 text-xs md:text-sm font-medium font-sans tracking-wide text-white transition-all cursor-pointer select-none focus:outline-none focus:ring-1 focus:ring-primary whitespace-nowrap"
        title={currentLang === 'pt-br' ? 'Switch browser language' : 'Mudar idioma do site'}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Globe className="text-gray-400 flex-shrink-0 w-4 h-4 md:w-[18px] md:h-[18px]" />
        <span className="font-medium pr-1 text-[#f3f4f6] text-[11px] md:text-sm">
          <span className="hidden md:inline">{activeLanguage.label}</span>
          <span className="inline md:hidden">{activeLanguage.sigla}</span>
        </span>
        {isOpen ? (
          <ChevronUp className="text-gray-400 flex-shrink-0 w-3.5 h-3.5 md:w-4 md:h-4" />
        ) : (
          <ChevronDown className="text-gray-400 flex-shrink-0 w-3.5 h-3.5 md:w-4 md:h-4" />
        )}
      </button>

      {/* Floating Dropdown List */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-[12px] bg-[#161719] border border-white/10 shadow-2xl overflow-hidden z-50">
          <div className="py-1">
            {languages.map((lang) => {
              const isActive = lang.code === currentLang;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-left transition-all hover:bg-white/5 cursor-pointer focus:outline-none ${
                    isActive ? 'text-primary' : 'text-gray-300'
                  }`}
                >
                  <span className="text-lg select-none leading-none">{lang.flag}</span>
                  <span className="font-sans">{lang.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
