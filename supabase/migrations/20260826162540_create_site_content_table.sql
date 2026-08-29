/*
# Create site content table for admin-editable content

1. New Tables
- `site_content`
  - `key` (text, primary key) — unique identifier for each content field, e.g. 'hero.headline'
  - `en` (text) — English value
  - `bn` (text) — Bengali value
  - `category` (text) — grouping for the admin panel: 'nav', 'hero', 'reel', 'about', 'services', 'contact', 'footer', 'settings'
  - `field_type` (text) — input type hint: 'text', 'textarea', 'url', 'image'
  - `label` (text) — human-readable label shown in the admin panel
  - `sort_order` (int) — display order within a category
  - `updated_at` (timestamptz) — last modification time

2. Security
- Enable RLS on `site_content`.
- SELECT: allow anon + authenticated (public site must read without login).
- INSERT/UPDATE/DELETE: authenticated only (admin panel writes).

3. Notes
- The public site reads all rows and builds a content map keyed by `key`.
- The admin panel groups rows by `category` and renders inputs based on `field_type`.
- Bengali replaces Portuguese as the second language.
*/

CREATE TABLE IF NOT EXISTS site_content (
  key text PRIMARY KEY,
  en text NOT NULL DEFAULT '',
  bn text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'general',
  field_type text NOT NULL DEFAULT 'text',
  label text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_read_site_content" ON site_content;
CREATE POLICY "anon_read_site_content"
  ON site_content FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_site_content" ON site_content;
CREATE POLICY "auth_insert_site_content"
  ON site_content FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_site_content" ON site_content;
CREATE POLICY "auth_update_site_content"
  ON site_content FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_site_content" ON site_content;
CREATE POLICY "auth_delete_site_content"
  ON site_content FOR DELETE
  TO authenticated USING (true);

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS site_content_updated_at ON site_content;
CREATE TRIGGER site_content_updated_at
  BEFORE UPDATE ON site_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
