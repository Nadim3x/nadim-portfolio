import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import {
  fetchAllContent,
  type ContentMap,
  type SiteContentRow,
} from '@/lib/supabase';
import { translations as fallback, type Lang } from '@/i18n';

type ContentContextValue = {
  content: ContentMap;
  loading: boolean;
  refresh: () => Promise<void>;
  getValue: (key: string, lang: Lang) => string;
};

const ContentContext = createContext<ContentContextValue | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ContentMap>({});
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const data = await fetchAllContent();
    setContent(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const getValue = useCallback(
    (key: string, lang: Lang): string => {
      const row: SiteContentRow | undefined = content[key];
      if (row) {
        return lang === 'bn' ? row.bn : row.en;
      }
      // Fallback to static translations
      const dict = fallback[lang];
      return (dict as unknown as Record<string, string>)[key] ?? '';
    },
    [content]
  );

  return (
    <ContentContext.Provider value={{ content, loading, refresh, getValue }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
}
