(() => {
  "use strict";

  const cards = Array.isArray(window.HOBBIT_CARDS) ? window.HOBBIT_CARDS : [];
  const byRank = new Map(cards.map((card) => [card.rank, card]));
  const selectedRanks = new Set();
  const resultLimit = 10;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const tierColors = {
    "S": "#65429a",
    "A+": "#8f4d20", "A": "#985b25", "A-": "#a36830",
    "B+": "#176a4e", "B": "#27765b", "B-": "#3b816a",
    "C+": "#2f647f", "C": "#46768e", "C-": "#64879a",
    "D+": "#706858", "D": "#817a6b", "D-": "#928b7e",
    "F": "#9d3c35", "?": "#6e746e",
  };

  const searchInput = document.querySelector("#card-search");
  const clearSearchButton = document.querySelector("#clear-search");
  const resultsElement = document.querySelector("#search-results");
  const noResultsElement = document.querySelector("#no-results");
  const resultLabel = document.querySelector("#result-label");
  const resultCount = document.querySelector("#result-count");
  const packElement = document.querySelector("#pack");
  const packTitle = document.querySelector("#pack-title");
  const packCount = document.querySelector("#pack-count");
  const clearPackButton = document.querySelector("#clear-pack");
  const packEmpty = document.querySelector("#pack-empty");
  const packContent = document.querySelector("#pack-content");
  const bestPick = document.querySelector("#best-pick");
  const packList = document.querySelector("#pack-list");
  const packDock = document.querySelector("#pack-dock");
  const packDockCard = document.querySelector("#pack-dock-card");
  const packDockCount = document.querySelector("#pack-dock-count");
  const liveRegion = document.querySelector("#live-region");

  let currentResults = [];
  let activeResultIndex = -1;

  const normalize = (value) => value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

  const normalizedCards = cards.map((card) => ({
    ...card,
    normalizedName: normalize(card.name),
  }));

  function fuzzyScore(name, query) {
    if (!query) return 0;
    if (name === query) return 2000;
    if (name.startsWith(query)) return 1600 - name.length;

    const directIndex = name.indexOf(query);
    if (directIndex !== -1) return 1300 - directIndex * 5 - name.length;

    const tokens = query.split(" ").filter(Boolean);
    if (tokens.length > 1 && tokens.every((token) => name.includes(token))) {
      return 1000 - tokens.reduce((sum, token) => sum + name.indexOf(token), 0);
    }

    let cursor = 0;
    let gaps = 0;
    for (const char of query.replaceAll(" ", "")) {
      const found = name.indexOf(char, cursor);
      if (found === -1) return -1;
      gaps += found - cursor;
      cursor = found + 1;
    }
    return 500 - gaps * 4 - name.length;
  }

  function resultCards(query) {
    const normalizedQuery = normalize(query);
    if (!normalizedQuery) return normalizedCards.slice(0, resultLimit);

    return normalizedCards
      .map((card) => ({ card, score: fuzzyScore(card.normalizedName, normalizedQuery) }))
      .filter(({ score }) => score >= 0)
      .sort((a, b) => b.score - a.score || a.card.rank - b.card.rank)
      .slice(0, resultLimit)
      .map(({ card }) => card);
  }

  function tierBadge(tier) {
    const badge = document.createElement("span");
    badge.className = "tier";
    badge.textContent = tier;
    badge.style.setProperty("--tier-color", tierColors[tier] || tierColors["?"]);
    badge.setAttribute("aria-label", `Tier ${tier}`);
    return badge;
  }

  function resultRow(card, index) {
    const isSelected = selectedRanks.has(card.rank);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "result-row";
    button.id = `result-${card.rank}`;
    button.dataset.rank = String(card.rank);
    button.dataset.active = String(index === activeResultIndex);
    button.setAttribute("role", "option");
    button.setAttribute("aria-selected", String(isSelected));
    button.setAttribute("aria-label", `${isSelected ? "Remove" : "Add"} ${card.name}, rank ${card.rank}, tier ${card.tier}`);

    const image = document.createElement("img");
    image.className = "card-thumb";
    image.src = card.image;
    image.alt = "";
    image.width = 55;
    image.height = 78;
    image.loading = index < 4 ? "eager" : "lazy";
    image.decoding = "async";

    const rank = document.createElement("span");
    rank.className = "rank-block";
    rank.innerHTML = `<strong>#${card.rank}</strong><span>pick</span>`;

    const name = document.createElement("span");
    name.className = "result-name";
    const strongestSelected = selectedCards()[0];
    const relation = strongestSelected
      ? card.rank < strongestSelected.rank
        ? "Stronger than current leader"
        : card.rank === strongestSelected.rank
          ? "Current leader"
          : `${card.rank - strongestSelected.rank} ${card.rank - strongestSelected.rank === 1 ? "place" : "places"} below leader`
      : "Add to current pack";
    name.innerHTML = `<strong>${escapeHtml(card.name)}</strong><span>${relation}</span>`;

    const action = document.createElement("span");
    action.className = "result-action";
    action.textContent = isSelected ? "In pack" : "Add";

    const metadata = document.createElement("span");
    metadata.className = "result-metadata";
    metadata.append(tierBadge(card.tier), action);

    button.append(image, rank, name, metadata);
    button.addEventListener("click", () => toggleCard(card.rank));
    return button;
  }

  function renderResults() {
    const query = searchInput.value;
    currentResults = resultCards(query);
    activeResultIndex = Math.min(activeResultIndex, currentResults.length - 1);
    if (activeResultIndex < -1) activeResultIndex = -1;

    resultsElement.replaceChildren(...currentResults.map(resultRow));
    const hasResults = currentResults.length > 0;
    resultsElement.hidden = !hasResults;
    noResultsElement.hidden = hasResults;
    clearSearchButton.hidden = query.length === 0;
    resultLabel.textContent = query ? `Matches for “${query}”` : "Top of the order";
    resultCount.textContent = query
      ? `${currentResults.length} result${currentResults.length === 1 ? "" : "s"}`
      : `Showing ${currentResults.length} of ${cards.length}`;
    searchInput.setAttribute("aria-expanded", String(hasResults));
    updateActiveDescendant();
  }

  function selectedCards() {
    return [...selectedRanks]
      .map((rank) => byRank.get(rank))
      .filter(Boolean)
      .sort((a, b) => a.rank - b.rank);
  }

  function bestPickMarkup(card) {
    return `
      <img class="best-image" src="${card.image}" alt="" width="110" height="155">
      <div class="best-copy">
        <span class="best-label">Best baseline pick</span>
        <h3>${escapeHtml(card.name)}</h3>
        <div class="best-meta">
          <span class="best-rank">#${card.rank}</span>
          <span class="tier" style="--tier-color:${tierColors[card.tier] || tierColors["?"]}" aria-label="Tier ${card.tier}">${card.tier}</span>
        </div>
        <button class="best-remove" type="button" data-remove-rank="${card.rank}">Remove from pack</button>
      </div>`;
  }

  function packListItem(card, bestRank) {
    const item = document.createElement("li");
    item.className = "pack-item";
    item.dataset.rank = String(card.rank);

    const image = document.createElement("img");
    image.src = card.image;
    image.alt = "";
    image.width = 43;
    image.height = 61;
    image.loading = "eager";

    const rank = document.createElement("span");
    rank.className = "pack-item-rank";
    rank.textContent = `#${card.rank}`;

    const copy = document.createElement("span");
    copy.className = "pack-item-copy";
    copy.innerHTML = `<strong>${escapeHtml(card.name)}</strong><span>${card.rank === bestRank ? "Leader" : `+${card.rank - bestRank} ranks`} · Tier ${card.tier}</span>`;

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "remove-card";
    remove.dataset.removeRank = String(card.rank);
    remove.setAttribute("aria-label", `Remove ${card.name} from current pack`);
    remove.innerHTML = `<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15" fill="none" stroke="currentColor" stroke-width="2"/></svg>`;

    item.append(image, rank, copy, remove);
    return item;
  }

  function renderPack({ animate = true } = {}) {
    const selected = selectedCards();
    const hasCards = selected.length > 0;
    packCount.textContent = `${selected.length} card${selected.length === 1 ? "" : "s"} scanned`;
    clearPackButton.disabled = !hasCards;
    packEmpty.hidden = hasCards;
    packContent.hidden = !hasCards;
    packDock.hidden = !hasCards;

    if (!hasCards) {
      bestPick.replaceChildren();
      packList.replaceChildren();
      return;
    }

    const leader = selected[0];
    bestPick.innerHTML = bestPickMarkup(leader);
    packList.replaceChildren(...selected.map((card) => packListItem(card, leader.rank)));
    packDockCard.textContent = `#${leader.rank} ${leader.name}`;
    packDockCount.textContent = `${selected.length} in pack`;

    if (animate && !prefersReducedMotion) {
      bestPick.animate(
        [
          { clipPath: "inset(0 100% 0 0)", filter: "brightness(1.35)" },
          { clipPath: "inset(0 0 0 0)", filter: "brightness(1)" },
        ],
        { duration: 420, easing: "cubic-bezier(.16, 1, .3, 1)" }
      );
    }
  }

  function toggleCard(rank) {
    const card = byRank.get(rank);
    if (!card) return;

    const removing = selectedRanks.has(rank);
    if (removing) selectedRanks.delete(rank);
    else selectedRanks.add(rank);

    renderPack();
    renderResults();
    const leader = selectedCards()[0];
    liveRegion.textContent = removing
      ? `${card.name} removed. ${leader ? `${leader.name} is now the best baseline pick.` : "Current pack is empty."}`
      : `${card.name} added. ${leader ? `${leader.name} is the best baseline pick.` : ""}`;
  }

  function clearPack() {
    if (selectedRanks.size === 0) return;
    selectedRanks.clear();
    renderPack();
    renderResults();
    liveRegion.textContent = "Current pack cleared.";
    searchInput.focus({ preventScroll: true });
  }

  function updateActiveDescendant() {
    const active = currentResults[activeResultIndex];
    if (active) searchInput.setAttribute("aria-activedescendant", `result-${active.rank}`);
    else searchInput.removeAttribute("aria-activedescendant");
    resultsElement.querySelectorAll(".result-row").forEach((row, index) => {
      row.dataset.active = String(index === activeResultIndex);
    });
  }

  function moveActive(delta) {
    if (currentResults.length === 0) return;
    activeResultIndex = (activeResultIndex + delta + currentResults.length) % currentResults.length;
    updateActiveDescendant();
    document.querySelector(`#result-${currentResults[activeResultIndex].rank}`)?.scrollIntoView({ block: "nearest" });
  }

  function clearSearch() {
    searchInput.value = "";
    activeResultIndex = -1;
    renderResults();
    searchInput.focus();
  }

  function escapeHtml(value) {
    return value.replace(/[&<>'"]/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      "\"": "&quot;",
    })[char]);
  }

  searchInput.addEventListener("input", () => {
    activeResultIndex = -1;
    renderResults();
  });

  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveActive(1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      moveActive(-1);
    } else if (event.key === "Enter" && activeResultIndex >= 0) {
      event.preventDefault();
      toggleCard(currentResults[activeResultIndex].rank);
    } else if (event.key === "Escape" && searchInput.value) {
      event.preventDefault();
      clearSearch();
    }
  });

  document.addEventListener("keydown", (event) => {
    const target = event.target;
    const isTyping = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target?.isContentEditable;
    if (event.key === "/" && !isTyping) {
      event.preventDefault();
      searchInput.focus();
      searchInput.select();
    }
  });

  clearSearchButton.addEventListener("click", clearSearch);
  clearPackButton.addEventListener("click", clearPack);
  packElement.addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-remove-rank]");
    if (removeButton) toggleCard(Number(removeButton.dataset.removeRank));
  });
  packDock.addEventListener("click", () => {
    packElement.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
    requestAnimationFrame(() => packTitle.focus({ preventScroll: true }));
  });

  if ("IntersectionObserver" in window) {
    const packObserver = new IntersectionObserver(([entry]) => {
      const suppressed = entry.isIntersecting;
      packDock.classList.toggle("is-suppressed", suppressed);
      packDock.tabIndex = suppressed ? -1 : 0;
      packDock.setAttribute("aria-hidden", String(suppressed));
    }, { threshold: 0.08 });
    packObserver.observe(packElement);
  }

  renderResults();
  renderPack({ animate: false });

  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js", { updateViaCache: "none" }).catch(() => {}));
  }
})();
