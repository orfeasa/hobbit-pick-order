---
name: "The Hobbit Pick Order"
description: "A clothbound expedition atlas for fast pack decisions and complete colour browsing."
colors:
  forest-cloth: "#263c31"
  forest-deep: "#16271f"
  forest-soft: "#3d5a49"
  map-leaf: "#eee4ca"
  map-leaf-light: "#f8f2df"
  map-leaf-deep: "#ddcfad"
  atlas-ground: "#d7c6a0"
  contour-ink: "#253029"
  muted-ink: "#5e655e"
  map-line: "#b6a98a"
  oxblood-route: "#a44832"
  oxblood-deep: "#773224"
  river-blue: "#466c75"
  brass: "#b48c43"
  brass-page-flag: "#d9bd74"
  focus-blue: "#0868c4"
typography:
  display:
    fontFamily: "Alegreya, Georgia, serif"
    fontSize: "clamp(3rem, 7vw, 5.7rem)"
    fontWeight: 700
    lineHeight: 0.88
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Alegreya, Georgia, serif"
    fontSize: "clamp(2.5rem, 5vw, 4.7rem)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.03em"
  brand:
    fontFamily: "Alegreya, Georgia, serif"
    fontSize: "clamp(1.8rem, 3vw, 2.7rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.02em"
  rank:
    fontFamily: "Alegreya, Georgia, serif"
    fontSize: "1.7rem"
    fontWeight: 700
    lineHeight: 1
  body:
    fontFamily: "Atkinson Hyperlegible Next, Segoe UI, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  title:
    fontFamily: "Atkinson Hyperlegible Next, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    lineHeight: 1.22
  search:
    fontFamily: "Atkinson Hyperlegible Next, Segoe UI, sans-serif"
    fontSize: "clamp(1.05rem, 2vw, 1.25rem)"
    fontWeight: 700
    lineHeight: 1.5
  label:
    fontFamily: "Atkinson Hyperlegible Next, Segoe UI, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 700
    lineHeight: 1.15
rounded:
  card-mini: "3px"
  thumbnail: "4px"
  utility: "5px"
  control: "6px"
  page-flag: "8px"
  mobile-dock: "9px"
  compact-leaf: "10px"
  field: "12px"
  atlas-leaf: "14px"
  pill: "999px"
components:
  clothbound-header:
    backgroundColor: "{colors.forest-cloth}"
    textColor: "{colors.map-leaf-light}"
    height: "142px"
    padding: "18px clamp(20px, 4vw, 58px) 22px"
  page-flag:
    backgroundColor: "{colors.forest-soft}"
    textColor: "{colors.map-leaf-light}"
    rounded: "{rounded.page-flag}"
    height: "50px"
    padding: "0 22px"
  page-flag-active:
    backgroundColor: "{colors.brass-page-flag}"
    textColor: "{colors.forest-deep}"
    rounded: "{rounded.page-flag}"
    height: "58px"
    padding: "0 22px"
  input-search:
    backgroundColor: "{colors.map-leaf-light}"
    textColor: "{colors.forest-deep}"
    rounded: "{rounded.field}"
    height: "68px"
    padding: "0 11px 0 18px"
    typography: "{typography.search}"
  result-row:
    backgroundColor: "transparent"
    textColor: "{colors.contour-ink}"
    height: "82px"
    padding: "9px 8px 9px 2px"
  result-row-mapped:
    backgroundColor: "rgba(217, 189, 116, .23)"
    textColor: "{colors.contour-ink}"
    height: "82px"
    padding: "9px 8px 9px 2px"
  button-brass:
    backgroundColor: "{colors.brass-page-flag}"
    textColor: "{colors.forest-deep}"
    rounded: "{rounded.control}"
    width: "70px"
    height: "42px"
    typography: "{typography.label}"
  route-leader-card:
    backgroundColor: "{colors.map-leaf}"
    textColor: "{colors.contour-ink}"
    rounded: "{rounded.field}"
    padding: "18px"
  color-jump-chip:
    backgroundColor: "{colors.map-leaf-light}"
    textColor: "{colors.contour-ink}"
    rounded: "{rounded.pill}"
    height: "38px"
    padding: "0 11px"
  atlas-card:
    backgroundColor: "transparent"
    textColor: "{colors.contour-ink}"
    height: "112px"
    padding: "11px 5px"
