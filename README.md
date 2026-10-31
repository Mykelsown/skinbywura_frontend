# SkinByWura storefront

React 18 + Vite. Talks to the Go API through relative `/api/...` calls.

## Run locally

1. Start the API on port 8080 (see the backend repo).
2. `npm install`
3. `npm run dev` and open http://localhost:5173. Vite proxies `/api` to the API.

## Build

`npm run build` writes the site to `dist/`.

## Configuration

Copy `.env.example` to `.env.local`. All `VITE_` values are optional: anything empty is hidden, so the site never shows made-up details. See `CONTENT_CHECKLIST.md` for what to fill in before launch.

## Deploy

Hosted on Vercel. `vercel.json` forwards `/api/*` to the Render API and falls back to `index.html` for page refreshes. Replace the placeholder Render address in `vercel.json` first. Full steps are in the backend repo's `DEPLOY.md`.

## Where things live

- `src/lib/api.js`: every network call.
- `src/config/site.js`: contact details, social links, payment note, reviews switch.
- `src/context/`: sign-in state and the cart.
- `public/images/`: product and page images.
