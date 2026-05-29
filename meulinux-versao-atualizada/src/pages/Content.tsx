import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, ExternalLink, Calendar, Tag, Volume2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { AudioReader } from '../components/AudioReader';
import { AnimatedGrid } from '../components/AnimatedGrid';
import { SEO } from '../components/SEO';
import { useLanguage } from '../contexts/LanguageContext';
import { contentTranslations } from '../data/contentTranslations';

export type ContentSection = 'gnu-linux' | 'software-livre' | 'open-source';

const uiTranslations = {
  'pt-BR': {
    hero_title: 'Conteúdo Essencial',
    hero_subtitle: 'Aprenda os fundamentos do mundo GNU/Linux e Software Livre.',
    essential_title: 'Fundamentos & Conceitos',
    read_more: 'Ler conteúdo completo',
    back_button: 'Voltar para Conteúdo',
    quick_concept: 'Conceito Rápido',
    known_softwares: 'Softwares Livres Conhecidos',
    last_update: 'Última atualização: Fevereiro de 2026',
    explore_others: 'Explorar outros conteúdos',
    tags: 'Tags',
    not_found_title: 'Conteúdo não disponível',
    not_found_text: 'Este conteúdo não está mais disponível neste link, busque novamente navegando pelo site.'
  },
  'en': {
    hero_title: 'Essential Content',
    hero_subtitle: 'Learn the fundamentals of the GNU/Linux world and Free Software.',
    essential_title: 'Fundamentals & Concepts',
    read_more: 'Read full content',
    back_button: 'Back to Content',
    quick_concept: 'Quick Concept',
    known_softwares: 'Famous Free Software',
    last_update: 'Last update: February 2026',
    explore_others: 'Explore other contents',
    tags: 'Tags',
    not_found_title: 'Content not available',
    not_found_text: 'This content is no longer available on this link, look for it again navigating the site.'
  }
};

