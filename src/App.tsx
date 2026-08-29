import { useEffect, useState } from 'react';
import { ContentProvider } from '@/lib/content-context';
import { AuthProvider, useAuth } from '@/lib/auth-context';
import { Scrubber } from '@/components/Scrubber';
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { Reel } from '@/components/Reel';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { AdminLogin } from '@/components/AdminLogin';
import { AdminPanel } from '@/components/AdminPanel';
import type { Lang } from '@/i18n';

function useHashRoute(): string {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return hash;
}

function PublicSite() {
  const [lang, setLang] = useState<Lang>('en');
  const toggleLang = () => setLang((l) => (l === 'en' ? 'bn' : 'en'));

  return (
    <>
      <div className="grain" />
      <Scrubber />
      <Nav lang={lang} onToggleLang={toggleLang} />
      <main id="top">
        <Hero lang={lang} />
        <Reel lang={lang} />
        <About lang={lang} />
        <Services lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}

function AdminRoute() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg)',
        color: 'var(--muted)',
        fontFamily: 'var(--ff-mono)',
        fontSize: '13px',
      }}>
        Loading...
      </div>
    );
  }

  if (!session) return <AdminLogin />;
  return <AdminPanel />;
}

export default function App() {
  const hash = useHashRoute();
  const isAdmin = hash.startsWith('#/admin');

  return (
    <AuthProvider>
      <ContentProvider>
        {isAdmin ? <AdminRoute /> : <PublicSite />}
      </ContentProvider>
    </AuthProvider>
  );
}
