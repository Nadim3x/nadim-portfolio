import { useEffect, useState } from 'react';

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

function extractVimeoId(url: string): string | null {
  const m = url.match(/vimeo\.com\/(\d+)/);
  return m ? m[1] : null;
}

function cloudinaryThumb(url: string): string | null {
  if (!url.includes('res.cloudinary.com')) return null;
  const m = url.match(
    /^(https:\/\/res\.cloudinary\.com\/[^/]+\/video\/upload)\/(?:v\d+\/)?(.+)$/
  );
  if (!m) return null;
  const base = m[1];
  const path = m[2];
  const withoutExt = path.replace(/\.[^.]+$/, '');
  return `${base}/so_2,f_jpg,q_auto/${withoutExt}.jpg`;
}

async function captureVideoFrame(url: string): Promise<string | null> {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.preload = 'metadata';
    video.src = url;

    let settled = false;
    const done = (val: string | null) => {
      if (settled) return;
      settled = true;
      resolve(val);
    };

    const cleanup = () => {
      video.removeAttribute('src');
      video.load();
    };

    video.addEventListener('loadeddata', () => {
      const seekTime = Math.min((video.duration || 2) * 0.25, 5);
      video.currentTime = seekTime;
    });

    video.addEventListener('seeked', () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || 480;
        canvas.height = video.videoHeight || 270;
        const ctx = canvas.getContext('2d');
        if (!ctx) return done(null);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        cleanup();
        done(dataUrl);
      } catch {
        cleanup();
        done(null);
      }
    });

    video.addEventListener('error', () => {
      cleanup();
      done(null);
    });

    setTimeout(() => done(null), 8000);
  });
}

async function fetchVimeoThumb(id: string): Promise<string | null> {
  try {
    const res = await fetch(`https://vimeo.com/api/v2/video/${id}.json`);
    if (!res.ok) return null;
    const data = await res.json();
    return data?.[0]?.thumbnail_large || data?.[0]?.thumbnail_medium || null;
  } catch {
    return null;
  }
}

export function useVideoThumb(videoUrl: string): { thumb: string | null; loading: boolean } {
  const [thumb, setThumb] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!videoUrl) {
      setThumb(null);
      return;
    }

    let cancelled = false;
    setLoading(true);

    (async () => {
      let result: string | null = null;

      const ytId = extractYouTubeId(videoUrl);
      if (ytId) {
        result = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
      } else {
        const cThumb = cloudinaryThumb(videoUrl);
        if (cThumb) {
          result = cThumb;
        } else {
          const vimeoId = extractVimeoId(videoUrl);
          if (vimeoId) {
            result = await fetchVimeoThumb(vimeoId);
          } else {
            result = await captureVideoFrame(videoUrl);
          }
        }
      }

      if (!cancelled) {
        setThumb(result);
        setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [videoUrl]);

  return { thumb, loading };
}
