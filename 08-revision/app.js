(() => {
  "use strict";

  const DATA = window.ICT450_REVISION_DATA;
  const STORAGE_KEY = "ict450-revision-activities-v1";
  const $ = (id) => document.getElementById(id);
  const unique = (values) => [...new Set(values)];
  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const emptyState = () => ({
    mastery: [],
    review: [],
    activitySessions: {},
    flashRatings: {},
    flashSession: null,
  });

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return {
        mastery: Array.isArray(saved.mastery) ? saved.mastery : [],
        review: Array.isArray(saved.review) ? saved.review : [],
        activitySessions: saved.activitySessions && typeof saved.activitySessions === "object" ? saved.activitySessions : {},
        flashRatings: saved.flashRatings && typeof saved.flashRatings === "object" ? saved.flashRatings : {},
        flashSession: saved.flashSession && typeof saved.flashSession === "object" ? saved.flashSession : null,
      };
    } catch {
      return emptyState();
    }
  }

  let state = loadState();
  let activitySessionKey = "";
  let currentOrder = [];
  let toastTimer;

  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* Activities still work when storage is unavailable. */ }
    renderMetrics();
  }

  function showToast(message) {
    clearTimeout(toastTimer);
    $("toast").textContent = message;
    $("toast").classList.add("is-visible");
    toastTimer = setTimeout(() => $("toast").classList.remove("is-visible"), 2400);
  }

  function chapter(number) {
    return DATA.chapters.find((item) => item.number === number);
  }

  function showView(name) {
    document.querySelectorAll("[data-view-panel]").forEach((panel) => panel.classList.toggle("is-visible", panel.dataset.viewPanel === name));
    document.querySelectorAll("[data-view]").forEach((button) => {
      const active = button.dataset.view === name;
      button.classList.toggle("is-active", active);
      if (active) button.setAttribute("aria-current", "page"); else button.removeAttribute("aria-current");
    });
    if (name === "activities") renderActivityChapters();
    if (name === "flashcards") renderFlashSetup();
    if (name === "progress") renderProgress();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function addMastery(id) {
    state.mastery = unique([...state.mastery, id]);
    state.review = state.review.filter((item) => item !== id);
  }

  function addReview(id) {
    state.review = unique([...state.review, id]);
  }

  function renderMetrics() {
    $("metricActivities").textContent = DATA.meta.activityCount;
    $("metricCards").textContent = DATA.meta.flashcardCount;
    $("metricMastered").textContent = state.mastery.length;
    $("metricRemembered").textContent = Object.values(state.flashRatings).filter((rating) => rating === "remembered").length;
    if ($("reviewWeak")) {
      $("reviewWeak").disabled = state.review.length === 0;
      $("reviewWeak").textContent = state.review.length ? `Review weak items (${state.review.length})` : "Review weak items";
    }
  }

  function renderActivityChapters() {
    $("activityChapterGrid").innerHTML = DATA.chapters.map((entry) => {
      const items = DATA.activities.filter((item) => item.chapter === entry.number);
      const mastered = items.filter((item) => state.mastery.includes(item.id)).length;
      const session = state.activitySessions[`chapter-${entry.number}`];
      const currentIds = items.map((item) => item.id);
      const sessionMatches = session && Array.isArray(session.ids) && session.ids.join("|") === currentIds.join("|");
      const status = sessionMatches && session.position < session.ids.length ? `Resume at question ${session.position + 1} of ${session.ids.length}` : `${mastered} / ${items.length} mastered`;
      return `<button class="chapter-card" type="button" data-activity-chapter="${entry.number}">
        <span class="chapter-number">Chapter ${entry.number}</span><h2>${escapeHtml(entry.title)}</h2><p>${escapeHtml(entry.summary)}</p>
        <span class="chapter-meta"><span>${items.length} activities</span><span>${escapeHtml(status)}</span></span>
      </button>`;
    }).join("");
    $("activityChapterGrid").classList.remove("is-hidden");
    $("activitySession").classList.add("is-hidden");
    $("reviewWeak").disabled = state.review.length === 0;
    $("reviewWeak").textContent = state.review.length ? `Review weak items (${state.review.length})` : "Review weak items";
  }

  function beginActivitySession(key, ids, title, restart = false) {
    if (restart || !state.activitySessions[key] || state.activitySessions[key].ids.join("|") !== ids.join("|")) {
      state.activitySessions[key] = { ids: [...ids], position: 0, title, optionOrders: {} };
      saveState();
    }
    if (!state.activitySessions[key].optionOrders || typeof state.activitySessions[key].optionOrders !== "object") {
      state.activitySessions[key].optionOrders = {};
      saveState();
    }
    activitySessionKey = key;
    $("activityChapterGrid").classList.add("is-hidden");
    $("activitySession").classList.remove("is-hidden");
    renderActivityItem();
  }

  function activitySession() {
    return state.activitySessions[activitySessionKey];
  }

  function activityItem() {
    const session = activitySession();
    return session ? DATA.activities.find((item) => item.id === session.ids[session.position]) : null;
  }

  function choiceOrder(item) {
    const session = activitySession();
    if (session.optionOrders[item.id]) return session.optionOrders[item.id];
    const original = item.options.map((_, index) => index);
    let order = shuffle(original);
    if (order.join("|") === original.join("|") && order.length > 1) order = [...order.slice(1), order[0]];
    if (item.type === "multiple") {
      const correct = new Set(item.answer);
      const leadingCorrect = order.slice(0, item.answer.length).every((index) => correct.has(index));
      if (leadingCorrect) {
        const firstIncorrect = order.findIndex((index) => !correct.has(index));
        if (firstIncorrect > -1) [order[0], order[firstIncorrect]] = [order[firstIncorrect], order[0]];
      }
    }
    session.optionOrders[item.id] = order;
    saveState();
    return order;
  }

  function choiceMarkup(item, multiple) {
    const type = multiple ? "checkbox" : "radio";
    return `<div class="choice-list">${choiceOrder(item).map((index) => `<label class="choice" data-choice="${index}"><input type="${type}" name="activityChoice" value="${index}"><span>${escapeHtml(item.options[index])}</span></label>`).join("")}</div>`;
  }

  function orderMarkup() {
    return `<div class="order-list">${currentOrder.map((option, index) => `<div class="order-row"><span class="order-index">${index + 1}</span><span>${escapeHtml(option)}</span><span class="order-actions"><button type="button" data-order-up="${index}" aria-label="Move ${escapeHtml(option)} up" ${index === 0 ? "disabled" : ""}>↑</button><button type="button" data-order-down="${index}" aria-label="Move ${escapeHtml(option)} down" ${index === currentOrder.length - 1 ? "disabled" : ""}>↓</button></span></div>`).join("")}</div>`;
  }

  function renderActivityItem() {
    const session = activitySession();
    if (!session) return;
    $("activitySessionTitle").textContent = session.title;
    if (session.position >= session.ids.length) {
      const mastered = session.ids.filter((id) => state.mastery.includes(id)).length;
      $("activityPosition").textContent = "Complete";
      $("activityProgressBar").style.width = "100%";
      $("activityCard").innerHTML = `<div class="feedback ${mastered === session.ids.length ? "good" : "review"}"><h2>Session complete</h2><p><strong>${mastered} of ${session.ids.length}</strong> activities are mastered. ${state.review.length ? `${state.review.length} item${state.review.length === 1 ? " is" : "s are"} currently on your review list.` : "Your review list is clear."}</p></div><div class="next-row"><button class="secondary-button" type="button" id="completeChapters">Choose another chapter</button><button class="primary-button" type="button" id="completeReview" ${state.review.length ? "" : "disabled"}>Review weak items</button></div>`;
      $("completeChapters").addEventListener("click", renderActivityChapters);
      $("completeReview").addEventListener("click", startReviewSession);
      return;
    }
    const item = activityItem();
    currentOrder = item.type === "order" ? [...item.options] : [];
    $("activityPosition").textContent = `Question ${session.position + 1} of ${session.ids.length}`;
    $("activityProgressBar").style.width = `${Math.round((session.position / session.ids.length) * 100)}%`;
    let control = "";
    if (item.type === "single") control = choiceMarkup(item, false);
    if (item.type === "multiple") control = choiceMarkup(item, true);
    if (item.type === "order") control = orderMarkup();
    if (item.type === "self") control = `<label for="selfAnswer"><strong>Your answer</strong></label><textarea id="selfAnswer" placeholder="Write an answer before revealing the guide."></textarea>`;
    const label = { single:"Multiple choice", multiple:"Multiple response", order:"Ordering", self:"Guided self-assessment" }[item.type];
    $("activityCard").innerHTML = `<div class="activity-head"><span class="activity-type">${escapeHtml(label)}</span><span class="difficulty">${escapeHtml(item.difficulty)}</span></div><h2>${escapeHtml(item.prompt)}</h2><div id="activityControl">${control}</div><div class="button-row"><button class="primary-button" id="submitActivity" type="button">${item.type === "self" ? "Reveal answer guide" : "Check answer"}</button></div><div id="activityFeedback" aria-live="polite"></div>`;
    $("submitActivity").addEventListener("click", () => item.type === "self" ? revealSelfGuide(item) : checkObjective(item));
    if (item.type === "order") bindOrderButtons(item);
  }

  function bindOrderButtons(item) {
    document.querySelectorAll("[data-order-up]").forEach((button) => button.addEventListener("click", () => moveOrder(Number(button.dataset.orderUp), -1, item)));
    document.querySelectorAll("[data-order-down]").forEach((button) => button.addEventListener("click", () => moveOrder(Number(button.dataset.orderDown), 1, item)));
  }

  function moveOrder(index, direction, item) {
    const target = index + direction;
    if (target < 0 || target >= currentOrder.length) return;
    [currentOrder[index], currentOrder[target]] = [currentOrder[target], currentOrder[index]];
    $("activityControl").innerHTML = orderMarkup();
    bindOrderButtons(item);
  }

  function selectedChoices() {
    return [...document.querySelectorAll('input[name="activityChoice"]:checked')].map((input) => Number(input.value)).sort((a, b) => a - b);
  }

  function sameArray(left, right) {
    return left.length === right.length && left.every((value, index) => value === right[index]);
  }

  function lockChoices(item) {
    document.querySelectorAll('input[name="activityChoice"]').forEach((input) => { input.disabled = true; });
    const correct = Array.isArray(item.answer) ? item.answer : [item.answer];
    document.querySelectorAll("[data-choice]").forEach((label) => {
      const index = Number(label.dataset.choice);
      const selected = label.querySelector("input").checked;
      if (correct.includes(index)) label.classList.add("is-correct");
      else if (selected) label.classList.add("is-wrong");
    });
  }

  function checkObjective(item) {
    let correct = false;
    if (item.type === "order") correct = sameArray(currentOrder, item.answer);
    else {
      const selected = selectedChoices();
      if (!selected.length) { showToast("Choose an answer before checking."); return; }
      const expected = (Array.isArray(item.answer) ? item.answer : [item.answer]).slice().sort((a, b) => a - b);
      correct = sameArray(selected, expected);
      lockChoices(item);
    }
    if (item.type === "order") document.querySelectorAll(".order-actions button").forEach((button) => { button.disabled = true; });
    if (correct) addMastery(item.id); else addReview(item.id);
    saveState();
    $("submitActivity").disabled = true;
    $("activityFeedback").innerHTML = `<div class="feedback ${correct ? "good" : "bad"}"><strong>${correct ? "Correct." : "Not yet."}</strong><p>${escapeHtml(item.explanation)}</p>${!correct && item.type === "order" ? `<p><strong>Correct order:</strong> ${item.answer.map(escapeHtml).join(" → ")}</p>` : ""}</div>${nextButtonMarkup()}`;
    bindNextActivity();
  }

  function revealSelfGuide(item) {
    const answer = $("selfAnswer").value.trim();
    if (!answer) { showToast("Write an attempt before revealing the guide."); return; }
    $("selfAnswer").disabled = true;
    $("submitActivity").disabled = true;
    const model = item.modelAnswer.includes("\n")
      ? `<p class="model-label"><strong>Concise model:</strong></p><pre class="model-answer">${escapeHtml(item.modelAnswer)}</pre>`
      : `<p><strong>Concise model:</strong> ${escapeHtml(item.modelAnswer)}</p>`;
    $("activityFeedback").innerHTML = `<div class="feedback review"><strong>Compare your answer with the guide.</strong><ul>${item.checklist.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>${model}<div class="self-rating" aria-label="Rate your answer"><button type="button" data-self-rating="correct">Correct</button><button type="button" data-self-rating="almost">Almost</button><button type="button" data-self-rating="review">Review</button></div></div>`;
    document.querySelectorAll("[data-self-rating]").forEach((button) => button.addEventListener("click", () => rateSelf(item, button.dataset.selfRating)));
  }

  function rateSelf(item, rating) {
    if (rating === "correct") addMastery(item.id); else addReview(item.id);
    saveState();
    document.querySelectorAll("[data-self-rating]").forEach((button) => { button.disabled = true; });
    $("activityFeedback").insertAdjacentHTML("beforeend", nextButtonMarkup());
    bindNextActivity();
  }

  function nextButtonMarkup() {
    const session = activitySession();
    const final = session.position === session.ids.length - 1;
    return `<div class="next-row"><span></span><button class="primary-button" id="nextActivity" type="button">${final ? "Finish session" : "Next activity"}</button></div>`;
  }

  function bindNextActivity() {
    $("nextActivity").addEventListener("click", () => {
      activitySession().position += 1;
      saveState();
      renderActivityItem();
      $("activityCard").scrollIntoView({ behavior:"smooth", block:"start" });
    });
  }

  function startChapterSession(number, restart = false) {
    const entry = chapter(number);
    const ids = DATA.activities.filter((item) => item.chapter === number).map((item) => item.id);
    beginActivitySession(`chapter-${number}`, ids, `Chapter ${number}: ${entry.title}`, restart);
  }

  function startReviewSession() {
    const ids = state.review.filter((id) => DATA.activities.some((item) => item.id === id));
    if (!ids.length) { showToast("Your review list is clear."); return; }
    beginActivitySession("review", ids, "Review weak items", true);
  }

  function renderFlashSetup() {
    if (!$("flashChapter").options.length) {
      DATA.chapters.forEach((entry) => $("flashChapter").insertAdjacentHTML("beforeend", `<option value="${entry.number}">Chapter ${entry.number}: ${escapeHtml(entry.title)}</option>`));
      $("laneFilters").innerHTML = Object.entries(DATA.lanes).map(([key, lane]) => `<label><input type="checkbox" value="${key}" checked><span>${escapeHtml(lane.symbol)} ${escapeHtml(lane.label)}</span></label>`).join("");
      $("laneLegend").innerHTML = Object.entries(DATA.lanes).map(([key, lane]) => `<div class="legend-item lane-${key}"><strong>${escapeHtml(lane.symbol)} ${escapeHtml(lane.label)}</strong><small>${escapeHtml(lane.description)}</small></div>`).join("");
    }
    $("flashcardSetup").classList.remove("is-hidden");
    $("flashStudy").classList.add("is-hidden");
  }

  function flashSettings() {
    return {
      chapter: Number($("flashChapter").value),
      lanes: [...$("laneFilters").querySelectorAll("input:checked")].map((input) => input.value).sort(),
      order: $("flashOrder").value,
      scope: $("flashScope").value,
    };
  }

  function shuffle(values) {
    const copy = [...values];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function matchingCards(settings) {
    let items = DATA.flashcards.filter((item) => item.chapter === settings.chapter && settings.lanes.includes(item.lane));
    if (settings.scope === "not-remembered") items = items.filter((item) => state.flashRatings[item.id] !== "remembered");
    if (settings.scope === "learning") items = items.filter((item) => ["again", "learning"].includes(state.flashRatings[item.id]));
    return items;
  }

  function sameSettings(left, right) {
    return left && right && left.chapter === right.chapter && left.order === right.order && left.scope === right.scope && left.lanes.join("|") === right.lanes.join("|");
  }

  function beginFlashcards(restart = false) {
    const settings = flashSettings();
    if (!settings.lanes.length) { showToast("Choose at least one memory lane."); return; }
    const matches = matchingCards(settings);
    if (!matches.length) { showToast("No cards match this setup yet."); return; }
    if (restart || !sameSettings(state.flashSession?.settings, settings)) {
      const ids = matches.map((item) => item.id);
      state.flashSession = { settings, ids: settings.order === "shuffle" ? shuffle(ids) : ids, position: 0 };
      saveState();
    }
    $("flashcardSetup").classList.add("is-hidden");
    $("flashStudy").classList.remove("is-hidden");
    renderFlashcard();
  }

  function renderFlashcard() {
    const session = state.flashSession;
    if (!session) return;
    const entry = chapter(session.settings.chapter);
    $("flashDeckTitle").textContent = `Chapter ${entry.number}: ${entry.title}`;
    if (session.position >= session.ids.length) {
      $("flashPosition").textContent = "Complete";
      $("flashProgressBar").style.width = "100%";
      $("flashcard").innerHTML = `<div class="flashcard-complete"><h2>Deck complete</h2><p>Every selected card has been shown. Your latest confidence ratings are saved locally.</p><div class="button-row"><button class="secondary-button" type="button" id="deckSetup">Change setup</button><button class="primary-button" type="button" id="deckAgain">Study this deck again</button></div></div>`;
      $("deckSetup").addEventListener("click", renderFlashSetup);
      $("deckAgain").addEventListener("click", () => beginFlashcards(true));
      return;
    }
    const item = DATA.flashcards.find((candidate) => candidate.id === session.ids[session.position]);
    const lane = DATA.lanes[item.lane];
    const previous = state.flashRatings[item.id];
    $("flashPosition").textContent = `${session.position + 1} / ${session.ids.length}`;
    $("flashProgressBar").style.width = `${Math.round((session.position / session.ids.length) * 100)}%`;
    $("flashcard").innerHTML = `<div class="flashcard-scene"><div class="flashcard-inner" id="flashcardInner"><section class="flashcard-face flashcard-front" id="flashcardFront"><span class="lane-badge lane-${item.lane}">${escapeHtml(lane.symbol)} ${escapeHtml(lane.label)}</span><p class="chapter-label">${escapeHtml(item.id)}${previous ? ` · Last rating: ${escapeHtml(previous)}` : ""}</p><h2>${escapeHtml(item.prompt)}</h2><p class="flip-hint">Think of your answer, then flip the card.</p><button class="primary-button" id="revealFlashcard" type="button" aria-controls="flashcardBack" aria-expanded="false">Flip to answer</button></section><section class="flashcard-face flashcard-back" id="flashcardBack" aria-hidden="true"><span class="lane-badge lane-${item.lane}">${escapeHtml(lane.symbol)} ${escapeHtml(lane.label)}</span><p class="chapter-label">${escapeHtml(item.id)} · Answer</p><div class="flash-answer"><strong>Answer</strong><p>${escapeHtml(item.answer)}</p><div class="rating-row"><button class="rating-button again" type="button" data-card-rating="again" disabled>Again</button><button class="rating-button learning" type="button" data-card-rating="learning" disabled>Learning</button><button class="rating-button remembered" type="button" data-card-rating="remembered" disabled>Remembered</button></div></div></section></div></div>`;
    $("revealFlashcard").addEventListener("click", () => {
      $("flashcardInner").classList.add("is-flipped");
      $("flashcardFront").setAttribute("aria-hidden", "true");
      $("flashcardBack").setAttribute("aria-hidden", "false");
      $("revealFlashcard").setAttribute("aria-expanded", "true");
      $("revealFlashcard").disabled = true;
      document.querySelectorAll("[data-card-rating]").forEach((button) => {
        button.disabled = false;
        button.addEventListener("click", () => rateFlashcard(item.id, button.dataset.cardRating));
      });
      window.setTimeout(() => document.querySelector("[data-card-rating]")?.focus(), window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 560);
    });
  }

  function rateFlashcard(id, rating) {
    state.flashRatings[id] = rating;
    state.flashSession.position += 1;
    saveState();
    renderFlashcard();
  }

  function skipFlashcard() {
    if (!state.flashSession || state.flashSession.position >= state.flashSession.ids.length) return;
    state.flashSession.position += 1;
    saveState();
    renderFlashcard();
  }

  function renderProgress() {
    const remembered = Object.values(state.flashRatings).filter((rating) => rating === "remembered").length;
    const learning = Object.values(state.flashRatings).filter((rating) => ["again", "learning"].includes(rating)).length;
    $("progressMetrics").innerHTML = `<article class="progress-card"><span>${state.mastery.length} / ${DATA.activities.length}</span><strong>Activities mastered</strong><p>Unique quiz activities completed successfully.</p></article><article class="progress-card"><span>${state.review.length}</span><strong>Review list</strong><p>Incorrect, Almost or Review items still to retry.</p></article><article class="progress-card"><span>${remembered} / ${DATA.flashcards.length}</span><strong>Cards remembered</strong><p>Latest rating is Remembered.</p></article><article class="progress-card"><span>${learning}</span><strong>Cards learning</strong><p>Latest rating is Again or Learning.</p></article>`;
    $("chapterProgress").innerHTML = `<h2>Chapter progress</h2><div class="chapter-bars">${DATA.chapters.map((entry) => {
      const activityIds = DATA.activities.filter((item) => item.chapter === entry.number).map((item) => item.id);
      const cardIds = DATA.flashcards.filter((item) => item.chapter === entry.number).map((item) => item.id);
      const activityDone = activityIds.filter((id) => state.mastery.includes(id)).length;
      const cardDone = cardIds.filter((id) => state.flashRatings[id] === "remembered").length;
      const percent = Math.round(((activityDone + cardDone) / (activityIds.length + cardIds.length)) * 100);
      return `<div class="chapter-bar"><strong>Chapter ${entry.number}: ${escapeHtml(entry.title)}</strong><div class="mini-track" aria-label="${percent}% combined chapter revision"><span style="width:${percent}%"></span></div><small>${activityDone}/${activityIds.length} quiz · ${cardDone}/${cardIds.length} cards</small></div>`;
    }).join("")}</div>`;
  }

  function exportProgress() {
    const payload = { subject:"ICT450", appRelease:DATA.meta.release, exportedAt:new Date().toISOString(), progress:state };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type:"application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ICT450-revision-progress-${new Date().toISOString().slice(0,10)}.json`;
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast("Progress backup exported.");
  }

  function resetPart(part) {
    const label = part === "all" ? "all quiz and flashcard progress" : part === "activities" ? "all quiz progress" : "all flashcard progress";
    if (!window.confirm(`Reset ${label} on this browser? This cannot be undone unless you exported a backup.`)) return;
    if (part === "activities" || part === "all") {
      state.mastery = [];
      state.review = [];
      state.activitySessions = {};
    }
    if (part === "cards" || part === "all") {
      state.flashRatings = {};
      state.flashSession = null;
    }
    saveState();
    renderProgress();
    showToast("Local progress reset.");
  }

  function bindEvents() {
    document.querySelectorAll("[data-view]").forEach((button) => button.addEventListener("click", () => showView(button.dataset.view)));
    document.querySelectorAll("[data-go]").forEach((button) => button.addEventListener("click", () => showView(button.dataset.go)));
    $("activityChapterGrid").addEventListener("click", (event) => {
      const button = event.target.closest("[data-activity-chapter]");
      if (button) startChapterSession(Number(button.dataset.activityChapter));
    });
    $("reviewWeak").addEventListener("click", startReviewSession);
    $("closeActivity").addEventListener("click", renderActivityChapters);
    $("restartActivity").addEventListener("click", () => {
      const session = activitySession();
      if (!session || !window.confirm("Restart this quiz from its first activity? Existing mastery is retained.")) return;
      session.position = 0;
      session.optionOrders = {};
      saveState();
      renderActivityItem();
    });
    $("startFlashcards").addEventListener("click", () => beginFlashcards(false));
    $("restartFlashcards").addEventListener("click", () => beginFlashcards(true));
    $("closeFlashcards").addEventListener("click", renderFlashSetup);
    $("skipFlashcard").addEventListener("click", skipFlashcard);
    $("exportProgress").addEventListener("click", exportProgress);
    $("resetActivities").addEventListener("click", () => resetPart("activities"));
    $("resetCards").addEventListener("click", () => resetPart("cards"));
    $("resetAll").addEventListener("click", () => resetPart("all"));
  }

  renderMetrics();
  renderActivityChapters();
  renderFlashSetup();
  bindEvents();
})();
