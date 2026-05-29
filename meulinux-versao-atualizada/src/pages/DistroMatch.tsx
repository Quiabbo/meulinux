import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, ArrowRight, Cpu, MemoryStick, User, Target, Video } from 'lucide-react';
import { useDistros } from '../hooks/useDistros';
import { Link } from 'react-router-dom';
import { AnimatedGrid } from '../components/AnimatedGrid';
import { useLanguage } from '../contexts/LanguageContext';
import { DonationSection } from '../components/DonationSection';
import { DISTRO_TRANSLATIONS } from '../data/distroTranslations';

const translations = {
  'pt-BR': {
    title_match: "Match",
    subtitle: "Responda algumas perguntas simples e descubra qual a distro Linux ideal para você.",
    intro_block: "Não existe uma “melhor distro Linux”. Existe a melhor distro para o seu perfil.",
    label_processor: "Tipo de computador",
    label_memory: "Quanto de RAM você tem",
    label_experience: "Seu nível com Linux",
    label_objective: "O que você quer fazer",
    label_video: "Placa de vídeo",
    button_search: "Buscar",
    results_title: "Resultados para você:",
    button_learn_more: "Conhecer e Baixar",
    options_experience: ["Selecione", "Iniciante", "Intermediário", "Avançado"],
    options_objective: ["Selecione", "Desenvolvimento", "Design", "Educação", "Hacking", "Geral"],
    options_video: [
      "Selecione",
      "Integrado Intel (HD, UHD, Iris Xe)",
      "Integrado AMD (Radeon Vega/RDNA)",
      "NVIDIA (Antiga, série 900 ou anterior)",
      "NVIDIA (Moderna, série 1000 ou mais recente)",
      "AMD (Antiga, anterior a RDNA)",
      "AMD (Moderna, RDNA ou mais recente)"
    ],
    options_processor: [
      "Selecione",
      "Antigo (32-bit, ex: Pentium 4)",
      "Básico (64-bit, ex: Intel Atom, Celeron Dual-Core)",
      "Intermediário (64-bit, ex: Core i3, Ryzen 3)",
      "Moderno (64-bit, ex: Core i5/i7, Ryzen 5/7)",
      "Avançado (64-bit, ex: Core i9, Ryzen 9)",
      "Baseado em ARM (64-bit, ex: Raspberry Pi)"
    ],
    options_memory: [
      "Selecione",
      "Menos de 1 GB",
      "1 GB",
      "2 GB",
      "4 GB",
      "8 GB+"
    ],
    recommendation_labels: {
      recommended: "Recomendado para você",
      best_choice: "⭐ Melhor escolha",
      good_alternative: "👍 Boa alternativa",
      more_knowledge: "⚠️ Exige mais conhecimento"
    },
    donation_title1: "Te ajudei?",
    donation_title2: "Que tal um café para o dev? ☕"
  },
  'en': {
    title_match: "Match",
    subtitle: "Answer a few simple questions and discover which Linux distro is ideal for you.",
    intro_block: "There is no \"best Linux distro\". There is the best distro for your profile.",
    label_processor: "Computer Type",
    label_memory: "How much RAM do you have",
    label_experience: "Your Linux experience",
    label_objective: "What is your main goal",
    label_video: "Graphics Card",
    button_search: "Search",
    results_title: "Results for you:",
    button_learn_more: "Explore and Download",
    options_experience: ["Select", "Beginner", "Intermediate", "Advanced"],
    options_objective: ["Select", "Development", "Design", "Education", "Hacking", "General Use"],
    options_video: [
      "Select",
      "Integrated Intel (HD, UHD, Iris Xe)",
      "Integrated AMD (Radeon Vega/RDNA)",
      "NVIDIA (Legacy, 900 series or older)",
      "NVIDIA (Modern, 1000 series or newer)",
      "AMD (Legacy, older than RDNA)",
      "AMD (Modern, RDNA or newer)"
    ],
    options_processor: [
      "Select",
      "Legacy (32-bit, e.g. Pentium 4)",
      "Basic (64-bit, e.g. Intel Atom, Celeron Dual-Core)",
      "Intermediate (64-bit, e.g. Core i3, Ryzen 3)",
      "Modern (64-bit, e.g. Core i5/i7, Ryzen 5/7)",
      "Advanced (64-bit, e.g. Core i9, Ryzen 9)",
      "ARM-based (64-bit, e.g. Raspberry Pi)"
    ],
    options_memory: [
      "Select",
      "Less than 1 GB",
      "1 GB",
      "2 GB",
      "4 GB",
      "8 GB+"
    ],
    recommendation_labels: {
      recommended: "Recommended for you",
      best_choice: "⭐ Best choice",
      good_alternative: "👍 Good alternative",
      more_knowledge: "⚠️ Requires more knowledge"
    },
    donation_title1: "Did I help you?",
    donation_title2: "How about buying the dev a coffee? ☕"
  }
};

