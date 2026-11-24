import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { Language, Translations } from '../i18n';
import { getTranslations, detectLanguageFromPath } from '../i18n';

interface LanguageContextValue {
  language: Language;
  t: Translations;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [t, setT] = useState<Translations>(() => getTranslations('en'));

  useEffect(() => {
    const detected = detectLanguageFromPath(window.location.pathname);
    setLanguageState(detected);
    setT(getTranslations(detected));
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    setT(getTranslations(lang));
    const newPath = window.location.pathname.replace(/^\/(en|pt-BR)/, `/${lang}`);
    window.history.pushState({}, '', newPath);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'en' ? 'pt-BR' : 'en');
  }, [language, setLanguage]);

  return (
    <LanguageContext.Provider value={{ language, t, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}