---
name: manya pradeep narayan
description: a personal site painted in pixels, with one pigment per page
colors:
  paper: "#f5f3ee"
  paper-2: "#ece9e1"
  paper-3: "#e1ddd2"
  ink: "#23303a"
  muted: "#535e67"
  line: "#d8d4c9"
  rose-madder: "#b25e7e"
  cobalt: "#3a6fa6"
  viridian: "#3f8f98"
  yellow-ochre: "#b08a3a"
  lavender: "#7a81b6"
  sienna: "#b4683f"
  sap-green: "#5f8f45"
  paynes-grey: "#4a5b6b"
  cerulean: "#4e8fbf"
  sunset-paper: "#f7eee0"
  sunset-paper-2: "#efe3cf"
  sunset-paper-3: "#e6d7bd"
  sunset-line: "#ddcfb6"
  terminal-ink: "#cfe3d2"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(2.1rem, 4.6vw, 3rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontVariation: "'opsz' 144"
  headline:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "1.45rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.01em"
    fontVariation: "'opsz' 48"
  title:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "1.3rem"
    fontWeight: 500
    lineHeight: 1.2
  body:
    fontFamily: "Instrument Sans, system-ui, sans-serif"
    fontSize: "16.5px"
    fontWeight: 400
    lineHeight: 1.7
  lede:
    fontFamily: "Instrument Sans, system-ui, sans-serif"
    fontSize: "1.1rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Pixelify Sans, monospace"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.01em"
rounded:
  none: "0px"
spacing:
  hair: "4px"
  xs: "0.35rem"
  sm: "0.6rem"
  md: "1rem"
  lg: "1.6rem"
  xl: "2.6rem"
  section: "3.5rem"
  gutter: "20px"
  wrap: "860px"
  frame: "1120px"
components:
  paper-tag:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.display}"
    rounded: "{rounded.none}"
    padding: "0.7rem 1rem 0.65rem"
  paper-card:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "1.2rem 1.3rem"
  pixel-chip:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.15rem 0.6rem"
  tag-button:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.25rem 0.6rem"
  tag-button-pressed:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink}"
  nav-button:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.3rem 0.55rem"
    height: "44px"
  toast:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.7rem 1.1rem"
---

# Design System: manya pradeep narayan

## 1. Overview

**Creative North Star: "The Paint Chip Rack"**

Everything on the site behaves like objects you could pick up in the paint aisle: cold-pressed paper, hard-edged pigment shadows, little pixel labels, and a landscape at the top of every page painted in 240 pixels. The site is warm and unhurried. Nothing is rounded, nothing glows, and nothing is glassy. Depth comes from one offset block of pigment behind a piece of paper, never from blur.

Each page owns one pigment taken from its landscape (rose madder for home, lavender for now, cobalt for experiences, viridian for projects, yellow ochre for 2cents). That pigment flows through the `--accent` variable into link underlines, hover lenses, pin rings, shadows and highlights, so a page feels tinted rather than themed. Copy is lowercase and first person. Labels, captions and metadata set in the pixel face carry the personality; the reading text stays quiet.

It explicitly rejects: dark mode as an afterthought, terminal and ASCII chrome, portfolio card grids with rounded corners and grey shadows, and borrowed brand colors from other sites.

**Key characteristics:**
- Pixels always. Photos and paintings are pixelated live on canvas; the real image is a reward for pressing.
- One pigment per page, applied through one CSS variable.
- Hard pigment shadows (`Npx Npx 0 var(--accent)`) are the only elevation.
- Generous vertical space, body line-height 1.7, no decoration where whitespace will do.
- Motion animates transform and opacity only; springs follow the pointer, pixel steps fill things in.
- Sunset mode warms the paper and repaints the heroes in a gradient map around golden hour in Ithaca.

## 2. Colors: Paper and Pigment

Three sheets of paper, one ink, and nine watercolor pigments that take turns.

