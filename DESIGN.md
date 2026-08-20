---
name: "The Hobbit Pick Order"
description: "A clothbound expedition atlas for card search, complete colour browsing, and exact-tier training."
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
  button-brass:
    backgroundColor: "{colors.brass-page-flag}"
    textColor: "{colors.forest-deep}"
    rounded: "{rounded.control}"
    width: "70px"
    height: "42px"
    typography: "{typography.label}"
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
  training-score-stamp:
    backgroundColor: "{colors.brass-page-flag}"
    textColor: "{colors.forest-deep}"
    rounded: "{rounded.page-flag}"
    padding: "11px 15px"
    typography: "{typography.label}"
  training-card-stage:
    backgroundColor: "{colors.forest-cloth}"
    textColor: "{colors.map-leaf-light}"
    rounded: "{rounded.field}"
    padding: "clamp(22px, 4vw, 42px)"
  tier-choice:
    backgroundColor: "color-mix(in srgb, #604381 13%, #f8f2df)"
    textColor: "{colors.contour-ink}"
    rounded: "{rounded.control}"
    height: "58px"
    padding: "8px"
  training-answer:
    backgroundColor: "transparent"
    textColor: "{colors.contour-ink}"
    padding: "24px 0 0"
---

# Design System: The Hobbit Pick Order

## Overview

**Creative North Star: "Bilbo’s Expedition Atlas"**

The system turns a pick order into a working expedition volume. Forest-cloth binding and brass page flags frame warm map leaves; contour lines, oxblood route marks, river-blue details, and compass geometry create a sense of place without becoming decorative fantasy. It should feel learned, practical, companionable, and ready to be opened mid-journey for a quick decision.

Hierarchy remains operational inside that world. Alegreya gives titles and ranks a bookish editorial voice, Atkinson Hyperlegible Next keeps search and metadata exceptionally legible, and each page turn has one clear job: Search looks up a card’s rank and tier, Cards browses the complete set, and Train rehearses exact tiers. The training leaf belongs to the same atlas rather than becoming a dashboard or separate product. The system rejects generic dashboard chrome and theatrical parchment styling; materials stay quiet enough for immediate interaction.

**Key Characteristics:**

- Forest-cloth framing around warm, lightly contoured map leaves.
- Alegreya for titles and ranks; Atkinson Hyperlegible Next for working text.
- Brass page flags for navigation, provenance, and route wayfinding.
- Oxblood route marks for search focus and training outcomes; river blue for cartographic detail.
- Three page turns—Search, Cards, and Train—within one continuous atlas topology.
- A single-card forest training stage paired with an exact-tier map and immediate rank context.
- Restrained tactile shadows that make the atlas feel handled rather than glossy.

## Colors

The palette is a field atlas: deep forest binding, warm leaves and ground, dark contour ink, then oxblood, river blue, and brass as purposeful cartographic marks.

### Primary

- **Oxblood Route** (`oxblood-route`): Marks active search emphasis, wrong training guesses, reveals, and consequential hover states.
- **Oxblood Deep** (`oxblood-deep`): Carries route emphasis into small labels and high-contrast status copy.

### Secondary

- **Brass Page Flag** (`brass-page-flag`): Identifies the active leaf, dataset provenance, training score stamp, clear actions, route ticks, and mobile wayfinding.
- **Brass** (`brass`): Supplies the darker metal note for scroll affordances and supporting accents.

### Tertiary

- **River Blue** (`river-blue`): Colours atlas contours and establishes the cool cartographic counterpoint to oxblood.
- **Focus Blue** (`focus-blue`): Remains a distinct, accessible keyboard-focus signal rather than a thematic selection colour.

### Neutral

- **Forest Cloth** (`forest-cloth`): Frames the masthead, dark controls, and single-card training stage.
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

**The Route Mark Rule.** Oxblood belongs to search focus, training feedback, route emphasis, and consequential actions; it is never a broad decorative fill.

**The Brass Flag Rule.** Brass identifies places to turn, clear, or orient. Keep it compact so it continues to read as a page flag or waypoint.

