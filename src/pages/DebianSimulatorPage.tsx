import React from 'react';
import { DebianSimulator } from '../components/DebianSimulator';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { SimulatorTranslator } from '../components/SimulatorTranslator';
import { useTranslation } from 'react-i18next';

export const DebianSimulatorPage: React.FC = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language?.toLowerCase().startsWith('en');

  const handleClose = () => {
    try {
      window.close();
    } catch (e) {
      console.log(e);
    }
    navigate(isEn ? '/en/debian-linux' : '/pt-br/debian-linux');
  };

  return (
    <div className="fixed inset-0 w-screen h-screen z-[9999] bg-[#1a1a1a]">
      <SEO 
        title={isEn ? "My Linux - Try Debian 13 online" : "Meu Linux - Experimente o Debian 13 online"}
        description={isEn
          ? "Try Debian GNU/Linux 13 непосредственно in your browser! Test the GNOME interface, use the terminal, open apps and answer your questions with our high fidelity interactive simulator before downloading."
          : "Experimente o Debian GNU/Linux 13 diretamente no seu navegador! Teste a interface GNOME, use o terminal, abra aplicativos e tire suas dúvidas sobre o Sistema Operacional Universal com o nosso simulador interativo de alta fidelidade antes de baixar."
        }
        canonical={isEn ? "https://meulinux.com/en/simulator/debian" : "https://meulinux.com/simulador/debian"}
      />
      <SimulatorTranslator>
        <DebianSimulator onClose={handleClose} />
      </SimulatorTranslator>
    </div>
  );
};
