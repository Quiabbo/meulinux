import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Box, Settings, Terminal, CheckCircle2, Info, ArrowRight, Monitor, Cpu, HardDrive, User, Target, ChevronRight, RotateCcw, Shield, Layout, ShoppingBag, Volume2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AudioReader } from '../components/AudioReader';
import { DonationSection } from '../components/DonationSection';
import { useSEO } from '../hooks/useSEO';
import { AnimatedGrid } from '../components/AnimatedGrid';
import { POST_INSTALL_DATA } from '../data/postInstallData';
import { POST_INSTALL_TRANSLATIONS } from '../data/postInstallTranslations';

const translations = {
  'pt-BR': {
    hero_title: "Guia Pós-Instalação Personalizado",
    hero_subtitle: "Tudo o que você precisa fazer após instalar sua distro Linux",
    step1_q: "Qual distribuição você instalou?",
    label_select_distro: "Selecione sua distro",
    placeholder_select: "Selecione uma distro...",
    instruction_text: "Escolha a distribuição que você acabou de instalar para receber um guia passo a passo.",
    guide_title: "Guia Pós-Instalação para {distro}",
    button_generate: "Gerar Guia",
    button_reset: "Escolher outra distro",
    intro_greeting: "Olá! Ótima escolha! Agora que você instalou o {distro}, vamos dar os primeiros passos para deixá-lo pronto para uso e totalmente atualizado. Siga este guia para otimizar sua experiência.",
    section1_title: "1. Atualizando o Sistema (O Primeiro e Mais Importante Passo!)",
    section1_desc: "Manter seu sistema atualizado é crucial para segurança, estabilidade e acesso aos recursos mais recentes. Os comandos para isso variam um pouco dependendo da \"família\" da sua distro. Veja como fazer no {distro}:",
    section2_title: "2. Instalando Drivers Adicionais (Placa de Vídeo, Wi-Fi, etc.)",
    section2_desc: "Alguns componentes do seu computador podem precisar de drivers proprietários para funcionar perfeitamente, especialmente placas de vídeo NVIDIA/AMD ou adaptadores Wi-Fi. Veja como verificar e instalar:",
    section3_title: "3. Instalando Codecs Multimídia Essenciais",
    section3_desc: "Para reproduzir vídeos e músicas em diversos formatos (MP3, MP4, etc.), você pode precisar de codecs adicionais. Veja como instalá-los:",
    section4_title: "4. Instalando Softwares Essenciais (Navegador, Suíte Office, etc.)",
    section4_desc: "Agora que o básico está configurado, vamos instalar some programas que você provavelmente usará diariamente:",
    section5_title: "5. Personalizando seu Ambiente (Onde a Mágica Acontece!)",
    section5_desc: "Uma das melhores partes do Linux é a liberdade de personalização. Você pode alterar a aparência, ícones, temas e muito mais para deixar o sistema com a sua cara. Explore as configurações do seu ambiente de desktop:",
    section6_title: "6. Explorando a Loja de Aplicativos",
    section6_desc: "Se a sua distro tiver uma loja de aplicativos gráfica, ela é uma forma fácil e segura de encontrar e instalar novos programas sem usar o terminal. Dê uma olhada!",
    label_browser: "Navegador Web (ex: Google Chrome, Brave):",
    label_office: "Suíte Office (ex: LibreOffice, OnlyOffice):",
    label_others: "Outros programas úteis (ex: VLC, GIMP, Spotify):",
    donation_title1: "Te ajudei?",
    donation_title2: "Que tal um café para o dev? ☕"
  },
  'en': {
    hero_title: "Personalized Post-Installation Guide",
    hero_subtitle: "Everything you need to do immediately after installing your Linux distro",
    step1_q: "Which distribution did you install?",
    label_select_distro: "Select your distro",
    placeholder_select: "Select a distro...",
    instruction_text: "Choose the distribution you just installed to receive a customized step-by-step guide.",
    guide_title: "Post-Installation Guide for {distro}",
    button_generate: "Generate Guide",
    button_reset: "Choose another distro",
    intro_greeting: "Hello! Excellent choice! Now that you have installed {distro}, let's take the first steps to make it ready for use and fully updated. Follow this guide to optimize your computing experience.",
    section1_title: "1. Updating the System (The First and Most Vital Step!)",
    section1_desc: "Keeping your system updated is crucial for security, stability, and access to the latest packages. The commands vary slightly depending on your distro's \"family\". Here's how to do it in {distro}:",
    section2_title: "2. Installing Additional Drivers (Graphics Card, Wi-Fi, etc.)",
    section2_desc: "Some components of your computer might need proprietary driver packages to run with peak performance, especially NVIDIA/AMD graphics cards or high-speed Wi-Fi adapters. Here's how to verify and install them:",
    section3_title: "3. Installing Essential Multimedia Codecs",
    section3_desc: "To play videos and music in various proprietary formats (MP3, MP4, etc.), you may need additional media codecs. Here's how to install them:",
    section4_title: "4. Installing Essential Software (Web Browser, Office Suite, etc.)",
    section4_desc: "Now that the essentials are up, let's install standard software that you likely use on a daily basis:",
    section5_title: "5. Customizing Your Workspace (Where the Magic Happens!)",
    section5_desc: "One of the best features of Linux is its absolute modular freedom. You can easily alter themes, icons, cursors, and layouts to look exactly how you want. Explore your desktop environment settings:",
    section6_title: "6. Exploring the App Store / Software Center",
    section6_desc: "If your distro includes a graphical app store, it is a safe, painless, and highly convenient way to search and install new applications without needing the command line. Take a look!",
    label_browser: "Web Browser (e.g., Google Chrome, Brave):",
    label_office: "Office Suite (e.g., LibreOffice, OnlyOffice):",
    label_others: "Other useful programs (e.g., VLC, GIMP, Spotify):",
    donation_title1: "Did this help you?",
    donation_title2: "How about buying a coffee for the developer? ☕"
  }
};