---

# Design System: The Hobbit Pick Order

## Overview

**Creative North Star: "Bilbo’s Expedition Atlas"**

The system turns a pick order into a working expedition volume. Forest-cloth binding and brass page flags frame warm map leaves; contour lines, oxblood route marks, river-blue details, and compass geometry create a sense of place without becoming decorative fantasy. It should feel learned, practical, companionable, and ready to be opened mid-journey for a quick decision.

Hierarchy remains operational inside that world. Alegreya gives titles and ranks a bookish editorial voice, Atkinson Hyperlegible Next keeps search and metadata exceptionally legible, and the open spread makes the current route as tangible as the cards being considered. The system rejects generic dashboard chrome and theatrical parchment styling; materials stay quiet enough for immediate interaction.

**Key Characteristics:**

- Forest-cloth framing around warm, lightly contoured map leaves.
- Alegreya for titles and ranks; Atkinson Hyperlegible Next for working text.
- Brass page flags for navigation, provenance, and route wayfinding.
- Oxblood route marks for selection and consequential state; river blue for cartographic detail.
- An open two-leaf picker spread paired with a complete colour-indexed atlas.
- Restrained tactile shadows that make the atlas feel handled rather than glossy.

## Colors

The palette is a field atlas: deep forest binding, warm leaves and ground, dark contour ink, then oxblood, river blue, and brass as purposeful cartographic marks.

### Primary

- **Oxblood Route** (`oxblood-route`): Marks mapped selections, route details, active search emphasis, and consequential hover states.
- **Oxblood Deep** (`oxblood-deep`): Carries route emphasis into small labels and high-contrast status copy.

### Secondary

- **Brass Page Flag** (`brass-page-flag`): Identifies the active leaf, dataset provenance, clear actions, route ticks, and mobile wayfinding.
- **Brass** (`brass`): Supplies the darker metal note for scroll affordances and supporting accents.

### Tertiary

- **River Blue** (`river-blue`): Colours atlas contours and establishes the cool cartographic counterpoint to oxblood.
- **Focus Blue** (`focus-blue`): Remains a distinct, accessible keyboard-focus signal rather than a thematic selection colour.

### Neutral

- **Forest Cloth** (`forest-cloth`): Frames the masthead, pack route, dark controls, and bound edge of the spread.
- **Forest Deep** (`forest-deep`): Deepens fixed navigation, footer, and high-contrast structural details.
- **Forest Soft** (`forest-soft`): Carries inactive page flags and intermediate cloth surfaces.
- **Map Leaf** (`map-leaf`): The principal warm reading and working surface.
- **Map Leaf Light** (`map-leaf-light`): Lifts search fields, chips, and text placed on forest cloth.
- **Map Leaf Deep** (`map-leaf-deep`): Supports thumbnails and quiet footer text.
- **Atlas Ground** (`atlas-ground`): Sits behind the open volume and exposes broad contour texture.
- **Contour Ink** (`contour-ink`): Carries primary text and strong rules on the leaves.
- **Muted Ink** (`muted-ink`): Handles instructions, counts, and secondary metadata.
- **Map Line** (`map-line`): Separates ranked rows and atlas entries without enclosing every item.

### Named Rules

**The Route Mark Rule.** Oxblood belongs to mapped state, route emphasis, and consequential actions; it is never a broad decorative fill.

**The Brass Flag Rule.** Brass identifies places to turn, clear, or orient. Keep it compact so it continues to read as a page flag or waypoint.

**The Ink-on-Leaves Rule.** Primary reading happens in Contour Ink on Map Leaf. Forest reversals are reserved for binding, navigation, and the current route.

## Typography

**Display Font:** Alegreya (with Georgia and serif fallbacks)

**Body Font:** Atkinson Hyperlegible Next (with Segoe UI and sans-serif fallbacks)

**Label Font:** Atkinson Hyperlegible Next; ranks use Alegreya with tabular numerals

**Character:** Alegreya provides the confident, well-travelled book voice without slipping into costume lettering. Atkinson Hyperlegible Next is deliberately plain and highly legible, keeping fast draft decisions clear at small sizes and on mobile.

### Hierarchy

