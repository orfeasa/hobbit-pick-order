#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.dirname(here);
const dataDir = path.join(root, "data");
const publicDir = path.join(root, "public");

const pickOrder = JSON.parse(fs.readFileSync(path.join(dataDir, "hobbit_pick_order.json"), "utf8"));
const artIds = JSON.parse(fs.readFileSync(path.join(dataDir, "hobbit_art_ids.json"), "utf8"));
const colorData = JSON.parse(fs.readFileSync(path.join(dataDir, "hobbit_colors.json"), "utf8"));

const cards = [];
let rank = 1;

for (const section of pickOrder.sections) {
  for (const name of section.names) {
    cards.push({
      rank,
      tier: section.tier,
      name,
      color: colorData.colors[name],
      image: `assets/cards/${artIds[rank - 1]}.jpg`,
      trainingImage: `assets/cards-large/${artIds[rank - 1]}.jpg`,
    });
    rank += 1;
  }
}

if (cards.length !== 188 || artIds.length !== 188) {
  throw new Error(`Expected 188 cards and art IDs; got ${cards.length} and ${artIds.length}`);
}

const missingColors = cards.filter((card) => !card.color);
if (missingColors.length > 0) {
  throw new Error(`Missing color identity for: ${missingColors.map((card) => card.name).join(", ")}`);
}

const missingTrainingImages = cards.filter((card) => !fs.existsSync(path.join(publicDir, card.trainingImage)));
if (missingTrainingImages.length > 0) {
  throw new Error(`Missing high-resolution training images for: ${missingTrainingImages.map((card) => card.name).join(", ")}`);
}

const cardData = `/* Generated from the verified 19 Aug 2026 Untapped.gg snapshot. */\nwindow.HOBBIT_CARDS = ${JSON.stringify(cards, null, 2)};\n`;
fs.writeFileSync(path.join(publicDir, "cards.js"), cardData);

const cacheFiles = [
  "./",
  "./index.html",
  "./styles.css",
  "./cards.js",
  "./app.js",
  "./manifest.webmanifest",
  "./assets/icon.svg",
  "./assets/icon-32.png",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/apple-touch-icon.png",
  "./assets/fonts/Alegreya-SemiBold.ttf",
  "./assets/fonts/Alegreya-Bold.ttf",
  "./assets/fonts/AtkinsonHyperlegibleNext-Regular.ttf",
  "./assets/fonts/AtkinsonHyperlegibleNext-Bold.ttf",
  ...cards.map((card) => `./${card.image}`),
];

const cacheDigest = crypto.createHash("sha256");
for (const file of cacheFiles) {
  if (file === "./") continue;
  const relativePath = file.replace(/^\.\//, "");
  cacheDigest.update(file);
  cacheDigest.update(fs.readFileSync(path.join(publicDir, relativePath)));
}
const cacheVersion = cacheDigest.digest("hex").slice(0, 12);

const serviceWorker = `/* Generated static cache manifest. */
const CACHE = "hobbit-pick-order-${cacheVersion}";
const ASSETS = ${JSON.stringify(cacheFiles, null, 2)};

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
      const copy = response.clone();
      caches.open(CACHE).then((cache) => cache.put(event.request, copy));
      return response;
    }))
  );
});
`;
fs.writeFileSync(path.join(publicDir, "sw.js"), serviceWorker);

console.log(`Generated ${cards.length} cards and ${cacheFiles.length} cached assets.`);
