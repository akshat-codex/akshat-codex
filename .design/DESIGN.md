---
name: akshat-codex
description: A GitHub profile drawn as a midnight transit diagram; the stack is the network, the work is the route.
colors:
  enamel-ground: "#0B1230"
  street-grid: "#111C44"
  river-blue: "#0E1B45"
  porcelain: "#F4F1EA"
  porcelain-frame: "rgba(244,241,234,0.8)"
  porcelain-hair: "rgba(244,241,234,0.22)"
  signal-muted: "#AEB8D6"
  backend-scarlet: "#E21D2D"
  cloud-cobalt: "#2F6BFF"
  data-amber: "#FFC20E"
  ai-green: "#22B14C"
typography:
  display:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "92px"
    fontWeight: 700
    letterSpacing: "0.5px"
  headline:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "44px"
    fontWeight: 700
    letterSpacing: "0.3px"
  title:
    fontFamily: "Barlow, sans-serif"
    fontSize: "28px"
    fontWeight: 500
  lead:
    fontFamily: "Barlow, sans-serif"
    fontSize: "18px"
    fontWeight: 500
  body:
    fontFamily: "Barlow, sans-serif"
    fontSize: "15px"
    fontWeight: 400
  label:
    fontFamily: "Barlow Semi Condensed, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    letterSpacing: "1.5px"
  button:
    fontFamily: "Barlow Semi Condensed, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    letterSpacing: "2px"
rounded:
  sign: "4px"
  plate: "12px"
spacing:
  inset-mobile: "22px"
  inset: "46px"
  line-pitch-mobile: "32px"
  line-pitch: "74px"
components:
  button-primary:
    backgroundColor: "{colors.backend-scarlet}"
    textColor: "{colors.porcelain}"
    typography: "{typography.button}"
    rounded: "{rounded.sign}"
    height: "52px"
  button-outline:
    backgroundColor: "{colors.enamel-ground}"
    textColor: "{colors.porcelain}"
    typography: "{typography.button}"
    rounded: "{rounded.sign}"
    height: "52px"
  plate:
    backgroundColor: "{colors.enamel-ground}"
    textColor: "{colors.porcelain}"
    rounded: "{rounded.plate}"
    padding: "46px"
    width: "1000px"
  plate-mobile:
    backgroundColor: "{colors.enamel-ground}"
    textColor: "{colors.porcelain}"
    rounded: "{rounded.plate}"
    padding: "22px"
    width: "420px"
  line-chip:
    backgroundColor: "{colors.backend-scarlet}"
    textColor: "{colors.porcelain}"
    typography: "{typography.label}"
    rounded: "{rounded.sign}"
    height: "34px"
    width: "128px"
---

# Design System: akshat-codex

## Overview

**Creative North Star: "The Midnight Transit Diagram"**

The profile is a rail network printed on midnight-blue enamel. Each discipline is a line with its own ink, each tool is a station, transfers are rings, and the flagship project is a route read stage by stage. Everything a visitor sees is a plate in that one system: the hero map, the route, the network index, the standards board, the snake, even the buttons and the end-of-line footer.

The world is wayfinding, not decoration. Lines run straight and bend only at 45 or 90 degrees, labels are condensed upper-case station names, and colour carries meaning (which line) rather than mood. Density is that of a real transit map: many small labels, held legible by porcelain-on-midnight contrast and generous plate insets.

The platform shapes the system. A GitHub README is Markdown plus sanitized HTML: no CSS, no JavaScript, no image maps, one link per image. So every visual is a self-hosted SVG with its fonts embedded as base64 WOFF2 and its motion in SMIL, every action is its own linked plate, and mobile gets a separate 420-wide portrait SVG through `<picture media="(max-width: 600px)">`. Plates carry their own enamel ground, so they read identically on GitHub's dark and light themes.

**Key Characteristics:**
- Enamel plates (midnight ground, 2px porcelain frame, 12px corners) as the only container.
- Four line inks with fixed meanings: scarlet Backend, cobalt Cloud, amber Data, green AI.
- Porcelain stations with a midnight keyline; interchanges and transfers as white rings with a dark core.
- Barlow family only: Condensed for display, Semi Condensed for station labels and signs, Barlow for prose.
- Trains in motion along the lines; parked trains at termini under reduced motion.

## Colors

A single midnight ground, one porcelain ink, a soft blue-grey for secondary text, and four saturated line inks that only ever mean a line.

