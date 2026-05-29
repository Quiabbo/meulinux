import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Shield, Code, Users, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AnimatedGrid } from '../components/AnimatedGrid';
import { DonationSection } from '../components/DonationSection';
import { AudioReader } from '../components/AudioReader';
import { useSEO } from '../hooks/useSEO';
import { routeMap } from '../utils/routeMap';

export const About = () => {
  const { t, i18n } = useTranslation();
  useSEO('about');

  const currentLang = (i18n.language || 'pt-br').toLowerCase().startsWith('pt') ? 'pt-br' : 'en';
  const routes = routeMap[currentLang];

  const features = t('about.features', { returnObjects: true }) as Array<{ title: string; desc: string }> || [];

  return (
    <div className="min-h-screen pt-20">
      <section className="bg-dark text-white py-24 relative overflow-hidden">
        <AnimatedGrid />
        <div className="container-custom relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-display font-bold mb-4 text-primary"
            id="about-hero-title"
          >
            {t('about.hero_title')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/70"
          >
            {t('about.hero_subtitle')}
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-white relative">
        <div className="container-custom">
          <AudioReader text={`${t('about.main_text')} ${t('about.quote')} ${t('about.curation_text')}`} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-lg leading-relaxed text-gray-700 mb-8">
                {t('about.main_text')}
              </p>
              <div className="bg-primary/5 border-l-4 border-primary p-6 mb-8" role="complementary">
                <p className="text-2xl font-display font-bold text-dark">
                  {t('about.quote')}
                </p>
              </div>
              <p className="text-lg text-gray-600">
                {t('about.curation_text')}
              </p>
            </div>
            <div className="relative flex justify-center lg:justify-end">
              <img 
                src="/assets/eu.png" 
                alt="Filipi Hadji" 
                className="max-w-xs h-auto"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-light relative overflow-hidden">
        <div className="container-custom relative z-10">
          <h2 className="text-3xl font-display font-bold mb-12 text-center">{t('about.features_title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Shield size={40} /> },
              { icon: <Code size={40} /> },
              { icon: <Users size={40} /> },
              { icon: <Settings size={40} /> }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-primary mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-4 text-primary">{features[i]?.title || ''}</h3>
                <p className="text-gray-600">{features[i]?.desc || ''}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-dark text-white text-center">
        <div className="container-custom max-w-4xl">
          <h2 className="text-2xl md:text-4xl font-display font-bold mb-8 text-primary">
            {t('about.footer_title')}
          </h2>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-12">
            {t('about.footer_text')}
          </p>
          <p className="text-xl text-white/50 mb-8 italic">
            {t('about.footer_join')}
          </p>
          <Link to={routes.content} className="inline-block bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-[6px] font-bold text-xl transition-all transform hover:scale-105">
            {t('about.footer_button')}
          </Link>
        </div>
      </section>
      <DonationSection titleLine1={t('about.donation_title1')} titleLine2={t('about.donation_title2')} />
    </div>
  );
};