const enDistroGuides: Record<string, any> = {
  "Ubuntu": {
    "explicacao_atualizacao": "This command updates package structures and upgrades everything safely. Ubuntu is the entry door for many users.",
    "drivers_adicionais": "Go to 'Software & Updates' > 'Additional Drivers'. Ubuntu simplifies installing NVIDIA and other proprietary driver bundles.",
    "explicacao_codecs": "Installs codecs for MP3, MP4, and standard Microsoft TrueType system font bundles.",
    "software_essencial": {
      "navegador": "Firefox (default). For Google Chrome: download the official .deb package.",
      "office": "LibreOffice (pre-installed). OnlyOffice is an excellent alternative.",
      "outros": "VLC, GIMP, Spotify (via Ubuntu Software Snap or APT)."
    },
    "personalizacao": "Uses GNOME desktop. Customize easily using Gnome Tweak Tool & GNOME Shell Extensions.",
    "loja_aplicativos": "Ubuntu Software Center (powered by Snap & APT)."
  },
  "Debian": {
    "explicacao_atualizacao": "Debian focuses on extreme server/client stability. This updates your stable-version repositories securely.",
    "drivers_adicionais": "Ensure 'non-free' and 'contrib' tags are enabled inside /etc/apt/sources.list to query binary firmware.",
    "explicacao_codecs": "Installs libavcodec-extra for complete audio and video decoder coverage.",
    "software_essencial": {
      "navegador": "Firefox ESR (Extended Support Release / default).",
      "office": "LibreOffice.",
      "outros": "VLC, GIMP (available natively inside package managers)."
    },
    "personalizacao": "Depends entirely on your chosen desktop (KDE, GNOME, XFCE). Configure themes inside system panels.",
    "loja_aplicativos": "GNOME Software or classic Synaptic Package Manager."
  },
  "Linux Mint": {
    "explicacao_atualizacao": "Mint offers an elegant update manager applet, but typing this command in terminal is always fastest.",
    "drivers_adicionais": "Launch 'Driver Manager'. It handles proprietary Wi-Fi and Nvidia graphic blobs flawlessly.",
    "explicacao_codecs": "Installs comprehensive codecs enabling MP4, flash, video playback, and standard decryption.",
    "software_essencial": {
      "navegador": "Firefox (default). Brave or Vivaldi are easily downloadable.",
      "office": "LibreOffice (packaged built-in).",
      "outros": "VLC Media Player, GIMP Image Editor, Spotify Music client."
    },
    "personalizacao": "Cinnamon is default. Adjust desklets, system panels, themes, and desklet widgets under settings.",
    "loja_aplicativos": "Linux Mint Software Manager."
  },
  "Fedora": {
    "explicacao_atualizacao": "Fedora prioritizes cutting-edge technologies. This syncs repositories and updates packages.",
    "drivers_adicionais": "Enable 'RPM Fusion' repositories in Software settings to easily get NVIDIA and multimedia files.",
    "explicacao_codecs": "Configures and downloads complete multimedia support codes from your RPM repositories.",
    "software_essencial": {
      "navegador": "Firefox Web Browser (default).",
      "office": "LibreOffice desktop suite.",
      "outros": "VLC, GIMP, Inkscape graphics tools."
    },
    "personalizacao": "Vanilla GNOME. Use GNOME Tweaks along with official extensions.",
    "loja_aplicativos": "GNOME Software (integrates Flatpak seamlessly)."
  },
  "Kali Linux": {
    "explicacao_atualizacao": "Kali uses rolling repositories; full-upgrade is essential to resolve dependencies correctly.",
    "drivers_adicionais": "Wi-Fi firmware and GPU kernels are vital if you plan to do automated security penetration testing.",
    "explicacao_codecs": "Installs additional decoders for security recording playback of proof-of-concept videos.",
    "software_essencial": {
      "navegador": "Firefox Developer Edition / ESR (default).",
      "office": "Not included out-of-the-box, but obtainable via APT if needed.",
      "outros": "Burp Suite, Nmap network scanner, Metasploit payload console."
    },
    "personalizacao": "Default XFCE. Highly lightweight, dark, and modular.",
    "loja_aplicativos": "Terminal commands (using APT packager natively)."
  },
  "Arch Linux": {
    "explicacao_atualizacao": "Synchronizes lists and upgrades your rolling release snapshot.",
    "drivers_adicionais": "Install specific driver packagers named `nvidia` or `mesa` / `vulkan-intel` matching your processor.",
    "explicacao_codecs": "GStreamer decoders and plugins enabling unified sound/video rendering.",
    "software_essencial": {
      "navegador": "Firefox or Chromium.",
      "office": "LibreOffice or OnlyOffice suite.",
      "outros": "Leverage AUR (Arch User Repository) utilizing helpers like `yay` or `paru`."
    },
    "personalizacao": "Entirely client choice! Configure KDE Plasma, GNOME, XFCE, or Tiling Window Managers like i3/hyprland.",
    "loja_aplicativos": "Pacman on terminal or Pamac graphical helper."
  },
  "Zorin OS": {
    "explicacao_atualizacao": "Keeps your stable Zorin kernel and components safe and secure.",
    "drivers_adicionais": "Launch Zorin Settings > Additional Drivers to pull proprietary graphics and wireless modules.",
    "explicacao_codecs": "Installs restricted multimedia packs designed to work stably inside Zorin system layers.",
    "software_essencial": {
      "navegador": "Firefox Web Browser (default).",
      "office": "LibreOffice suite.",
      "outros": "VLC Player, GIMP Image Creator, Spotify desktop."
    },
    "personalizacao": "Use Zorin Appearance to immediately morph layouts to resemble Windows, macOS, or classic layout.",
    "loja_aplicativos": "Zorin Software Store (pre-configured with Flathub)."
  },
  "Pop!_OS": {
    "explicacao_atualizacao": "Recommended full-upgrade ensures all Pop shell layers match system upgrades perfectly.",
    "drivers_adicionais": "If you downloaded the Nvidia-specific installer, driver kernels are pre-compiled and active!",
    "explicacao_codecs": "Installs standard restricted-extras providing MP4 and decryption codes.",
    "software_essencial": {
      "navegador": "Firefox (default). Chrome and Brave are single-click installs.",
      "office": "LibreOffice.",
      "outros": "VLC, GIMP, VS Code codes."
    },
    "personalizacao": "COSMIC Desktop. Check out Keyboard-Driven auto-tiling buttons!",
    "loja_aplicativos": "Pop!_Shop (integrates flatpaks immediately)."
  }
};

