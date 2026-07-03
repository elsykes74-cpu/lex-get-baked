# CLAUDE.md

Lex Get Baked — a luxury cookie-shop site for Lex (Westfield, MA). Next.js 14 App Router + TypeScript (strict) + Tailwind + Supabase + Stripe, deployed on Vercel at https://lex-get-baked.vercel.app.

## Commands

- `npm run dev` — dev server
- `npm run build` — production build (this is also the only TypeScript check; tsconfig is `noEmit`)
- `npx tsc --noEmit` — standalone typecheck (fast; run this before every push)
- `npm run lint` — ESLint via next lint
- There are **no tests**. Verification = typecheck + build + looking at the running app.

## Before every push (non-negotiable)

Three separate Vercel deploys have broken on errors that `tsc` or `next build` would have caught locally (Recharts tooltip types, Stripe `appearance.theme` type, module-scope `STRIPE_SECRET_KEY` at build time). Always run `npx tsc --noEmit && npm run build` before pushing. Use the `/preflight` skill.

## Environment variables

All four must be documented in `.env.local.example` and set in Vercel:

| Var | Used in | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `lib/supabase.ts` | Falls back to a placeholder so builds pass without it |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `lib/supabase.ts` | Same placeholder-fallback pattern |
| `STRIPE_SECRET_KEY` | `app/api/create-payment-intent/route.ts` | Server-only. Lazily instantiated **inside** the handler with a 503 guard |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `app/checkout/page.tsx` | Client-side `loadStripe` |

**Rule:** never instantiate an SDK client (Stripe, Supabase, etc.) at module scope with a required env var. Vercel builds without secrets present; use lazy init inside the handler or the placeholder-fallback pattern in `lib/supabase.ts`.

## Supabase

- Single anon-key client in `lib/supabase.ts` (no service-role client anywhere).
- Tables: `menu_items`, `orders`, `order_items`, `custom_orders`. Storage bucket: `menu-images` (admin photo uploads).
- Migrations are **manual**: `supabase/schema.sql` + `supabase/migrations/*.sql` are pasted into the Supabase SQL Editor. There is no Supabase CLI setup.
- **Free-tier gotcha:** the project (`aaefpvrsqgakdkryhpdj`) gets paused. If every query fails, check the Supabase dashboard and restore the project before debugging code. Use the `/supabase-status` skill.
- RLS is intentionally wide open ("lock down before production" — still pending). `app/admin` has **no authentication at all**. Do not present the admin panel as secure; flag this whenever touching admin or RLS.

## Git & deploy workflow

- Work on **one** session branch, open a PR, and merge via the GitHub UI. The merge commit is authored by the user's GitHub account, which satisfies Vercel's authorized-committer check and triggers the deploy.
- **Never** re-apply the same change to `main` through the GitHub API/web while it also lives on a session branch. That dual-write created duplicate parallel histories in June 2026 and required a 1,083-line recovery merge. One change = one commit on one branch.
- Never create empty "trigger redeploy" commits. If a deploy doesn't fire, the fix is in Vercel's Git settings (authorized committers / deploy hooks), not in git history.
- Don't commit `.vercel/` internals, `__pycache__/`, or `*.pyc`.

## Editing conventions

- **Edit, don't rewrite.** Rewriting `app/admin/page.tsx` once deleted the entire Add/Edit/Delete CRUD, which had to be re-implemented the same day. When changing a large page, make targeted edits and confirm existing features survive (admin CRUD, expandable orders, charts; checkout's 3-step flow).
- After layout changes to the homepage/hero, check **both** mobile (~390px) and desktop (~1440px); several regressions shipped by fixing one and breaking the other. Use the `/design-preview` skill instead of deploying to see changes.
- Fonts load via CSS `@import` in `app/globals.css` (Cormorant = `--font-display`, Montserrat = `--font-body`), **not** `next/font`. Design tokens (plum/lavender/blush/rosegold/gold/pearl palettes, glass shadows, gradients, animations) live in `tailwind.config.ts` and `globals.css` — extend those rather than inlining new colors.
- `next/image` remote patterns only allow `images.unsplash.com`; product photos are local files in `public/products/` (prefer the `.png` variants), portrait `public/lex.png`, hero video in `public/media/`.
- `lib/menu-data.ts` (static fallback menu) and `DbMenuItem` in `lib/supabase.ts` are **different shapes** — keep both in sync when adding menu fields.
- Cart state lives in `lib/cart-context.tsx` and persists to `localStorage`.

## Design direction

The look is settled: luxury editorial, Apple×Glossier×Linear, Cormorant display type, glassmorphism cards, gold/rosegold accents. Don't propose full redesigns; iterate within this system. The hero circle image is the gourmet stuffed cookie (`public/products/stuffed-cookie-hero.png`, `objectPosition: center 30%`) — this was flip-flopped three times, so confirm with the user before changing it again.
