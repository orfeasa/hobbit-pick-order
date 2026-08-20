# The Hobbit Pick Order

A static card search, colour-grouped atlas, and tier trainer for The Hobbit on MTG Arena. It ships all 188 card names, ranks, tiers, and thumbnails with the site.

## What it does

- Fuzzy, accent-insensitive card search
- Complete 188-card atlas grouped by color identity
- Session-only tier training with colour filters, accuracy, rank reveal, nearby cards, and faster repeats for misses
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

`scripts/build-data.mjs` regenerates `public/cards.js` and the service-worker asset list from the captured JSON source files in `data/`. The current dataset is the Untapped.gg snapshot captured on 19 August 2026.

`scripts/sync-colors.mjs` refreshes the local color-identity mapping from Scryfall. The deployed site does not call Scryfall at runtime.

Card images and names remain the property of their respective rights holders. This is an unofficial reference tool and is not affiliated with Wizards of the Coast or Untapped.gg.