### Primary
- **Backend Scarlet** (backend-scarlet): the Backend line, the flagship route's main line, the primary action plate ("Board ai-lead-agent", "Open the repo"), and express trains. The one ink that also means "act here".

### Secondary
- **Cloud Cobalt** (cloud-cobalt): the Cloud line and its trains. Also the source hue for the contribution snake's level ramp.

### Tertiary
- **Data Amber** (data-amber): the Data line, and the HOLD siding on the route panel, where missing evidence branches off and stops.
- **AI Green** (ai-green): the AI line, and the service-status dot beside status lines ("Good service", "In force on every line").

### Neutral
- **Enamel Ground** (enamel-ground): every plate's fill, every station's keyline, the dark core of every ring, and the outline button's fill.
- **Porcelain** (porcelain): station dots, ring strokes, display and label text, the express line, train bodies, arrows.
- **Porcelain Frame** (porcelain-frame): the 2px plate border.
- **Porcelain Hair** (porcelain-hair): 1px rules inside a plate (the route's facts divider).
- **Signal Muted** (signal-muted): secondary prose, station descriptions, the lead lines under panel titles.
- **Street Grid** (street-grid) and **River Blue** (river-blue): the faint street grid and river under the hero map; geography that sits behind the lines and never carries meaning.

### Named Rules
**The Line Ink Rule.** Scarlet, cobalt, amber and green belong to Backend, Cloud, Data and AI. A new line gets a new ink; an existing ink never takes on a second discipline. Scarlet's additional role is the primary action; amber's is HOLD.

**The Enamel Everywhere Rule.** Every image ships its own enamel ground and frame. Nothing relies on GitHub's page colour, so dark and light themes show the same plates.

**The Ink-on-Chip Rule.** Text on scarlet and cobalt chips is porcelain; text on amber and green chips is enamel ground, for legibility on the lighter inks.

## Typography

**Display Font:** Barlow Condensed 700 (sans-serif fallback; embedded)
**Label Font:** Barlow Semi Condensed 600 (embedded)
**Body Font:** Barlow 500 and 400 (embedded)

**Character:** One grotesque family in three widths, the way transit signage is set: the condensed cut shouts names, the semi-condensed cut labels stations, and regular Barlow explains.

### Hierarchy
- **Display** (700, 92px desktop / 66px mobile, letter-spacing 0.5px): the hero name only, stacked on two lines, upper-case.
- **Headline** (700, 44px desktop / 40px mobile; 56px / 46px for the flagship route title): one per panel. Upper-case for proper names (AI-LEAD-AGENT), sentence case for panel titles ("The network", "Service standards"). Interchange names on the map use this face at 24px.
- **Title** (500, 28px desktop / 22px mobile): the one-line role under the hero name.
- **Lead** (500, 18px desktop / 16px mobile, signal-muted): the single sentence under each panel headline. Standards items use this weight at 19px / 17px in porcelain.
- **Body** (400, 14-19px, signal-muted for secondary): station descriptions, facts rows, HOLD explanation. Never below 13px (mobile facts row), so text survives GitHub's ~830px column.
- **Label** (600, 14-17px, letter-spacing 1.2-2px, upper-case): station names, line chips, status lines, buttons (16px, 2px tracking).

### Named Rules
**The Three Widths Rule.** Condensed for names, semi-condensed for signs, regular for sentences. No other family, and no system display face: every face is embedded in the SVG that uses it.

## Layout

Desktop panels are 1000px wide SVGs scaled to the README column (`width="100%"`); mobile variants are 420px wide portrait SVGs swapped in at `max-width: 600px`. Content sits at a 46-48px inset from the plate edge on desktop and 22-24px on mobile.

The README stacks plates vertically with `<br>` gaps: hero, action plates, route, network, standards, snake, contact plates, end of line. Action plates sit in a row below the plate they belong to, separated by `&nbsp;`, at `height="46"`.

Horizontal maps become vertical strips on mobile: the route's main line runs downward with stations to the right; the network splits into two columns of vertical lines (Backend over Data, Cloud over AI) at a 32px station pitch. The hero map keeps its geometry and scales (0.76) under the stacked name.

The network index uses one row per line at a 74px pitch, a 128px line chip at the left, and stations spread evenly between x 214 and 948, first and last labels anchored outward.

## Elevation & Depth

Flat. There are no shadows anywhere; depth comes from layering on the enamel ground: the faint street grid and river sit underneath, the line inks above them, station dots and rings above the lines, and trains on top. The porcelain frame is the only edge a plate has.

### Named Rules
**The Printed Map Rule.** Nothing floats. Separation is by ink, keyline and stacking order, never by shadow or glow.

## Shapes

Two radii: plates at 12px, signs (buttons, line chips, the route's "Open the repo" plate) at 4px. Lines are 7px strokes (6px in the network index and footer, 5px for the porcelain express) with round caps and joins, and bend only at 45 or 90 degrees. Stations are porcelain circles with a 2px enamel keyline: 5-6px radius for stops, 7px for termini. Interchanges are enamel-cored rings with a porcelain stroke (16px radius, 6px stroke on the hero; 12-14px elsewhere); a station shared by two lines (Redis) is a small transfer ring (8px, 3.5px stroke). Arrows are drawn 2.5px strokes, never glyphs. Trains are 22 by 10 porcelain capsules with a 6px band of their line's ink.

## Components

### Buttons
Signs you board from: flat, square-shouldered, tracked capitals with a drawn arrow.
- **Shape:** 52px tall, 4px corners, 2px stroke, label at a 22px inset, arrow 42px from the right edge.
- **Primary:** backend-scarlet fill and stroke, porcelain label and arrow. One per action group (Board ai-lead-agent).
- **Outline:** enamel fill, porcelain stroke, porcelain label and arrow (All repositories, LinkedIn, Email, GitHub).
- **Hover / Focus:** none possible; each button is a static linked image. Width fits the label.

### Plates (cards)
- **Corner Style:** 12px.
- **Background:** enamel-ground.
- **Border:** 2px porcelain-frame.
- **Internal Padding:** 46-48px desktop, 22-24px mobile.
- **Shadow Strategy:** none (see Elevation & Depth).

### Line chip
A filled 4px sign in a line's ink naming the line ("BACKEND LINE"), 128 by 34px desktop, 160 by 30px mobile, label per the Ink-on-Chip Rule.

### Network map (signature)
Lines, stations, termini, interchange ring, labels in upper-case semi-condensed at 15px with 1.5px tracking, offset 14-18px from their dot. A faint street grid and river underneath. One train per line, each on its own duration (4.5-7s) and a negative start offset so trains are already mid-route on load, eased with `keySplines 0.45 0 0.25 1`, rotating to the path.

### Route with HOLD siding (signature)
The flagship project as a single scarlet line of stages, the gate drawn as an interchange ring. An amber siding drops from the gate at 90 degrees, bends at 45, and ends at a buffer stop labelled HOLD, with a porcelain sentence and a muted sentence beside it. A hairline divider then a muted facts row closes the plate.

### Status line
A 5.5px ai-green dot beside an upper-case semi-condensed label (2px tracking), optionally with a muted body line beneath. It reports the state of the network ("Good service", "In force on every line"); it is not a section heading.

### Reduced motion
Every animated SVG carries `.parked{display:none}` and `@media (prefers-reduced-motion: reduce){.train{display:none}.parked{display:inline}}`. Each moving train has a parked twin at or near its terminus.

## Do's and Don'ts

### Do:
- **Do** ship every visual as an SVG plate with its own enamel ground, 2px porcelain frame and 12px corners.
- **Do** embed the Barlow faces each SVG uses as base64 WOFF2; never rely on installed fonts.
- **Do** keep each line's ink fixed: scarlet Backend, cobalt Cloud, amber Data, green AI.
- **Do** bend lines only at 45 or 90 degrees, with round caps and joins.
- **Do** give every moving train a parked twin and the reduced-motion swap.
- **Do** ship a 420px portrait variant for every full-width panel through `<picture media="(max-width: 600px)">`, turning horizontal lines into vertical strips.
- **Do** make each action its own linked image: one link per image, since GitHub strips image maps.
- **Do** keep SVG text at 13px or larger.

### Don't:
- **Don't** add shadows, glows or gradients to plates, lines or buttons.
- **Don't** use a line ink for anything but its line, except scarlet for the primary action and amber for HOLD.
- **Don't** draw arrows or icons with glyph characters; draw them as stroked paths.
- **Don't** depend on CSS, JavaScript or third-party stat cards in the README; GitHub sanitizes the first two and the cards go down.
- **Don't** set any face outside the Barlow family.
