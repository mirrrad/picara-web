# PÍCARA — website prototype

First working draft of the PÍCARA jewellery website (silver and gold vermeil, nature motifs, designed in Madrid, sold EU-wide).

> **Status:** prototype. All prices, sizes, delivery times and photos are **placeholders**. The checkout is disabled. The real store will run on **Shopify**.

## Run it

No build step. Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

To publish a preview: GitHub → Settings → Pages → Deploy from branch `main`, folder `/ (root)`.

## Structure

```
index.html        Home: hero, ways to wear, collections, first pieces, story, facts, waitlist
shop.html         All products, filter by collection (?c=libelula)
product.html      Product page (?id=libelula-collar): finish selector, ways to wear, details, add to bag
about.html        Brand story (short, no founder bio for now)
assets/css/style.css   Design tokens (palette v2) + all styles
assets/js/i18n.js      UI copy in ES (primary), EN, DE
assets/js/catalog.js   Placeholder products, collections, line-drawing motifs
assets/js/app.js       Language switch, shared header/footer, rendering, cart drawer
assets/img/favicon.svg Monogram favicon
```

## Design system (from the brand work)

| Token | Hex | Use |
|---|---|---|
| Musgo | `#3E4A3A` | Hero colour, buttons, sections |
| Piedra | `#B8B0A3` | Warm fills, borders |
| Niebla | `#ECEAE5` | Page background |
| Bosque | `#20261F` | Text, dark sections |
| Liquen | `#5E6A54` | Second green, story blocks |
| Arcilla | `#8A5A44` | Optional accent (only on the prototype banner) |

Fonts (Google Fonts): **Hanken Grotesk** (wordmark at 300 with 0.42em tracking, body), **Instrument Serif** (headlines), **IBM Plex Mono** (small labels).

## Features in the prototype

- Language switch ES / EN / DE (saved per browser; also `?lang=en`).
- Cart drawer with quantities, finish (silver / vermeil) and subtotal, saved in the browser.
- Waitlist form (stores locally only; replace with Shopify customer form or Klaviyo).
- Responsive down to phone width; keyboard and screen-reader basics (labels, aria, focus).
- `noindex` on every page, so search engines skip the prototype.

## Path to Shopify (Online Store 2.0)

| Prototype | Shopify |
|---|---|
| `catalog.js` products | Shopify products + variants (Finish: Plata 925 / Vermeil oro) |
| `ways` per product | Product metafield `custom.ways_to_wear` (list: short, long, bracelet, earring) |
| Collections | Shopify collections (Libélula, Mariposa, Mariquita, Escarabajo …) |
| `i18n.js` | Theme locale files + Translate & Adapt for ES / EN / DE |
| Cart drawer | Theme cart drawer (AJAX Cart API) |
| Waitlist | `{% form 'customer' %}` newsletter form |
| Sections on home | Theme sections: hero, ways-to-wear, collection-grid, featured-products, story, facts, newsletter |

Suggested route: start from Shopify's free **Dawn** theme, add the design tokens to `base.css`, and rebuild the custom sections (ways-to-wear, story, facts) as section files.

## Open items (from the brand project)

- Tagline final choice (current: "Lo natural, a tu manera").
- Full motif list for the 15 launch pieces.
- Gold karat of vermeil (14K is a placeholder).
- Real prices, sizes, photos, shipping terms, legal pages.
- Never state the production country. Use "Diseñado en Madrid" and "Hecho a mano".