export const DistroMatch = () => {
  const { lang } = useLanguage();
  const activeKey = lang === 'en' ? 'en' : 'pt-BR';
  const t = translations[activeKey];
  const DISTROS = useDistros();

  const [filters, setFilters] = useState({
    processor: t.options_processor[0],
    memory: t.options_memory[0],
    experience: t.options_experience[0],
    objective: t.options_objective[0],
    video: t.options_video[0]
  });
  const [results, setResults] = useState<typeof DISTROS>([]);
  const [hasSearched, setHasSearched] = useState(false);

  React.useEffect(() => {
    setFilters({
      processor: t.options_processor[0],
      memory: t.options_memory[0],
      experience: t.options_experience[0],
      objective: t.options_objective[0],
      video: t.options_video[0]
    });
    setHasSearched(false);
    setResults([]);
  }, [lang]);

  const handleSearch = () => {
    // Helper to get index of selected option
    const getIdx = (val: string, options: string[]) => options.indexOf(val);

    const scoredDistros = DISTROS.map(distro => {
      let score = 0;
      
      // 1. Experience Score
      const expIdx = getIdx(filters.experience, t.options_experience);
      if (expIdx === 1) { // Beginner
        if (distro.categories.includes('Best to start')) score += 15;
        if (['arch-linux', 'gentoo', 'slackware', 'kali-linux', 'black-arch', 'cachyos'].includes(distro.id)) score -= 20;
      } else if (expIdx === 3) { // Advanced
        if (['arch-linux', 'gentoo', 'slackware', 'void', 'alpine', 'black-arch', 'cachyos'].includes(distro.id)) score += 15;
        if (distro.categories.includes('Best to start')) score -= 5;
      } else if (expIdx === 2) { // Intermediate
        score += 5;
        if (distro.id === 'cachyos') score += 10;
      }

      // 2. Objective Score
      const objIdx = getIdx(filters.objective, t.options_objective);
      if (objIdx === 1) { // Development
        if (distro.categories.includes('Programming')) score += 15;
      } else if (objIdx === 2) { // Design
        if (['ubuntu-studio', 'deepin', 'elementary-os', 'solus'].includes(distro.id)) score += 15;
      } else if (objIdx === 3) { // Education
        if (['edubuntu', 'endless-os', 'raspberry-pi-os'].includes(distro.id)) score += 15;
      } else if (objIdx === 4) { // Hacking
        if (distro.categories.includes('Hacking')) score += 20;
      } else if (objIdx === 5) { // General
        if (distro.categories.includes('Best to start')) score += 10;
      }

      // 3. Hardware Score (Processor & Memory)
      const procIdx = getIdx(filters.processor, t.options_processor);
      const memIdx = getIdx(filters.memory, t.options_memory);
      
      const isLowEnd = procIdx <= 2 || memIdx <= 3; // Antigo/Básico or <= 2GB
      const isVeryLowEnd = procIdx === 1 || memIdx <= 2; // Antigo or <= 1GB
      
      if (isVeryLowEnd) {
        if (['tinycore', 'antix', 'bodhi', 'alpine', 'minios'].includes(distro.id)) score += 25;
        if (distro.categories.includes('PC Antigo')) score += 15;
      } else if (isLowEnd) {
        if (distro.categories.includes('PC Antigo')) score += 15;
        if (['ubuntu-linux', 'fedora-linux', 'pop-os', 'kubuntu', 'deepin', 'cachyos'].includes(distro.id)) score -= 10;
      } else {
        // High end
        if (['fedora-linux', 'pop-os', 'manjaro', 'opensuse', 'tuxedo-os', 'bazzite', 'cachyos'].includes(distro.id)) score += 10;
      }

      // 4. Video Score
      const vidIdx = getIdx(filters.video, t.options_video);
      if (vidIdx === 3 || vidIdx === 4) { // NVIDIA
        if (['pop-os', 'zorin-os', 'ubuntu-linux', 'linux-mint', 'manjaro', 'regata-os', 'tuxedo-os', 'cachyos'].includes(distro.id)) score += 10;
      }
      if (vidIdx === 6) { // AMD Modern
        if (['bazzite', 'steam-os', 'nobara', 'fedora-linux', 'cachyos'].includes(distro.id)) score += 10;
      }

      // 5. ARM Check
      if (procIdx === 6) { // ARM
        if (['raspberry-pi-os', 'ubuntu-linux', 'debian-linux', 'fedora-linux'].includes(distro.id)) score += 30;
        else score -= 50; // Most distros don't support ARM easily
      }

      // 6. Debian target correction (ALTERAÇÃO 3)
      if (distro.id === 'debian-linux') {
        const expIdx = getIdx(filters.experience, t.options_experience);
        const objIdx = getIdx(filters.objective, t.options_objective);
        if (expIdx === 2 && objIdx === 5) { // Intermediate and General Use ("nível intermediário, foco em estabilidade, uso geral")
          score += 40;
        } else if (expIdx === 2) {
          score += 15;
        } else if (objIdx === 5) {
          score += 15;
        }
      }

      return { ...distro, score };
    });

    // Sort by score and take top results
    const matched = scoredDistros
      .filter(d => d.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);

    const resultsWithLabels = (matched.length > 0 ? matched : [DISTROS[0]]).map((distro, index) => {
      let label = t.recommendation_labels.recommended;
      if (index === 0) label = t.recommendation_labels.best_choice;
      else if (index === 1) label = t.recommendation_labels.good_alternative;
      
      // Special case for advanced distros if user is not advanced
      const expIdx2 = getIdx(filters.experience, t.options_experience);
      if (
        (expIdx2 < 3 && ['arch-linux', 'gentoo', 'slackware', 'void', 'alpine', 'black-arch'].includes(distro.id)) ||
        (expIdx2 === 1 && distro.id === 'cachyos')
      ) {
        label = t.recommendation_labels.more_knowledge;
      }
      
      return { ...distro, recommendationLabel: label };
    });

    setResults(resultsWithLabels);
    setHasSearched(true);
    
    // Scroll to results
    setTimeout(() => {
      const resultsElement = document.getElementById('results-section');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="bg-dark text-white py-24 relative overflow-hidden">
        <AnimatedGrid />
        <div className="container-custom relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display mb-4"
          >
            <span className="font-normal">Distro</span><span className="font-bold">{t.title_match}</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-white/70"
          >
            {t.subtitle}
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="bg-white distro-card p-8 rounded-[6px] shadow-xl -mt-32 relative z-10 mb-16" role="search" aria-label="Filtros de busca de distros">
            <div className="mb-8 p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
              <p className="text-dark font-medium italic">
                {t.intro_block}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="processor" className="text-xs font-bold text-dark uppercase ml-1 flex items-center gap-1">
                  <Cpu size={14} className="text-primary" /> {t.label_processor}
                </label>
                <select 
                  id="processor"
                  className="bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  value={filters.processor}
                  onChange={(e) => setFilters({...filters, processor: e.target.value})}
                >
                  {t.options_processor.map((opt, i) => (
                    <option key={i}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="memory" className="text-xs font-bold text-dark uppercase ml-1 flex items-center gap-1">
                  <MemoryStick size={14} className="text-primary" /> {t.label_memory}
                </label>
                <select 
                  id="memory"
                  className="bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  value={filters.memory}
                  onChange={(e) => setFilters({...filters, memory: e.target.value})}
                >
                  {t.options_memory.map((opt, i) => (
                    <option key={i}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="experience" className="text-xs font-bold text-dark uppercase ml-1 flex items-center gap-1">
                  <User size={14} className="text-primary" /> {t.label_experience}
                </label>
                <select 
                  id="experience"
                  className="bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  value={filters.experience}
                  onChange={(e) => setFilters({...filters, experience: e.target.value})}
                >
                  {t.options_experience.map((opt, i) => (
                    <option key={i}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="objective" className="text-xs font-bold text-dark uppercase ml-1 flex items-center gap-1">
                  <Target size={14} className="text-primary" /> {t.label_objective}
                </label>
                <select 
                  id="objective"
                  className="bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  value={filters.objective}
                  onChange={(e) => setFilters({...filters, objective: e.target.value})}
                >
                  {t.options_objective.map((opt, i) => (
                    <option key={i}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="video" className="text-xs font-bold text-dark uppercase ml-1 flex items-center gap-1">
                  <Video size={14} className="text-primary" /> {t.label_video}
                </label>
                <select 
                  id="video"
                  className="bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  value={filters.video}
                  onChange={(e) => setFilters({...filters, video: e.target.value})}
                >
                  {t.options_video.map((opt, i) => (
                    <option key={i}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
            <button 
              onClick={handleSearch}
              className="w-full mt-6 bg-primary text-white py-4 rounded-[6px] font-bold text-lg hover:bg-primary/90 transition-all shadow-lg flex items-center justify-center gap-2 focus:ring-4 focus:ring-primary/20 outline-none"
              aria-label={t.button_search}
            >
              <Search size={20} aria-hidden="true" /> {t.button_search}
            </button>
          </div>

          {/* Results */}
          {hasSearched && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h2 className="text-3xl font-display font-bold mb-8">{t.results_title}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {results.map((distro, i) => {
                   const trans = DISTRO_TRANSLATIONS[activeKey]?.[distro.id];
                   const subtitle = trans?.subtitle || distro.subtitle;
                   
                   return (
                     <motion.div
                       key={distro.id}
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: i * 0.1 }}
                     >
                       <Link 
                         to={`/${distro.id}`}
                         className="bg-white distro-card rounded-[6px] p-6 shadow-sm hover:shadow-xl transition-all group border border-gray-100 block h-full relative overflow-hidden"
                       >
                         {(distro as any).recommendationLabel && (
                           <div className="absolute top-0 right-0 bg-primary/10 text-primary text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                             {(distro as any).recommendationLabel}
                           </div>
                         )}
                         <div className="h-16 w-16 mb-4 flex items-center justify-center bg-gray-50 rounded-[6px] distro-card">
                           <img src={distro.logo} alt={distro.name} className="max-h-12 max-w-12 object-contain" referrerPolicy="no-referrer" />
                         </div>
                         <h3 className="text-xl font-bold mb-2 text-dark">{distro.name}</h3>
                         <p className="text-gray-500 text-sm mb-6 line-clamp-2">{subtitle}</p>
                         <div className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                           {t.button_learn_more} <ArrowRight size={18} />
                         </div>
                       </Link>
                     </motion.div>
                   );
                 })}
               </div>
            </motion.div>
          )}
        </div>
      </section>
      {hasSearched && <DonationSection titleLine1={t.donation_title1} titleLine2={t.donation_title2} />}
    </div>
  );
};