- **Display** (700, fluid atlas scale, 0.88 line-height): The complete-atlas title and other singular page-level statements.
- **Headline** (700, fluid leaf scale, 0.92 line-height): Picker and current-route headings.
- **Brand** (700, compact fluid scale, 0.98 line-height): The clothbound masthead title.
- **Rank** (700, 1.7rem, 1 line-height): Pick numbers and route positions, always with tabular numerals.
- **Title** (700, 1rem, 1.22 line-height): Card names and other high-scan working content.
- **Body** (400, 16px, 1.5 line-height): Instructions, source context, and explanatory copy.
- **Search** (700, fluid control scale, 1.5 line-height): Search input text with enough weight to remain legible beside card art.
- **Label** (700, compact scale, 1.15 line-height): Dataset stamps, controls, counts, and tier metadata.

### Named Rules

**The Literary Utility Rule.** Use Alegreya for page hierarchy, card leaders, and ranks; use Atkinson Hyperlegible Next for every instruction, control, and dense list detail.

**The No-Costume Rule.** Preserve Alegreya’s natural case and editorial rhythm. Do not simulate medieval lettering with all-caps display type, blackletter, or decorative tracking.

## Layout

The system is organized as a clothbound volume capped at 1440px. A 142px masthead establishes the binding, then two sticky page flags sit on a 62px navigation line. The picker view opens into a two-column spread: the searchable card leaf receives 1.2 fractions of the width, while the current-route leaf receives 0.8 with a 360px minimum. A narrow centre fold and one continuous book shadow make the two leaves read as one object.

The alternate All cards view uses a single map leaf with a sticky, horizontally scrollable colour index and an auto-filling grid of cards. At 1040px the route leaf tightens to 350px. At 760px both views become single-column leaves: the page flags share the width, search sticks beneath them, the pack route moves below results, a brass mobile dock keeps the leader reachable, and the atlas becomes a two-column card grid. At 420px card, rank, and title measures tighten again without dropping primary metadata.

**The Open-Volume Rule.** Picker and route belong to the same spread, while the complete atlas is a deliberate page turn—not a dashboard panel competing in the same viewport.

**The Route-in-Reach Rule.** The current leader must remain visible in the right leaf or reachable through the brass mobile dock.

## Elevation & Depth

Depth is book construction rather than stacked application cards. The open spread and single atlas leaf share the dominant shadow; forest cloth sits above the ground with a softer lift, and the centre fold supplies internal depth. Search, page flags, card thumbnails, and the route-leader card receive smaller tactile shadows. Ranked rows stay flat and depend on rules, tint, and typography.

### Shadow Vocabulary

- **Cloth Binding** (`0 10px 30px rgba(22, 39, 31, .2)`): Lifts the masthead from the atlas ground.
- **Page Flag** (`0 7px 18px rgba(22, 39, 31, .16)`): Gives navigation flags a light, handled-paper lift.
- **Open Volume** (`0 26px 65px rgba(44, 42, 31, .28)`): Unifies the spread and complete atlas page as the principal object.
- **Search Field** (`0 12px 30px rgba(64, 54, 37, .13)`): Marks the primary working control without detaching it from the leaf.
- **Search Focus** (`0 16px 36px rgba(64, 54, 37, .19)`): Deepens only while the field owns input.
- **Card Thumbnail** (`0 5px 13px rgba(49, 43, 32, .2)`): Separates card art from dense map rows.
- **Route Leader** (`0 13px 32px rgba(18, 34, 26, .24)`): Gives the strongest baseline pick physical priority inside the cloth route leaf.
- **Mobile Waypoint** (`0 15px 34px rgba(22, 39, 31, .34)`): Holds the temporary fixed leader control above scrolling content.

### Named Rules

**The Bound-Object Rule.** Elevate the atlas as one handled object; do not distribute independent card-panel shadows across the leaves.

## Shapes

The silhouette combines softly rounded paper leaves with square-cut book geometry. The upper-left corner stays square where a page meets its active flag, while the remaining leaf corners round gently. Search and route-leader fields use medium corners, small controls and thumbnails tighten further, and pills are reserved for tier and colour-jump markers.

Compass points, mountain rules, contour paths, route dashes, circular colour emblems, and the centre fold are the recurring geometry. Borders behave like drawn map rules: thin, useful, and usually shared between adjacent rows rather than wrapped around each item.

