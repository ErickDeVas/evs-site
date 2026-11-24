import { useLanguage } from '../contexts/LanguageContext';

export function Clients() {
  const { t } = useLanguage();

  return (
    <section className="section" aria-labelledby="clients-title" style={{ paddingTop: 0 }}>
      <div className="container">
        <p className="section-label">{t.clients.sectionLabel}</p>
        <div className="clients-logos" role="list" aria-label="Selected clients">
          {t.clients.names.map((name) => (
            <img
              key={name}
              className="client-logo"
              src={`/assets/${name.toLowerCase()}_logo.png`}
              alt={name}
              role="listitem"
            />
          ))}
        </div>
      </div>
    </section>
  );
}