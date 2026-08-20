(() => {
  "use strict";

  const cards = Array.isArray(window.HOBBIT_CARDS) ? window.HOBBIT_CARDS : [];
  const byRank = new Map(cards.map((card) => [card.rank, card]));
  const selectedRanks = new Set();
  const resultLimit = 10;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const tierColors = {
    "S": "#604381",
    "A+": "#8c432f", "A": "#995038", "A-": "#a55d40",
    "B+": "#2f644d", "B": "#3d7058", "B-": "#507d67",
    "C+": "#3f6571", "C": "#557781", "C-": "#6a8990",
    "D+": "#716657", "D": "#83786a", "D-": "#958b7e",
    "F": "#913d38", "?": "#6a716d",
  };

  const colorGroups = [
    { id: "W", name: "White", note: "Plains" },
    { id: "U", name: "Blue", note: "Islands" },
    { id: "B", name: "Black", note: "Swamps" },
    { id: "R", name: "Red", note: "Mountains" },
    { id: "G", name: "Green", note: "Forests" },
    { id: "M", name: "Multicolour", note: "Crossroads" },
    { id: "C", name: "Colourless", note: "Open road" },
  ];

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
  const viewTabs = [...document.querySelectorAll("[data-view]")];
  const pickerView = document.querySelector("#picker-view");
  const atlasView = document.querySelector("#atlas-view");
  const colorNavigation = document.querySelector("#color-navigation");
  const cardAtlas = document.querySelector("#card-atlas");

  let currentResults = [];
  let activeResultIndex = -1;
  let currentView = "picker";

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

  function selectedCards() {
    return [...selectedRanks]
      .map((rank) => byRank.get(rank))
      .filter(Boolean)
      .sort((a, b) => a.rank - b.rank);
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
    action.textContent = isSelected ? "Mapped" : "Add";

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

  function bestPickMarkup(card) {
    return `
      <svg class="best-route" viewBox="0 0 220 120" aria-hidden="true">
        <path d="M-8 104C32 74 53 98 85 65s68-6 105-44 39-8 45-2" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="5 8"/>
        <circle cx="190" cy="21" r="7" fill="currentColor"/>
      </svg>
      <img class="best-image" src="${card.image}" alt="" width="110" height="155">
      <div class="best-copy">
        <span class="best-label">Route leader</span>
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
    packCount.textContent = `${selected.length} card${selected.length === 1 ? "" : "s"} mapped`;
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
    packDockCount.textContent = `${selected.length} mapped`;

    if (animate && !prefersReducedMotion) {
      bestPick.animate(
        [
          { clipPath: "inset(0 100% 0 0)", filter: "saturate(.6)" },
          { clipPath: "inset(0 0 0 0)", filter: "saturate(1)" },
        ],
        { duration: 460, easing: "cubic-bezier(.16, 1, .3, 1)" }
      );
    }
  }

  function atlasCard(card) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "atlas-card";
    button.dataset.atlasRank = String(card.rank);
    button.setAttribute("aria-pressed", String(selectedRanks.has(card.rank)));
    button.setAttribute("aria-label", `${selectedRanks.has(card.rank) ? "Remove" : "Add"} ${card.name}, rank ${card.rank}, tier ${card.tier}`);

    const image = document.createElement("img");
    image.src = card.image;
    image.alt = "";
    image.width = 64;
    image.height = 90;
    image.loading = "lazy";
    image.decoding = "async";

    const copy = document.createElement("span");
    copy.className = "atlas-card-copy";
    const rank = document.createElement("span");
    rank.className = "atlas-card-rank";
    rank.textContent = `#${card.rank}`;
    const name = document.createElement("strong");
    name.textContent = card.name;
    const meta = document.createElement("span");
    meta.className = "atlas-card-meta";
    meta.append(tierBadge(card.tier));
    const action = document.createElement("span");
    action.className = "atlas-card-action";
    action.textContent = selectedRanks.has(card.rank) ? "In pack" : "Add";
    meta.append(action);
    copy.append(rank, name, meta);

    button.append(image, copy);
    button.addEventListener("click", () => toggleCard(card.rank));
    return button;
  }

  function renderAtlas() {
    const groupCounts = new Map(colorGroups.map((group) => [group.id, 0]));
    cards.forEach((card) => groupCounts.set(card.color, (groupCounts.get(card.color) || 0) + 1));

    const jumpButtons = colorGroups.map((group) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "color-jump";
      button.dataset.color = group.id;
      button.innerHTML = `<span class="color-mark" aria-hidden="true"></span><strong>${group.name}</strong><span>${groupCounts.get(group.id) || 0}</span>`;
      button.addEventListener("click", () => {
        document.querySelector(`#color-${group.id}`)?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
      });
      return button;
    });
    colorNavigation.replaceChildren(...jumpButtons);

    const sections = colorGroups.map((group) => {
      const groupCards = cards.filter((card) => card.color === group.id);
      const section = document.createElement("section");
      section.id = `color-${group.id}`;
      section.className = "color-section";
      section.dataset.color = group.id;
      section.setAttribute("aria-labelledby", `color-${group.id}-title`);

      const heading = document.createElement("header");
      heading.className = "color-section-heading";
      heading.innerHTML = `<span class="color-emblem" aria-hidden="true"></span><div><h3 id="color-${group.id}-title">${group.name}</h3><p>${group.note} · ${groupCards.length} cards</p></div><span class="color-range">#${groupCards[0]?.rank ?? "–"}–#${groupCards.at(-1)?.rank ?? "–"}</span>`;

      const grid = document.createElement("div");
      grid.className = "atlas-grid";
      grid.replaceChildren(...groupCards.map(atlasCard));
      section.append(heading, grid);
      return section;
    });
    cardAtlas.replaceChildren(...sections);
  }

  function updateAtlasSelection() {
    cardAtlas.querySelectorAll("[data-atlas-rank]").forEach((button) => {
      const rank = Number(button.dataset.atlasRank);
      const card = byRank.get(rank);
      const selected = selectedRanks.has(rank);
      button.setAttribute("aria-pressed", String(selected));
      button.setAttribute("aria-label", `${selected ? "Remove" : "Add"} ${card.name}, rank ${card.rank}, tier ${card.tier}`);
      button.querySelector(".atlas-card-action").textContent = selected ? "In pack" : "Add";
    });
  }

  function toggleCard(rank) {
    const card = byRank.get(rank);
    if (!card) return;

    const removing = selectedRanks.has(rank);
    if (removing) selectedRanks.delete(rank);
    else selectedRanks.add(rank);

    renderPack();
    renderResults();
    updateAtlasSelection();
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
    updateAtlasSelection();
    liveRegion.textContent = "Current pack cleared.";
    if (currentView === "picker") searchInput.focus({ preventScroll: true });
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

  function activateView(view, { focus = false, updateHash = true } = {}) {
    currentView = view === "atlas" ? "atlas" : "picker";
    const atlasIsActive = currentView === "atlas";
    pickerView.hidden = atlasIsActive;
    atlasView.hidden = !atlasIsActive;
    document.body.dataset.view = currentView;

    viewTabs.forEach((tab) => {
      const selected = tab.dataset.view === currentView;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && focus) tab.focus();
    });

    if (updateHash) {
      const nextHash = atlasIsActive ? "#all-cards" : `${location.pathname}${location.search}`;
      history.replaceState(null, "", nextHash);
    }

    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
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
      activateView("picker");
      searchInput.focus();
      searchInput.select();
    }
  });

  viewTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateView(tab.dataset.view));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? viewTabs.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + viewTabs.length) % viewTabs.length;
      activateView(viewTabs[nextIndex].dataset.view, { focus: true });
    });
  });

  clearSearchButton.addEventListener("click", clearSearch);
  clearPackButton.addEventListener("click", clearPack);
  packElement.addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-remove-rank]");
    if (removeButton) toggleCard(Number(removeButton.dataset.removeRank));
  });
  packDock.addEventListener("click", () => {
    activateView("picker");
    requestAnimationFrame(() => {
      packElement.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
      packTitle.focus({ preventScroll: true });
    });
  });

  if ("IntersectionObserver" in window) {
    const packObserver = new IntersectionObserver(([entry]) => {
      const suppressed = currentView === "picker" && entry.isIntersecting;
      packDock.classList.toggle("is-suppressed", suppressed);
      packDock.tabIndex = suppressed ? -1 : 0;
      packDock.setAttribute("aria-hidden", String(suppressed));
    }, { threshold: 0.08 });
    packObserver.observe(packElement);
  }

  renderResults();
  renderPack({ animate: false });
  renderAtlas();
  activateView(location.hash === "#all-cards" ? "atlas" : "picker", { updateHash: false });

  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js", { updateViaCache: "none" }).catch(() => {}));
  }
})();
