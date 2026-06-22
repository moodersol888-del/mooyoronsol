# MOOYOR — website

Meme-coin landing page for **$MOOYOR** (Moo Yor), the viral pygmy hippo,
themed as a Thai pork-roll (หมูยอ) — **cute cream + banana-leaf brand look** (real photos only). Solana.

- **Contract (CA):** `2pVbPdNLwYupwtE2DP7itPZVhnPMzUhqgRT7xgo6pump`
- **Chain / DEX:** Solana · PumpSwap (graduated from pump.fun)
- **Socials:** X [@mooyor_sol](https://x.com/mooyor_sol) · Telegram [t.me/mooyor_sol](https://t.me/mooyor_sol)

## Stack
Static site — plain HTML / CSS / vanilla JS. No build step, no dependencies.
Fonts: Baloo 2 (display/logo), Nunito (body), Mali (Thai), Space Mono (CA).
Hearts & leaves are an inline SVG `<symbol>` sprite (no emoji).

## Structure
```
site/
  index.html          single page
  style.css           design system + responsive
  app.js              copy-CA, mobile nav, scroll reveal, lightbox
  assets/img/
    cut/              die-cut transparent PNGs (rembg)
    photo/            optimized real photos (gallery / story)
    icon-*.png        favicon / app icons (from the newborn close-up)
    og-image.jpg      social share card
```

## Run locally
```
python3 -m http.server 8200 --directory site
# → http://localhost:8200
```

## Rebuilding images
Source photos live in the parent folder (`/Users/dre4m/MOOYOR/*.jpg|jpeg`).
Two helper scripts regenerate everything in `site/assets/img/`:
```
python3 process_images.py   # die-cuts (rembg) + optimized photos + icons
python3 make_leaf.py        # banana-leaf background textures (leaf.jpg / leaf-dark.jpg)
python3 make_og.py          # social share card
```

## Sections
Hero (logo + CA pill + die-cut costume hippo) · Why Everyone Loves MOOYOR (3 leaf cards) ·
The Story of MOOYOR (photo + text) · Timeline (4 steps) · Look at MOOYOR (carousel) ·
Join the Family (heart photo + CA) · Footer (links + socials).

> $MOOYOR is a community meme coin for entertainment only. Not financial advice.
