import { useContent } from '@/lib/content-context';
import { type Lang } from '@/i18n';
import { useReveal } from '@/hooks/useReveal';
import { WhatsAppIcon, InstagramIcon, EmailIcon } from './icons';

type Props = {
  lang: Lang;
};

export function Contact({ lang }: Props) {
  const { getValue, content } = useContent();
  const labelRef = useReveal<HTMLDivElement>();
  const headingRef = useReveal<HTMLHeadingElement>();
  const subRef = useReveal<HTMLParagraphElement>();
  const actionsRef = useReveal<HTMLDivElement>();

  const getSetting = (key: string): string => {
    const row = content[key];
    return row ? row.en : '';
  };

  const whatsappLink = getSetting('settings.whatsapp_link') || 'https://wa.link/2yrggp';
  const instagramLink = getSetting('settings.instagram_link') || 'https://www.instagram.com/nadim.editor/';
  const emailLink = getSetting('settings.email_link') || 'mailto:sixtynineplays.info@gmail.com';

  return (
    <section className="section contact-section" id="contact">
      <div className="section-inner contact-inner">
        <div className="section-label reveal" ref={labelRef}>
          <span className="tc">00:03</span> — <span>{getValue('contact.tag', lang)}</span>
        </div>
        <h2 className="reveal" ref={headingRef}>
          {getValue('contact.heading', lang)}
        </h2>
        <p className="reveal" ref={subRef}>
          {getValue('contact.sub', lang)}
        </p>
        <div className="contact-actions reveal" ref={actionsRef}>
          <a
            className="contact-btn whatsapp"
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon />
            <span>{getValue('contact.whatsapp', lang)}</span>
          </a>
          <a
            className="contact-btn instagram"
            href={instagramLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon />
            <span>{getValue('contact.instagram', lang)}</span>
          </a>
          <a className="contact-btn email" href={emailLink}>
            <EmailIcon />
            <span>{getValue('contact.email', lang)}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
