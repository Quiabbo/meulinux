import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coffee, Heart, Copy, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSEO } from '../hooks/useSEO';
import { StaticGrid } from '../components/StaticGrid';

export const Contribua = () => {
  const { t, i18n } = useTranslation();
  useSEO('contribua');

  const [selectedOption, setSelectedOption] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);

  const isEn = i18n.language?.toLowerCase().startsWith('en');

  const options = [
    { 
      id: 'coffee', 
      label: isEn ? 'Buy a coffee' : 'Pagar um cafézinho', 
      emoji: '☕', 
      value: 'R$ 2,00',
      qrCode: '/assets/2.png',
      description: isEn ? 'A small gesture that makes a huge difference!' : 'Um gesto simples que faz toda a diferença!' 
    },
    { 
      id: 'strong-coffee', 
      label: isEn ? 'Buy a double coffee' : 'Pagar um café reforçado', 
      emoji: '☕☕', 
      value: 'R$ 5,00',
      qrCode: '/assets/5.png',
      description: isEn ? 'To keep the dev awake and typing!' : 'Para manter o dev acordado e produtivo!' 
    },
    { 
      id: 'super-coffee', 
      label: isEn ? 'Buy a super coffee!' : 'Pagar um super café!', 
      emoji: '☕☕☕', 
      value: 'R$ 10,00',
      qrCode: '/assets/10.png',
      description: isEn ? 'You are a true open source hero!' : 'Você é um verdadeiro herói do open source!' 
    },
    { 
      id: 'support', 
      label: isEn ? 'Contribute other value' : 'Contribuir com outro valor', 
      emoji: '❤️', 
      value: isEn ? 'Custom Value' : 'Valor livre',
      qrCode: '/assets/outro-valor.png',
      description: isEn ? 'Help us scale and reach more people!' : 'Ajude-nos a crescer e alcançar mais pessoas!' 
    }
  ];

  const handleCopyPix = () => {
    navigator.clipboard.writeText('filipi.hadji.dsg@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            {t('about.donation_title1')}<br />
            <span className="text-primary">{t('about.donation_title2')}</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            {isEn 
              ? 'meuLinux is a community-driven project dedicated to simplifying the Linux universe. Your support helps us cover server costs and keep developing educational courses.'
              : 'O meuLinux é um projeto mantido pela comunidade e dedicado a simplificar o mundo Linux. Seu apoio nos ajuda a cobrir os custos do servidor e continuar desenvolvendo novas funcionalidades como a plataforma Aprenda Linux.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {options.map((option, index) => (
            <motion.button 
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedOption(option)}
              className={`flex flex-col p-8 rounded-2xl border transition-all duration-300 text-left cursor-pointer ${
                selectedOption?.id === option.id 
                  ? 'border-primary bg-primary/10 scale-[1.02] shadow-2xl' 
                  : 'border-white/10 bg-[#1A1A1A] hover:border-primary/50 hover:scale-[1.02]'
              }`}
            >
              <div className="mb-4 text-4xl">{option.emoji}</div>
              <h3 className="text-xl font-bold mb-1">{option.label}</h3>
              <div className="text-2xl font-bold text-primary mb-4">{option.value}</div>
              <p className="text-white/60 mb-4 flex-grow text-sm">
                {option.description}
              </p>
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {selectedOption && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-16"
            >
              <div className="bg-[#1A1A1A] p-8 rounded-3xl border-2 border-primary/20 shadow-2xl max-w-md mx-auto text-center">
                <h3 className="text-xl font-bold mb-2 text-white">{isEn ? 'Thank you so much for your support!' : 'Muito obrigado pelo seu apoio!'}</h3>
                <p className="text-white/60 mb-6">
                  {isEn 
                    ? `Scan the QR Code to donate ${selectedOption.value}` 
                    : `Escaneie o QR Code para doar ${selectedOption.value}`}
                </p>
                
                <div className="bg-white p-4 rounded-2xl mb-6 inline-block">
                  <img 
                    src={selectedOption.qrCode} 
                    alt="QR Code PIX" 
                    className="w-48 h-48 object-contain mx-auto"
                    referrerPolicy="no-referrer"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>

                <div className="space-y-4">
                  <p className="text-sm font-bold text-white/40 uppercase tracking-wider">
                    {isEn ? 'Or use our PIX Key (Email):' : 'Ou use a Chave PIX (E-mail):'}
                  </p>
                  <div className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/10">
                    <code className="flex-grow text-sm font-mono text-white truncate">filipi.hadji.dsg@gmail.com</code>
                    <button 
                      onClick={handleCopyPix}
                      className="p-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-all shadow-sm cursor-pointer"
                      title={isEn ? 'Copy Pix key' : 'Copiar chave PIX'}
                    >
                      {copied ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                  </div>
                  <p className="text-xs text-white/40 italic">
                    {isEn ? 'To keep the developer awake and coding!' : 'Para manter o dev acordado e produtivo!'}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-2 text-primary">
            <Heart size={24} className="fill-current" />
            <span className="text-2xl font-display font-bold">
              {isEn ? 'Thank you so much for backing us!' : 'Muito obrigado pelo seu apoio!'}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
