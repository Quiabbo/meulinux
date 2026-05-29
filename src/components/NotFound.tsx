import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Info, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { AnimatedGrid } from './AnimatedGrid';
import { SEO } from './SEO';

const translations = {
  'pt-BR': {
    title: "Conteúdo não disponível",
    message: "Este conteúdo nao esta mais disponivel neste link, busque novamente navegando pelo site. Você será redirecionado para a página inicial em instantes.",
    backHome: "Ir para a Página Inicial"
  }
};

export const NotFound = () => {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const t = translations['pt-BR'];

  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 8000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen pt-20 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <AnimatedGrid />
      <SEO 
        title={`${t.title} - Meu Linux`}
        description={t.message}
        ogType="website"
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center space-y-6 relative z-10 bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white"
      >
        <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Info size={40} className="text-primary" />
        </div>
        <h1 className="text-4xl font-display font-bold text-dark">{t.title}</h1>
        <p className="text-gray-600 leading-relaxed">
          {t.message}
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-[6px] font-bold hover:bg-primary/90 transition-all shadow-lg"
        >
          {t.backHome} <ArrowRight size={20} />
        </Link>
      </motion.div>
    </div>
  );
};
