import { useLanguage } from '../contexts/LanguageContext';

export function About() {
  const { t } = useLanguage();

  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container">
        <p className="section-label">{t.about.sectionLabel}</p>

        <div className="about-grid">
          <div>
            <p className="section-label">{t.about.directorTitle}</p>
            <h2 id="about-title" className="reveal">{t.about.name}</h2>

            <div className="reveal" style={{ transitionDelay: '100ms' }}>
              <p>{t.about.body1}</p>
              <p>{t.about.body2}</p>
              <p>{t.about.body3}</p>
            </div>

            <div className="tags" style={{ marginTop: '2rem' }}>
              <span className="tag reveal" style={{ transitionDelay: '200ms' }}>{t.about.tags.saoPaulo}</span>
              <span className="tag reveal" style={{ transitionDelay: '300ms' }}>{t.about.tags.brazilInternational}</span>
            </div>
          </div>

          <div>
            <p className="reveal" style={{ transitionDelay: '150ms' }}>{t.about.studioBody}</p>
            <p className="reveal" style={{ transitionDelay: '250ms' }}>{t.about.servicesBody}</p>
          </div>
        </div>

        {/* Services */}
        <div className="services-grid" style={{ marginTop: '4rem' }}>
          {t.services.items.map((service, i) => (
            <div key={service.title} className="service-card reveal" style={{ transitionDelay: `${i * 100}ms` }}>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}