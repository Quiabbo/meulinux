import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Download, Globe, Cpu, Box, HardDrive, Info, ArrowRight, Database, X, Volume2, MonitorPlay } from 'lucide-react';
import { AudioReader } from '../components/AudioReader';
import { UbuntuSimulator } from '../components/UbuntuSimulator';
import { useDistros } from '../hooks/useDistros';
import { useLanguage } from '../contexts/LanguageContext';
import { AnimatedGrid } from '../components/AnimatedGrid';
import { SEO } from '../components/SEO';
import { DISTRO_TRANSLATIONS } from '../data/distroTranslations';

const translations = {
  'pt-BR': {
    notFound: "Conteúdo não disponível",
    backHome: "Ir para a Página Inicial",
    about: "Sobre o",
    desktopEnvironments: "Ambientes de desktop disponíveis:",
    mainFeatures: "Principais recursos:",
    packageManager: "Gerenciador de pacotes:",
    preInstalledSoftware: "Software pré-instalado:",
    hardwareCompatibility: "Compatibilidade de hardware:",
    communitySupport: "Comunidade e suporte:",
    comparison: "Comparação com outras distribuições:",
    flavors: "Conheça também os sabores do",
    quickInfo: "Informações Rápidas",
    basedOn: "Baseado em",
    country: "País",
    architecture: "Arquitetura",
    isoFile: "Arquivo ISO",
    downloadOfficial: "Baixar no site oficial",
    testDistro: "Testar distro",
    testInBrowserTitle: "Teste Direto no Navegador!",
    testInBrowserDesc: "Escolha o nosso simulador interativo de alta fidelidade para experimentar a interface, testar programas e tirar todas as suas dúvidas antes de baixar o sistema."
  },
  'en': {
    notFound: "Content not available",
    backHome: "Go to Home Page",
    about: "About",
    desktopEnvironments: "Available desktop environments:",
    mainFeatures: "Key features:",
    packageManager: "Package manager:",
    preInstalledSoftware: "Pre-installed software:",
    hardwareCompatibility: "Hardware compatibility:",
    communitySupport: "Community and support:",
    comparison: "Comparison with other distributions:",
    flavors: "Also discover the flavors of",
    quickInfo: "Quick Information",
    basedOn: "Based on",
    country: "Country",
    architecture: "Architecture",
    isoFile: "ISO File",
    downloadOfficial: "Download on official site",
    testDistro: "Test distro",
    testInBrowserTitle: "Test Directly in your Browser!",
    testInBrowserDesc: "Choose our high-fidelity interactive simulator to experience the interface, test programs, and clear all your doubts before downloading the system."
  }
};

