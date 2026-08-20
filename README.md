# The Hobbit Pick Order

A static card search, colour-grouped atlas, and tier trainer for The Hobbit on MTG Arena. It ships all 188 card names, ranks, tiers, current draft statistics, lightweight thumbnails, and high-resolution training images with the site.

## What it does

- Fuzzy, accent-insensitive card search
- Complete 188-card atlas grouped by color identity
- On-demand high-resolution card previews from Search and Cards by hover, focus, click, or tap
- In-hand win rate, average last offered pick, and in-hand game sample in every card preview
- Session-only tier training with colour filters, accuracy, rank reveal, post-answer card statistics, nearby cards, and faster repeats for misses
- Keyboard, mouse, and touch support
- Offline static-asset cache
- No account, analytics, cookies, backend, or `localStorage`

The training session exists only in page memory and resets on refresh. The service worker caches public site assets for offline use; it stores no training history or personal data.

## Run locally

```sh
python3 -m http.server 8080 --directory public
```

Open <http://localhost:8080>.

## Publish with GitHub Pages

1. Create an empty GitHub repository.
2. Add it as this directory’s remote and push the `main` branch.
3. In the repository’s **Settings → Pages**, choose **GitHub Actions** as the source.
4. The included workflow publishes the `public/` directory.

The live custom domain is `hobbit.orfeasa.com`, configured in GitHub Pages with a Namecheap `CNAME` record pointing to `orfeasa.github.io`.

## Refresh the data

`scripts/build-data.mjs` regenerates `public/cards.js` and the service-worker asset list from the captured JSON source files in `data/`. Pick ranks and tiers currently use the Untapped.gg snapshot captured on 19 August 2026. Card statistics use a separate Untapped.gg snapshot captured on 20 August 2026 across 410,000 displayed Bronze–Platinum matches.

Run `node scripts/sync-card-stats.mjs` to refresh the bundled Premier Draft statistics from Untapped.gg before rebuilding. This stores in-hand win counts and games, opening-hand counts and games, average last offered pick, and average pick taken for all 188 cards. The deployed site never calls Untapped.gg at runtime.

`scripts/sync-colors.mjs` refreshes the local color-identity mapping from Scryfall. `scripts/sync-training-images.mjs` downloads Scryfall's large card images for the trainer; pass `--force` to replace existing files. Run the image sync before `scripts/build-data.mjs` when refreshing the set. The deployed site does not call Scryfall at runtime.

Search and Cards use the original 80 × 112 thumbnails to stay quick, then load a 672 × 936 preview only when a card is inspected. Train uses the same large local images. Viewed images are runtime-cached rather than precaching the full high-resolution set on first visit. If a large image is unavailable while offline, the site falls back to the precached thumbnail.

Card images and names remain the property of their respective rights holders. This is an unofficial reference tool and is not affiliated with Wizards of the Coast or Untapped.gg.
