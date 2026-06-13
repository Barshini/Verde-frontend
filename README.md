# VÉRDE Horology

A luxury watch e-commerce site built with React, TypeScript, Vite, Tailwind CSS, and wouter.

## Getting Started (VS Code / local)

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set `VITE_API_BASE_URL` once your backend is ready.

3. **Run the dev server**
   ```bash
   npm run dev
   ```
   The app will be available at http://localhost:5173

4. **Build for production**
   ```bash
   npm run build
   npm run preview
   ```

5. **Type-check**
   ```bash
   npm run typecheck
   ```

## Project Structure

```
src/
  assets/images/   Static images
  components/      Reusable UI and layout components
  context/         Global app state (cart, wishlist, currency, user)
  hooks/           Custom React hooks
  lib/             Utilities, static data, API config
  pages/           Route-level page components (26 pages)
  App.tsx          Route definitions
  main.tsx         App entry point
  index.css        Global styles / Tailwind theme
```

## Pages (25 routes + 404)

Landing, Collections, Product, View360, Heritage, Craftsmanship, LimitedEditions,
Bespoke, Boutiques, Login, Register (Login w/ register tab), Cart, Wishlist,
Checkout, OrderConfirmation, Dashboard, FAQ, Contact, Press, About,
Sustainability, OrderTracking, CareGuide, PrivateViewing, PrivacyPolicy,
TermsOfSale, ShippingReturns, plus a catch-all NotFound (404) page.

All pages are wired into the router in `src/App.tsx` — there are no orphan
or unreferenced pages.

## Production-readiness notes

- **Form validation**: Checkout and Contact forms have full client-side
  validation with inline error messages, touched-state tracking, and
  `aria-*` attributes.
- **Loading states**: `src/components/common/Skeleton.tsx` provides
  skeleton placeholders for use once real data is fed from a backend.
- **Error boundaries**: `src/components/common/ErrorBoundary.tsx` wraps the
  app router so a broken component shows a recovery screen instead of a
  blank page.
- **Accessibility**: Forms use labels (including `sr-only` labels),
  `aria-label`, `aria-invalid`/`role="alert"` error messaging,
  `aria-current` for navigation state, and keyboard-operable controls.
- **API integration**: `src/lib/api.ts` centralizes the API base URL via
  `VITE_API_BASE_URL` so a backend team can plug in their endpoint by
  setting one environment variable. The live currency conversion endpoint
  is also configurable via `VITE_EXCHANGE_RATE_API_URL`.

## Notes on changes from the Replit export

- Removed Replit-only Vite plugins (`@replit/vite-plugin-*`) and the
  `PORT` / `BASE_PATH` / `REPL_ID` environment requirements — the app now
  runs with sensible defaults (`npm run dev` → port 5173).
- Replaced monorepo "catalog:"/"workspace:*" package versions with pinned
  npm registry versions.
- Added a standalone `tsconfig.json` (no longer extends a missing
  `tsconfig.base.json`).
- Added `.env.example`, `.gitignore`, and this README.
- Added small CSS utilities (`hover-elevate` / `active-elevate-2`) that
  were previously injected by Replit's dev tooling plugins.
- Fixed placeholder "built on Replit" SEO meta description in
  `index.html`.
