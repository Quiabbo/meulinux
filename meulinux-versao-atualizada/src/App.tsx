import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Content } from './pages/Content';
import { DistroMatch } from './pages/DistroMatch';
import { DistroDetail } from './pages/DistroDetail';
import { PostInstall } from './pages/PostInstall';
import { Admin } from './pages/Admin';
import { Auth } from './pages/Auth';
import { Contribua } from './pages/Contribua';
import { ContribuaEn } from './pages/en/ContribuaEn';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { ScrollToTopOnNavigation } from './components/ScrollToTopOnNavigation';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { NotFound } from './components/NotFound';
import { UbuntuSimulatorPage } from './pages/UbuntuSimulatorPage';
import { DebianSimulatorPage } from './pages/DebianSimulatorPage';
import { MintSimulatorPage } from './pages/MintSimulatorPage';
import { ChromeOSSimulatorPage } from './pages/ChromeOSSimulatorPage';

function RootRedirect() {
  const navigate = useNavigate();
  React.useEffect(() => {
    const userLang = (navigator.language || 'pt-br').toLowerCase();
    const targetLang = userLang.startsWith('pt') ? 'pt-br' : 'en';
    navigate(`/${targetLang}/`, { replace: true });
  }, [navigate]);

  return null;
}

function LanguageRouter() {
  const { lang } = useParams<{ lang?: string }>();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const location = useLocation();

  React.useEffect(() => {
    const lowerLang = lang?.toLowerCase();
    
    // Valid language prefix - set language and proceed
    if (lowerLang === 'pt-br' || lowerLang === 'en') {
      if (i18n.language !== lowerLang) {
        i18n.changeLanguage(lowerLang);
      }
      return;
    }

    // Invalid or missing language prefix - redirect preserving active path
    const userLang = (navigator.language || 'pt-br').toLowerCase();
    const targetLang = userLang.startsWith('pt') ? 'pt-br' : 'en';
    const currentPath = location.pathname.startsWith('/') ? location.pathname : `/${location.pathname}`;
    navigate(`/${targetLang}${currentPath}${location.search}`, { replace: true });
  }, [lang, i18n, navigate, location]);

  const lowerLang = lang?.toLowerCase();
  if (!lowerLang || (lowerLang !== 'pt-br' && lowerLang !== 'en')) {
    return null;
  }

  return <Outlet />;
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <ScrollToTopOnNavigation />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                {/* Redireciona a raiz para pt-br ou en */}
                <Route path="/" element={<RootRedirect />} />
                
                {/* Router por URL de Idioma */}
                <Route path="/:lang" element={<LanguageRouter />}>
                  <Route index element={<Home />} />
                  
                  {/* Rotas em Português */}
                  <Route path="distribuicoes" element={<Home />} />
                  <Route path="sobre" element={<About />} />
                  <Route path="conteudo" element={<Content />} />
                  <Route path="conteudo/:slug" element={<Content />} />
                  <Route path="contato" element={<Contact />} />
                  <Route path="distromatch" element={<DistroMatch />} />
                  <Route path="contribua" element={<Contribua />} />
                  <Route path="pos-instalacao" element={<PostInstall />} />
                  <Route path="simulador/ubuntu" element={<UbuntuSimulatorPage />} />
                  <Route path="simulador/debian" element={<DebianSimulatorPage />} />
                  <Route path="simulador/mint" element={<MintSimulatorPage />} />
                  <Route path="simulador/chromeos" element={<ChromeOSSimulatorPage />} />

                  {/* Rotas em Inglês */}
                  <Route path="distributions" element={<Home />} />
                  <Route path="about" element={<About />} />
                  <Route path="content" element={<Content />} />
                  <Route path="content/:slug" element={<Content />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="contribute" element={<ContribuaEn />} />
                  <Route path="post-installation" element={<PostInstall />} />
                  <Route path="simulator/ubuntu" element={<UbuntuSimulatorPage />} />
                  <Route path="simulator/debian" element={<DebianSimulatorPage />} />
                  <Route path="simulator/mint" element={<MintSimulatorPage />} />
                  <Route path="simulator/chromeos" element={<ChromeOSSimulatorPage />} />

                  {/* Rotas neutras / compartilhadas */}
                  <Route path="terms" element={<Terms />} />
                  <Route path="privacy" element={<Privacy />} />
                  <Route path="admin" element={<Admin />} />
                  <Route path="auth" element={<Auth />} />
                  <Route path=":id" element={<DistroDetail />} />
                </Route>

                {/* Fallback total */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <ScrollToTop />
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}
