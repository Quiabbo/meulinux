import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { AnimatedGrid } from '../components/AnimatedGrid';
import { useSEO } from '../hooks/useSEO';
import { DonationSection } from '../components/DonationSection';
import { AudioReader } from '../components/AudioReader';

export const Contact = () => {
  const { t } = useTranslation();
  useSEO('contact');

  return (
    <div className="min-h-screen pt-20">
      <section className="bg-dark text-white py-24 relative overflow-hidden">
        <AnimatedGrid />
        <div className="container-custom relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-bold mb-4 text-primary"
            id="contact-title"
          >
            {t('contact.title')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-white/70"
          >
            {t('contact.subtitle')}
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom max-w-3xl">
          <AudioReader text={`${t('contact.subtitle')} ${t('contact.contact_instruction')} ${t('contact.email')} ${t('contact.contact_thanks')}`} />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 md:p-12 rounded-3xl shadow-xl text-center"
          >
            <div className="space-y-6">
              <p className="text-xl text-gray-600">
                {t('contact.contact_instruction')}
              </p>
              <a 
                href={`mailto:${t('contact.email')}`}
                className="text-2xl md:text-3xl font-display font-bold text-primary hover:underline transition-all block"
              >
                {t('contact.email')}
              </a>
              <p className="text-lg text-gray-500 italic">
                {t('contact.contact_thanks')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      <DonationSection titleLine1={t('contact.donation_title1')} titleLine2={t('contact.donation_title2')} />
    </div>
  );
};
