# SkinByWura — React rebuild

A from-scratch React + Vite rebuild of the original HTML/Tailwind/JS SkinByWura site,
restyled as a bolder, Gen-Z-leaning cosmetics e-commerce experience.

## What changed from the original

- **Stack:** plain HTML/Tailwind/vanilla JS → React (Vite) + React Router + hand-written CSS (no Tailwind).
- **Design:** restyled around a custom token system (peach/coral/lime/emerald/ink) with a
  signature scrolling "ticker" band, sticker-style offset shadows, and Fraunces + Inter type pairing.
  See `src/styles/tokens.css` for the full palette and `/mnt/skills` design brief this followed.
- **Architecture:** cart, wishlist and auth state live in React Context (`src/context`) and read/write
  through a single `src/lib/api.js` module. Everything currently persists to `localStorage`, but every
  function returns a Promise — swap the body of each function for a real `fetch()` call when a backend
  is ready, and no component code needs to change.
- **Pages:** Home, Products (filter + sort + search), Product detail, About, Contact, Reviews,
  Login, Signup, Forgot password, Profile, Settings, 404.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/   Header, Footer, CartDrawer, ProductCard, Ticker
  context/      CartContext, AuthContext
  data/         products.js, reviews.js (swap for API calls later)
  lib/          api.js (storage/backend abstraction), format.js
  pages/        one file + matching CSS per route
  styles/       tokens.css (design tokens), global.css (shared layout/utility classes)
```

## Next steps if you wire up a real backend

1. Replace the bodies of the functions in `src/lib/api.js` with `fetch()` calls to your API.
2. Replace `src/data/products.js` with a call to `fetchProducts()` (e.g. inside `Products.jsx`
   and `Home.jsx`, fetch into state instead of importing the static array directly).
3. Add real checkout/payment handling where `CartDrawer.jsx` currently has a static "Checkout" button.
