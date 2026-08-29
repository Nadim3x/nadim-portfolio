import { useContent } from '@/lib/content-context';
import { type Lang } from '@/i18n';
import { WhatsAppIcon, InstagramIcon, EmailIcon } from './icons';

type Props = {
  lang: Lang;
};

export function Footer({ lang }: Props) {
  const { getValue, content } = useContent();

  const getSetting = (key: string): string => {
    const row = content[key];
    return row ? row.en : '';
  };

  const whatsappLink = getSetting('settings.whatsapp_link') || 'https://wa.link/2yrggp';
  const instagramLink = getSetting('settings.instagram_link') || 'https://www.instagram.com/nadim.editor/';
  const emailLink = getSetting('settings.email_link') || 'mailto:sixtynineplays.info@gmail.com';

  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="mono">{getValue('footer.tagline', lang)}</span>
        <div className="footer-social">
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <WhatsAppIcon />
          </a>
          <a href={instagramLink} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <InstagramIcon />
          </a>
          <a href={emailLink} aria-label="Email">
            <EmailIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