// Reuse the same distro translations mapping
export const DistroDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const routeLang = lang === 'en' ? 'en' : 'pt-br';
  const simulatorSub = lang === 'en' ? 'simulator' : 'simulador';
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const [showEmulator, setShowEmulator] = React.useState(false);
  const [showWebSimulator, setShowWebSimulator] = React.useState(false);
  const emulatorRef = React.useRef<HTMLDivElement>(null);
  const t = translations[lang === 'en' ? 'en' : 'pt-BR'];
  const DISTROS = useDistros();
  const distro = DISTROS.find(d => d.id === id);

  React.useEffect(() => {
    if (!distro) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [distro, navigate]);

  if (!distro) {
    return (
      <div className="min-h-screen pt-40 flex flex-col items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center space-y-6"
        >
          <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Info size={40} className="text-primary" />
          </div>
          <h1 className="text-4xl font-display font-bold text-dark">{t.notFound}</h1>
          <p className="text-gray-600">
            Este conteúdo nao esta mais disponivel neste link, busque novamente navegando pelo site. Você será redirecionado para a página inicial em instantes.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-[6px] font-bold hover:bg-primary/90 transition-all shadow-lg"
          >
            {t.backHome} <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    );
  }

  const getTranslatedDistro = (d: typeof DISTROS[0]) => {
    const trans = DISTRO_TRANSLATIONS[lang]?.[d.id] || DISTRO_TRANSLATIONS['pt-BR']?.[d.id];
    if (!trans) return d;
    return {
      ...d,
      subtitle: trans.subtitle || d.subtitle,
      description: trans.description || d.description,
      desktopEnvironments: trans.desktopEnvironments || d.desktopEnvironments,
      mainFeatures: trans.mainFeatures || d.mainFeatures,
      packageManager: trans.packageManager || d.packageManager,
      preInstalledSoftware: trans.preInstalledSoftware || d.preInstalledSoftware,
      hardwareCompatibility: trans.hardwareCompatibility || d.hardwareCompatibility,
      communitySupport: trans.communitySupport || d.communitySupport,
      comparison: trans.comparison || d.comparison,
    };
  };

  const translatedDistro = getTranslatedDistro(distro);

  // SEO Logic
  let seoTitle = `${distro.name} - Meu Linux`;
  let seoDescription = translatedDistro.description.substring(0, 160);

  if (lang === 'pt-BR') {
    if (distro.id === 'ubuntu-linux') {
      seoTitle = "Ubuntu - Uma poderosa distro para usuários iniciantes e intermediários";
      seoDescription = "O Ubuntu é uma das distribuições Linux mais populares e amplamente utilizadas. Desenvolvido pela Canonical, oferece uma experiência intuitiva e amigável.";
    } else if (distro.id === 'kali-linux') {
      seoTitle = "Kali Linux: Guia Definitivo de Segurança e Pentest (2026)";
      seoDescription = "Kali Linux explicado em profundidade. História, filosofia, ferramentas, pentest, segurança, requisitos e uso profissional atualizados para 2026.";
    } else if (distro.id === 'arch-linux') {
      seoTitle = "Arch Linux: Guia Definitivo 2026 — Rolling Release, Pacman, AUR e Controle Total";
      seoDescription = "Arch Linux explicado em profundidade. Filosofia KISS, rolling release, pacman, AUR, requisitos, vantagens e desafios atualizados para 2026.";
    } else if (distro.id === 'debian-linux') {
      seoTitle = "Debian Linux: Guia Definitivo 2026 — Estabilidade, Servidores e Base do Ecossistema";
      seoDescription = "Debian Linux explicado em profundidade. História, filosofia, estabilidade, versões, servidores, requisitos e comparações atualizadas para 2026.";
    } else if (distro.id === 'fedora-linux') {
      seoTitle = "Fedora Linux: Guia Definitivo 2026 — Inovação, Desktop e Servidores";
      seoDescription = "Fedora Linux explicado em profundidade. Filosofia, inovação, desktop, servidores, Red Hat e requisitos atualizados para 2026.";
    } else if (distro.id === 'linux-mint') {
      seoTitle = "Linux Mint: Guia Definitivo 2026 — Simplicidade e Desktop Clássico";
      seoDescription = "Linux Mint explicado em profundidade. História, filosofia, desktop Cinnamon, requisitos e comparações atualizadas para 2026.";
    }
  } else if (lang === 'en') {
    if (distro.id === 'ubuntu-linux') {
      seoTitle = "Ubuntu - A powerful distro for beginners and intermediate users";
      seoDescription = "Ubuntu is one of the most popular and widely used Linux distributions. Developed by Canonical, it offers an intuitive and friendly experience.";
    } else if (distro.id === 'kali-linux') {
      seoTitle = "Kali Linux: Ultimate Guide to Security and Pentesting (2026)";
      seoDescription = "Kali Linux explained in depth. History, philosophy, tools, pentesting, security, requirements, and professional usage updated for 2026.";
    } else if (distro.id === 'arch-linux') {
      seoTitle = "Arch Linux: Ultimate Guide 2026 — Rolling Release, Pacman, AUR, and Total Control";
      seoDescription = "Arch Linux explained in depth. KISS philosophy, rolling release, pacman, AUR, requirements, advantages, and challenges updated for 2026.";
    } else if (distro.id === 'debian-linux') {
      seoTitle = "Debian Linux: Ultimate Guide 2026 — Stability, Servers, and Ecosystem Foundation";
      seoDescription = "Debian Linux explained in depth. History, philosophy, stability, versions, servers, requirements, and comparisons updated for 2026.";
    } else if (distro.id === 'fedora-linux') {
      seoTitle = "Fedora Linux: Ultimate Guide 2026 — Innovation, Desktop, and Servers";
      seoDescription = "Fedora Linux explained in depth. Philosophy, innovation, desktop, servers, Red Hat, and requirements updated for 2026.";
    } else if (distro.id === 'linux-mint') {
      seoTitle = "Linux Mint: Ultimate Guide 2026 — Simplicity and Classic Desktop";
      seoDescription = "Linux Mint explained in depth. History, philosophy, Cinnamon desktop, requirements, and comparisons updated for 2026.";
    }
  }

  return (
    <div className="min-h-screen pt-20">
      <SEO 
        title={seoTitle}
        description={seoDescription}
        canonical={`https://meulinux.com/${distro.id}`}
        ogImage={distro.logo}
        schemaData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": distro.name,
          "operatingSystem": "Linux",
          "applicationCategory": "OperatingSystem",
          "description": translatedDistro.description,
          "image": distro.logo,
          "url": `https://meulinux.com/${distro.id}`,
          "softwareVersion": "2026",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        }}
      />
      {/* Hero */}
      <section className="bg-dark text-white py-24 relative overflow-hidden">
        <AnimatedGrid />
        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="h-32 w-32 bg-white distro-card rounded-3xl p-4 flex items-center justify-center shadow-2xl" aria-hidden="true">
              <img src={distro.logo} alt="" className="max-h-full max-w-full object-contain" referrerPolicy="no-referrer" />
            </div>
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-5xl md:text-6xl font-display font-bold mb-4"
              >
                {distro.name}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl md:text-2xl text-white/70"
              >
                {translatedDistro.subtitle}
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Post-Download Section */}
      <section className="py-4 bg-primary text-white">
        <div className="container-custom flex items-center justify-center gap-6">
          <h2 className="text-lg md:text-xl font-bold">
            {lang === 'pt-BR' ? 'O que fazer depois de instalar sua distro?' : 
             lang === 'en' ? 'What to do after downloading your distro?' : 
             '¿Qué hacer después de descargar tu distro?'}
          </h2>
          <Link 
            to="/pos-instalacao"
            className="border-2 border-white text-white px-6 py-2 rounded-[6px] hover:bg-white hover:text-primary transition-all text-sm md:text-base whitespace-nowrap font-normal"
          >
            {lang === 'pt-BR' ? 'Saiba mais' : lang === 'en' ? 'Learn more' : 'Saber más'}
          </Link>
        </div>
      </section>

      <section className="py-20 bg-white" aria-labelledby="distro-info-heading">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <article className="bg-white distro-card p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
                <h2 id="distro-info-heading" className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Info className="text-primary" aria-hidden="true" /> {t.about} {distro.name}
                </h2>

                <AudioReader 
                  title={distro.name} 
                  text={`${translatedDistro.description}. ${t.desktopEnvironments} ${translatedDistro.desktopEnvironments}. ${t.mainFeatures} ${translatedDistro.mainFeatures}. ${t.packageManager} ${translatedDistro.packageManager}.`} 
                />

                <p className="text-lg text-gray-700 leading-relaxed mb-8 text-left">{translatedDistro.description}</p>
                
                <h3 className="text-xl font-bold mb-4">{t.desktopEnvironments}</h3>
                <p className="text-gray-600 mb-8">{translatedDistro.desktopEnvironments}</p>

                <h3 className="text-xl font-bold mb-4">{t.mainFeatures}</h3>
                <p className="text-gray-600 mb-8">{translatedDistro.mainFeatures}</p>

                <h3 className="text-xl font-bold mb-4">{t.packageManager}</h3>
                <p className="text-gray-600 mb-8">{translatedDistro.packageManager}</p>

                <h3 className="text-xl font-bold mb-4">{t.preInstalledSoftware}</h3>
                <p className="text-gray-600 mb-8">{translatedDistro.preInstalledSoftware}</p>

                <h3 className="text-xl font-bold mb-4">{t.hardwareCompatibility}</h3>
                <div className="text-gray-600 mb-8">
                  {translatedDistro.hardwareCompatibility.includes('Requisitos mínimos:') || translatedDistro.hardwareCompatibility.includes('Minimum requirements:') || translatedDistro.hardwareCompatibility.includes('Requisitos mínimos:') ? (
                    <>
                      <p className="mb-6">{translatedDistro.hardwareCompatibility.split(/Requisitos mínimos:|Minimum requirements:|Requisitos mínimos:/)[0].trim()}</p>
                      <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 shadow-inner">
                        <p className="font-bold mb-4 text-gray-900 flex items-center gap-2">
                          <Info size={18} className="text-primary" />
                          {lang === 'pt-BR' ? 'Requisitos mínimos:' : lang === 'en' ? 'Minimum requirements:' : 'Requisitos mínimos:'}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                          {translatedDistro.hardwareCompatibility.split(/Requisitos mínimos:|Minimum requirements:|Requisitos mínimos:/)[1].split(',').map((req, idx) => {
                            const cleanReq = req.trim().replace(/\.$/, '');
                            if (cleanReq.toLowerCase().includes('processador') || cleanReq.toLowerCase().includes('processor')) {
                              return (
                                <div key={idx} className="flex flex-col gap-1">
                                  <div className="flex items-center gap-2 text-primary mb-1">
                                    <Cpu size={14} />
                                    <span className="text-[10px] uppercase font-bold tracking-wider">{lang === 'pt-BR' ? 'Processador' : lang === 'en' ? 'Processor' : 'Procesador'}</span>
                                  </div>
                                  <p className="text-sm font-bold text-gray-900">{cleanReq.replace(/processador|processor|procesador\s*:?/i, '').trim()}</p>
                                </div>
                              );
                            }
                            if (cleanReq.toLowerCase().includes('hd/ssd')) {
                              return (
                                <div key={idx} className="flex flex-col gap-1">
                                  <div className="flex items-center gap-2 text-primary mb-1">
                                    <HardDrive size={14} />
                                    <span className="text-[10px] uppercase font-bold tracking-wider">HD/SSD</span>
                                  </div>
                                  <p className="text-sm font-bold text-gray-900">{cleanReq.replace(/hd\/ssd\s*:?/i, '').trim()}</p>
                                </div>
                              );
                            }
                            if (cleanReq.toLowerCase().includes('memória') || cleanReq.toLowerCase().includes('memory') || cleanReq.toLowerCase().includes('memoria')) {
                              return (
                                <div key={idx} className="flex flex-col gap-1">
                                  <div className="flex items-center gap-2 text-primary mb-1">
                                    <Database size={14} />
                                    <span className="text-[10px] uppercase font-bold tracking-wider">{lang === 'pt-BR' ? 'Memória' : lang === 'en' ? 'Memory' : 'Memoria'}</span>
                                  </div>
                                  <p className="text-sm font-bold text-gray-900">{cleanReq.replace(/memória|memory|memoria\s*:?/i, '').trim()}</p>
                                </div>
                              );
                            }
                            return (
                              <div key={idx} className="flex flex-col gap-1">
                                <div className="flex items-center gap-2 text-primary mb-1">
                                  <Info size={14} />
                                  <span className="text-[10px] uppercase font-bold tracking-wider">Info</span>
                                </div>
                                <p className="text-sm font-bold text-gray-900">{cleanReq}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  ) : (
                    <p>{translatedDistro.hardwareCompatibility}</p>
                  )}
                </div>

                <h3 className="text-xl font-bold mb-4">{t.communitySupport}</h3>
                <p className="text-gray-600 mb-8">{translatedDistro.communitySupport}</p>

                <h3 className="text-xl font-bold mb-4">{t.comparison}</h3>
                <p className="text-gray-600 mb-8">{translatedDistro.comparison}</p>
              </article>

              {/* Gallery Placeholder */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {distro.screenshots && distro.screenshots.length > 0 ? (
                  distro.screenshots.map((screenshot, index) => (
                    <div 
                      key={index} 
                      className="aspect-video bg-gray-200 rounded-2xl overflow-hidden shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setSelectedImage(screenshot)}
                    >
                      <img 
                        src={screenshot} 
                        alt={`${distro.name} Screenshot ${index + 1}`} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))
                ) : (
                  [1, 2].map(i => (
                    <div 
                      key={i} 
                      className="aspect-video bg-gray-200 rounded-2xl overflow-hidden shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setSelectedImage(`https://picsum.photos/seed/${distro.id}${i}/1200/800`)}
                    >
                      <img 
                        src={`https://picsum.photos/seed/${distro.id}${i}/800/450`} 
                        alt="Screenshot" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="bg-white distro-card p-8 rounded-3xl shadow-xl border border-gray-100 sticky top-28">
                <h3 className="text-xl font-bold mb-6">{t.quickInfo}</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-xl text-primary"><Box size={20} /></div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold">{t.basedOn}</p>
                      <p className="font-bold">{distro.basedOn}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-xl text-primary"><Globe size={20} /></div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold">{t.country}</p>
                      <p className="font-bold">{distro.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-xl text-primary"><Cpu size={20} /></div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold">{t.architecture}</p>
                      <p className="font-bold">{distro.architecture}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-xl text-primary"><HardDrive size={20} /></div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold">{distro.id === 'chrome-os-flex' ? 'Arquivo Bin' : t.isoFile}</p>
                      <p className="font-bold">{distro.id === 'chrome-os-flex' ? '1.3 GB' : distro.isoSize}</p>
                    </div>
                  </div>
                </div>

                {['ubuntu-linux', 'linux-mint', 'chrome-os-flex', 'debian-linux'].includes(distro.id) && (
                  <div className="mt-8 bg-[#87cf3e]/10 border border-[#87cf3e]/20 rounded-xl p-4 text-xs text-dark/95 leading-relaxed text-left">
                    <p className="font-extrabold text-[#6fa332] flex items-center gap-1.5 mb-1.5 text-[11px] uppercase tracking-wide">
                      <MonitorPlay size={15} /> {t.testInBrowserTitle}
                    </p>
                    {t.testInBrowserDesc}
                  </div>
                )}

                {distro.id === 'ubuntu-linux' && (
                  <Link 
                    to={`/${routeLang}/${simulatorSub}/ubuntu`}
                    target="_blank"
                    className="w-full mt-4 bg-dark text-white py-4 rounded-[6px] font-bold flex items-center justify-center gap-2 hover:bg-dark/90 transition-all shadow-lg border border-white/10 text-primary-hover"
                  >
                    <MonitorPlay size={20} className="text-primary" /> {t.testDistro}
                  </Link>
                )}

                {distro.id === 'debian-linux' && (
                  <Link 
                    to={`/${routeLang}/${simulatorSub}/debian`}
                    target="_blank"
                    className="w-full mt-4 bg-dark text-white py-4 rounded-[6px] font-bold flex items-center justify-center gap-2 hover:bg-dark/90 transition-all shadow-lg border border-white/10 text-primary-hover"
                  >
                    <MonitorPlay size={20} className="text-primary" /> {t.testDistro}
                  </Link>
                )}

                {distro.id === 'linux-mint' && (
                  <Link 
                    to={`/${routeLang}/${simulatorSub}/mint`}
                    target="_blank"
                    className="w-full mt-4 bg-dark text-white py-4 rounded-[6px] font-bold flex items-center justify-center gap-2 hover:bg-dark/90 transition-all shadow-lg border border-white/10 text-primary-hover"
                  >
                    <MonitorPlay size={20} className="text-primary" /> {t.testDistro}
                  </Link>
                )}

                {distro.id === 'chrome-os-flex' && (
                  <Link 
                    to={`/${routeLang}/${simulatorSub}/chromeos`}
                    target="_blank"
                    className="w-full mt-4 bg-dark text-white py-4 rounded-[6px] font-bold flex items-center justify-center gap-2 hover:bg-dark/90 transition-all shadow-lg border border-white/10 text-primary-hover"
                  >
                    <MonitorPlay size={20} className="text-primary" /> {t.testDistro}
                  </Link>
                )}

                {distro.id === 'chrome-os-flex' && (
                  <a 
                    href="https://dl.google.com/chromeos-flex/images/latest.bin.zip"
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full mt-4 bg-black hover:bg-zinc-900 text-white py-4 rounded-[6px] font-bold flex items-center justify-center gap-2 transition-all shadow-lg border border-white/10"
                  >
                    <Download size={20} /> Baixar Imagem Bin (1.3GB)
                  </a>
                )}

                <a 
                  href={distro.officialSite} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full mt-4 bg-primary text-white py-4 rounded-[6px] font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg"
                >
                  <Download size={20} /> {t.downloadOfficial}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-primary transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={40} />
          </button>
          <motion.img 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={selectedImage} 
            alt="Full size view" 
            className="max-w-full max-h-full rounded-lg shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      {/* Ubuntu Web Simulator Overlay */}
      {showWebSimulator && (
        <UbuntuSimulator onClose={() => setShowWebSimulator(false)} />
      )}
    </div>
  );
};
