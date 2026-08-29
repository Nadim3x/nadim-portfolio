import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { EyeIcon, EyeOffIcon } from '@/components/icons';

const ADMIN_EMAIL = 'sixtynineplays.info@gmail.com';

export function AdminLogin() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (email.trim().toLowerCase() !== ADMIN_EMAIL) {
      setError('This account is not authorized to access the admin panel.');
      return;
    }

    setBusy(true);
    const result = await signIn(email, password);
    setBusy(false);

    if (result.error) {
      setError(result.error);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg)',
      padding: '24px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        background: 'var(--surface)',
        border: '1px solid var(--border-strong)',
        borderRadius: 'var(--radius-l)',
        padding: '40px 32px',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <a href="#top" className="logo" style={{ display: 'inline-block', fontSize: '20px' }}>
            NADIM<span className="logo-dot">.</span>EDITOR
          </a>
          <p className="mono" style={{
            fontSize: '11px',
            color: 'var(--muted-2)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginTop: '10px',
          }}>
            Admin Panel
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label className="mono" style={{
              display: 'block',
              fontSize: '11px',
              color: 'var(--muted)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}>
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="mono" style={{
              display: 'block',
              fontSize: '11px',
              color: 'var(--muted)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ ...inputStyle, paddingRight: '44px' }}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--muted)',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOffIcon width={18} height={18} /> : <EyeIcon width={18} height={18} />}
              </button>
            </div>
          </div>

          {error && (
            <p style={{
              fontSize: '13px',
              color: '#E07070',
              lineHeight: 1.5,
            }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="btn btn-primary"
            style={{ justifyContent: 'center', width: '100%', opacity: busy ? 0.6 : 1 }}
          >
            {busy ? 'Please wait...' : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <a href="#top" style={{
            fontSize: '12px',
            color: 'var(--muted-2)',
            textDecoration: 'none',
          }}>
            ← Back to site
          </a>
        </div>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  background: 'var(--bg-soft)',
  border: '1px solid var(--border-strong)',
  borderRadius: 'var(--radius-s)',
  color: 'var(--text)',
  fontSize: '14px',
  fontFamily: 'var(--ff-body)',
  outline: 'none',
};
