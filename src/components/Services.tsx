import { useContent } from '@/lib/content-context';
import { type Lang } from '@/i18n';
import { useReveal } from '@/hooks/useReveal';
import { PhoneShortIcon, MonitorIcon, UserIcon, SplitIcon, FullScreenIcon, VideoIcon } from './icons';

type Props = {
  lang: Lang;
};

export function Services({ lang }: Props) {
  const { getValue } = useContent();
  const labelRef = useReveal<HTMLDivElement>();
  const headingRef = useReveal<HTMLHeadingElement>();
  const card1Ref = useReveal<HTMLDivElement>();
  const card2Ref = useReveal<HTMLDivElement>();
  const quoteRef = useReveal<HTMLDivElement>();

  return (
    <section className="section" id="services">
      <div className="section-inner">
        <div className="section-label reveal" ref={labelRef}>
          <span className="tc">00:02</span> — <span>{getValue('services.tag', lang)}</span>
        </div>
        <h2 className="reveal" ref={headingRef}>
          {getValue('services.heading', lang)}
        </h2>
        <div style={{ height: 32 }} />
        <div className="services-grid">
          <div className="service-card reveal" ref={card1Ref}>
            <PhoneShortIcon className="service-icon" />
            <h3>{getValue('services.card1.title', lang)}</h3>
            <div className="service-sublist">
              <div className="service-subitem">
                <UserIcon />
                <span>{getValue('services.tag.talkingHead', lang)}</span>
              </div>
              <div className="service-subitem">
                <SplitIcon />
                <span>{getValue('services.tag.splitScreen', lang)}</span>
              </div>
              <div className="service-subitem">
                <FullScreenIcon />
                <span>{getValue('services.tag.fullScreen', lang)}</span>
              </div>
            </div>
          </div>
          <div className="service-card reveal reveal-delay-1" ref={card2Ref}>
            <MonitorIcon className="service-icon" />
            <h3>{getValue('services.card2.title', lang)}</h3>
            <div className="service-sublist">
              <div className="service-subitem">
                <UserIcon />
                <span>{getValue('services.tag.talkingHead', lang)}</span>
              </div>
              <div className="service-subitem">
                <VideoIcon />
                <span>{getValue('services.tag.vlogs', lang)}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="quote-cta reveal" ref={quoteRef}>
          <h3>{getValue('services.quoteHeading', lang)}</h3>
          <p>{getValue('services.quoteSub', lang)}</p>
          <a href="#contact" className="btn btn-primary">
            {getValue('services.quoteBtn', lang)}
          </a>
        </div>
      </div>
    </section>
  );
}
