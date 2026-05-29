import React from 'react';
import { MintSimulator } from '../components/MintSimulator';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { SimulatorTranslator } from '../components/SimulatorTranslator';
import { useTranslation } from 'react-i18next';

export const MintSimulatorPage: React.FC = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language?.toLowerCase().startsWith('en');

  const handleClose = () => {
    try {
      window.close();
    } catch (e) {
      console.log(e);
    }
    navigate(isEn ? '/en/linux-mint' : '/pt-br/linux-mint');
  };

  return (
    <div className="fixed inset-0 w-screen h-screen z-[9999] bg-[#1a1a1a]">
      <SEO 
        title={isEn ? "My Linux - Try Linux Mint online" : "Meu Linux - Experimente o Linux Mint online"}
        description={isEn 
          ? "Experience Linux Mint Cinnamon directly in your browser with high fidelity! Simulate the start menu, test system configuration and use the interactive terminal."
          : "Experimente o Linux Mint Cinnamon direto no seu navegador com extrema fidelidade! Simule o menu iniciar, teste as configurações do sistema e experimente o terminal interativo para tirar dúvidas antes de fazer o download."
        }
        canonical={isEn ? "https://meulinux.com/en/simulator/mint" : "https://meulinux.com/simulador/mint"}
      />
      <SimulatorTranslator>
        <MintSimulator onClose={handleClose} />
      </SimulatorTranslator>
    </div>
  );
};
