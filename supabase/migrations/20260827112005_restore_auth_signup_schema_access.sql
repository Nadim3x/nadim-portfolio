/*
# Restore Supabase Auth schema access

1. Purpose
- Restores the built-in permission that Supabase Auth requires when processing email/password sign-ins.

2. Modified system object
- `auth.users`
- Restores INSERT permission for the `anon` database role.

3. Security
- The application no longer exposes a sign-up screen and rejects every email except the configured admin email.
- The `auth` schema is not exposed through the public Data API in this project; this permission is required internally by Supabase Auth.

4. Important notes
- A previous manual permission change caused Supabase Auth to return “Database error querying schema”.
- This migration only restores the permission and does not create additional users.
*/

GRANT INSERT ON TABLE auth.users TO anon;
