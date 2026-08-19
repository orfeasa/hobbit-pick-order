---
name: "The Hobbit Pick Order"
description: "A pick-to-light field terminal for fast pack comparison."
colors:
  ink: "#171c18"
  rack-steel: "#142019"
  warm-stock: "#f2eee1"
  paper-light: "#fffaf0"
  paper-deep: "#e8e1cf"
  line: "#b9b29f"
  muted: "#565e56"
  pick-light: "#c9ff4a"
  pick-light-dark: "#526d0f"
  safety-orange: "#f16a2b"
  tier-s-purple: "#65429a"
  focus-blue: "#2270e6"
typography:
  display:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 4.25rem)"
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(1.65rem, 3.2vw, 2.25rem)"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Barlow, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.45
  title:
    fontFamily: "Barlow, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.2
  search:
    fontFamily: "Barlow, sans-serif"
    fontSize: "clamp(1.12rem, 2.2vw, 1.4rem)"
    fontWeight: 600
    lineHeight: 1.2
  label:
    fontFamily: "Barlow, sans-serif"
    fontSize: "0.68rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.1em"
rounded:
  scanner-mark: "2px"
  thumbnail: "4px"
  control-sm: "5px"
  control: "6px"
  mobile-dock: "9px"
  feature: "12px"
  surface: "14px"
  pill: "999px"
components:
  app-header:
    backgroundColor: "{colors.rack-steel}"
    textColor: "{colors.paper-light}"
    height: "78px"
    padding: "12px clamp(18px, 3vw, 42px)"
  dataset-stamp:
    backgroundColor: "{colors.pick-light}"
    textColor: "{colors.rack-steel}"
    padding: "9px 24px"
    typography: "{typography.label}"
  input-search:
    backgroundColor: "{colors.paper-light}"
    textColor: "{colors.rack-steel}"
    rounded: "{rounded.surface}"
    height: "70px"
    padding: "0 12px 0 19px"
    typography: "{typography.search}"
  button-icon-dark:
    backgroundColor: "{colors.rack-steel}"
    textColor: "{colors.paper-light}"
    rounded: "{rounded.control}"
    size: "38px"
  result-row:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    height: "80px"
    padding: "9px 10px 9px 4px"
  result-row-selected:
    backgroundColor: "{colors.paper-light}"
    textColor: "{colors.ink}"
    height: "80px"
    padding: "9px 10px 9px 4px"
  chip-tier-s:
    backgroundColor: "{colors.tier-s-purple}"
    textColor: "#fff"
    rounded: "{rounded.pill}"
    height: "24px"
    padding: "0 8px"
  button-confirmation:
    backgroundColor: "{colors.pick-light}"
    textColor: "{colors.rack-steel}"
    rounded: "{rounded.control}"
    height: "42px"
    padding: "0 18px"
    typography: "{typography.label}"
  card-best-pick:
    backgroundColor: "{colors.pick-light}"
    textColor: "{colors.rack-steel}"
    rounded: "{rounded.feature}"
    padding: "18px"
  panel-pack:
    backgroundColor: "{colors.rack-steel}"
    textColor: "{colors.paper-light}"
    rounded: "{rounded.surface}"
---

# Design System: The Hobbit Pick Order

## Overview

**Creative North Star: "The Pick-to-Light Terminal"**

This system feels like a purpose-built field terminal: operational, decisive, tactile, fast, and grounded. Warm stock carries the working surface, rack steel frames the decision machinery, and pick light confirms the action that matters. The atmosphere is physical and practical without becoming retro pastiche.

Information is organized like a pick list rather than a tier-list article. Compressed headlines, numbered lanes, literal labels, and immediate selection feedback let a drafter scan before they read. The system rejects fantasy parchment and generic dashboard polish; its character comes from workwear materials, signal color, and strict hierarchy.

**Key Characteristics:**

- Warm stock work fields against near-black rack-steel structure.
- Acid-lime confirmation used as a pick light, not ambient decoration.
- Condensed command typography paired with clear, compact body copy.
- Numbered lanes, literal status labels, and decisive selected states.
- Structural elevation with tactile shadows only where hierarchy needs them.

## Colors

The palette combines warm working stock with near-black green steel, then reserves high-chroma signal colors for decisions, exceptions, and focus.

### Primary

- **Pick Light** (`pick-light`): Confirms selection, marks the leading choice, and illuminates active decision surfaces.
- **Pick Light Dark** (`pick-light-dark`): Carries the same signal family into scrollbar and focused-field details where full-bright lime would overpower the content.

