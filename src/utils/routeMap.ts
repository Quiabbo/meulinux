export const routeMap = {
  'pt-br': {
    home: '/pt-br/',
    about: '/pt-br/sobre',
    content: '/pt-br/conteudo',
    contact: '/pt-br/contato',
    distromatch: '/pt-br/distromatch',
    contribua: '/pt-br/contribua',
    postinstall: '/pt-br/pos-instalacao',
    ubuntu_sim: '/pt-br/simulador/ubuntu',
    debian_sim: '/pt-br/simulador/debian',
    mint_sim: '/pt-br/simulador/mint',
    chromeos_sim: '/pt-br/simulador/chromeos',
    terms: '/pt-br/terms',
    privacy: '/pt-br/privacy',
    auth: '/pt-br/auth',
    admin: '/pt-br/admin'
  },
  'en': {
    home: '/en/',
    about: '/en/about',
    content: '/en/content',
    contact: '/en/contact',
    distromatch: '/en/distromatch',
    contribua: '/en/contribute',
    postinstall: '/en/post-installation',
    ubuntu_sim: '/en/simulator/ubuntu',
    debian_sim: '/en/simulator/debian',
    mint_sim: '/en/simulator/mint',
    chromeos_sim: '/en/simulator/chromeos',
    terms: '/en/terms',
    privacy: '/en/privacy',
    auth: '/en/auth',
    admin: '/en/admin'
  }
} as const;

export type RouteKey = keyof typeof routeMap['pt-br'];

/**
 * Normalizes and redirects a path to its localized equivalent.
 */
export function getLocalizedPath(path: string, currentLang: string): string {
  const normalizedLang = (currentLang || 'pt-br').toLowerCase().startsWith('pt') ? 'pt-br' : 'en';
  const cleanPath = path.replace(/^\/(pt-br|en)\//, '/').replace(/^\/(pt-br|en)$/, '/');
  
  // Try to find if cleanPath matches any of the routes in 'pt-br' or 'en'
  const keys = Object.keys(routeMap['pt-br']) as RouteKey[];
  
  for (const key of keys) {
    const ptPath = routeMap['pt-br'][key].replace(/^\/(pt-br|en)/, '');
    const enPath = routeMap['en'][key].replace(/^\/(pt-br|en)/, '');
    
    if (cleanPath === ptPath || cleanPath === enPath || cleanPath === '/' + key) {
      return routeMap[normalizedLang][key];
    }
  }

  // Handle dynamic routes like /conteudo/:slug -> /content/:slug
  if (cleanPath.startsWith('/conteudo/') || cleanPath.startsWith('/content/')) {
    const slug = cleanPath.replace(/^\/(conteudo|content)\//, '');
    const prefix = normalizedLang === 'pt-br' ? '/pt-br/conteudo/' : '/en/content/';
    return prefix + slug;
  }

  // Else, if it's a distro ID or arbitrary slug, it remains the same but with language prefix
  // e.g., /ubuntu-linux -> /pt-br/ubuntu-linux
  const destPath = cleanPath.startsWith('/') ? cleanPath : '/' + cleanPath;
  return `/${normalizedLang}${destPath}`;
}
