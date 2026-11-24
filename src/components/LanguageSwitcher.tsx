import { useLanguage } from '../contexts/LanguageContext';

interface LanguageSwitcherProps {
  variant?: 'minimal' | 'dropdown';
  className?: string;
}

export function LanguageSwitcher({ variant = 'minimal', className = '' }: LanguageSwitcherProps) {
  const { language, setLanguage, toggleLanguage } = useLanguage();

  if (variant === 'minimal') {
    return (
      <button
        className={`evs-lang-switcher-minimal ${className}`}
        onClick={toggleLanguage}
        aria-label={language === 'en' ? 'Switch to Portuguese' : 'Mudar para Inglês'}
      >
        {language === 'en' ? 'EN' : 'PT'}
      </button>
    );
  }

  return (
    <div className={`evs-lang-switcher-dropdown ${className}`}>
      <button
        className="evs-lang-trigger"
        onClick={toggleLanguage}
        aria-haspopup="listbox"
        aria-expanded="false"
        aria-label={`Current language: ${language === 'en' ? 'English' : 'Português'}`}
      >
        <span className="evs-lang-current">
          {language === 'en' ? 'English' : 'Português (Brasil)'}
        </span>
        <svg className="evs-lang-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <ul className="evs-lang-options" role="listbox">
        {(['en', 'pt-BR'] as const).map((lang) => (
          <li key={lang} role="option" aria-selected={language === lang}>
            <button
              className={`evs-lang-option ${language === lang ? 'selected' : ''}`}
              onClick={() => setLanguage(lang)}
            >
              {lang === 'en' ? 'English' : 'Português (Brasil)'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}