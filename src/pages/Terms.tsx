import React from 'react';
import { motion } from 'motion/react';
import { SEO } from '../components/SEO';
import { AnimatedGrid } from '../components/AnimatedGrid';
import { useLanguage } from '../contexts/LanguageContext';
import { AudioReader } from '../components/AudioReader';

const translations = {
  'pt-BR': {
    title: "Termos de Uso",
    lastUpdate: "Última atualização: Fevereiro de 2026",
    content: `
      1. Aceitação dos Termos
      Ao acessar e usar o portal meuLinux, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso. Se você não concordar com qualquer parte destes termos, não deverá usar nosso site.

      2. Uso do Site
      O meuLinux é um portal de informações sobre distribuições Linux. O conteúdo é fornecido para fins informativos e educacionais. Você concorda em usar o site apenas para fins lícitos.

      3. Propriedade Intelectual
      Todo o conteúdo original no meuLinux (texto, design, logotipos) é de propriedade de Filipi Hadji, a menos que indicado de outra forma. A marca registrada Linux® é usada de acordo com uma sublicença da Linux Foundation.

      4. Links de Terceiros
      Nosso site contém links para sites externos (como sites oficiais de distribuições). Não temos controle sobre o conteúdo ou as práticas desses sites e não assumimos nenhuma responsabilidade por eles.

      5. Isenção de Responsabilidade
      Embora nos esforcemos para manter as informações precisas e atualizadas, o meuLinux não oferece garantias de qualquer tipo sobre a integridade, precisão ou confiabilidade das informações contidas no site.

      6. Alterações nos Termos
      Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação no site.
    `
  }
};

export const Terms = () => {
  const { lang } = useLanguage();
  const t = translations['pt-BR'];

  return (
    <div className="min-h-screen pt-20">
      <SEO 
        title={`${t.title} | meuLinux`}
        description="Read the terms of use of the meuLinux portal."
        canonical="https://meulinux.com/terms"
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
