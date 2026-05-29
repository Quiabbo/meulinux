import React from 'react';
import { ChromeOSSimulator } from '../components/ChromeOSSimulator';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { SimulatorTranslator } from '../components/SimulatorTranslator';
import { useTranslation } from 'react-i18next';

export const ChromeOSSimulatorPage: React.FC = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language?.toLowerCase().startsWith('en');

  const handleClose = () => {
    try {
      window.close();
    } catch (e) {
      console.log(e);
    }
    navigate(isEn ? '/en/chrome-os-flex' : '/pt-br/chrome-os-flex');
  };

  return (
    <div className="fixed inset-0 w-screen h-screen z-[9999] bg-[#121318]">
      <SEO 
        title={isEn ? "My Linux - Try Chrome OS Flex online" : "Meu Linux - Experimente o Chrome OS Flex online"}
        description={isEn 
          ? "Try Chrome OS Flex directly inside your web browser! Test the quick settings menu, apps, and check out Google's cloud-first ecosystem."
          : "Experimente o simulador oficial do Chrome OS Flex para Chromebooks diretamente no seu navegador! Teste o menu iniciar, pesquise por aplicativos de produtividade e experimente as ferramentas do ecossistema Google."
        }
        canonical={isEn ? "https://meulinux.com/en/simulator/chromeos" : "https://meulinux.com/simulador/chromeos"}
      />
      <SimulatorTranslator>
        <ChromeOSSimulator onClose={handleClose} />
      </SimulatorTranslator>
    </div>
  );
};
