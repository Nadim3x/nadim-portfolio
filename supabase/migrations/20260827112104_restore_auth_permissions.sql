/*
# Restore standard Supabase Auth permissions

1. Purpose
- A previous REVOKE on auth.users broke the GoTrue auth service, causing "Database error querying schema" on every sign-in attempt.
- This restores the standard Supabase grants that the auth service requires.

2. Modified system objects
- `auth.users` — grants SELECT, INSERT, UPDATE, DELETE to `anon` and `authenticated` roles.
- `auth.identities` — grants SELECT, INSERT, UPDATE, DELETE to `anon` and `authenticated` roles.

3. Security
- These are the standard Supabase permissions. The auth service (GoTrue) connects as the `authenticator` role, which inherits from `anon`/`authenticated`.
- Without these grants, NO auth operations work — sign-in, sign-up, token refresh all fail.
- Sign-up is still blocked at the application level (no sign-up UI, admin email allowlist).

4. Important notes
- This does NOT re-enable public sign-ups. The Supabase dashboard setting for "Enable email signup" is separate from table-level grants.
- The application frontend has no sign-up form and rejects all emails except the admin email.
*/

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE auth.users TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE auth.identities TO anon, authenticated;