export const Content = () => {
  const { lang: routeLang, slug } = useParams();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const currentLang = routeLang?.toLowerCase() === 'en' ? 'en' : 'pt-br';
  const t = uiTranslations[currentLang === 'en' ? 'en' : 'pt-BR'];
  const contentData = currentLang === 'en' ? contentTranslations.en : (contentTranslations.pt || contentTranslations['pt-BR']);
  const contentPathName = currentLang === 'en' ? 'content' : 'conteudo';

  // Find if slug is an essential content ID
  const selectedEssentialId = (Object.keys(contentData) as ContentSection[]).find(id => id === slug) || null;

  const handleBack = () => {
    navigate(`/${currentLang}/${contentPathName}`);
  };

  const isDetailView = !!slug;
  const isNotFound = slug && !selectedEssentialId;

  return (
    <div className="min-h-screen pt-20 bg-light">
      <SEO 
        title={selectedEssentialId 
          ? contentData[selectedEssentialId].title 
          : isNotFound
            ? '404 - Content not found'
            : t.hero_title}
        description={selectedEssentialId 
          ? contentData[selectedEssentialId].subtitle 
          : isNotFound
            ? 'The content you are looking for does not exist or has been moved.'
            : t.hero_subtitle}
        ogType="website"
        canonical={selectedEssentialId ? `https://meulinux.com/${currentLang}/${contentPathName}/${selectedEssentialId}` : `https://meulinux.com/${currentLang}/${contentPathName}`}
        schemaData={selectedEssentialId ? {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": contentData[selectedEssentialId].title,
          "description": contentData[selectedEssentialId].subtitle,
          "image": contentData[selectedEssentialId].image,
          "author": {
            "@type": "Organization",
            "name": "meuLinux"
          },
          "publisher": {
            "@type": "Organization",
            "name": "meuLinux",
            "logo": {
              "@type": "ImageObject",
              "url": "https://meulinux.com/logo.png"
            }
          },
          "datePublished": "2026-02-01",
          "dateModified": "2026-03-18"
        } : undefined}
      />
      <section className="bg-dark text-white py-16 relative overflow-hidden">
        <AnimatedGrid />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              {selectedEssentialId 
                ? contentData[selectedEssentialId].title 
                : isNotFound
                  ? '404'
                  : t.hero_title}
            </h1>
            <p className="text-xl text-white/70 max-w-2xl">
              {selectedEssentialId 
                ? contentData[selectedEssentialId].subtitle 
                : isNotFound
                  ? 'Content not found'
                  : t.hero_subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-custom py-12">
        <AnimatePresence mode="wait">
          {isNotFound ? (
            <motion.div
              key="404"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <h2 className="text-3xl font-bold mb-4">{t.not_found_title}</h2>
              <p className="text-gray-500 mb-8">{t.not_found_text}</p>
              <Link
                to={`/${currentLang}/${contentPathName}`}
                className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg"
              >
                {t.back_button}
              </Link>
            </motion.div>
          ) : !isDetailView ? (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-20"
            >
              {/* Essential Content Section - Distinct Layout */}
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-1 w-12 bg-primary rounded-full" />
                  <h2 className="text-3xl font-display font-bold text-dark">{t.essential_title}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {(Object.keys(contentData) as ContentSection[]).map((id) => (
                    <Link
                      key={id}
                      to={`/${currentLang}/${contentPathName}/${id}`}
                      className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all text-left flex flex-col border border-gray-100 h-full"
                    >
                      <div className="aspect-[16/9] relative overflow-hidden bg-gray-50">
                        <img
                          src={contentData[id].image}
                          alt={contentData[id].title}
                          className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                          <span className="text-white font-bold text-sm flex items-center gap-2">
                            {t.read_more} <ArrowRight size={14} />
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="text-xl font-display font-bold text-dark mb-2 group-hover:text-primary transition-colors">
                          {contentData[id].title}
                        </h3>
                        <p className="text-gray-500 text-sm line-clamp-2">
                          {contentData[id].subtitle}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-500 hover:text-primary font-bold mb-8 transition-colors group"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> {t.back_button}
              </button>

              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-8 md:p-12">
                  {selectedEssentialId && (
                    <>
                      <AudioReader 
                        title={contentData[selectedEssentialId].title} 
                        text={`${contentData[selectedEssentialId].concept}. ${contentData[selectedEssentialId].sections.map(s => `${s.heading}. ${s.paragraphs.join(' ')}`).join(' ')}`} 
                      />

                      <div className="bg-primary/5 border-l-4 border-primary p-6 mb-12 rounded-r-xl">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">{t.quick_concept}</h3>
                        <p className="text-lg text-dark leading-relaxed italic">
                          {contentData[selectedEssentialId].concept}
                        </p>
                      </div>

                      <div className="space-y-16">
                        {contentData[selectedEssentialId].sections.map((section, idx) => (
                          <div key={idx} className="space-y-8">
                            {section.image && (
                              <div className="rounded-xl overflow-hidden shadow-lg bg-gray-100">
                                <img
                                  src={section.image}
                                  alt={section.heading}
                                  className="w-full h-auto object-cover max-h-[400px]"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                            )}
                            <div className="space-y-6">
                              <h2 className="text-3xl font-display font-bold text-dark border-b-2 border-primary/10 pb-4">
                                {section.heading}
                              </h2>
                              <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                                {section.paragraphs.map((p, pIdx) => (
                                  <p key={pIdx}>{p}</p>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}

                        {selectedEssentialId === 'software-livre' && contentData['software-livre'].softwares && (
                          <div className="pt-12 border-t border-gray-100">
                            <h2 className="text-3xl font-display font-bold text-dark mb-8">{t.known_softwares}</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                              {Object.entries(contentData['software-livre'].softwares).map(([category, list]) => (
                                <div key={category} className="bg-gray-50 p-6 rounded-xl">
                                  <h3 className="font-bold text-primary mb-4 uppercase tracking-wider text-sm">{category}</h3>
                                  <ul className="space-y-2">
                                    {list.map(software => (
                                      <li key={software.name}>
                                        <a 
                                          href={software.url} 
                                          target="_blank" 
                                          rel="noreferrer"
                                          className="flex items-center gap-3 text-dark font-medium hover:text-primary transition-colors group/link"
                                        >
                                          <div className="w-6 h-6 flex items-center justify-center bg-white rounded-sm p-0.5 shadow-sm border border-gray-100 group-hover/link:border-primary/30 transition-colors">
                                            <img 
                                              src={software.icon} 
                                              alt="" 
                                              className="max-w-full max-h-full object-contain"
                                              referrerPolicy="no-referrer"
                                            />
                                          </div>
                                          {software.name}
                                          <ExternalLink size={14} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-end gap-6">
                    <p className="text-sm text-gray-400 italic">
                      {t.last_update}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex justify-center">
                <button
                  onClick={handleBack}
                  className="bg-dark text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary transition-all shadow-lg"
                >
                  {t.explore_others}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
