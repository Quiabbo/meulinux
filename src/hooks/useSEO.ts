import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { getLocalizedPath } from '../utils/routeMap';

export function useSEO(pageKey: string, customTitle?: string, customDesc?: string) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const lang = (i18n.language || 'pt-br').toLowerCase().startsWith('pt') ? 'pt-br' : 'en';

  useEffect(() => {
    const title = customTitle || t(`meta.${pageKey}.title`) || 'meuLinux';
    const description = customDesc || t(`meta.${pageKey}.description`) || '';

    // 1. Update title
    const formattedTitle = title.includes('meuLinux') || title.includes('Meu Linux') ? title : `${title} - meuLinux`;
    document.title = formattedTitle;

    // 2. Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Update og:locale
    let ogLocale = document.querySelector('meta[property="og:locale"]');
    if (!ogLocale) {
      ogLocale = document.createElement('meta');
      ogLocale.setAttribute('property', 'og:locale');
      document.head.appendChild(ogLocale);
    }
    ogLocale.setAttribute('content', lang === 'pt-br' ? 'pt_BR' : 'en_US');

    // 4. Update og:url and Alternate Links
    const currentLoc = location.pathname;
    const fullPtUrl = `https://meulinux.com${getLocalizedPath(currentLoc, 'pt-br')}`;
    const fullEnUrl = `https://meulinux.com${getLocalizedPath(currentLoc, 'en')}`;
    
    // Canonical link unifies the final page
    const canonicalUrl = `https://meulinux.com${getLocalizedPath(currentLoc, lang)}`;

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', canonicalUrl);

    // 5. Update og_title & og_description & twitter equivalents
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', formattedTitle);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', description);

    // 6. Update Canonical Link tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 7. Update Alternate tags
    // pt-br alternate link
    let alternatePt = document.querySelector('link[hreflang="pt-BR"]');
    if (!alternatePt) {
      alternatePt = document.createElement('link');
      alternatePt.setAttribute('rel', 'alternate');
      alternatePt.setAttribute('hreflang', 'pt-BR');
      document.head.appendChild(alternatePt);
    }
    alternatePt.setAttribute('href', fullPtUrl);

    // en alternate link
    let alternateEn = document.querySelector('link[hreflang="en"]');
    if (!alternateEn) {
      alternateEn = document.createElement('link');
      alternateEn.setAttribute('rel', 'alternate');
      alternateEn.setAttribute('hreflang', 'en');
      document.head.appendChild(alternateEn);
    }
    alternateEn.setAttribute('href', fullEnUrl);

    // x-default alternates (pointing to /en/ path)
    let alternateDefault = document.querySelector('link[hreflang="x-default"]');
    if (!alternateDefault) {
      alternateDefault = document.createElement('link');
      alternateDefault.setAttribute('rel', 'alternate');
      alternateDefault.setAttribute('hreflang', 'x-default');
      document.head.appendChild(alternateDefault);
    }
    alternateDefault.setAttribute('href', fullEnUrl);

  }, [pageKey, customTitle, customDesc, lang, location.pathname, t]);
}
