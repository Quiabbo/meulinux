import React from 'react';
import { motion } from 'motion/react';
import { SEO } from '../components/SEO';
import { AnimatedGrid } from '../components/AnimatedGrid';
import { useLanguage } from '../contexts/LanguageContext';
import { AudioReader } from '../components/AudioReader';

const translations = {
  'pt-BR': {
    title: "Política de Privacidade",
    lastUpdate: "Última atualização: Fevereiro de 2026",
    content: `
      1. Coleta de Informações
      O meuLinux não coleta informações de identificação pessoal de seus visitantes, a menos que você as forneça voluntariamente por meio de nossos formulários de contato.

      2. Cookies
      Usamos cookies para melhorar sua experiência de navegação e analisar o tráfego do site. Você pode optar por desativar os cookies nas configurações do seu navegador.

      3. Uso de Dados
      As informações enviadas por meio do formulário de contato são usadas exclusivamente para responder às suas solicitações ou processar suas sugestões de distribuição.

      4. Proteção de Dados
      Implementamos medidas de segurança para proteger suas informações. No entanto, nenhum método de transmissão pela Internet é 100% seguro.

      5. Serviços de Terceiros
      Podemos usar serviços de terceiros (como o Google Analytics) que coletam, monitoram e analisam dados de tráfego anonimamente para nos ajudar a melhorar o portal.

      6. Contato
      Se você tiver dúvidas sobre esta política, entre em contato conosco por meio de nossa página de contato.
    `
  }
};

export const Privacy = () => {
  const { lang } = useLanguage();
  const t = translations['pt-BR'];

  return (
    <div className="min-h-screen pt-20">
      <SEO 
        title={`${t.title} | meuLinux`}
        description="Read the privacy policy of the meuLinux portal."
        canonical="https://meulinux.com/privacy"
      />
      <section className="bg-dark text-white py-24 relative overflow-hidden">
        <AnimatedGrid />
        <div className="container-custom relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-bold mb-4"
          >
            {t.title}
          </motion.h1>
          <p className="text-white/60">{t.lastUpdate}</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom max-w-4xl">
          <AudioReader text={t.content} />
          <div className="prose prose-lg max-w-none">
            {t.content.split('\n').map((line, i) => {
              const trimmedLine = line.trim();
              if (/^\d+\./.test(trimmedLine)) {
                return <h2 key={i} className="text-2xl font-bold mt-8 mb-4">{trimmedLine}</h2>;
              }
              return <p key={i} className="mb-4 text-gray-700">{line}</p>;
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