**The Ink-on-Leaves Rule.** Primary reading happens in Contour Ink on Map Leaf. Forest reversals are reserved for binding, navigation, controls, and the training stage.

**The Tier-Truth Rule.** Every training choice uses its established tier colour as a quiet tinted fill and border; only the correct choice becomes fully saturated, while the selected wrong choice moves to Oxblood.

## Typography

**Display Font:** Alegreya (with Georgia and serif fallbacks)

**Body Font:** Atkinson Hyperlegible Next (with Segoe UI and sans-serif fallbacks)

**Label Font:** Atkinson Hyperlegible Next; ranks use Alegreya with tabular numerals

**Character:** Alegreya provides the confident, well-travelled book voice without slipping into costume lettering. Atkinson Hyperlegible Next is deliberately plain and highly legible, keeping fast draft decisions clear at small sizes and on mobile.

### Hierarchy

- **Display** (700, fluid atlas scale, 0.88 line-height): The complete-atlas title, Trail training title, and other singular page-level statements.
- **Headline** (700, fluid leaf scale, 0.92 line-height): Search and working-leaf headings.
- **Brand** (700, compact fluid scale, 0.98 line-height): The clothbound masthead title.
- **Rank** (700, 1.7rem, 1 line-height): Pick numbers and training-context positions, always with tabular numerals.
- **Title** (700, 1rem, 1.22 line-height): Card names and other high-scan working content.
- **Body** (400, 16px, 1.5 line-height): Instructions, source context, and explanatory copy.
- **Search** (700, fluid control scale, 1.5 line-height): Search input text with enough weight to remain legible beside card art.
- **Label** (700, compact scale, 1.15 line-height): Dataset and score stamps, controls, counts, filters, and tier metadata.

### Named Rules

**The Literary Utility Rule.** Use Alegreya for page hierarchy and ranks; use Atkinson Hyperlegible Next for every instruction, control, and dense list detail.

**The No-Costume Rule.** Preserve Alegreya’s natural case and editorial rhythm. Do not simulate medieval lettering with all-caps display type, blackletter, or decorative tracking.

## Layout

The system is organized as a clothbound volume capped at 1440px. A 142px masthead establishes the binding, then three sticky page flags—Search, All cards, and Train—sit on a 62px navigation line. Search opens a single 1080px map leaf with one field and a passive ranked result list; rows show thumbnail, rank, name, colour identity, and one tier badge without selection controls.

The All cards view uses a single map leaf with a sticky, horizontally scrollable colour index and an auto-filling grid of passive card entries. Search and Cards use lightweight 80 × 112 thumbnails; hovering or focusing a card art trigger opens a floating 672 × 936 inspection plate, while click or tap pins the same plate over a quiet forest scrim until close, backdrop, or Escape. The Train view is another single leaf: a Trail training header and brass session score stamp lead into a colour-filter trail, then a desktop quiz grid places the single-card forest stage in a 0.82-fraction left column and the tier-answer map in a 1.18-fraction right column, with a fluid 34–72px gap. Train loads the same large local image on demand so the studied card stays crisp on high-density mobile screens. At 760px all three views become stacked leaves: the page flags share the width with Search, Cards, and Train labels; the training card becomes a horizontal stage above the tier panel; tier choices move from four to three columns; and the neighbour context changes from three columns to three stacked rows. At 420px card, rank, and title measures tighten again without dropping primary metadata.

**The Single-Leaf Rule.** Search, Cards, and Train each own one map leaf and one task; never merge them into competing dashboard panels.

## Elevation & Depth

Depth is book construction rather than stacked application cards. The single atlas leaves share the dominant shadow and forest cloth sits above the ground with a softer lift. Search, page flags, card thumbnails, and the single-card training stage receive smaller tactile shadows. Ranked rows, tier choices, and answer context stay structurally flat and depend on rules, tint, and typography.

### Shadow Vocabulary

