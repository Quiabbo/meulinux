import React, { useState } from 'react';
import { Coffee, Heart, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';

const t = {
  'pt-BR': {
    titleDefault: 'Como pagar um café para o dev? ☕',
    descriptionDefault: 'O meuLinux é um projeto 100% gratuito e sem anúncios. Sua contribuição voluntária me ajuda a manter o site no ar e dedicar tempo a novas funcionalidades e melhorias!',
    options: [
      { 
        id: 'coffee', 
        label: 'Pagar um cafézinho', 
        emoji: '☕', 
        value: 'R$ 2,00',
        qrCode: '/assets/2.png',
        description: 'Um gesto simples que faz toda a diferença!' 
      },
      { 
        id: 'strong-coffee', 
        label: 'Pagar um café reforçado', 
        emoji: '☕☕', 
        value: 'R$ 5,00',
        qrCode: '/assets/5.png',
        description: 'Para manter o dev acordado e produtivo!' 
      },
      { 
        id: 'super-coffee', 
        label: 'Pagar um super café!', 
        emoji: '☕☕☕', 
        value: 'R$ 10,00',
        qrCode: '/assets/10.png',
        description: 'Você é um verdadeiro herói do open source!' 
      },
      { 
        id: 'support', 
        label: 'Contribuir com outro valor', 
        emoji: '❤️', 
        value: 'Valor livre',
        qrCode: '/assets/outro-valor.png',
        description: 'Ajude-nos a crescer e alcançar mais pessoas!' 
      }
    ],
    thanks: 'Muito obrigado pelo seu apoio!',
    pixLabel: 'Ou use a Chave PIX (E-mail):',
    pixKey: 'filipi.hadji.dsg@gmail.com',
    pixSubtext: 'Para manter o dev acordado e produtivo!',
    pixCopyTitle: 'Copiar chave PIX',
    scanText: (val: string) => `Escaneie o QR Code para doar ${val}`
  },
  'en': {
    titleDefault: 'Enjoying the project? Buy the dev a coffee! ☕',
    descriptionDefault: 'meuLinux is a community-maintained project dedicated to making Linux accessible for everyone. Your support helps cover server costs and keeps new features like the Learn Linux platform in development.',
    options: [
      { 
        id: 'coffee', 
        label: 'Buy a small coffee', 
        emoji: '☕', 
        value: '$1.00',
        qrCode: '/assets/2.png',
        description: 'A small gesture that makes a big difference!' 
      },
      { 
        id: 'strong-coffee', 
        label: 'Buy a strong coffee', 
        emoji: '☕☕', 
        value: '$2.00',
        qrCode: '/assets/5.png',
        description: 'Keeps the dev awake and productive!' 
      },
      { 
        id: 'super-coffee', 
        label: 'Buy a super coffee!', 
        emoji: '☕☕☕', 
        value: '$3.00',
        qrCode: '/assets/10.png',
        description: "You're a true open source hero!" 
      },
      { 
        id: 'support', 
        label: 'Contribute any amount', 
        emoji: '❤️', 
        value: 'Your choice',
        qrCode: '/assets/outro-valor.png',
        description: 'Help us grow and reach more people!' 
      }
    ],
    thanks: 'Thank you so much for your support!',
    pixLabel: '',
    pixKey: '',
    pixSubtext: '',
    pixCopyTitle: '',
    scanText: (val: string) => ''
  }
};

interface DonationSectionProps {
  titleLine1?: string;
  titleLine2?: string;
  description?: string;
}

export const DonationSection = ({ titleLine1, titleLine2, description }: DonationSectionProps) => {
  const { i18n } = useTranslation();
  const isEn = i18n.language?.toLowerCase().startsWith('en');
  const lang = isEn ? 'en' : 'pt-BR';
  const content = t[lang];
  const [selectedOption, setSelectedOption] = useState<typeof content.options[0] | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyPix = () => {
    navigator.clipboard.writeText(content.pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="support-section" className="py-16 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-6">
            <Coffee size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-dark">
            {titleLine1 && <span className="block mb-1">{titleLine1}</span>}
            {titleLine2 || content.titleDefault}
          </h2>
          <div className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {description ? (
              description
            ) : (
              <p>{content.descriptionDefault}</p>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {content.options.map((option) => {
            if (isEn) {
              return (
                <a
                  key={option.id}
                  href="https://ko-fi.com/meulinux"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 rounded-2xl border-2 border-gray-200 bg-white text-gray-700 hover:border-primary hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center gap-3 group text-center"
                >
                  <span className="text-3xl mb-1 group-hover:scale-110 transition-transform">{option.emoji}</span>
                  <div className="flex flex-col items-center flex-grow">
                    <span className="text-center font-bold leading-tight group-hover:text-primary transition-colors">{option.label}</span>
                    {option.value && <span className="text-primary font-bold text-lg mt-1">{option.value}</span>}
                  </div>
                  <p className="text-xs text-gray-400 italic text-center min-h-[32px] flex items-center justify-center">
                    {option.description}
                  </p>
                  <span className="mt-2 text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Support on Ko-fi &rarr;
                  </span>
                </a>
              );
            }

            return (
              <button
                key={option.id}
                onClick={() => setSelectedOption(option)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3 group hover:shadow-xl hover:-translate-y-1 ${
                  selectedOption?.id === option.id 
                    ? 'border-primary bg-primary/5 shadow-lg' 
                    : 'border-gray-200 bg-white text-gray-700 hover:border-primary'
                }`}
              >
                <span className="text-3xl mb-1 group-hover:scale-110 transition-transform">{option.emoji}</span>
                <div className="flex flex-col items-center">
                  <span className="text-center font-bold leading-tight group-hover:text-primary transition-colors">{option.label}</span>
                  {option.value && <span className="text-primary font-bold text-lg mt-1">{option.value}</span>}
                </div>
                <p className="text-xs text-gray-400 italic text-center">
                  {option.description}
                </p>
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {!isEn && selectedOption && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-12"
            >
              <div className="bg-white p-8 rounded-3xl border-2 border-primary/20 shadow-2xl max-w-md mx-auto">
                <h3 className="text-xl font-bold mb-2 text-dark">{content.thanks}</h3>
                <p className="text-gray-600 mb-6">{content.scanText(selectedOption.value)}</p>
                
                <div className="bg-gray-50 p-4 rounded-2xl mb-6 inline-block">
                  <img 
                    src={selectedOption.qrCode} 
                    alt="QR Code PIX" 
                    className="w-48 h-48 object-contain mx-auto"
                    referrerPolicy="no-referrer"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>

                <div className="space-y-4">
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">{content.pixLabel}</p>
                  <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-xl border border-gray-200">
                    <code className="flex-grow text-sm font-mono text-dark truncate">{content.pixKey}</code>
                    <button 
                      onClick={handleCopyPix}
                      className="p-2 bg-white text-primary rounded-lg hover:bg-primary hover:text-white transition-all shadow-sm"
                      title={content.pixCopyTitle}
                    >
                      {copied ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 italic">{content.pixSubtext}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-center gap-2 text-primary">
          <Heart size={20} className="fill-current" />
          <span className="font-bold">{content.thanks}</span>
        </div>
      </div>
    </section>
  );
};
