import { useState } from 'react';
import { useContent } from '@/lib/content-context';
import { type Lang } from '@/i18n';
import { useReveal } from '@/hooks/useReveal';
import { UserIcon, CapCutIcon, DaVinciIcon } from './icons';

type Props = {
  lang: Lang;
};

export function About({ lang }: Props) {
  const { getValue, content } = useContent();
  const labelRef = useReveal<HTMLDivElement>();
  const photoRef = useReveal<HTMLDivElement>();
  const contentRef = useReveal<HTMLDivElement>();
  const [photoFailed, setPhotoFailed] = useState(false);

  const profileImage = content['settings.profile_image']
    ? lang === 'bn'
      ? content['settings.profile_image'].bn
      : content['settings.profile_image'].en
    : '';

  return (
    <section className="section" id="about">
      <div className="section-inner about-grid">
        <div style={{ gridColumn: '1 / -1' }} className="section-label reveal" ref={labelRef}>
          <span className="tc">00:01</span> — <span>{getValue('about.tag', lang)}</span>
        </div>
        <div className={`about-photo reveal${photoFailed ? ' no-photo' : ''}`} ref={photoRef}>
          {profileImage && (
            <img
              src={profileImage}
              alt="Nadim"
              onError={() => setPhotoFailed(true)}
            />
          )}
          <div className="photo-placeholder">
            <UserIcon />
            <span>{getValue('about.addPhoto', lang)}</span>
          </div>
        </div>
        <div className="about-content reveal reveal-delay-1" ref={contentRef}>
          <h2>{getValue('about.heading', lang)}</h2>
          <p>{getValue('about.bio1', lang)}</p>
          <p>{getValue('about.bio2', lang)}</p>
          <div className="tool-badges">
            <span className="badge mono">
              <CapCutIcon />
              {getValue('about.tool1', lang)}
            </span>
            <span className="badge mono">
              <DaVinciIcon />
              {getValue('about.tool2', lang)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
