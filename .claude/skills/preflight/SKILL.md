---
name: preflight
description: Run before every git push or PR — typecheck, build, and scan for the env-var patterns that have broken Vercel deploys in this repo. Use when about to push, when asked "is this safe to deploy", or after any change to app/api, checkout, or lib.
---

# Preflight — deploy-safety gate

This repo has no CI history of its own failures being caught early: three separate Vercel builds broke on things a local check would have caught. Run all steps; do not push if any fail.

## Steps

1. **Typecheck:** `npx tsc --noEmit` — must exit 0.
2. **Build:** `npm run build` — must complete. This is the exact check Vercel runs, including with env vars absent.
3. **Module-scope secret scan** (the class of bug behind the Stripe build break):

   ```bash
   grep -rn "process.env" app lib components --include='*.ts' --include='*.tsx' | grep -v NEXT_PUBLIC
   ```

   Any server-only env var (like `STRIPE_SECRET_KEY`) must be read **inside** a handler/function, never at module scope, and must have a missing-value guard. `NEXT_PUBLIC_*` vars at module scope need a fallback (see `lib/supabase.ts` placeholder pattern).
4. **Feature-survival check** if you edited a large page wholesale: confirm `app/admin/page.tsx` still has Add/Edit/Delete menu CRUD, order status updates, expandable order details, and charts; confirm `app/checkout/page.tsx` still has the 3-step Cart → Delivery → Pay flow.

## On failure

Fix locally and re-run. Never push a failing build and "let Vercel tell us" — every broken deploy here has cost a fix-commit cycle on main.