- **Cloth Binding** (`0 10px 30px rgba(22, 39, 31, .2)`): Lifts the masthead from the atlas ground.
- **Page Flag** (`0 7px 18px rgba(22, 39, 31, .16)`): Gives navigation flags a light, handled-paper lift.
- **Open Volume** (`0 26px 65px rgba(44, 42, 31, .28)`): Lifts each active atlas leaf as the principal object.
- **Search Field** (`0 12px 30px rgba(64, 54, 37, .13)`): Marks the primary working control without detaching it from the leaf.
- **Search Focus** (`0 16px 36px rgba(64, 54, 37, .19)`): Deepens only while the field owns input.
- **Card Thumbnail** (`0 5px 13px rgba(49, 43, 32, .2)`): Separates card art from dense map rows.
- **Training Card Image** (`0 15px 34px rgba(7, 20, 13, .42)`): Gives the one studied card clear physical focus on its forest stage.

### Named Rules

**The Bound-Object Rule.** Elevate the atlas as one handled object; do not distribute independent card-panel shadows across the leaves.

## Shapes

The silhouette combines softly rounded paper leaves with square-cut book geometry. The upper-left corner stays square where a page meets its active flag, while the remaining leaf corners round gently. Search and training-stage fields use medium corners, small controls and thumbnails tighten further, and pills are reserved for tier and colour-jump markers.

Compass points, mountain rules, contour paths, route dashes, circular colour emblems, and the centre fold are the recurring geometry. The favicon is a compact HOB expansion-mark interpretation: its ring-and-blade silhouette uses a gold-to-oxblood metal note on Forest Deep, with enough weight and negative space to stay recognisable at browser-tab size. Borders behave like drawn map rules: thin, useful, and usually shared between adjacent rows rather than wrapped around each item. Tier choices use only their tinted fill and full perimeter border; they do not carry a redundant bottom stripe or ornamental pseudo-element.

**The Bound-Corner Rule.** Preserve the square flag-to-leaf join; rounding all four corners would break the open-book silhouette.

**The Map-Mark Rule.** Decorative geometry must read as navigation—compass, contour, route, mountain, or colour emblem—not as generic fantasy ornament.

**The Single Tier Mark Rule.** One tinted fill and one border communicate each tier choice. Do not duplicate the tier colour with an extra stripe.

## Components

Components feel like useful parts of a working field atlas: clear in action, lightly tactile, and materially consistent with the leaf or binding that holds them.

### Buttons

- **Shape:** Compact six-pixel controls for clear, reveal, and next actions; broad pill geometry is not used for ordinary buttons.
- **Brass Action:** Brass Page Flag on Forest Deep for the full-width Next card action.
- **Forest Action:** Forest Cloth on Map Leaf Light for search clearing and reveal controls.
- **Hover / Focus:** Consequential hover moves to Oxblood; keyboard focus uses the separate three-pixel Focus Blue outline. Pressed states may compress subtly but do not glow.
- **Disabled:** Deep forest tonal contrast keeps the control visible while clearly unavailable.

### Chips

- **Tier Badge:** A compact filled pill using the established tier colour table with white text.
- **Colour Jump:** A Map Leaf Light pill with a circular colour emblem, literal colour name, and count; hover strengthens the Forest Cloth border.
- **Training Filter:** The same trail-marker pill language filters All colours, White, Blue, Black, Red, Green, Multicolour, or Colourless. The selected trail reverses to Forest Cloth.

### Cards / Containers

- **Atlas Leaves:** Map Leaf surfaces with subtle contour texture and the shared Open Volume shadow.
- **Result Rows:** Flat, passive rank references separated by Map Line; they never imply selection or pack state.
- **Atlas Cards:** Passive thumbnail-and-copy rows that inherit their Magic-colour group accent rather than becoming individually boxed cards.
- **Card Preview:** One shared forest inspection plate loads large card art only on demand. Hover and keyboard focus remain transient; click or tap pins the plate, exposes a 42px close control, traps keyboard focus, and closes by control, backdrop, or Escape without obscuring the card face.
- **Training Stage:** One Forest Cloth card stage holds a single large card, a quiet colour-identity oval, an oxblood route, the pass count, card name, and the exact-tier question.

