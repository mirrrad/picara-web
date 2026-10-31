# PÍCARA – website prototype

First working draft of the PÍCARA website. Static HTML, CSS and plain JavaScript. No build step.

> **Prototype.** All prices, sizes, stock and photos are placeholders. Checkout is disabled.
> The production shop will run on **Shopify**. This repo is the design and content reference for that theme.

## Run it

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

### Publish a preview (GitHub Pages)

Repo **Settings → Pages → Source: Deploy from a branch → `main` / root**. The site is then live at `https://<user>.github.io/picara-web/`.
Note: Pages on a private repo needs a paid GitHub plan. Otherwise use Netlify / Cloudflare Pages (drag-and-drop the folder).

## What is in it

| File | Purpose |
|---|---|
| `index.html` | Home: hero, ways to wear, collections, first pieces, story, quality facts, waitlist |
| `shop.html` | All products, filter by collection (`?c=libelula`) |
| `product.html` | Product page (`?id=libelula-collar`): finish selector (silver / vermeil), ways to wear, details, add to bag |
| `about.html` | Brand story (short version) |
| `assets/css/style.css` | All styles and the palette tokens |
| `assets/js/i18n.js` | All UI copy in ES / EN / DE |
| `assets/js/catalog.js` | Collections, products (placeholders), motif line drawings |
| `assets/js/app.js` | Language switch, shared header/footer, rendering, cart drawer |

Features:

- Language switch ES / EN / DE. Remembered per browser. Also `?lang=en`.
- Cart drawer with quantities and subtotal, stored in the browser (`localStorage`).
- Waitlist form (stores locally only; to be replaced by Shopify customer form or Klaviyo).
- Responsive down to phone width. Keyboard and screen-reader basics (real buttons, labels, focus states, Esc closes the bag).

## Brand rules in the code

- **Palette (v2, approved):** Musgo `#3E4A3A`, Piedra `#B8B0A3`, Niebla `#ECEAE5`, Bosque `#20261F`, Liquen `#5E6A54`. Arcilla `#8A5A44` is optional (only used for the prototype notice bar).
- **Type:** Hanken Grotesk (wordmark 300, wide tracking 0.42em; body), Instrument Serif (headlines), IBM Plex Mono (small labels only).
- **Copy rules:** say "Diseñado en Madrid" / "Hecho a mano". Never name the production location. Never say "Made in Spain".
- No yellow, no bright colours.

## Path to Shopify (Phase 4)

1. Start from Shopify's **Dawn** theme (free, OS 2.0).
2. Port `style.css` tokens into the theme settings / a custom CSS file.
3. Rebuild each home section as a Shopify section (`sections/*.liquid`) so Palmira can edit text and images in the theme editor.
4. Products: use Shopify **variants** for finish (Plata 925 / Vermeil) and a **metafield** (list) for ways to wear (`short`, `long`, `bracelet`, `earring`) to drive the ways-to-wear block.
5. Languages: **Shopify Markets** + **Translate & Adapt** for ES / EN / DE.
6. EU legal pages: right of withdrawal (14 days), privacy, legal notice, shipping; OSS VAT; GPSR product info; nickel statement.

## Placeholders to replace

- Product list, prices, vermeil surcharge, sizes, chain lengths → `assets/js/catalog.js`
- Free-shipping threshold (80 €) and delivery times → `assets/js/i18n.js`
- Gold karat of the vermeil (14K is a placeholder) → `i18n.js` `materials_text`
- All `[FOTO …]` placeholders → real photography
