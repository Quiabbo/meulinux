import React from 'react';
import { motion } from 'motion/react';
import { Coffee, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSEO } from '../../hooks/useSEO';
import { StaticGrid } from '../../components/StaticGrid';

export const ContribuaEn = () => {
  const { t } = useTranslation();
  useSEO('contribua');

  const options = [
    { 
      id: 'coffee', 
      label: 'Buy a small coffee', 
      emoji: '☕', 
      value: '$1.00',
      description: 'A small gesture that makes a big difference!' 
    },
    { 
      id: 'strong-coffee', 
      label: 'Buy a strong coffee', 
      emoji: '☕☕', 
      value: '$2.00',
      description: 'Keeps the dev awake and productive!' 
    },
    { 
      id: 'super-coffee', 
      label: 'Buy a super coffee!', 
      emoji: '☕☕☕', 
      value: '$3.00',
      description: "You're a true open source hero!" 
    },
    { 
      id: 'support', 
      label: 'Contribute any amount', 
      emoji: '❤️', 
      value: 'Your choice',
      description: 'Help us grow and reach more people!' 
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 bg-dark text-white relative overflow-hidden">
      <StaticGrid />
      
      <div className="container-custom max-w-6xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-6">
            <Coffee className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6" id="contribua-title">
            Enjoying the project?<br />
            <span className="text-primary">Buy the dev a coffee! ☕</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            meuLinux is a community-maintained project dedicated to making Linux accessible for everyone. Your support helps cover server costs and keeps new features like the Learn Linux platform in development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {options.map((option, index) => (
            <motion.a 
              key={option.id}
              href="https://ko-fi.com/meulinux"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col p-8 rounded-2xl border border-white/10 bg-[#1A1A1A] hover:border-primary/50 hover:scale-[1.02] transition-all duration-300 text-left group cursor-pointer"
            >
              <div className="mb-4 text-4xl duration-300 transform group-hover:scale-110 origin-left inline-block">{option.emoji}</div>
              <h3 className="text-xl font-bold mb-1 duration-300 group-hover:text-primary">{option.label}</h3>
              <div className="text-2xl font-bold text-primary mb-4">{option.value}</div>
              <p className="text-white/60 mb-6 flex-grow text-sm leading-relaxed">
                {option.description}
              </p>
              <div className="w-full text-center bg-primary group-hover:bg-primary/90 text-white py-3 px-4 rounded-xl font-bold transition-all inline-block shadow-md text-sm select-none">
                Support on Ko-fi &rarr;
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-2 text-primary">
            <Heart size={24} className="fill-current" />
            <span className="text-2xl font-display font-bold">
              Thank you so much for your support!
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
