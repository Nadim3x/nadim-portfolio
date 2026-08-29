import { useEffect, useState } from 'react';

const TOTAL_FAKE_SECONDS = 24 * 60;

function formatTimecode(totalSec: number): string {
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = Math.floor(totalSec % 60);
  const f = Math.floor((totalSec % 1) * 24);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(h)}:${pad(m)}:${pad(s)}:${pad(f)}`;
}

export function Scrubber() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="scrubber">
      <span className="scrubber-rec">
        <span className="rec-dot" style={{ width: 5, height: 5 }} />
        <span className="mono">SCROLL</span>
      </span>
      <div className="scrubber-track">
        <div className="scrubber-fill" style={{ width: `${progress * 100}%` }} />
        <div className="scrubber-head" style={{ left: `${progress * 100}%` }} />
      </div>
      <span className="scrubber-time mono">{formatTimecode(progress * TOTAL_FAKE_SECONDS)}</span>
    </div>
  );
}
