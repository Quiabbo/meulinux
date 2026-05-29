import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, Menu, X, Sun, Moon, User, LogOut } from 'lucide-react';
import { DISTRO_LIST_NAMES } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from './AuthModal';
import { LanguageSwitcher } from './LanguageSwitcher';
import { routeMap } from '../utils/routeMap';

export const Header = () => {
  const { user: currentUser, profile, signOut } = useAuth();
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language || 'pt-br').toLowerCase().startsWith('pt') ? 'pt-br' : 'en';
  const routes = routeMap[currentLang];
  const location = useLocation();

  const [search, setSearch] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate(routes.home);
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const filteredDistros = DISTRO_LIST_NAMES.filter(name => 
    name.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 5);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search) {
      navigate(`${routes.home}?search=${search}`);
      setShowResults(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#202124] text-white z-50 h-20 flex items-center shadow-lg" role="banner">
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link 
          to={routes.home} 
          onClick={(e) => {
            if (location.pathname === routes.home || location.pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              window.scrollTo({ top: 0 });
            }
          }}
          className="flex items-center" 
          aria-label="meuLinux - Home"
        >
          <img 
            src="/assets/meu-10.gif" 
            alt="meuLinux Logo" 
            className="h-8 w-auto"
            referrerPolicy="no-referrer"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-display font-normal text-sm" aria-label="Main navigation">
          <Link to={routes.about} className="hover:text-primary transition-colors">{t('nav.about')}</Link>
          <Link to={routes.content} className="hover:text-primary transition-colors">{t('nav.content')}</Link>
          <Link to={routes.contact} className="hover:text-primary transition-colors">{t('nav.contact')}</Link>
          <Link to={routes.contribua} className="hover:text-primary transition-colors">{t('nav.support')}</Link>
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Dark Mode Toggle */}
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-2 hover:bg-white/10 rounded-[6px] transition-colors focus:ring-2 focus:ring-primary outline-none"
            aria-label={isDark ? t('nav.light_mode') : t('nav.dark_mode')}
            title={isDark ? t('nav.light_mode') : t('nav.dark_mode')}
          >
            {isDark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
          </button>

          {/* Learn Linux Button */}
          <div className="hidden md:block">
            {currentUser ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-[6px] border border-white/10">
                  <User size={16} className="text-primary" />
                  <span className="text-xs font-bold truncate max-w-[100px]">{profile?.full_name?.split(' ')[0] || currentUser.email?.split('@')[0]}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 hover:bg-red-500/10 text-gray-400 hover:text-red-500 rounded-[6px] transition-colors"
                  title="Sair"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link 
                to={routes.distromatch} 
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-[6px] font-bold transition-all transform hover:scale-105 inline-block"
                aria-label="Go to DistroMatch"
              >
                {t('nav.learn')}
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white p-2 focus:ring-2 focus:ring-primary outline-none" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? t('nav.close_menu') : t('nav.open_menu')}
          >
            {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="absolute top-20 left-0 right-0 bg-[#202124] border-t border-white/10 p-4 md:hidden flex flex-col gap-4 font-display font-normal text-sm" aria-label="Mobile menu">
          <Link to={routes.about} onClick={() => setIsMenuOpen(false)} className="py-2">{t('nav.about')}</Link>
          <Link to={routes.content} onClick={() => setIsMenuOpen(false)} className="py-2">{t('nav.content')}</Link>
          <Link to={routes.contact} onClick={() => setIsMenuOpen(false)} className="py-2">{t('nav.contact')}</Link>
          <Link to={routes.contribua} onClick={() => setIsMenuOpen(false)} className="py-2">{t('nav.support')}</Link>
          {currentUser ? (
            <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
              <div className="flex items-center gap-2 text-primary font-bold py-2">
                <User size={18} /> {profile?.full_name || currentUser.email}
              </div>
              <button 
                onClick={handleLogout}
                className="bg-red-500/10 text-red-500 text-center py-2 rounded-[6px] font-bold flex items-center justify-center gap-2"
              >
                <LogOut size={18} /> Sair
              </button>
            </div>
          ) : (
            <Link to={routes.distromatch} className="bg-primary text-center py-2 rounded-[6px] font-bold" onClick={() => setIsMenuOpen(false)}>
              {t('nav.learn')}
            </Link>
          )}
        </nav>
      )}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={() => {
          setIsAuthModalOpen(false);
          navigate(routes.home);
        }}
      />
    </header>
  );
};
