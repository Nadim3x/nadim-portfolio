import { useEffect, useRef, useState } from 'react';
import { useContent } from '@/lib/content-context';
import { CLIP_COUNT, type Lang } from '@/i18n';
import { useVideoThumb } from '@/hooks/useVideoThumb';
import { PlayIcon, ExpandIcon, CloseIcon } from './icons';

type Props = {
  lang: Lang;
};

type ActiveClip = { index: number } | null;

function ClipCard({
  index,
  lang,
  failed,
  onCoverError,
  onOpen,
}: {
  index: number;
  lang: Lang;
  failed: boolean;
  onCoverError: (i: number) => void;
  onOpen: (i: number) => void;
}) {
  const { getValue, content } = useContent();

  const cover = (() => {
    const row = content[`settings.clip${index}_cover`];
    return row ? (lang === 'bn' ? row.bn : row.en) : '';
  })();

  const videoUrl = (() => {
    const row = content[`settings.clip${index}_video`];
    return row ? row.en || row.bn : '';
  })();

  const { thumb, loading } = useVideoThumb(videoUrl);

  const title = getValue(`reel.clip${index}.title`, lang).trim();
  const desc = getValue(`reel.clip${index}.desc`, lang).trim();

  const displayCover = cover || thumb || '';
  const showPlaceholder = !displayCover && (failed || !videoUrl);

  return (
    <div
      className={`clip-card${showPlaceholder ? ' no-video' : ''}`}
      onClick={() => onOpen(index)}
    >
      <div className="clip-video-panel">
        {displayCover && (
          <img
            className="clip-cover"
            src={displayCover}
            alt=""
            onError={() => onCoverError(index)}
          />
        )}
        {!displayCover && videoUrl && loading && (
          <div className="clip-placeholder">
            <span className="thumb-spinner" />
          </div>
        )}
        <div className="clip-placeholder">
          <PlayIcon />
          <span>{getValue('reel.addVideo', lang)}</span>
        </div>
      </div>
      <div className="clip-info-panel">
        <div className={`clip-info-title${!title && !desc ? ' is-placeholder' : ''}`}>
          {!title && !desc ? getValue('reel.addInfo', lang) : title}
        </div>
        <div className="clip-info-desc">{desc}</div>
      </div>
      <div className="clip-expand">
        <ExpandIcon />
      </div>
    </div>
  );
}

export function Reel({ lang }: Props) {
  const { getValue, content } = useContent();
  const [failedCovers, setFailedCovers] = useState<Set<number>>(new Set());
  const [activeClip, setActiveClip] = useState<ActiveClip>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const getVideo = (clipNum: number): string => {
    const row = content[`settings.clip${clipNum}_video`];
    return row ? row.en || row.bn : '';
  };

  const handleCoverError = (i: number) => {
    setFailedCovers((prev) => new Set(prev).add(i));
  };

  const openLightbox = (index: number) => {
    if (failedCovers.has(index) && !getVideo(index)) return;
    setActiveClip({ index });
  };

  const closeLightbox = () => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
    setActiveClip(null);
  };

  useEffect(() => {
    if (activeClip) {
      document.body.style.overflow = 'hidden';
      const v = videoRef.current;
      if (v) {
        v.currentTime = 0;
        v.play().catch(() => {});
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeClip]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const clipField = (i: number, field: 'title' | 'desc'): string => {
    return getValue(`reel.clip${i}.${field}`, lang).trim();
  };

  const activeIndex = activeClip?.index ?? null;
  const activeTitle = activeIndex ? clipField(activeIndex, 'title') : '';
  const activeDesc = activeIndex ? clipField(activeIndex, 'desc') : '';
  const activeVideo = activeIndex ? getVideo(activeIndex) : '';
  const isYouTube = activeVideo.includes('youtube.com') || activeVideo.includes('youtu.be');
  const isVimeo = activeVideo.includes('vimeo.com');

  return (
    <>
      <section className="reel" id="reel">
        <div className="reel-label mono">
          <span className="tc">00:00</span> — <span>{getValue('reel.tag', lang)}</span>
        </div>
        <div className="reel-grid-wrap">
          <div className="reel-grid">
            {Array.from({ length: CLIP_COUNT }, (_, idx) => (
              <ClipCard
                key={idx + 1}
                index={idx + 1}
                lang={lang}
                failed={failedCovers.has(idx + 1)}
                onCoverError={handleCoverError}
                onOpen={openLightbox}
              />
            ))}
          </div>
        </div>
        <p className="reel-caption">{getValue('reel.caption', lang)}</p>
      </section>

      <div
        className={`lightbox${activeClip ? ' open' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeLightbox();
        }}
      >
        <div className="lightbox-inner">
          <button className="lightbox-close" aria-label="Close" onClick={closeLightbox}>
            <CloseIcon />
          </button>
          <div className="lightbox-frame" key={activeClip ? activeClip.index : 'none'}>
            <div className="lightbox-header">
              <span className="rec-dot" style={{ width: 6, height: 6 }} />
              <span>{getValue('lightbox.playing', lang)}</span>
            </div>
            {activeClip && activeVideo ? (
              isYouTube || isVimeo ? (
                <iframe
                  src={activeVideo}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  style={{ width: '100%', height: '100%', border: 'none' }}
                  title={activeTitle}
                />
              ) : (
                <video ref={videoRef} controls playsInline autoPlay>
                  <source src={activeVideo} type="video/mp4" />
                </video>
              )
            ) : activeClip ? (
              <video ref={videoRef} controls playsInline autoPlay>
                <source src={`videos/clip-${activeClip.index}.mp4`} type="video/mp4" />
              </video>
            ) : null}
          </div>
          <div className={`lightbox-info${!activeTitle && !activeDesc ? ' hidden' : ''}`}>
            <h3 className="lightbox-info-title">{activeTitle}</h3>
            <p className="lightbox-info-desc">{activeDesc}</p>
          </div>
        </div>
      </div>
    </>
  );
}
