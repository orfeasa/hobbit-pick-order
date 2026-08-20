(() => {
  "use strict";

  const cards = Array.isArray(window.HOBBIT_CARDS) ? window.HOBBIT_CARDS : [];
  const byRank = new Map(cards.map((card) => [card.rank, card]));
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
  const tierOrder = ["S", "A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F", "?"];

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
  const liveRegion = document.querySelector("#live-region");
  const viewTabs = [...document.querySelectorAll("[data-view]")];
  const pickerView = document.querySelector("#picker-view");
  const atlasView = document.querySelector("#atlas-view");
  const trainingView = document.querySelector("#training-view");
  const colorNavigation = document.querySelector("#color-navigation");
  const cardAtlas = document.querySelector("#card-atlas");
  const trainingColors = document.querySelector("#training-colors");
  const trainingCardElement = document.querySelector("#training-card");
  const trainingCardImage = document.querySelector("#training-card-image");
  const trainingCardName = document.querySelector("#training-card-name");
  const trainingCardCount = document.querySelector("#training-card-count");
  const trainingAccuracy = document.querySelector("#training-accuracy");
  const trainingAttempts = document.querySelector("#training-attempts");
  const tierChoices = document.querySelector("#tier-choices");
  const revealTierButton = document.querySelector("#reveal-tier");
  const trainingAnswer = document.querySelector("#training-answer");
  const trainingResultTitle = document.querySelector("#training-result-title");
  const trainingResultCopy = document.querySelector("#training-result-copy");
  const trainingNeighbours = document.querySelector("#training-neighbours");
  const nextTrainingCardButton = document.querySelector("#next-training-card");

  let currentView = "picker";
  let trainingFilter = "ALL";
  let trainingQueue = [];
  let trainingCard = null;
  let trainingAnswered = false;
  let trainingReviewed = 0;
  let trainingCorrect = 0;

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
    const item = document.createElement("article");
    item.className = "result-row";
    item.setAttribute("role", "listitem");
    item.setAttribute("aria-label", `${card.name}, pick rank ${card.rank}, tier ${card.tier}`);

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
    const colorName = colorGroups.find((group) => group.id === card.color)?.name || "Card";
    name.innerHTML = `<strong>${escapeHtml(card.name)}</strong><span>${colorName}</span>`;

    const metadata = document.createElement("span");
    metadata.className = "result-metadata";
    metadata.append(tierBadge(card.tier));

    item.append(image, rank, name, metadata);
    return item;
  }

  function renderResults() {
    const query = searchInput.value;
    const currentResults = resultCards(query);

    resultsElement.replaceChildren(...currentResults.map(resultRow));
    const hasResults = currentResults.length > 0;
    resultsElement.hidden = !hasResults;
    noResultsElement.hidden = hasResults;
    clearSearchButton.hidden = query.length === 0;
    resultLabel.textContent = query ? `Matches for “${query}”` : "Top of the order";
    resultCount.textContent = query
      ? `${currentResults.length} result${currentResults.length === 1 ? "" : "s"}`
      : `Showing ${currentResults.length} of ${cards.length}`;
  }

  function atlasCard(card) {
    const item = document.createElement("article");
    item.className = "atlas-card";
    item.setAttribute("role", "listitem");
    item.setAttribute("aria-label", `${card.name}, pick rank ${card.rank}, tier ${card.tier}`);

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
    copy.append(rank, name, meta);

    item.append(image, copy);
    return item;
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
      grid.setAttribute("role", "list");
      grid.replaceChildren(...groupCards.map(atlasCard));
      section.append(heading, grid);
      return section;
    });
    cardAtlas.replaceChildren(...sections);
  }

  function shuffled(values) {
    const copy = [...values];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
    }
    return copy;
  }

  function trainingPool() {
    return trainingFilter === "ALL" ? cards : cards.filter((card) => card.color === trainingFilter);
  }

  function trainingFilterName() {
    if (trainingFilter === "ALL") return "Whole atlas";
    return colorGroups.find((group) => group.id === trainingFilter)?.name || "Whole atlas";
  }

  function resetTrainingQueue() {
    trainingQueue = shuffled(trainingPool());
    if (trainingCard && trainingQueue.length > 1 && trainingQueue[0].rank === trainingCard.rank) {
      trainingQueue.push(trainingQueue.shift());
    }
  }

  function updateTrainingScore() {
    const accuracy = trainingReviewed === 0 ? null : Math.round((trainingCorrect / trainingReviewed) * 100);
    trainingAccuracy.textContent = accuracy === null ? "—" : `${accuracy}%`;
    trainingAttempts.textContent = `${trainingReviewed} reviewed · ${trainingCorrect} exact`;
  }

  function updateTrainingFilters() {
    trainingColors.querySelectorAll("[data-training-color]").forEach((button) => {
      const selected = button.dataset.trainingColor === trainingFilter;
      button.setAttribute("aria-pressed", String(selected));
    });
  }

  function renderTrainingFilters() {
    const filters = [{ id: "ALL", name: "All colours" }, ...colorGroups];
    const buttons = filters.map((filter) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "training-color";
      button.dataset.trainingColor = filter.id;
      button.dataset.color = filter.id;
      button.innerHTML = `<span class="color-mark" aria-hidden="true"></span><strong>${filter.name}</strong>`;
      button.addEventListener("click", () => {
        if (trainingFilter === filter.id) return;
        trainingFilter = filter.id;
        updateTrainingFilters();
        resetTrainingQueue();
        drawTrainingCard({ focusChoices: true });
      });
      return button;
    });
    trainingColors.replaceChildren(...buttons);
    updateTrainingFilters();
  }

  function renderTierChoices() {
    const buttons = tierOrder.map((tier) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "tier-choice";
      button.dataset.tierGuess = tier;
      button.style.setProperty("--tier-color", tierColors[tier]);
      button.setAttribute("aria-label", `Guess tier ${tier}`);
      button.innerHTML = `<strong>${tier}</strong>`;
      button.addEventListener("click", () => answerTrainingCard(tier));
      return button;
    });
    tierChoices.replaceChildren(...buttons);
  }

  function drawTrainingCard({ focusChoices = false } = {}) {
    if (trainingQueue.length === 0) resetTrainingQueue();
    trainingCard = trainingQueue.shift() || null;
    trainingAnswered = false;
    if (!trainingCard) return;

    trainingCardElement.dataset.color = trainingCard.color;
    trainingCardImage.src = trainingCard.image;
    trainingCardImage.alt = `${trainingCard.name} card`;
    trainingCardName.textContent = trainingCard.name;
    trainingCardCount.textContent = `${trainingFilterName()} · ${trainingQueue.length + 1} ${trainingQueue.length === 0 ? "card" : "cards"} in this pass`;
    trainingAnswer.hidden = true;
    trainingAnswer.dataset.result = "";
    revealTierButton.hidden = false;

    tierChoices.querySelectorAll("[data-tier-guess]").forEach((button) => {
      button.disabled = false;
      button.dataset.result = "";
      button.setAttribute("aria-pressed", "false");
    });

    if (focusChoices) {
      requestAnimationFrame(() => {
        trainingCardElement.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
        tierChoices.querySelector("button")?.focus({ preventScroll: true });
      });
    }
  }

  function neighbourItem(card, label, isCurrent = false) {
    const item = document.createElement("li");
    if (isCurrent) item.className = "is-current";
    const routeLabel = document.createElement("span");
    routeLabel.textContent = label;
    const name = document.createElement("strong");
    name.textContent = `#${card.rank} ${card.name}`;
    const tier = document.createElement("span");
    tier.textContent = `Tier ${card.tier}`;
    item.append(routeLabel, name, tier);
    return item;
  }

  function renderTrainingNeighbours(card) {
    const nearby = [
      { card: byRank.get(card.rank - 1), label: "One above" },
      { card, label: "This card", current: true },
      { card: byRank.get(card.rank + 1), label: "One below" },
    ].filter((entry) => entry.card);
    trainingNeighbours.replaceChildren(...nearby.map((entry) => neighbourItem(entry.card, entry.label, entry.current)));
  }

  function answerTrainingCard(guess) {
    if (!trainingCard || trainingAnswered) return;
    trainingAnswered = true;
    trainingReviewed += 1;

    const revealed = guess === null;
    const correct = guess === trainingCard.tier;
    const guessedIndex = guess === null ? -1 : tierOrder.indexOf(guess);
    const correctIndex = tierOrder.indexOf(trainingCard.tier);
    const nearMiss = !revealed && !correct && Math.abs(guessedIndex - correctIndex) === 1;

    if (correct) trainingCorrect += 1;
    else trainingQueue.splice(Math.min(3, trainingQueue.length), 0, trainingCard);

    updateTrainingScore();
    tierChoices.querySelectorAll("[data-tier-guess]").forEach((button) => {
      const tier = button.dataset.tierGuess;
      button.disabled = true;
      button.setAttribute("aria-pressed", String(tier === guess));
      if (tier === trainingCard.tier) button.dataset.result = "correct";
      else if (tier === guess) button.dataset.result = "wrong";
      else button.dataset.result = "muted";
    });

    if (correct) {
      trainingResultTitle.textContent = "Right on the mark";
      trainingResultCopy.textContent = `${trainingCard.name} is tier ${trainingCard.tier}, ranked #${trainingCard.rank} overall.`;
      trainingAnswer.dataset.result = "correct";
    } else if (revealed) {
      trainingResultTitle.textContent = `Tier ${trainingCard.tier} revealed`;
      trainingResultCopy.textContent = `${trainingCard.name} is ranked #${trainingCard.rank}. It will return again in a few cards.`;
      trainingAnswer.dataset.result = "review";
    } else if (nearMiss) {
      trainingResultTitle.textContent = "One trail marker away";
      trainingResultCopy.textContent = `You chose ${guess}; ${trainingCard.name} is tier ${trainingCard.tier}, ranked #${trainingCard.rank}.`;
      trainingAnswer.dataset.result = "near";
    } else {
      trainingResultTitle.textContent = `Tier ${trainingCard.tier}, not ${guess}`;
      trainingResultCopy.textContent = `${trainingCard.name} is ranked #${trainingCard.rank}. It will return again in a few cards.`;
      trainingAnswer.dataset.result = "wrong";
    }

    renderTrainingNeighbours(trainingCard);
    revealTierButton.hidden = true;
    trainingAnswer.hidden = false;
    if (!prefersReducedMotion) {
      trainingAnswer.animate(
        [
          { clipPath: "inset(0 0 100% 0)", filter: "saturate(.7)" },
          { clipPath: "inset(0 0 0 0)", filter: "saturate(1)" },
        ],
        { duration: 320, easing: "cubic-bezier(.16, 1, .3, 1)" }
      );
    }

    liveRegion.textContent = `${trainingResultTitle.textContent}. ${trainingResultCopy.textContent}`;
  }

  function clearSearch() {
    searchInput.value = "";
    renderResults();
    searchInput.focus();
  }

  function activateView(view, { focus = false, updateHash = true } = {}) {
    currentView = ["atlas", "training"].includes(view) ? view : "picker";
    pickerView.hidden = currentView !== "picker";
    atlasView.hidden = currentView !== "atlas";
    trainingView.hidden = currentView !== "training";
    document.body.dataset.view = currentView;

    viewTabs.forEach((tab) => {
      const selected = tab.dataset.view === currentView;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && focus) tab.focus();
    });

    if (updateHash) {
      const nextHash = currentView === "atlas"
        ? "#all-cards"
        : currentView === "training"
          ? "#train"
          : `${location.pathname}${location.search}`;
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
    renderResults();
  });

  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && searchInput.value) {
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
  revealTierButton.addEventListener("click", () => answerTrainingCard(null));
  nextTrainingCardButton.addEventListener("click", () => drawTrainingCard({ focusChoices: true }));

  renderResults();
  renderAtlas();
  renderTrainingFilters();
  renderTierChoices();
  resetTrainingQueue();
  drawTrainingCard();
  activateView(location.hash === "#all-cards" ? "atlas" : location.hash === "#train" ? "training" : "picker", { updateHash: false });

  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js", { updateViaCache: "none" }).catch(() => {}));
  }
})();