### Primary
- **Page pigment (`--accent`)**: not a fixed color. Each page sets it from its landscape. Use it for the hero card shadow, link underline, the hover lens, pin rings, `::selection`, and focus outlines. Washes derive from it: `--wash` at 26% and `--wash-strong` at 42% in oklab, `--link` is the pigment mixed 78% into ink so links stay readable.
- **Rose madder** (#b25e7e): home.
- **Lavender** (#7a81b6): now, and the research category.
- **Cobalt** (#3a6fa6): experiences, the default accent, and the internship category.
- **Viridian** (#3f8f98): projects.
- **Yellow ochre** (#b08a3a): 2cents, and the club category.

### Secondary
- **Sap green** (#5f8f45): the "current" marker on the timeline.
- **Sienna** (#b4683f), **cerulean** (#4e8fbf): extra pigments for paint chips and washes.
- **Payne's grey** (#4a5b6b): the cat.

### Neutral
- **Paper** (#f5f3ee): page background. **Paper 2** (#ece9e1): cards, chips, pressed states, the portrait backing. **Paper 3** (#e1ddd2): the deepest sheet, rare.
- **Ink** (#23303a): all reading text and headings, 12.2:1 on paper.
- **Muted** (#535e67): secondary text, captions, metadata. It clears 4.5:1 on every paper, including the sunset set, so it is safe for small pixel labels.
- **Line** (#d8d4c9): hairlines and chip borders.

### Sunset
Under `html[data-sunset]` the paper tokens warm to #f7eee0, #efe3cf, #e6d7bd and line to #ddcfb6. Ink and muted stay. The hero canvases get a gradient map from indigo through plum and rose to gold. Nothing else changes color.

### Rules
- Pigment is never used as body text. Ochre is 2.9:1 on paper; it lives in shadows, washes and small accents only.
- Highlights (`Wash`) are a pigment gradient under the text, sitting low like a marker stroke, not a filled box.
- No greys other than ink, muted and line. Grey on a pigment is forbidden; tint toward the pigment or use paper.

## 3. Typography

Three faces, each with one job. Fraunces (variable, optical sizes) for titles, Instrument Sans for reading, Pixelify Sans for anything that behaves like a label.

- **Display**: page titles in the hero paper tag, `clamp(2.1rem, 4.6vw, 3rem)`, weight 500, line-height 1, `opsz` 144, tracking -0.02em. Always lowercase.
- **Headline**: section headings, 1.45rem, `opsz` 48, 2.6rem above and 0.9rem below. Occasionally italic (the notes card).
- **Title**: post and project titles, 1.3rem.
- **Body**: 16.5px, line-height 1.7, `text-wrap: pretty`. Paragraphs cap at 60ch except where the column itself is the measure (post bodies, experience blurbs, 2cents summaries). The lede steps up to 1.1rem.
- **Label**: Pixelify Sans at 0.9rem (0.82 to 0.86rem for dense metadata, never below 0.72rem). Used for nav links, captions, hero credits, dates, chips, tooltips, toasts, hints and the pixel control.

Headings use `text-wrap: balance`. No all caps anywhere. No tracked eyebrows above sections. Inline code in posts is set in the pixel face; code blocks use the system monospace on ink.

## 4. Elevation

Flat paper with one trick: a hard offset block of pigment, like a chip laid slightly off a second chip. No blur, no spread, no layered shadows.

- **6px 6px 0 `--accent`**: the hero paper tag, the portrait, the phone menu.
- **5px 5px 0 `--wash-strong`**: paper cards (the notes card, post callouts).
- **4px 4px 0 `--accent`**: images in cards.
- **3px 3px 0**: tooltips (accent) and the pressed sunset toggle (rose).
- **2px 2px 0 `--accent`**: small interactive pieces.
- **Hairline (1px `--line`)**: chips, filters, the nav buttons, section rules.

Stacking uses the layer tokens: `--z-backdrop` 10, `--z-menu` 20, `--z-nav` 30, `--z-grain` 50, `--z-toast` 60. Component-internal stacking stays at 1 to 4. A paper-grain noise layer sits on top of everything at 8.5% multiply on its own compositor layer.

## 5. Components

- **Paper tag** (`.hero-card`): inline-block of paper under the h1 with the 6px pigment shadow, sits over the bottom edge of the painting. Max width 36rem.
- **Landscape hero** (`Landscape`): canvas painting that develops from 30 to 480 pixel widths on load (240 default, her favorite). Hover shows a pigment lens at multiply 0.32. The pixel control (top right) steps the level. Hidden control on phones; hero height `clamp(240px, 37vh, 420px)`, shorter on phones.
- **Portrait and snaps** (`Portrait`, `Snap`): pixelated photo on canvas with a "press to clarify" or "click to unpixelate" pixel label in the corner. Press reveals the real photo. Every image has an inline base64 fallback drawn first.
- **Paint chips** (projects): a vertical strip of pigment bands beside each featured project, the fan deck for the rest.
- **Chips** (`.tag-chip`, `.facts li`): paper-2 fill, 1px line border, pixel face, square corners. Fact chips and tag chips share this look.
- **Tag and filter buttons** (`.tag`, `.xp-filter`): borderless and muted at rest, paper-2 fill with a line border when pressed (`aria-pressed`). 40px tall on phones, in sideways-scrolling rows that fade at the right edge.
- **Nav**: brand (pixel cat plus name) left, pixel links with a sliding pigment dot, sunset toggle right. Three tiers: one row above 940px; brand and toggle on row one with centered links on a ruled row two from 601 to 940px; brand, sun and a 44px menu button on phones. Under 480px the menu button keeps its dot and icon only.
- **Sunset toggle**: 1px line border, pixel sun sprite, label "sunset" or "daylight". Pressed state swaps to a rose border and 3px rose shadow.
- **Paper card** (`.notes`, `.callout`): paper-2 with the 5px wash shadow. Never nested.
- **Links**: `--link` color, hairline pigment underline, a wash that fills in pixel steps on hover.
- **Toast**: ink block with paper text in the pixel face, bottom center.
- **Tooltip** (`.tip-tag`): paper label with a 3px pigment shadow under the word; on screens under 700px it becomes a fixed strip at the bottom.
- **Timeline**: 14px pigment bars with a dithered end for ongoing roles, a dotted year rule and a pigment "now" line. Bars have an invisible taller hit area.
- **Idle cat and nav cat**: 14 by 12 pixel sprite in payne's grey, blinks, sways, hops on tap, wanders onto the hero after 20 seconds idle.

## 6. Do's and Don'ts

**Do**
- Pixelate every photo and painting; let the real image be the reward for a press.
- Take the page pigment from `--accent`; never hard-code a pigment into a component.
- Reach for the hard offset shadow and square corners for anything that needs lift.
- Set labels, captions and metadata in Pixelify Sans and keep them small but above 0.72rem.
- Keep spacing generous and vertical; cut decoration before whitespace.
- Keep motion on transform and opacity, honor `prefers-reduced-motion`, and keep the home page to one screen on a laptop.
- Center a photo whenever text stacks below it, and give it a deliberate crop rather than wide side margins.

**Don't**
- No rounded corners, blur shadows, glass, gradient text or grey card grids.
- No side-stripe borders on chips, callouts or list items.
- No em dashes anywhere in copy.
- No pigment as body text, and no grey text on a pigment.
- No dark mode or theme toggle; sunset mode is the only variant.
- No tracked uppercase eyebrows, numbered section markers, or stacked metrics.
- No raw watercolor without pixels, and no cropping photos in grids; rows are justified and run edge to edge.
