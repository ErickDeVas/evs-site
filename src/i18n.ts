export type Language = 'en' | 'pt-BR';

export interface Translations {
  nav: { work: string; about: string; contact: string };
  hero: { eyebrow: string; headline: string; internationalLabel: string };
  about: {
    sectionLabel: string;
    directorTitle: string;
    name: string;
    body1: string; body2: string; body3: string;
    studioBody: string; servicesBody: string;
    tags: { saoPaulo: string; brazilInternational: string };
  };
  services: {
    sectionLabel: string;
    items: Array<{ title: string; desc: string; icon: string }>;
  };
  work: { sectionLabel: string; projects: Array<{ id: string; title: string; category: string }> };
  clients: { sectionLabel: string; names: string[] };
  contact: {
    sectionLabel: string; headline: string;
    form: { name: string; email: string; message: string; send: string; sending: string; success: string; error: string };
    info: { emailLabel: string; emailValue: string; phoneLabel: string; phoneValue: string; locationLabel: string; locationValue: string; followLabel: string; followLinks: string[] };
  };
  footer: { copyright: string };
  notFound: { title: string; code: string };
  meta: { title: string; description: string; ogTitle: string; ogDescription: string };
}

import en from '../public/translations/en.json';
import ptBR from '../public/translations/pt-BR.json';

const dict: Record<Language, Translations> = { en, 'pt-BR': ptBR };

export function getTranslations(lang: Language): Translations {
  return dict[lang] || dict.en;
}

export function detectLanguageFromPath(pathname: string): Language {
  const match = pathname.match(/^\/(en|pt-BR)(\/|$)/);
  return (match?.[1] as Language) || 'en';
}

export function getAlternateUrls(pathname: string, base = 'https://erickdevasconcelos.com') {
  const clean = pathname.replace(/^\/(en|pt-BR)/, '');
  const path = clean.startsWith('/') ? clean : `/${clean}`;
  return { en: `${base}/en${path}`, 'pt-BR': `${base}/pt-BR${path}` };
}

export const languageNames = { en: 'English', 'pt-BR': 'Português (Brasil)' };
export const languageCodes = { en: 'en', 'pt-BR': 'pt-BR' };