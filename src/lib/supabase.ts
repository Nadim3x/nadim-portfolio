import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type SiteContentRow = {
  key: string;
  en: string;
  bn: string;
  category: string;
  field_type: string;
  label: string;
  sort_order: number;
  updated_at: string;
};

export type ContentMap = Record<string, SiteContentRow>;

export async function fetchAllContent(): Promise<ContentMap> {
  const { data, error } = await supabase
    .from('site_content')
    .select('*')
    .order('category', { ascending: true })
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Failed to fetch content:', error.message);
    return {};
  }

  const map: ContentMap = {};
  for (const row of data as SiteContentRow[]) {
    map[row.key] = row;
  }
  return map;
}

export async function updateContentRow(
  key: string,
  values: { en?: string; bn?: string }
): Promise<boolean> {
  const updates: Record<string, string> = {};
  if (values.en !== undefined) updates.en = values.en;
  if (values.bn !== undefined) updates.bn = values.bn;

  const { error } = await supabase
    .from('site_content')
    .update(updates)
    .eq('key', key);

  if (error) {
    console.error('Failed to update content:', error.message);
    return false;
  }
  return true;
}
