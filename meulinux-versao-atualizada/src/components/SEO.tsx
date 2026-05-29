import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
  schemaData?: object;
}

export const SEO: React.FC<SEOProps> = ({
  title = 'meuLinux | Encontre e baixe sua distro Linux',
  description = 'Descubra o mundo Linux com o meuLinux. Encontre as melhores distribuições, guias de instalação, tutoriais pós-instalação e muito mais para iniciantes e usuários avançados.',
  canonical,
  ogTitle,
  ogDescription,
  ogImage = 'https://meulinux.com/og-image.png',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  schemaData,
}) => {
  const siteTitle = title.includes('meuLinux') || title.includes('Meu Linux') ? title : `${title} - meuLinux`;
  const currentUrl = canonical || window.location.href;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={ogTitle || siteTitle} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={ogTitle || siteTitle} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Structured Data */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
};
