# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML, CSS, and JavaScript for GitHub Pages. No framework or build step.

## Users

Magic: The Gathering Arena players drafting The Hobbit who need to look up a card quickly, browse the set by colour, or memorise the pick order on desktop or mobile.

## Product Purpose

Turn a static pick-order list into a fast lookup and study tool. Success means a drafter can find a card’s rank, tier, and supporting draft statistics immediately, browse the complete set, or practise exact tiers until missed cards stick.

## Positioning

The product combines quick name search with a complete colour-grouped atlas and focused tier recall, instead of making the user scan or memorise a long static list unaided.

## Operating Context

Used alongside a live draft or in short study sessions. The user may type a partial card name, browse every card by colour identity, or guess one card’s exact tier and immediately see its rank context. The interaction must work well with keyboard, mouse, and touch.

## Capabilities and Constraints

- Ship all 188 card names, pick ranks, tiers, lightweight thumbnails, and high-resolution training images with the site.
- Fuzzy, accent-insensitive name search.
- High-resolution previews open from Search and Cards by hover, keyboard focus, click, or tap.
- Card previews show the current Bronze–Platinum in-hand win rate, average last offered pick, and in-hand game sample beside the rank and tier.
- Exact-tier training can filter by colour, report session accuracy, reveal adjacent ranks and card statistics after the answer, and return missed cards sooner.
- Training progress is session-only memory and disappears on refresh.
- No localStorage, cookies, analytics, account, backend, or external runtime dependency.
- Deploy as a static GitHub Pages site and remain useful if installed or revisited offline.
- Preserve the captured Untapped.gg pick-order snapshot date and source attribution.
- Keep the pick-order and performance-statistics snapshot dates explicit when they differ; statistics are bundled at build time rather than fetched in the browser.

## Evidence on Hand

- Verified 188-card pick-order snapshot captured from Untapped.gg on 19 August 2026.
- Verified per-card Premier Draft statistics captured from Untapped.gg on 20 August 2026 across 410,000 displayed Bronze–Platinum matches.
- Matching card thumbnails downloaded from the source page, with large local Scryfall images reserved for training.
- Existing searchable PDF established the rank, tier, and thumbnail mapping.

## Product Principles

- Search, colour browsing, and training each have one dedicated tab and one clear job.
- Every interaction should reduce time-to-rank.
- Supporting statistics should add confidence without becoming a dashboard or revealing a training answer early.
- Rankings are a baseline; the interface must not imply deck-context intelligence it does not have.
- The tool should remain private by default and operational without an account.

## Accessibility & Inclusion

Keyboard-operable controls, visible focus states, semantic status updates, sufficient contrast, reduced-motion support, and touch targets suitable for mobile drafting.
