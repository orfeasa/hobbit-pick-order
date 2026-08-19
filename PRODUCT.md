# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML, CSS, and JavaScript for GitHub Pages. No framework or build step.

## Users

Magic: The Gathering Arena players drafting The Hobbit who need to compare several visible pack candidates quickly on desktop or mobile.

## Product Purpose

Turn a static pick-order list into a fast pack decision tool. Success means a drafter can find several card names, add them to the current pack, and immediately see the candidates ordered from strongest to weakest baseline pick.

## Positioning

The product compares the cards actually under consideration in one compact view instead of making the user search a long tier list one card at a time.

## Operating Context

Used alongside a live draft. The user may type partial card names, select several results, review their order, and clear the pack between picks. The interaction must work well with keyboard, mouse, and touch.

## Capabilities and Constraints

- Ship all 188 card names, pick ranks, tiers, and thumbnails with the site.
- Fuzzy, accent-insensitive name search.
- Current-pack selection is session-only memory and disappears on refresh.
- No localStorage, cookies, analytics, account, backend, or external runtime dependency.
- Deploy as a static GitHub Pages site and remain useful if installed or revisited offline.
- Preserve the captured Untapped.gg pick-order snapshot date and source attribution.

## Evidence on Hand

- Verified 188-card pick-order snapshot captured from Untapped.gg on 19 August 2026.
- Matching card thumbnails downloaded from the source page.
- Existing searchable PDF established the rank, tier, and thumbnail mapping.

## Product Principles

- The pack decision is always the primary object on screen.
- Every interaction should reduce time-to-pick.
- Rankings are a baseline; the interface must not imply deck-context intelligence it does not have.
- The tool should remain private by default and operational without an account.

## Accessibility & Inclusion

Keyboard-operable controls, visible focus states, semantic status updates, sufficient contrast, reduced-motion support, and touch targets suitable for mobile drafting.
