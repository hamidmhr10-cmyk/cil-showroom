# LURIXA — Showroom Website

A complete, production-ready, multi-page showroom site for **LURIXA** — a UK home interiors and lighting brand based in Luton, Bedfordshire.

Built as a **self-contained static site** (HTML + CSS + vanilla JS). **Zero external image dependencies** — every product visual is generated with CSS gradients and inline SVG. The only external requests are Google Fonts (Playfair Display, Inter, Cormorant Garamond).

## Pages

| File | Page |
|------|------|
| `index.html` | Home — hero, showroom split, why-choose pillars, new-arrivals carousel, newsletter |
| `lighting.html` | Lighting showroom — 16 products, category filtering, detail/enquiry modals |
| `furniture.html` | Furniture showroom — 12 products, category filtering, detail/enquiry modals |
| `about.html` | About + contact form, mission/process/promise, "how we work" timeline |

Shared assets: `styles.css` (all styling, CSS variables) and `main.js` (product data, SVG art generators, nav/footer injection, filtering, modals, scroll animations, mobile menu).

## Features

- Luxury editorial design: dark/gold lighting theme, warm/navy furniture theme
- Sticky glass navigation (backdrop blur on scroll) + mobile slide-in drawer
- Client-side category filtering (instant, no reload); deep-links via hash (e.g. `lighting.html#chandeliers`)
- Product detail + enquiry modals with WhatsApp deep link and inline "thank you" confirmation
- Scroll-triggered fade-in animations (IntersectionObserver), respects `prefers-reduced-motion`
- Fully responsive (375 / 768 / 1280 / 1440px), WCAG-minded contrast and aria labels

## Run locally

It's plain static files — serve the folder with any static server:

```bash
# Node (zero dependencies, included)
node server.js          # http://localhost:4321

# or any static server, e.g.
npx serve .
python -m http.server 8000
```

You can also just open `index.html` directly in a browser (navigation and rendering work from `file://`).

## Deploy

Drag-and-drop the folder to **Netlify**, or for **Vercel** run `vercel` in this directory (it auto-detects a static site). No build step or configuration required.

## Editing products

All product data lives in the `LIGHTING` and `FURNITURE` arrays near the top of `main.js`. Add or edit entries there — name, price, description, dimensions, finishes, suitable rooms, UKCA status, and which SVG illustration (`art`) to use.

---

© 2026 LURIXA — a trading name of Commercial Improvements Ltd. Registered in England and Wales.
Luton, Bedfordshire, LU2 8DL · +44 7402 176349 · info@improvemental.co.uk