### Secondary

- **Safety Orange** (`safety-orange`): Marks exceptions, destructive hover feedback, caret attention, and tier-related emphasis.

### Tertiary

- **Tier S Purple** (`tier-s-purple`): Identifies the highest tier without competing with pick confirmation.
- **Focus Blue** (`focus-blue`): Provides a distinct, accessible keyboard-focus signal separate from product state.

### Neutral

- **Rack Steel** (`rack-steel`): Grounds the header, pack rail, dark controls, and high-authority labels.
- **Warm Stock** (`warm-stock`): Supplies the broad work surface and keeps the interface tactile rather than clinical.
- **Paper Light** (`paper-light`): Lifts inputs, selected rows, and light-on-dark text.
- **Paper Deep** (`paper-deep`): Supports tracks and unloaded thumbnail surfaces.
- **Ink** (`ink`): Carries primary copy on light surfaces.
- **Line** (`line`): Separates dense list rows without creating card chrome.
- **Muted** (`muted`): Handles supporting instructions and metadata.

### Named Rules

**The Signal Economy Rule.** Pick Light means selection, leadership, or confirmation; Safety Orange means exception or a consequential state change. Neither is background decoration.

**The Warm Ground Rule.** Keep the work field on Warm Stock or Paper Light; pure white is reserved for small contrast-critical details, not broad surfaces.

## Typography

**Display Font:** Barlow Condensed (with sans-serif fallback)  
**Body Font:** Barlow (with sans-serif fallback)  
**Label/Mono Font:** Barlow, using tabular numerals where rank alignment matters

**Character:** Barlow Condensed delivers compressed, stencil-like command energy at heavy weight. Barlow keeps instructions and metadata compact, legible, and contemporary without softening the terminal character.

### Hierarchy

- **Display** (900, fluid headline scale, 0.88 line-height): Uppercase task headings and dominant card names.
- **Headline** (900, fluid compact scale, 0.9 line-height): Product identity and sectional commands.
- **Title** (600, compact body scale, 1.2 line-height): Card names and other high-scan row content.
- **Body** (400, base reading scale, 1.45 line-height): Instructions, context, and explanatory copy kept to short measures.
- **Search** (600, fluid control scale, 1.2 line-height): The primary text-entry voice, visually stronger than ordinary body copy.
- **Label** (600, compact scale, tracked uppercase): Dataset stamps, states, actions, and operational metadata.

### Named Rules

**The Compressed Command Rule.** Use Barlow Condensed at weight 900 for commands, ranks, and decisive names; never use it for paragraphs.

**The Literal Label Rule.** Small uppercase text must report a real action, state, count, or direction. It is not ornamental microcopy.

## Layout

The main work field is a centered two-column grid capped at 1440px. Search and results receive the larger working lane; the decision rail receives a slightly smaller lane with a 360px minimum. Fluid outer padding and gaps expand from compact drafting density to a generous desktop rhythm.

At the intermediate breakpoint (980px), the pack lane tightens while preserving the side-by-side decision view. At the mobile breakpoint (760px), the grid becomes a single flow, the search field sticks below the header, and a fixed Pick Light dock keeps the current leader reachable until the full pack rail enters view. A final compact adjustment at 420px tightens thumbnails, ranks, and gaps without removing decision metadata.

**The Decision-in-Reach Rule.** Search stays close to the results it controls, and the strongest current pick stays visible or one direct action away.

## Elevation & Depth

Elevation is structural, not decorative. Warm Stock remains a flat work field; the rack-steel pack rail is the one lifted major surface. The search field, keycap, and card thumbnails receive tactile shadows only where they reinforce input priority or card hierarchy. Selected rows change tone instead of floating.

### Shadow Vocabulary

- **Keycap Tactility** (`0 2px 6px rgba(20, 32, 25, .18)`): A restrained lift for the keyboard shortcut cue.
- **Thumbnail Lift** (`0 4px 12px rgba(20, 32, 25, .18)`): Separates small card art from dense list rows.
- **Search Control** (`0 14px 34px rgba(20, 32, 25, .11)`): Marks the primary scanner input without turning it into a floating card.
- **Search Focus** (`0 18px 40px rgba(20, 32, 25, .16)`): Deepens only while the field owns interaction.
- **Pack Rail** (`0 24px 56px rgba(20, 32, 25, .22)`): Establishes the current pack as the decision surface.
- **Leading Thumbnail** (`0 10px 24px rgba(20, 32, 25, .24)`): Gives the winning card more physical presence inside the Pick Light field.
- **Mobile Dock** (`0 16px 36px rgba(20, 32, 25, .32)`): Keeps the temporary fixed control legible above page content.

