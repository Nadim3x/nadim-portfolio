import { useEffect, useState } from 'react';
import { useContent } from '@/lib/content-context';
import { CONTACT_LINKS, type Lang } from '@/i18n';

type Props = {
  lang: Lang;
  onToggleLang: () => void;
};

export function Nav({ lang, onToggleLang }: Props) {
  const { getValue } = useContent();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled((window.scrollY || document.documentElement.scrollTop) > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
      <div className="nav-inner">
        <a href="#top" className="logo">
          NADIM<span className="logo-dot">.</span>EDITOR
        </a>
        <nav className={`nav-links${menuOpen ? ' open' : ''}`}>
          <a href="#about" onClick={closeMenu}>{getValue('nav.about', lang)}</a>
          <a href="#reel" onClick={closeMenu}>{getValue('nav.work', lang)}</a>
          <a href="#services" onClick={closeMenu}>{getValue('nav.services', lang)}</a>
          <a href="#contact" onClick={closeMenu}>{getValue('nav.contact', lang)}</a>
        </nav>
        <div className="nav-actions">
          <button
            className="lang-toggle"
            data-lang={lang}
            aria-label="Switch language / ভাষা পরিবর্তন করুন"
            onClick={onToggleLang}
          >
            <span className="lang-slider" />
            <span className="lang-opt">EN</span>
            <span className="lang-opt">BN</span>
          </button>
          <a href={CONTACT_LINKS.whatsapp} className="btn btn-primary btn-small" target="_blank" rel="noopener noreferrer">
            {getValue('nav.cta', lang)}
          </a>
        </div>
        <button
          className={`nav-burger${menuOpen ? ' open' : ''}`}
          aria-label="Menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
