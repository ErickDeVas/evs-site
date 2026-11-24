import { useLanguage } from '../contexts/LanguageContext';

export function Work() {
  const { t, language } = useLanguage();

  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="container">
        <p className="section-label">{t.work.sectionLabel}</p>

        <div className="work-grid">
          {t.work.projects.map((project, i) => (
            <article key={project.id} className="work-item reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <img
                className="work-thumb"
                src={`/assets/thumb_${project.id}.jpg`}
                alt={project.title}
                loading="lazy"
              />
              <div className="work-info">
                <h3 className="work-title">{project.title}</h3>
                <p className="work-category">{project.category}</p>
              </div>
              <a
                href={`/${language}/#work-${project.id}`}
                className="sr-only"
                aria-label={`View ${project.title} details`}
              >
                View project
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}