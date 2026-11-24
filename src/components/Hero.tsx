import { useLanguage } from '../contexts/LanguageContext';

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="container">
        <p className="hero-eyebrow">{t.hero.eyebrow}</p>
        <h1 id="hero-title" className="hero-headline reveal" dangerouslySetInnerHTML={{ __html: t.hero.headline }} />
      </div>
    </section>
  );
}