### Inputs / Fields

- **Style:** Map Leaf Light, a two-pixel Forest Cloth stroke, bold Atkinson search text, and an integrated forest clear control.
- **Focus:** The field border shifts to Oxblood and the tactile shadow deepens; keyboard focus remains independently visible in Focus Blue.
- **Error / Disabled:** No error state is currently defined. Do not invent one without a product requirement.

### Navigation

- **Masthead:** Forest Cloth with compass mark, Alegreya title, quiet subtitle, brass provenance stamp, and a mountain-edge rule.
- **Page Flags:** Inactive flags use Forest Soft; the selected leaf rises taller and changes to Brass Page Flag. The tablist has exactly three destinations: Search, All cards, and Train.
- **Mobile:** All three page flags share the available width and remain sticky above the active leaf as Search, Cards, and Train.

### Search

The Search leaf is a read-only lookup. Fuzzy, accent-insensitive name matching returns up to ten passive rows with card art, pick rank, colour identity, and exact tier; the art alone triggers an on-demand preview, and nothing can be added, selected, mapped, or removed.

### Complete Card Atlas

The All cards leaf groups every card by Magic colour. A sticky colour index, circular emblems, colour-specific rules, rank ranges, a responsive card grid, and the shared art preview make the full set browsable and readable without losing the atlas world.

### Trail Training

The Train leaf opens with the Trail training title and a brass session score stamp showing exact accuracy plus reviewed/exact counts. A colour-identity filter trail changes the session queue without changing the atlas language. One card occupies the Forest Cloth stage while all 15 exact tiers—S, A+, A, A-, B+, B, B-, C+, C, C-, D+, D, D-, F, and ?—remain visible as tinted, bordered choices.

After a guess or reveal, the choice map locks and distinguishes correct, near-miss, wrong, and reveal outcomes. The answer names the exact tier and global rank, then shows up to three adjacent route positions labelled One above, This card, and One below before the full-width brass Next card action. Misses and reveals are inserted back into the session queue after roughly three cards. Filter, queue, and score exist only in memory for the current page session; refreshing clears them, and the interface must never imply an account, backend, localStorage, or durable training history.

## Do's and Don'ts

### Do:

- **Do** frame warm map leaves with Forest Cloth and preserve the square page-flag join.
- **Do** reserve Oxblood for route marks, search focus, training feedback, and consequential actions.
- **Do** use brass for page flags, provenance, route ticks, and waypoint controls.
- **Do** keep Alegreya on titles and ranks while Atkinson Hyperlegible Next handles working text.
- **Do** preserve card rank, tier, Magic-colour grouping, keyboard focus, touch targets, and reduced-motion behavior.
- **Do** keep contour and route imagery quiet enough that card names and ranks remain dominant.
- **Do** keep all 15 tier choices visible and distinguish correct, near-miss, wrong, and reveal outcomes without changing their labels.
- **Do** show global rank with One above, This card, and One below context after every answer when those neighbours exist.
- **Do** keep training filters, score, queue, and requeue behavior session-only and honest about resetting on refresh.
- **Do** load only the inspected high-resolution image and preserve the precached thumbnail as its offline fallback.

### Don't:

- **Don't** substitute loud synthetic signal colours or monochrome machinery panels for the atlas palette.
- **Don't** turn the atlas into theatrical parchment with distressed edges, blackletter, gold filigree, or lore ornament.
- **Don't** use Oxblood or Brass as broad decorative backgrounds across the map leaves.
- **Don't** wrap each ranked row in its own rounded, elevated card.
- **Don't** add a redundant five-pixel bottom stripe or pseudo-element to tier choices; the tinted fill and border are sufficient.
- **Don't** add pack selection or turn passive search and atlas entries into action controls.
- **Don't** let preview controls obscure mana cost, rules text, or other parts of the card face.
- **Don't** mix search, complete atlas, and training into competing dashboard panels.
- **Don't** imply training progress persists or add localStorage, an account, or backend state to support it.
- **Don't** replace literal card, rank, state, and colour labels with ambiguous icons alone.
