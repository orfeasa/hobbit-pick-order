# The Hobbit Pick Order

A static, searchable pack comparator for The Hobbit on MTG Arena. It ships all 188 card names, ranks, tiers, and thumbnails with the site.

## What it does

- Fuzzy, accent-insensitive card search
- Multi-card pack comparison sorted by pick rank
- Keyboard, mouse, and touch support
- Offline static-asset cache
- No account, analytics, cookies, backend, or `localStorage`

The selected pack exists only in page memory and resets on refresh. The service worker caches public site assets for offline use; it stores no draft selections or personal data.

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

When the custom domain is decided, add it in the Pages settings first. GitHub will create the repository `CNAME` file; then configure the required DNS record at the domain provider.

## Refresh the data

`scripts/build-data.mjs` regenerates `public/cards.js` and the service-worker asset list from the captured JSON source files in `data/`. The current dataset is the Untapped.gg snapshot captured on 19 August 2026.

Card images and names remain the property of their respective rights holders. This is an unofficial reference tool and is not affiliated with Wizards of the Coast or Untapped.gg.
