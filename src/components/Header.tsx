import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const { t, language } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="header-inner">
        <a href={`/${language}/`} className="logo" aria-label="EVS Home">EVS</a>

        <nav className={`nav ${mobileOpen ? 'open' : ''}`} role="navigation" aria-label="Main navigation">
          <a href={`/${language}/#work`} className="nav-link" onClick={() => setMobileOpen(false)}>{t.nav.work}</a>
          <a href={`/${language}/#about`} className="nav-link" onClick={() => setMobileOpen(false)}>{t.nav.about}</a>
          <a href={`/${language}/#contact`} className="nav-link" onClick={() => setMobileOpen(false)}>{t.nav.contact}</a>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <LanguageSwitcher variant="minimal" />
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <span style={{ transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : '' }}></span>
            <span style={{ opacity: mobileOpen ? 0 : 1 }}></span>
            <span style={{ transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : '' }}></span>
          </button>
        </div>
      </div>
    </header>
  );
}