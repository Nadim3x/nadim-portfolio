import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useContent } from '@/lib/content-context';
import { updateContentRow, type SiteContentRow } from '@/lib/supabase';

const CATEGORY_ORDER = [
  'nav',
  'hero',
  'reel',
  'about',
  'services',
  'contact',
  'footer',
  'general',
  'settings',
];

const CATEGORY_LABELS: Record<string, string> = {
  nav: 'Navigation',
  hero: 'Hero Section',
  reel: 'Video Reel',
  about: 'About Section',
  services: 'Services Section',
  contact: 'Contact Section',
  footer: 'Footer',
  general: 'General',
  settings: 'Settings (Links & Images)',
};

type EditState = Record<string, { en: string; bn: string }>;
type SaveState = 'idle' | 'saving' | 'saved' | 'error';

export function AdminPanel() {
  const { signOut } = useAuth();
  const { content, loading, refresh } = useContent();
  const [editState, setEditState] = useState<EditState>({});
  const [activeCategory, setActiveCategory] = useState<string>('nav');
  const [saveStates, setSaveStates] = useState<Record<string, SaveState>>({});

  // Build edit state from fetched content
  useEffect(() => {
    const state: EditState = {};
    for (const key of Object.keys(content)) {
      const row = content[key];
      state[key] = { en: row.en, bn: row.bn };
    }
    setEditState(state);
  }, [content]);

  const groupedRows = useMemo(() => {
    const groups: Record<string, SiteContentRow[]> = {};
    for (const row of Object.values(content)) {
      if (!groups[row.category]) groups[row.category] = [];
      groups[row.category].push(row);
    }
    for (const cat of Object.keys(groups)) {
      groups[cat].sort((a, b) => a.sort_order - b.sort_order);
    }
    return groups;
  }, [content]);

  const handleFieldChange = (key: string, lang: 'en' | 'bn', value: string) => {
    setEditState((prev) => ({
      ...prev,
      [key]: { ...prev[key], [lang]: value },
    }));
  };

  const handleSave = async (key: string) => {
    const edits = editState[key];
    if (!edits) return;

    setSaveStates((prev) => ({ ...prev, [key]: 'saving' }));

    const success = await updateContentRow(key, { en: edits.en, bn: edits.bn });

    setSaveStates((prev) => ({
      ...prev,
      [key]: success ? 'saved' : 'error',
    }));

    if (success) {
      await refresh();
      setTimeout(() => {
        setSaveStates((prev) => ({ ...prev, [key]: 'idle' }));
      }, 2000);
    }
  };

  const isDirty = (key: string): boolean => {
    const edits = editState[key];
    const original = content[key];
    if (!edits || !original) return false;
    return edits.en !== original.en || edits.bn !== original.bn;
  };

  if (loading) {
    return (
      <div style={{ padding: '80px 28px', textAlign: 'center', color: 'var(--muted)' }}>
        Loading content...
      </div>
    );
  }

  const categories = CATEGORY_ORDER.filter((c) => groupedRows[c] && groupedRows[c].length > 0);
  const currentRows = groupedRows[activeCategory] || [];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Admin header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: 'rgba(24,22,15,0.92)',
        backdropFilter: 'blur(14px)',
        borderBottom: '1px solid var(--border)',
        padding: '16px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span className="logo" style={{ fontSize: '18px' }}>
            NADIM<span className="logo-dot">.</span>EDITOR
          </span>
          <span className="mono" style={{
            fontSize: '11px',
            color: 'var(--muted-2)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            Admin
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <a href="#top" className="btn btn-ghost btn-small">
            View Site
          </a>
          <button onClick={signOut} className="btn btn-ghost btn-small">
            Sign Out
          </button>
        </div>
      </header>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 28px 80px' }}>
        <h1 style={{
          fontFamily: 'var(--ff-display)',
          fontSize: '28px',
          fontWeight: 600,
          marginBottom: '8px',
        }}>
          Content Editor
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '15px', marginBottom: '32px' }}>
          Edit all text, contact links, and images in English and Bengali. Changes go live instantly.
        </p>

        {/* Category tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '32px',
          paddingBottom: '20px',
          borderBottom: '1px solid var(--border)',
        }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '10px 18px',
                borderRadius: '999px',
                border: `1px solid ${activeCategory === cat ? 'var(--amber)' : 'var(--border-strong)'}`,
                background: activeCategory === cat ? 'var(--amber-soft)' : 'transparent',
                color: activeCategory === cat ? 'var(--amber)' : 'var(--muted)',
                fontSize: '13px',
                fontFamily: 'var(--ff-mono)',
                letterSpacing: '0.04em',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              {CATEGORY_LABELS[cat] || cat}
            </button>
          ))}
        </div>

        {/* Editable rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {currentRows.map((row) => {
            const edits = editState[row.key];
            if (!edits) return null;
            const dirty = isDirty(row.key);
            const saveState = saveStates[row.key] || 'idle';
            const isTextarea = row.field_type === 'textarea';
            const isUrlField = row.field_type === 'url' || row.field_type === 'image';

            const clipMatch = row.key.match(/^settings\.clip(\d+)_(video|cover)$/);
            let displayLabel = row.label || row.key;
            if (clipMatch) {
              const clipNum = clipMatch[1];
              const titleEdits = editState[`reel.clip${clipNum}.title`];
              const clipTitle = titleEdits ? titleEdits.en.trim() : '';
              const suffix = clipMatch[2] === 'video' ? 'video URL' : 'cover image';
              displayLabel = clipTitle ? `${clipTitle} — ${suffix}` : `Clip ${clipNum} ${suffix}`;
            }

            return (
              <div key={row.key} style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-m)',
                padding: '24px',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}>
                  <div>
                    <span className="mono" style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--text)',
                    }}>
                      {displayLabel}
                    </span>
                    <span className="mono" style={{
                      fontSize: '11px',
                      color: 'var(--muted-2)',
                      marginLeft: '10px',
                    }}>
                      {row.key}
                    </span>
                  </div>
                  <span className="mono" style={{
                    fontSize: '10px',
                    color: 'var(--muted-2)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}>
                    {row.field_type}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  {isUrlField ? (
                    <div style={{ flex: '1', minWidth: '260px' }}>
                      <label className="mono" style={{
                        display: 'block',
                        fontSize: '10px',
                        color: 'var(--muted-2)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        marginBottom: '6px',
                      }}>
                        Link
                      </label>
                      <input
                        type="url"
                        value={edits.en}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditState((prev) => ({
                            ...prev,
                            [row.key]: { en: val, bn: val },
                          }));
                        }}
                        style={inputStyle}
                      />
                    </div>
                  ) : (
                  <>
                  <div style={{ flex: '1', minWidth: '260px' }}>
                    <label className="mono" style={{
                      display: 'block',
                      fontSize: '10px',
                      color: 'var(--muted-2)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      marginBottom: '6px',
                    }}>
                      English
                    </label>
                    {isTextarea ? (
                      <textarea
                        value={edits.en}
                        onChange={(e) => handleFieldChange(row.key, 'en', e.target.value)}
                        rows={3}
                        style={textareaStyle}
                      />
                    ) : (
                      <input
                        type={row.field_type === 'url' || row.field_type === 'image' ? 'url' : 'text'}
                        value={edits.en}
                        onChange={(e) => handleFieldChange(row.key, 'en', e.target.value)}
                        style={inputStyle}
                      />
                    )}
                  </div>
                  <div style={{ flex: '1', minWidth: '260px' }}>
                    <label className="mono" style={{
                      display: 'block',
                      fontSize: '10px',
                      color: 'var(--muted-2)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      marginBottom: '6px',
                    }}>
                      Bengali
                    </label>
                    {isTextarea ? (
                      <textarea
                        value={edits.bn}
                        onChange={(e) => handleFieldChange(row.key, 'bn', e.target.value)}
                        rows={3}
                        style={textareaStyle}
                      />
                    ) : (
                      <input
                        type={row.field_type === 'url' || row.field_type === 'image' ? 'url' : 'text'}
                        value={edits.bn}
                        onChange={(e) => handleFieldChange(row.key, 'bn', e.target.value)}
                        style={inputStyle}
                      />
                    )}
                  </div>
                  </>
                  )}
                </div>

                {/* Image preview */}
                {row.field_type === 'image' && (edits.en || edits.bn) && (
                  <div style={{ marginTop: '12px' }}>
                    <img
                      src={edits.en || edits.bn}
                      alt="Preview"
                      style={{
                        width: '120px',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: 'var(--radius-s)',
                        border: '1px solid var(--border)',
                      }}
                    />
                  </div>
                )}

                {/* Save button */}
                <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button
                    onClick={() => handleSave(row.key)}
                    disabled={!dirty || saveState === 'saving'}
                    className="btn btn-primary btn-small"
                    style={{
                      opacity: (!dirty || saveState === 'saving') ? 0.4 : 1,
                      cursor: (!dirty || saveState === 'saving') ? 'default' : 'pointer',
                    }}
                  >
                    {saveState === 'saving' ? 'Saving...' : saveState === 'saved' ? 'Saved!' : 'Save'}
                  </button>
                  {saveState === 'error' && (
                    <span style={{ fontSize: '12px', color: '#E07070' }}>
                      Failed to save. Check connection.
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  background: 'var(--bg-soft)',
  border: '1px solid var(--border-strong)',
  borderRadius: 'var(--radius-s)',
  color: 'var(--text)',
  fontSize: '14px',
  fontFamily: 'var(--ff-body)',
  outline: 'none',
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  resize: 'vertical',
  minHeight: '70px',
  lineHeight: '1.6',
};