export const PostInstall = () => {
  const { i18n } = useTranslation();
  useSEO('postinstall');

  const langKey = i18n.language?.toLowerCase().startsWith('en') ? 'en' : 'pt-BR';
  const t = translations[langKey];
  const [selectedDistroName, setSelectedDistroName] = useState('');
  const [showGuide, setShowGuide] = useState(false);

  // Get data
  const currentPostInstallData = POST_INSTALL_TRANSLATIONS['pt-BR'] || POST_INSTALL_DATA;
  const rawDistro = currentPostInstallData.find(d => d.nome === selectedDistroName) || POST_INSTALL_DATA.find(d => d.nome === selectedDistroName);

  // Map to English if active
  const selectedDistro = React.useMemo(() => {
    if (!rawDistro) return null;
    if (langKey === 'en') {
      const enGuide = enDistroGuides[rawDistro.nome];
      if (enGuide) {
        return {
          ...rawDistro,
          explicacao_atualizacao: enGuide.explicacao_atualizacao,
          drivers_adicionais: enGuide.drivers_adicionais,
          explicacao_codecs: enGuide.explicacao_codecs,
          software_essencial: enGuide.software_essencial,
          personalizacao: enGuide.personalizacao,
          loja_aplicativos: enGuide.loja_aplicativos
        };
      }
    }
    return rawDistro;
  }, [rawDistro, langKey]);

  const famousDistros = [
    "Ubuntu", "Debian", "Linux Mint", "Fedora", "Kali Linux", "Arch Linux", "Zorin OS", "Pop!_OS"
  ];

  const handleReset = () => {
    setSelectedDistroName('');
    setShowGuide(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderSelection = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-dark">{t.step1_q}</h2>
        <p className="text-gray-500">{t.instruction_text}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">{t.label_select_distro}</label>
          <select 
            className="w-full bg-white border-2 border-gray-100 rounded-[6px] px-6 py-4 focus:outline-none focus:border-primary transition-all text-lg font-medium text-dark"
            value={selectedDistroName}
            onChange={(e) => setSelectedDistroName(e.target.value)}
          >
            <option value="">{t.placeholder_select}</option>
            {[...POST_INSTALL_DATA].sort((a, b) => a.nome.localeCompare(b.nome)).map(d => (
              <option key={d.nome} value={d.nome}>{d.nome}</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-end">
          <button 
            disabled={!selectedDistroName}
            onClick={() => setShowGuide(true)}
            className="w-full bg-primary text-white py-4 rounded-[6px] font-bold text-lg hover:bg-primary/90 disabled:opacity-50 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            {t.button_generate} <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="pt-8 border-t border-gray-100">
        <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">Distros mais populares</p>
        <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
          {famousDistros.map(name => (
            <button
              key={name}
              onClick={() => {
                setSelectedDistroName(name);
                setShowGuide(true);
              }}
              className={`px-5 py-2.5 rounded-[6px] text-sm font-semibold transition-all border cursor-pointer ${
                selectedDistroName === name
                  ? 'bg-primary text-white border-primary shadow-md'
                  : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const renderGuide = () => {
    if (!selectedDistro) return null;

    const summaryTextForAudio = `
      ${t.guide_title.replace('{distro}', selectedDistro.nome)}.
      ${t.intro_greeting.replace('{distro}', selectedDistro.nome)}.
      ${t.section1_title}. ${selectedDistro.comandos_atualizacao}. ${selectedDistro.explicacao_atualizacao}.
    `;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        {/* Guide Header */}
        <div className="bg-[#1A1A1A] text-white p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-2xl border border-white/5">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-9xl font-display font-black pointer-events-none select-none">
            {selectedDistro.gerenciador_pacotes}
          </div>
          <div className="relative z-10 space-y-6">
            <button 
              onClick={handleReset}
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-all text-sm font-bold cursor-pointer"
            >
              <RotateCcw size={16} /> {t.button_reset}
            </button>
            <div className="space-y-2">
              <h2 className="text-3xl md:text-5xl font-display font-bold">
                {t.guide_title.replace('{distro}', selectedDistro.nome)}
              </h2>
              <p className="text-white/60 text-lg md:text-xl">
                {t.intro_greeting.replace('{distro}', selectedDistro.nome)}
              </p>
            </div>

            {/* Micro Audio Reader */}
            <div className="pt-4 border-t border-white/5 flex flex-wrap gap-4 items-center">
              <AudioReader text={summaryTextForAudio} />
              <div className="flex gap-4 text-xs font-mono text-white/40">
                <span>BASE: {selectedDistro.base}</span>
                <span>•</span>
                <span>MANAGER: {selectedDistro.gerenciador_pacotes}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 gap-8">
          {/* Step 1: Update */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                <RefreshCw size={24} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-display font-bold text-dark">{t.section1_title}</h3>
                <p className="text-gray-600 leading-relaxed">{t.section1_desc.replace('{distro}', selectedDistro.nome)}</p>
              </div>
            </div>
            
            <div className="bg-dark text-white rounded-xl p-6 font-mono relative overflow-hidden group">
              <div className="absolute top-3 right-3 text-white/20 text-xs font-mono select-none">TERMINAL</div>
              <code className="text-primary text-sm md:text-base break-all flex items-center gap-2">
                <span className="text-white/40 shrink-0">$</span> {selectedDistro.comandos_atualizacao}
              </code>
            </div>

            <div className="bg-blue-50/50 p-6 rounded-2xl flex items-start gap-3 border border-blue-100/50">
              <Info size={18} className="text-blue-500 shrink-0 mt-0.5" />
              <p className="text-sm text-blue-700 leading-relaxed">{selectedDistro.explicacao_atualizacao}</p>
            </div>
          </div>

          {/* Step 2: Drivers */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                <Cpu size={24} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-display font-bold text-dark">{t.section2_title}</h3>
                <p className="text-gray-600 leading-relaxed">{t.section2_desc}</p>
              </div>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-gray-700 leading-relaxed flex items-start gap-3">
                <CheckCircle2 size={18} className="text-primary shrink-0 mt-1" />
                {selectedDistro.drivers_adicionais}
              </p>
            </div>
          </div>

          {/* Step 3: Codecs */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                <Volume2 size={24} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-display font-bold text-dark">{t.section3_title}</h3>
                <p className="text-gray-600 leading-relaxed">{t.section3_desc}</p>
              </div>
            </div>

            {selectedDistro.codecs_multimidia && (
              <div className="bg-dark text-white rounded-xl p-6 font-mono relative overflow-hidden group">
                <code className="text-primary text-sm md:text-base break-all flex items-center gap-2">
                  <span className="text-white/40 shrink-0">$</span> {selectedDistro.codecs_multimidia}
                </code>
              </div>
            )}

            <div className="p-6 bg-[#00FF88]/5 rounded-2xl border border-[#00FF88]/20">
              <p className="text-gray-700 leading-relaxed flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[#00CC66] shrink-0 mt-1" />
                {selectedDistro.explicacao_codecs}
              </p>
            </div>
          </div>

          {/* Step 4: Software Essencial */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                <Box size={24} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-display font-bold text-dark">{t.section4_title}</h3>
                <p className="text-gray-600 leading-relaxed">{t.section4_desc}</p>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              <div className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
                <span className="font-bold text-dark min-w-[300px]">{t.label_browser}</span>
                <span className="text-gray-600">{selectedDistro.software_essencial.navegador}</span>
              </div>
              <div className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
                <span className="font-bold text-dark min-w-[300px]">{t.label_office}</span>
                <span className="text-gray-600">{selectedDistro.software_essencial.office}</span>
              </div>
              <div className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
                <span className="font-bold text-dark min-w-[300px]">{t.label_others}</span>
                <span className="text-gray-600">{selectedDistro.software_essencial.outros}</span>
              </div>
            </div>
          </div>

          {/* Step 5: Customization */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                <Layout size={24} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-display font-bold text-dark">{t.section5_title}</h3>
                <p className="text-gray-600 leading-relaxed">{t.section5_desc}</p>
              </div>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-gray-700 leading-relaxed flex items-start gap-3">
                <CheckCircle2 size={18} className="text-primary shrink-0 mt-1" />
                {selectedDistro.personalizacao}
              </p>
            </div>
          </div>

          {/* Step 6: App Store */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                <ShoppingBag size={24} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-display font-bold text-dark">{t.section6_title}</h3>
                <p className="text-gray-600 leading-relaxed">{t.section6_desc}</p>
              </div>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-gray-700 leading-relaxed flex items-start gap-3">
                <CheckCircle2 size={18} className="text-primary shrink-0 mt-1" />
                {selectedDistro.loja_aplicativos}
              </p>
            </div>
          </div>
        </div>

        {/* Action buttons footer */}
        <div className="flex justify-center pt-8">
          <button 
            onClick={handleReset}
            className="bg-primary hover:bg-primary/95 text-white px-8 py-4 rounded-[6px] font-bold text-xl inline-flex items-center gap-2 transition-all transform hover:scale-105 shadow-xl cursor-pointer"
          >
            <RotateCcw size={20} /> {t.button_reset}
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="bg-dark text-white py-24 relative overflow-hidden">
        <AnimatedGrid />
        <div className="container-custom relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-[34px] font-display font-bold mb-2 text-primary leading-tight"
            id="postinstall-hero-title"
          >
            {t.hero_title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-white/80"
          >
            {t.hero_subtitle}
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-[#FAF9F6]">
        <div className="container-custom">
          <AnimatePresence mode="wait">
            {!showGuide ? renderSelection() : renderGuide()}
          </AnimatePresence>
        </div>
      </section>

      <DonationSection titleLine1={t.donation_title1} titleLine2={t.donation_title2} />
    </div>
  );
};
