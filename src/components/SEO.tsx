import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getAlternateUrls } from '../i18n';

export function SEO() {
  const { language, t } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t.meta.title;

    // Update meta tags
    const updateMeta = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        if (property) el.setAttribute('property', name);
        else el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateMeta('description', t.meta.description);
    updateMeta('og:title', t.meta.ogTitle, true);
    updateMeta('og:description', t.meta.ogDescription, true);
    updateMeta('og:locale', language === 'pt-BR' ? 'pt_BR' : 'en_US', true);
  }, [language, t]);

  const urls = getAlternateUrls(window.location.pathname);

  return (
    <>
      <link rel="alternate" hrefLang="en" href={urls.en} />
      <link rel="alternate" hrefLang="pt-BR" href={urls['pt-BR']} />
      <link rel="alternate" hrefLang="x-default" href={urls.en} />
      <link rel="canonical" href={urls[language]} />
    </>
  );
}