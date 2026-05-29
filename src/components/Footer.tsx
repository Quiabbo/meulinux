import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { routeMap } from '../utils/routeMap';

export const Footer = () => {
  const { t, i18n } = useTranslation();
  
  const currentLang = (i18n.language || 'pt-br').toLowerCase().startsWith('pt') ? 'pt-br' : 'en';
  const routes = routeMap[currentLang];

  const licenseText = currentLang === 'en'
    ? 'License: Creative Commons Attribution 4.0 International meuLinux. The registered trademark Linux® is used pursuant to a sublicense from the Linux Foundation, the exclusive licensee of Linus Torvalds, owner of the mark on a worldwide basis.'
    : 'Licença: Creative Commons Atribuição 4.0 Internacional meuLinux. A marca registrada Linux® é usada de acordo com uma sublicença da Linux Foundation, a licenciada exclusiva de Linus Torvalds, proprietário da marca em base mundial.';

  return (
    <footer className="bg-dark text-white py-12" role="contentinfo">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Info */}
          <div className="col-span-1 md:col-span-2">
            <Link to={routes.home} className="flex items-center mb-4" aria-label="meuLinux - Home">
              <img 
                src="/assets/meu-10.gif" 
                alt="meuLinux Logo" 
                className="h-8 w-auto"
                referrerPolicy="no-referrer"
              />
            </Link>
            <p className="text-white/60 max-w-sm">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer links">
            <h4 className="font-bold mb-4">{t('footer.pages_heading')}</h4>
            <ul className="space-y-2 text-white/60">
              <li><Link to={routes.about} className="hover:text-primary transition-colors">{t('footer.about')}</Link></li>
              <li><Link to={routes.contact} className="hover:text-primary transition-colors">{t('footer.contact')}</Link></li>
              <li><Link to={routes.terms} className="hover:text-primary transition-colors">{t('footer.terms')}</Link></li>
              <li><Link to={routes.privacy} className="hover:text-primary transition-colors">{t('footer.privacy')}</Link></li>
            </ul>
          </nav>
        </div>

        <div className="border-t border-white/10 pt-8 text-sm text-white/40 text-center">
          <p className="mb-4 text-xs">
            {licenseText}
          </p>
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};
