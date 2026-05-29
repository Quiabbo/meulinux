import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ArrowRight, Star, Cpu, Code, Gamepad2, ShieldAlert, Lock, LayoutGrid, Flag } from 'lucide-react';
import { motion } from 'motion/react';
import { AnimatedGrid } from '../components/AnimatedGrid';
import { CATEGORIES } from '../constants';
import { useDistros } from '../hooks/useDistros';
import { useTranslation } from 'react-i18next';
import { useSEO } from '../hooks/useSEO';
import { routeMap } from '../utils/routeMap';
import { DISTRO_TRANSLATIONS } from '../data/distroTranslations';

export const Home = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const { t, i18n } = useTranslation();
  useSEO('home');

  const currentLang = (i18n.language || 'pt-br').toLowerCase().startsWith('pt') ? 'pt-br' : 'en';
  const routes = routeMap[currentLang];

  const DISTROS = useDistros();
  
  const [selectedCategory, setSelectedCategory] = useState("All distros");
  const [displayLimit, setDisplayLimit] = useState(12);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedCategory("All distros");
    setDisplayLimit(12);
  }, [currentLang]);

  useEffect(() => {
    const s = searchParams.get('search');
    if (s) setSearch(s);
  }, [searchParams]);

  useEffect(() => {
    if (selectedCategory === "All distros") {
      setDisplayLimit(12);
    } else if (selectedCategory === "Privacy" || selectedCategory === "PC Antigo" || selectedCategory === "Brasileiras") {
      setDisplayLimit(5);
    } else {
      setDisplayLimit(4);
    }
  }, [selectedCategory]);

  const filteredDistros = DISTROS.filter(distro => {
    const matchesSearch = distro.name.toLowerCase().includes(search.toLowerCase()) || 
                         distro.subtitle.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All distros" || distro.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const sortedDistros = [...filteredDistros].sort((a, b) => {
    if (selectedCategory === "All distros") {
      const famousOrder = ['ubuntu-linux', 'linux-mint', 'fedora-linux', 'pop-os', 'debian-linux', 'opensuse', 'zorin-os', 'kali-linux'];
      const indexA = famousOrder.indexOf(a.id);
      const indexB = famousOrder.indexOf(b.id);
      
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return 0;
    }

    if (selectedCategory === "PC Antigo") {
      const pcFracoOrder = ['mx-linux', 'bodhi', 'minios', 'antix', 'tinycore'];
      const indexA = pcFracoOrder.indexOf(a.id);
      const indexB = pcFracoOrder.indexOf(b.id);
      
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return 0;
    }

    if (selectedCategory === "Gaming") {
      if (a.id === 'zorin-os') return 1;
      if (b.id === 'zorin-os') return -1;
      return 0;
    }

    return 0;
  });

  const displayedDistros = sortedDistros.slice(0, displayLimit);

  const categoryIcons: Record<string, React.ReactNode> = {
    "All distros": <LayoutGrid size={18} />,
    "Best to start": <Star size={18} />,
    "PC Antigo": <Cpu size={18} />,
    "Programming": <Code size={18} />,
    "Gaming": <Gamepad2 size={18} />,
    "Hacking": <ShieldAlert size={18} />,
    "Privacy": <Lock size={18} />,
    "Brasileiras": <Flag size={18} />
  };

  const getTranslatedDistro = (distro: typeof DISTROS[0]) => {
    const activeKey = currentLang === 'en' ? 'en' : 'pt-BR';
    const trans = DISTRO_TRANSLATIONS[activeKey]?.[distro.id];
    if (!trans) return distro;
    return {
      ...distro,
      subtitle: trans.subtitle || distro.subtitle,
      description: trans.description || distro.description
    };
  };

  const handleViewMore = () => {
    setDisplayLimit(filteredDistros.length);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative bg-dark text-white py-24 overflow-hidden">
        <AnimatedGrid />
        
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Column: Content */}
            <div className="text-left">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl md:text-[34px] font-display font-bold mb-2 text-primary leading-tight"
                id="home-hero-title"
              >
                {t('hero.title')}
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-base md:text-lg text-white/80 max-w-lg mb-6"
              >
                {t('hero.subtitle')}
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="relative mb-8 max-w-lg"
              >
                <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                  <input
                    type="text"
                    placeholder={t('hero.searchPlaceholder')}
                    className="w-full bg-white text-dark rounded-[6px] py-4 px-4 md:px-8 pl-11 md:pl-14 pr-24 md:pr-32 text-sm md:text-lg shadow-2xl focus:outline-none focus:ring-4 focus:ring-primary/20 search-input"
                    value={search}
                    onChange={handleSearchChange}
                  />
                  <Search className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 md:w-6 md:h-6 search-icon" />
                  <button 
                    type="submit"
                    className="absolute right-1.5 md:right-2 top-1/2 -translate-y-1/2 bg-primary text-white px-3 md:px-6 py-1.5 md:py-2 text-xs md:text-base font-bold hover:bg-primary/90 transition-all cursor-pointer"
                  >
                    {t('hero.searchButton')}
                  </button>
                </form>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl max-w-lg hover:bg-white/10 transition-colors cursor-pointer group mb-12"
              >
                <Link to={routes.distromatch} className="block w-full h-full text-white/80 no-underline">
                  <p>
                    <strong>{t('hero.beginnerText')}</strong> Use <span className="text-primary hover:underline font-bold" aria-label="DistroMatch">DistroMatch</span>
                    <br />
                    {t('hero.beginnerSubtext')}
                  </p>
                </Link>
              </motion.div>
            </div>

            {/* Right Column: Ebook Banner */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="hidden lg:block filter drop-shadow-2xl cursor-pointer"
            >
              <Link 
                to={routes.contribua}
                className="block overflow-hidden rounded-[14px] border-2 border-primary/40 hover:border-primary/80 transition-all transform hover:scale-[1.01] duration-200"
              >
                <img
                  src={currentLang === 'pt-br' ? "/assets/banner-site-br.png" : "/assets/banner-site-en.png"}
                  alt={t('hero.bannerAlt')}
                  title={t('hero.bannerTitle')}
                  width="1200"
                  height="300"
                  className="w-full h-auto block select-none rounded-[12px]"
                  referrerPolicy="no-referrer"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Post-Download Section */}
      <section className="py-4 bg-primary text-white">
        <div className="container-custom flex items-center justify-center gap-6">
          <h2 className="text-lg md:text-xl font-bold">{t('hero.postDownloadTitle')}</h2>
          <Link 
            to={routes.postinstall}
            className="border-2 border-white text-white px-6 py-2 rounded-[6px] hover:bg-white hover:text-primary transition-all text-sm md:text-base whitespace-nowrap font-normal"
          >
            {t('hero.viewArticle')}
          </Link>
        </div>
      </section>

      {/* Distro List Section */}
      <section ref={resultsRef} className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold mb-4">{t('hero.distroListTitle')}</h2>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-3 mb-12 items-center" id="categories-filter-container">
            {/* First Line */}
            <div className="flex flex-wrap justify-center gap-2.5">
              {CATEGORIES.slice(0, 5).map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-[6px] text-sm font-medium transition-all flex items-center gap-2 home-filter-btn cursor-pointer ${
                    selectedCategory === cat 
                      ? 'bg-primary text-white shadow-lg active scale-105' 
                      : 'bg-[#E2E2E2] text-dark hover:bg-gray-300'
                  }`}
                >
                  {categoryIcons[cat]}
                  {t(`categories.${cat}`) || cat}
                </button>
              ))}
            </div>
            {/* Second Line */}
            <div className="flex flex-wrap justify-center gap-2.5">
              {CATEGORIES.slice(5).map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-[6px] text-sm font-medium transition-all flex items-center gap-2 home-filter-btn cursor-pointer ${
                    selectedCategory === cat 
                      ? 'bg-primary text-white shadow-lg active scale-105' 
                      : 'bg-[#E2E2E2] text-dark hover:bg-gray-300'
                  }`}
                >
                  {categoryIcons[cat]}
                  {t(`categories.${cat}`) || cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid or Grouped Categories */}
          {selectedCategory === "All distros" && displayLimit > 12 ? (
            <div className="space-y-12 mb-12">
              {CATEGORIES.filter(cat => cat !== "All distros").map(cat => {
                const distrosInCat = filteredDistros.filter(d => d.categories.includes(cat));
                if (distrosInCat.length === 0) return null;
                
                return (
                  <div key={cat} className="space-y-6">
                    <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                      <span className="text-primary">{categoryIcons[cat]}</span>
                      <h3 className="text-2xl font-bold font-display text-dark">
                        {t(`categories.${cat}`) || cat}
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {distrosInCat.map((distro, i) => {
                        const translatedDistro = getTranslatedDistro(distro);
                        return (
                          <motion.div
                            key={`${cat}-${distro.id}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <Link 
                              to={`/${currentLang}/${distro.id}`}
                              className="bg-white distro-card rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all group border border-gray-100 block h-full cursor-pointer relative"
                            >
                              <div className="h-16 w-16 mb-4 flex items-center justify-center bg-gray-50 rounded-xl distro-card">
                                <img src={distro.logo} alt={distro.name} className="max-h-12 max-w-12 object-contain" referrerPolicy="no-referrer" />
                              </div>
                              <h3 className="text-xl font-bold mb-2 text-dark">{distro.name}</h3>
                              <p className="text-gray-500 text-sm mb-6 line-clamp-2">{translatedDistro.subtitle}</p>
                              
                              <div className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                                {t('hero.learnMore')} <ArrowRight size={18} />
                              </div>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {displayedDistros.map((distro, i) => {
                const translatedDistro = getTranslatedDistro(distro);
                return (
                  <motion.div
                    key={distro.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link 
                      to={`/${currentLang}/${distro.id}`}
                      className="bg-white distro-card rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all group border border-gray-100 block h-full cursor-pointer relative"
                    >
                      <div className="h-16 w-16 mb-4 flex items-center justify-center bg-gray-50 rounded-xl distro-card">
                        <img src={distro.logo} alt={distro.name} className="max-h-12 max-w-12 object-contain" referrerPolicy="no-referrer" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-dark">{distro.name}</h3>
                      <p className="text-gray-500 text-sm mb-6 line-clamp-2">{translatedDistro.subtitle}</p>
                      
                      <div className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                        {t('hero.learnMore')} <ArrowRight size={18} />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {filteredDistros.length > displayLimit && (
              <button 
                onClick={handleViewMore}
                className="bg-primary text-white px-8 py-3 rounded-[6px] font-bold hover:bg-primary/90 transition-all shadow-lg flex items-center gap-2 cursor-pointer"
              >
                {selectedCategory === "All distros" ? t('hero.viewAll') : t('hero.viewMore')}
              </button>
            )}
            {selectedCategory !== "All distros" && (
              <Link 
                to={routes.distromatch}
                className="bg-dark text-white px-8 py-3 rounded-[6px] font-bold hover:bg-dark/90 transition-all shadow-lg flex items-center gap-2 cursor-pointer"
              >
                {t('hero.personalizedSearch')}
              </Link>
            )}
          </div>

        </div>
      </section>
    </div>
  );
};
