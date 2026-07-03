---
name: design-preview
description: Preview homepage/UI changes locally with screenshots at mobile and desktop widths before committing. Use whenever iterating on the homepage, hero, nav, or any visual change — instead of deploying to see the result.
---

# Design preview — see it before you ship it

History: `app/page.tsx` has 29 commits, including four full redesigns in three days, two "Final" commits that weren't, and a hero image flip-flopped three times in one day — all because iteration happened via deploy-and-look. Break that loop: render locally, screenshot both breakpoints, show the user, get a decision, *then* commit once.

## Steps

1. Start the dev server if not running: `npm run dev &` (wait for ready on http://localhost:3000).
2. Screenshot both breakpoints with the pre-installed Chromium (`PLAYWRIGHT_BROWSERS_PATH` is set; never run `playwright install`). Example script:

   ```js
   // screenshot.mjs — run with: node screenshot.mjs <path> <outdir>
   import { chromium } from 'playwright';
   const [, , path = '/', outdir = '.'] = process.argv;
   const browser = await chromium.launch();
   for (const [name, viewport] of [
     ['mobile', { width: 390, height: 844 }],
     ['desktop', { width: 1440, height: 900 }],
   ]) {
     const page = await browser.newPage({ viewport });
     await page.goto(`http://localhost:3000${path}`, { waitUntil: 'networkidle' });
     await page.screenshot({ path: `${outdir}/${name}.png`, fullPage: true });
   }
   await browser.close();
   ```

   If the project's Playwright version complains about the browser, launch with `executablePath: '/opt/pw-browsers/chromium'`.
3. **Send both screenshots to the user** (SendUserFile) and wait for a pick before committing. For A/B choices (e.g. hero image variants), screenshot each variant and present them side by side rather than committing one, reverting, and committing another.
4. Check both breakpoints on every layout change — past regressions came from fixing desktop and breaking mobile (and vice versa).
5. Commit once, after approval. No "Final polish" commits followed by more polish.