**The Bound-Corner Rule.** Preserve the square flag-to-leaf join; rounding all four corners would break the open-book silhouette.

**The Map-Mark Rule.** Decorative geometry must read as navigation—compass, contour, route, mountain, or colour emblem—not as generic fantasy ornament.

## Components

Components feel like useful parts of a working field atlas: clear in action, lightly tactile, and materially consistent with the leaf or binding that holds them.

### Buttons

- **Shape:** Compact six-pixel controls for clear and remove actions; broad pill geometry is not used for ordinary buttons.
- **Brass Action:** Brass Page Flag on Forest Deep for pack-level clear actions and the mobile leader waypoint.
- **Forest Action:** Forest Cloth on Map Leaf Light for search clearing and route-card removal.
- **Hover / Focus:** Consequential hover moves to Oxblood; keyboard focus uses the separate three-pixel Focus Blue outline. Pressed states may compress subtly but do not glow.
- **Disabled:** Deep forest tonal contrast keeps the control visible while clearly unavailable.

### Chips

- **Tier Badge:** A compact filled pill using the established tier colour table with white text.
- **Colour Jump:** A Map Leaf Light pill with a circular colour emblem, literal colour name, and count; hover strengthens the Forest Cloth border.
- **State:** Mapped selection is communicated by row tint and an Oxblood action label, not by repurposing the tier badge.

### Cards / Containers

- **Atlas Leaves:** Map Leaf surfaces with subtle contour texture and the shared Open Volume shadow.
- **Result Rows:** Flat, full-width actions separated by Map Line; hover tints the leaf and mapped state receives a translucent brass wash.
- **Route Leader:** A Map Leaf card inside Forest Cloth, marked with an oxblood dashed route and a stronger thumbnail shadow.
- **Atlas Cards:** Compact thumbnail-and-copy rows that inherit their Magic-colour group accent rather than becoming individually boxed cards.

### Inputs / Fields

- **Style:** Map Leaf Light, a two-pixel Forest Cloth stroke, bold Atkinson search text, and an integrated forest clear control.
- **Focus:** The field border shifts to Oxblood and the tactile shadow deepens; keyboard focus remains independently visible in Focus Blue.
- **Error / Disabled:** No error state is currently defined. Do not invent one without a product requirement.

### Navigation

- **Masthead:** Forest Cloth with compass mark, Alegreya title, quiet subtitle, brass provenance stamp, and a mountain-edge rule.
- **Page Flags:** Inactive flags use Forest Soft; the selected leaf rises taller and changes to Brass Page Flag.
- **Mobile:** Both page flags share the available width and remain sticky above the active leaf.

### Current Route

The right leaf is a clothbound route log. Its heading stays anchored, the route leader appears on a warm map card with an oxblood trail, and alternatives continue below with brass rank ticks and direct remove controls.

### Complete Card Atlas

The All cards leaf groups every card by Magic colour. A sticky colour index, circular emblems, colour-specific rules, rank ranges, and a responsive card grid make the full set browsable without losing the atlas world.

## Do's and Don'ts

### Do:

- **Do** frame warm map leaves with Forest Cloth and preserve the square page-flag join.
- **Do** reserve Oxblood for route marks, mapped state, and consequential actions.
- **Do** use brass for page flags, provenance, route ticks, and waypoint controls.
- **Do** keep Alegreya on titles, leaders, and ranks while Atkinson Hyperlegible Next handles working text.
- **Do** preserve card rank, tier, Magic-colour grouping, keyboard focus, touch targets, and reduced-motion behavior.
- **Do** keep contour and route imagery quiet enough that card names and ranks remain dominant.

### Don't:

- **Don't** substitute loud synthetic signal colours or monochrome machinery panels for the atlas palette.
- **Don't** turn the atlas into theatrical parchment with distressed edges, blackletter, gold filigree, or lore ornament.
- **Don't** use Oxblood or Brass as broad decorative backgrounds across the map leaves.
- **Don't** wrap each ranked row in its own rounded, elevated card.
- **Don't** mix picker, current route, and complete atlas into competing dashboard panels.
- **Don't** replace literal card, rank, state, and colour labels with ambiguous icons alone.