### Named Rules

**The One Lifted Rail Rule.** Major surface elevation belongs to the pack rail; do not distribute card-panel shadows across the entire work field.

## Shapes

The form language combines square scanner geometry with gently eased operational surfaces. Major fields and rails use the largest established radius; the leading-pick module steps slightly tighter, controls use compact corners, and card thumbnails stay close to their physical proportions. Pills are reserved for tier badges and other short categorical markers.

Borders are functional: strong rack-steel outlines define inputs and mobile controls, while single-pixel dividers create ranked lanes. Inline icons use square caps and mitered turns so they read as equipment marks rather than friendly illustrations.

**The Radius by Authority Rule.** Large radii belong to major fields and rails, medium radii to decisive feature blocks, small radii to controls and thumbnails, and pills only to compact categories.

## Components

Components are tactile and literal. Every control announces its action, selection state, or rank without ornamental chrome.

### Buttons

- **Shape:** Compact control corners for text and icon actions; touch targets remain explicit and solid.
- **Primary:** Pick Light on Rack Steel for clearing or confirming pack-level actions.
- **Dark Action:** Rack Steel on Paper Light for add, remove, and utility actions within bright surfaces.
- **Hover / Focus:** Safety Orange marks consequential hover feedback; Focus Blue provides a separate three-pixel visible outline. Pressed states move by color or slight compression, never by decorative glow.
- **Disabled:** Dark, low-contrast rack tones communicate unavailable pack actions without removing the label.

### Chips

- **Style:** Compact categorical pills with white type and a tier-specific solid fill.
- **State:** Pick confirmation is a rectangular Pick Light action label, not a tier pill; category and interaction state must remain visually distinct.

### Cards / Containers

- **Corner Style:** Major rail surfaces use the broad surface radius; the leading-pick card uses a slightly tighter feature radius.
- **Background:** Rack Steel contains the pack; Pick Light contains its current leader; list rows remain flat on Warm Stock or Paper Light.
- **Shadow Strategy:** Only the pack rail, primary search field, and thumbnails receive meaningful lift.
- **Border:** Ranked rows use dividers rather than enclosing borders.
- **Internal Padding:** Dense row padding supports scanning; feature modules use a broader 18–24px inset.

### Inputs / Fields

- **Style:** Paper Light field, strong Rack Steel stroke, heavy search text, square scanner icon, and an integrated dark clear action.
- **Focus:** The border shifts into the darker Pick Light family while the structural shadow deepens; keyboard focus also retains the global Focus Blue outline.
- **Error / Disabled:** No error state is currently defined. Do not invent one without a product requirement.

### Navigation

- **Style:** The sticky rack-steel header behaves like equipment identification, not site navigation: icon, condensed product name, operational subtitle, and a Pick Light dataset stamp.
- **Mobile:** The subtitle drops away while identity and dataset provenance remain visible.

### Result Row

Each result is one full-width action arranged as thumbnail, rank lane, card identity, tier, and literal action state. Hover and keyboard-active states tint the row; selected rows move to Paper Light and replace “Add” with a Pick Light “In pack” confirmation.

### Current Pack Rail

The rail is the decision instrument. It keeps the heading and clear action anchored, makes the current leader dominant on Pick Light, and orders every alternative from strongest to weakest with tabular ranks and direct remove controls.

## Do's and Don'ts

### Do:

- **Do** use Pick Light only for selection, leadership, confirmation, and other immediate decision signals.
- **Do** write controls and metadata as literal operational language: “Add,” “In pack,” “Clear,” and numbered ranks.
- **Do** preserve visible rank order, keyboard focus, touch-sized controls, and reduced-motion behavior.
- **Do** use strong hierarchy before adding elevation: size, contrast, and position carry most of the work.
- **Do** keep thumbnails physically card-like and subordinate to the card name and rank.

### Don't:

- **Don't** introduce fantasy parchment, medieval ornament, gold filigree, or lore-themed type.
- **Don't** turn the interface into a generic analytics dashboard with soft blue cards and neutral SaaS chrome.
- **Don't** use Safety Orange as a second primary action color or Pick Light as ambient decoration.
- **Don't** wrap every row or section in a rounded, elevated container.
- **Don't** replace literal state labels with ambiguous icons alone.
