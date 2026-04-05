# Kin & Stone — EmDash Shop Template

A premium, editorial **shop template** for [EmDash CMS](https://emdashcms.com) built on Astro 6 and deployed to Cloudflare Workers with D1 + R2. Think Everlane / Aesop / Kinfolk — clean typography, mobile-first, minimal JavaScript.

> ⚠ **This is a demo storefront template, not a functional store.**
> The cart and checkout button are decorative (localStorage only). No real payments are processed.
> To enable real checkout, connect a payment provider such as **Stripe**, **Snipcart**, or **Shopify Buy Buttons**.

---

## Deploy to Cloudflare

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/awebsomestuff/emdash-template-shop)

One click provisions the Worker, a D1 database, and an R2 bucket, then walks you through the first deploy.

---

## What's inside

- **Homepage** — editorial hero, featured products, category showcase, lookbook strip, newsletter
- **Catalog** (`/shop`) — filterable by category + tag + sort, server-side via URL query params
- **Product detail** (`/shop/[slug]`) — gallery, decorative variant selectors, tabs, related products
- **Category archives** (`/category/[slug]`) — hierarchical product categories
- **Cart** (`/cart`) — localStorage preview cart with a prominent demo notice
- **Pages** (`/pages/[slug]`) — About, Shipping & Returns, FAQ, Journal
- **Search** — live search across products + pages
- **Dark mode** — persisted via cookie, system preference as default
- **Vanilla CSS** — no Tailwind, single `theme.css` with design tokens
- **Google Fonts** — Fraunces (display serif) + Inter (UI sans)

## Collections

| Collection | Purpose |
|---|---|
| `products` | title · price · compare_at_price · sku · in_stock · is_featured · short_description · long_description (Portable Text) · featured_image + 3 gallery slots |
| `pages` | title · content (Portable Text) — About, FAQ, policies, journal |

## Taxonomies

- `product_category` — hierarchical: Apparel (Shirts, T-Shirts, Outerwear, Knitwear) · Home (Ceramics, Textiles) · Accessories
- `product_tag` — flat: sizes (S–XL) · colors · materials (linen, cotton, wool, ceramic, leather)

## Demo content

16 products and 4 pages for the fictional **Kin & Stone** brand — small-batch apparel and home goods. All imagery is served from Unsplash via `$media` references and downloaded on seed.

---

## Manual install (if you'd rather not use the Deploy button)

```bash
# 1. Install dependencies
npm install

# 2. Create your D1 database and paste the returned ID into wrangler.jsonc
wrangler d1 create emdash-template-shop

# 3. Create the R2 bucket
wrangler r2 bucket create emdash-template-shop-media

# 4. Seed the database
npx emdash seed seed/seed.json

# 5. Run locally
npm run dev

# 6. Deploy
npm run deploy
```

The admin UI is available at `/_emdash/admin` on both dev and production.

---

## Connecting a real payment provider

This template is intentionally storefront-only. To enable checkout, pick the option that fits your scale:

- **[Stripe Checkout](https://stripe.com/payments/checkout)** — add a server endpoint that creates a Checkout Session from the cart, redirect to Stripe. Best for full control.
- **[Snipcart](https://snipcart.com)** — add the Snipcart script and a few `data-item-*` attributes to the Add-to-cart button in `src/components/AddToCartButton.astro`. Easiest migration path — the rest of the template keeps working.
- **[Shopify Buy Button](https://www.shopify.com/buy-button)** — embed Shopify's JS SDK to mirror your existing Shopify catalog into this storefront.

The places to touch:

- `src/components/AddToCartButton.astro` — swap the localStorage push for your provider's client API.
- `src/components/CartTable.astro` — replace the localStorage render with your provider's cart state.
- `src/pages/cart.astro` — remove the demo notice, enable the Checkout button.

---

## Stack

- **Astro 6** (server-rendered, no `getStaticPaths`)
- **EmDash CMS** (Portable Text, live content loader, visual editing)
- **Cloudflare Workers** (D1 SQLite + R2 media)
- **Vanilla CSS** (design tokens + component styles in `src/styles/theme.css`)
- **React** (only for EmDash's admin + LiveSearch widget)

## License

MIT. Fork it, reskin it, ship your shop.
