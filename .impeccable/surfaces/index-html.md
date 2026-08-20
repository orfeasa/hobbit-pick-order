---
version: 1
slug: "index-html"
primary_target: "public/index.html"
related_targets: []
---

## Scope and mode

`public/index.html` is an Operate surface for comparing cards during a live draft and rehearsing the pick order between drafts.

## Audience, job, and task

An MTG Arena drafter searches partial card names and reads the matching card’s rank, colour identity, tier, and supporting draft statistics without entering a selection workflow. They can turn to the complete card atlas to browse all 188 cards by Magic colour, or use Trail training to filter by colour identity, practise one card’s exact tier at a time, reveal its statistics after answering, review its global rank and immediate neighbours, and see misses or reveals return after roughly three cards.

## Content and constraints

Use the verified 188-card Untapped.gg pick-order snapshot plus the separately dated bundled Premier Draft statistics snapshot, lightweight local thumbnails, high-resolution local preview and training images, rank, colour identity, and all 15 exact tier labels. Search results and colour-atlas cards are passive references with no add, remove, mapped, selected, or pack state; their art can open the shared on-demand preview by hover, focus, click, or tap. The preview shows in-hand win rate, average last offered pick, and in-hand game sample in a flat ruled ledger. Training reveals that ledger only after a guess or reveal so it cannot leak the answer. Training filter, queue, score, and reviewed state remain session-only and reset on refresh. No deck-context claims, backend, account, analytics, localStorage, or external runtime dependency. Keyboard, touch, responsive, reduced-motion, and offline behavior are first-class.

## Chosen direction

Bilbo’s Expedition Atlas: a working clothbound field volume with forest binding, warm map leaves, contour ink, oxblood route marks, river-blue details, and brass page flags. Alegreya carries titles and ranks while Atkinson Hyperlegible Next handles search, controls, and working text. Three sticky page flags establish the topology: Search opens one focused lookup leaf, Cards groups the complete set by Magic colour, and Train opens a third page turn rather than a dashboard or separate product. Search and Cards remain passive references. Their shared inspection plate adds a compact ruled statistics ledger beneath the card, while Trail training keeps the same ledger hidden until the user answers. Trail training uses a literary header, brass session score stamp, colour-filter trail, single-card forest stage, and a 15-choice exact-tier map whose choices rely on tinted fill and border only. A-through-D variants each occupy their own horizontal band in minus, plain, plus order, separated by quiet map rules; S is the top landmark and F plus ? close the map. Correct, near-miss, wrong, and reveal states lead into the statistics ledger, global rank plus One above, This card, and One below context, followed by a brass Next card action. Desktop keeps the training card stage and answer map in two columns; mobile stacks them and auto-scrolls the revealed answer into view. Final review disposition: ship.

## Unresolved decisions

The eventual custom domain is not yet chosen. The data refresh process remains manual.
