import { useState, FormEvent } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function Contact() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch('https://formsubmit.co/ajax/contato@erickdevasconcelos.com', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }

    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <p className="section-label">{t.contact.sectionLabel}</p>

        <div className="contact-grid">
          <form onSubmit={handleSubmit} className="reveal" noValidate>
            <h2 id="contact-title" className="reveal" dangerouslySetInnerHTML={{ __html: t.contact.headline }} />

            <div className="form-group">
              <label htmlFor="name" className="form-label">{t.contact.form.name}</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                placeholder="Seu nome"
                required
                aria-required="true"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">{t.contact.form.email}</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="seu@email.com"
                required
                aria-required="true"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">{t.contact.form.message}</label>
              <textarea
                id="message"
                name="message"
                className="form-input form-textarea"
                placeholder="Detalhes do projeto..."
                required
                aria-required="true"
              />
            </div>

            <button
              type="submit"
              className="btn"
              disabled={status === 'sending'}
              aria-busy={status === 'sending'}
            >
              {status === 'sending' ? t.contact.form.sending : t.contact.form.send}
            </button>

            {status === 'success' && (
              <p style={{ marginTop: '1rem', color: 'var(--color-fg)' }} role="status">
                {t.contact.form.success}
              </p>
            )}
            {status === 'error' && (
              <p style={{ marginTop: '1rem', color: '#ff6b6b' }} role="alert">
                {t.contact.form.error}
              </p>
            )}
          </form>

          <div className="reveal" style={{ transitionDelay: '200ms' }}>
            <div className="info-item">
              <p className="info-label">{t.contact.info.emailLabel}</p>
              <p className="info-value">
                <a href="mailto:contato@erickdevasconcelos.com">{t.contact.info.emailValue}</a>
              </p>
            </div>

            <div className="info-item">
              <p className="info-label">{t.contact.info.phoneLabel}</p>
              <p className="info-value">
                <a href="tel:+5511998610113">{t.contact.info.phoneValue}</a>
              </p>
            </div>

            <div className="info-item">
              <p className="info-label">{t.contact.info.locationLabel}</p>
              <p className="info-value">{t.contact.info.locationValue}</p>
            </div>

            <div className="info-item">
              <p className="info-label">{t.contact.info.followLabel}</p>
              <p className="info-value">
                <a href="https://instagram.com/erickdevasconcelos" target="_blank" rel="noopener noreferrer">
                  {t.contact.info.followLinks[0]}
                </a>
                <span style={{ margin: '0 1rem', color: 'var(--color-fg-subtle)' }}>·</span>
                <a href="https://linkedin.com/in/erickdevas" target="_blank" rel="noopener noreferrer">
                  {t.contact.info.followLinks[1]}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}