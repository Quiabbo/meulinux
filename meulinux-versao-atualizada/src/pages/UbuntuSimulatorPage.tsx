import React from 'react';
import { UbuntuSimulator } from '../components/UbuntuSimulator';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { SimulatorTranslator } from '../components/SimulatorTranslator';
import { useTranslation } from 'react-i18next';

export const UbuntuSimulatorPage: React.FC = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language?.toLowerCase().startsWith('en');

  const handleClose = () => {
    try {
      window.close();
    } catch (e) {
      console.log(e);
    }
    navigate(isEn ? '/en/ubuntu-linux' : '/pt-br/ubuntu-linux');
  };

  return (
    <div className="fixed inset-0 w-screen h-screen z-[9999] bg-[#1a1a1a]">
      <SEO 
        title={isEn ? "My Linux - Try Ubuntu online" : "Meu Linux - Experimente o Ubuntu online"}
        description={isEn
          ? "Try Ubuntu Linux directly in your browser! Test the GNOME interface, use the terminal, open apps and answer your questions with our high fidelity interactive simulator before downloading."
          : "Experimente o Ubuntu Linux diretamente no seu navegador! Teste a interface GNOME, use o terminal, abra aplicativos e tire suas dúvidas sobre uma das distribuições mais famosas do mundo com o nosso simulador interativo de alta fidelidade antes de baixar."
        }
        canonical={isEn ? "https://meulinux.com/en/simulator/ubuntu" : "https://meulinux.com/simulador/ubuntu"}
      />
      <SimulatorTranslator>
        <UbuntuSimulator onClose={handleClose} />
      </SimulatorTranslator>
    </div>
  );
};
