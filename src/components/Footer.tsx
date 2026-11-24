import { useLanguage } from '../contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer>
      <div className="container">
        <p>{t.footer.copyright.replace('{year}', new Date().getFullYear().toString())}</p>
      </div>
    </footer>
  );
}