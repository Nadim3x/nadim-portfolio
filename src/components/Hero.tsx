import { useContent } from '@/lib/content-context';
import type { Lang } from '@/i18n';

type Props = {
  lang: Lang;
};

export function Hero({ lang }: Props) {
  const { getValue } = useContent();

  return (
    <section className="hero" id="hero">
      <svg
        className="hero-scopes"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ stroke: 'var(--text)', strokeWidth: 1 }}
      >
        <circle cx="200" cy="200" r="180" />
        <circle cx="200" cy="200" r="130" />
        <circle cx="200" cy="200" r="80" />
        <line x1="200" y1="20" x2="200" y2="380" />
        <line x1="20" y1="200" x2="380" y2="200" />
      </svg>
      <div className="hero-inner">
        <div className="hero-eyebrow">
          <span className="rec-dot" />
          <span>{getValue('hero.eyebrow', lang)}</span>
        </div>
        <h1 className="hero-title">
          NADIM<br />EDITOR
        </h1>
        <p className="hero-headline">{getValue('hero.headline', lang)}</p>
        <p className="hero-sub">{getValue('hero.sub', lang)}</p>
        <div className="hero-actions">
          <a href="#reel" className="btn btn-primary">{getValue('hero.cta1', lang)}</a>
          <a href="#contact" className="btn btn-ghost">{getValue('hero.cta2', lang)}</a>
        </div>
      </div>
      <div className="hero-scroll-hint">{getValue('hero.scroll', lang)}</div>
    </section>
  );
}
