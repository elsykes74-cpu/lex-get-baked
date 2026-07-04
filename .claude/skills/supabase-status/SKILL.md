---
name: supabase-status
description: Diagnose Supabase problems in this repo — paused free-tier project, missing tables, missing menu-images bucket, unapplied manual migrations. Use FIRST whenever menu items don't load, orders fail to save, or admin uploads break, before touching any code.
---

# Supabase status check

The `aaefpvrsqgakdkryhpdj` project is on the free tier and **gets paused** (only 2 projects can be active). A paused project makes every query fail in ways that look like code bugs. Check infrastructure before debugging code.

## Steps

1. **Is the project live?** If the Supabase MCP tools are available, use `get_project` / `list_projects` to check status; otherwise curl the REST endpoint:

   ```bash
   curl -s -o /dev/null -w '%{http_code}' "$NEXT_PUBLIC_SUPABASE_URL/rest/v1/" -H "apikey: $NEXT_PUBLIC_SUPABASE_ANON_KEY"
   ```

   A paused project won't return 200. If paused: tell the user to restore it from the Supabase dashboard (they may need to pause one of their other 2 active projects first). Do not change code for this.
2. **Do the tables exist?** The app assumes `menu_items`, `orders`, `order_items`, `custom_orders`. If missing, the fix is manual: the user (or Supabase MCP `apply_migration`) runs `supabase/schema.sql`, then `supabase/migrations/002_lex_menu_items.sql` (real menu seed) in the SQL Editor. There is no CLI migration setup.
3. **Does the `menu-images` storage bucket exist?** Admin photo upload (`app/admin/page.tsx`) requires it, public-read.
4. **Env vars set?** `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` locally and in Vercel. The code falls back to placeholders so the build passes but every query silently fails — an empty menu with no errors usually means placeholder creds or a paused project.
5. Remember: RLS is intentionally open and `/admin` is unauthenticated. If the task is "lock down before production", that means adding RLS policies + admin auth, not just closing the dashboard.
