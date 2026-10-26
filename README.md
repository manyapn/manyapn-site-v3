# manyapn.com, the pixel-watercolor one

Personal site. Every page opens on a landscape (washington, plus everest) run
through a small pixel-watercolor script, and that landscape tints the page.

## stack

- Next.js 16 (App Router, static export)
- Tailwind CSS v4 for the reset, plain CSS for everything else
- Framer Motion for the nav marker, the hover lens, and the paint-chip deck
- Fonts, self-hosted: Besley (display), Hanken Grotesk (body), Pixelify Sans (labels)
- Icons: Lucide (ISC) and Simple Icons (CC0), inlined in `src/icons`

## routes

| path | page |
|---|---|
| `/` | home, paradise at mt. rainier |
| `/now` | what i'm up to, seattle from kerry park |
| `/experiences` | timeline, everest |
| `/projects` | paint-chip deck, diablo lake |
| `/2cents` | writing, the palouse |

## the paintings

`scripts/pixwc.py` turns a photo into two files: a 240 px pixel painting (`public/land/<key>.png`)
and the smooth watercolor pass it was made from (`public/land/<key>.jpg`). The hover lens on each
hero reveals the second through the first.

```bash
# needs pillow, numpy, scipy
python3 scripts/pixwc.py photo.jpg <key> 2.2 0.5 240
```

Arguments: source, key, crop aspect, vertical anchor (0 top … 1 bottom), pixel width.
Then add an entry to `src/data/landscapes.ts` with the place, a pigment-named accent, and the credit.

Photos come from Wikimedia Commons; credits are listed in the footer and in `src/data/landscapes.ts`.

## dev

```bash
npm install
npm run dev
```

> try the konami code: ↑↑↓↓←→←→BA
