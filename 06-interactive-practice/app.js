(() => {
  "use strict";

  const DATA = window.ICT450_PRACTICE_DATA;
  const STORAGE_KEY = "ict450-practice-studio-v1";
  const EXAM_PAPERS = {
    "February 2023": "../04-exams/repaired/FEB23%20-%20repaired%20derivative.pdf",
    "July 2023": "../04-exams/ocr/JULY23%20-%20searchable%20OCR.pdf",
    "January 2024": "../04-exams/ocr/JAN24%20-%20searchable%20OCR.pdf",
    "July 2024": "../04-exams/official/JULY24.pdf",
    "February 2025": "../04-exams/repaired/FEB25%20-%20repaired%20derivative.pdf",
    "July 2025": "../04-exams/official/JULY25.pdf",
    "July 2026": "../04-exams/ocr/JULY26%20-%20searchable%20OCR.pdf",
  };
  const $ = (id) => document.getElementById(id);
  const unique = (values) => [...new Set(values)];
  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      const practiceIds = new Set(DATA.practice.map((item) => item.id));
      const sqlIds = new Set(DATA.sql.map((item) => item.id));
      return {
        reviewed: Array.isArray(saved.reviewed) ? saved.reviewed.filter((id) => practiceIds.has(id)) : [],
        sqlAttempted: Array.isArray(saved.sqlAttempted) ? saved.sqlAttempted.filter((id) => sqlIds.has(id)) : [],
      };
    } catch {
      return { reviewed: [], sqlAttempted: [] };
    }
  }

  let state = loadState();
  let librarySelected = DATA.practice[0]?.id || "";
  let sqlIndex = 0;

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // The practice activities remain usable when a browser blocks local
      // storage for file-based pages; only persistence is unavailable.
    }
    updateProgress();
  }

  function addUnique(field, value) {
    if (!state[field].includes(value)) state[field].push(value);
    saveState();
  }

  function reviewedSet() {
    return new Set([...state.reviewed, ...state.sqlAttempted]);
  }

  function updateProgress() {
    const reviewed = reviewedSet();
    const percent = DATA.practice.length ? Math.round((reviewed.size / DATA.practice.length) * 100) : 0;
    $("headerProgress").textContent = `${percent}%`;
    $("metricDone").textContent = reviewed.size;
    $("progressSummary").innerHTML = `
      <div><strong>${reviewed.size}</strong><span>unique parts attempted</span></div>
      <div><strong>${state.sqlAttempted.length}</strong><span>SQL attempts</span></div>`;
  }

  function showView(name) {
    document.querySelectorAll("[data-view-panel]").forEach((panel) => {
      panel.classList.toggle("is-visible", panel.dataset.viewPanel === name);
    });
    document.querySelectorAll(".nav-button").forEach((button) => {
      const active = button.dataset.view === name;
      button.classList.toggle("is-active", active);
      if (active) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });
    if (name === "library") renderLibrary();
    if (name === "sql") renderSql();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function humanType(type) {
    const labels = {
      theory_and_applied_interpretation: "Theory and application",
      normalization_problem: "Normalization",
      sql_construction: "SQL construction",
    };
    return labels[type] || type.replaceAll("_", " ");
  }

  function populateFilters() {
    unique(DATA.practice.map((item) => item.type)).forEach((type) => {
      $("libraryType").insertAdjacentHTML("beforeend", `<option value="${escapeHtml(type)}">${escapeHtml(humanType(type))}</option>`);
    });
    unique(DATA.practice.map((item) => item.session)).forEach((session) => {
      $("librarySession").insertAdjacentHTML("beforeend", `<option value="${escapeHtml(session)}">${escapeHtml(session)}</option>`);
    });
    unique(DATA.practice.flatMap((item) => item.chapters)).sort((a, b) => a - b).forEach((chapter) => {
      $("libraryChapter").insertAdjacentHTML("beforeend", `<option value="${chapter}">Chapter ${chapter}</option>`);
    });
  }

  function filteredPractice() {
    const query = $("librarySearch").value.trim().toLowerCase();
    const type = $("libraryType").value;
    const session = $("librarySession").value;
    const chapter = $("libraryChapter").value;
    return DATA.practice.filter((item) => {
      const haystack = `${item.id} ${item.topic} ${item.prompt}`.toLowerCase();
      return (!query || haystack.includes(query))
        && (type === "all" || item.type === type)
        && (session === "all" || item.session === session)
        && (chapter === "all" || item.chapters.includes(Number(chapter)));
    });
  }

  function renderLibrary() {
    const items = filteredPractice();
    if (!items.some((item) => item.id === librarySelected)) librarySelected = items[0]?.id || "";
    const reviewed = reviewedSet();
    $("libraryCount").textContent = `${items.length} item${items.length === 1 ? "" : "s"}`;
    $("libraryList").innerHTML = items.length ? items.map((item) => `
      <button class="question-row ${item.id === librarySelected ? "is-active" : ""} ${reviewed.has(item.id) ? "is-reviewed" : ""}" data-library-id="${item.id}">
        <strong>${escapeHtml(item.id)}</strong><span class="reviewed-dot" aria-label="${reviewed.has(item.id) ? "Reviewed" : "Not reviewed"}"></span>
        <small>${escapeHtml(item.session)} · ${escapeHtml(humanType(item.type))}</small><small>${item.marks} marks</small>
      </button>`).join("") : `<div class="empty-state">No questions match these filters.</div>`;
    renderLibraryDetail();
  }

  function renderLibraryDetail() {
    const item = DATA.practice.find((candidate) => candidate.id === librarySelected);
    if (!item) {
      $("libraryDetail").innerHTML = `<div class="empty-state"><h2>No item selected</h2><p>Adjust the filters to continue.</p></div>`;
      return;
    }
    $("libraryDetail").innerHTML = `
      <span class="detail-meta">${escapeHtml(item.id)}</span>
      <h2>${escapeHtml(item.topic)}</h2>
      <p class="topic-line">${escapeHtml(item.session)} · Chapter ${item.chapters.join(", ")} · ${item.marks} marks</p>
      ${item.context ? `<details class="case-context" open><summary>Case information</summary><pre>${escapeHtml(item.context)}</pre></details>` : ""}
      <div class="prompt-box">${escapeHtml(item.prompt)}</div>
      <button class="primary-button" id="revealLibraryAnswer" type="button" aria-expanded="false">Reveal model response</button>
      <div class="answer-panel is-hidden" id="libraryAnswer"><strong>Model response or marking checklist</strong><pre>${escapeHtml(item.answer)}</pre></div>`;
    $("revealLibraryAnswer").addEventListener("click", () => {
      const nowHidden = $("libraryAnswer").classList.toggle("is-hidden");
      $("revealLibraryAnswer").textContent = nowHidden ? "Reveal model response" : "Hide model response";
      $("revealLibraryAnswer").setAttribute("aria-expanded", String(!nowHidden));
      if (!nowHidden) addUnique("reviewed", item.id);
    });
  }

  function stripSqlComments(text) {
    let result = "";
    let inString = false;
    for (let i = 0; i < text.length; i += 1) {
      if (text[i] === "'") {
        if (inString && text[i + 1] === "'") {
          result += "''";
          i += 1;
          continue;
        }
        inString = !inString;
      } else if (!inString && text[i] === "-" && text[i + 1] === "-") {
        while (i < text.length && text[i] !== "\n") i += 1;
        result += "\n";
        continue;
      }
      result += text[i];
    }
    return result;
  }

  function analyseSql(text) {
    const raw = stripSqlComments(text);
    const normalized = raw.replace(/'(?:''|[^'])*'/g, "''").replace(/\s+/g, " ").trim().toUpperCase();
    const operation = normalized.match(/^(CREATE\s+TABLE|SELECT|UPDATE|INSERT\s+INTO|DELETE)\b/)?.[1] || "";
    const tables = unique([...normalized.matchAll(/\b(?:FROM|JOIN|UPDATE|INTO|REFERENCES|CREATE\s+TABLE)\s*(?:\(\s*)*\[?([A-Z][A-Z0-9_]*)\]?/g)]
      .map((match) => match[1]).filter((name) => name !== "SELECT")).sort();
    const clauses = [];
    [
      ["WHERE", /\bWHERE\b/], ["JOIN", /\b(?:INNER|LEFT|RIGHT)?\s*JOIN\b/], ["LEFT JOIN", /\bLEFT\s+JOIN\b/],
      ["GROUP BY", /\bGROUP\s+BY\b/], ["HAVING", /\bHAVING\b/], ["ORDER BY", /\bORDER\s+BY\b/],
      ["PRIMARY KEY", /\bPRIMARY\s+KEY\b/], ["FOREIGN KEY", /\bFOREIGN\s+KEY\b/], ["DISTINCT", /\bDISTINCT\b/],
    ].forEach(([name, pattern]) => { if (pattern.test(normalized)) clauses.push(name); });
    const functions = ["COUNT", "SUM", "AVG", "IIF"].filter((name) => new RegExp(`\\b${name}\\s*\\(`).test(normalized));
    const selectCount = (normalized.match(/\bSELECT\b/g) || []).length;
    const minimumSubqueries = Math.max(0, selectCount - (operation === "SELECT" ? 1 : 0));
    const dateBounds = [...raw.matchAll(/#(\d{4}-\d{2}-\d{2})#/g)].map((match) => match[1]);
    let depth = 0;
    let balanced = true;
    let inString = false;
    let statementEnd = -1;
    for (let i = 0; i < raw.length; i += 1) {
      if (raw[i] === "'") {
        if (inString && raw[i + 1] === "'") i += 1;
        else inString = !inString;
      } else if (!inString && raw[i] === "(") depth += 1;
      else if (!inString && raw[i] === ")") {
        depth -= 1;
        if (depth < 0) balanced = false;
      } else if (!inString && raw[i] === ";" && statementEnd < 0) statementEnd = i;
    }
    if (depth !== 0 || inString) balanced = false;
    const singleStatement = statementEnd < 0 || !raw.slice(statementEnd + 1).trim();
    return { operation, tables, clauses, functions, minimumSubqueries, dateBounds, balanced, singleStatement };
  }

  function sqlRequirements(expected, actual) {
    const requirements = [];
    requirements.push({ ok: actual.operation === expected.operation, label: `Starts with ${expected.operation || "the required operation"}` });
    requirements.push({ ok: actual.singleStatement, label: actual.singleStatement ? "One SQL statement only" : "Remove text or additional statements after the first semicolon" });
    if (expected.tables.length) {
      const missing = expected.tables.filter((table) => !actual.tables.includes(table));
      requirements.push({ ok: missing.length === 0, label: missing.length ? `Required table references missing: ${missing.join(", ")}` : `Required tables referenced: ${expected.tables.join(", ")}` });
    }
    expected.clauses.forEach((clause) => {
      let ok = actual.clauses.includes(clause);
      if (clause === "JOIN" && !expected.clauses.includes("LEFT JOIN")) {
        ok = ok || (actual.clauses.includes("WHERE") && expected.tables.every((table) => actual.tables.includes(table)));
      }
      requirements.push({ ok, label: `${clause} structure ${ok ? "present" : "needed"}` });
    });
    expected.functions.forEach((fn) => requirements.push({ ok: actual.functions.includes(fn), label: `${fn}(...) calculation ${actual.functions.includes(fn) ? "present" : "needed"}` }));
    if (expected.minimumSubqueries > 0) {
      requirements.push({ ok: actual.minimumSubqueries >= expected.minimumSubqueries, label: `At least ${expected.minimumSubqueries} subquer${expected.minimumSubqueries === 1 ? "y" : "ies"}` });
    }
    if (expected.dateBounds.length) {
      const ok = expected.dateBounds.every((date) => actual.dateBounds.includes(date));
      requirements.push({ ok, label: ok ? `Unambiguous Access date bounds: ${expected.dateBounds.join(" to ")}` : `Use the required ISO Access dates: ${expected.dateBounds.map((date) => `#${date}#`).join(" and ")}` });
    }
    requirements.push({ ok: actual.balanced, label: actual.balanced ? "Parentheses and quoted text are balanced" : "Check unmatched parentheses or quotes" });
    return requirements;
  }

  function skeletonFor(item) {
    const feature = item.features;
    const table = feature.tables[0] || "TABLE_NAME";
    if (feature.operation === "CREATE TABLE") {
      const createdTable = /^\s*CREATE\s+TABLE\s+(\[[^\]]+\]|[A-Za-z_][A-Za-z0-9_]*)/i.exec(item.modelSql)?.[1] || table;
      return `CREATE TABLE ${createdTable} (\n    ... fields and data types ...,\n    PRIMARY KEY (...)\n);`;
    }
    if (feature.operation === "UPDATE") return `UPDATE ${table}\nSET ...\nWHERE ...;`;
    const lines = ["SELECT ...", `FROM ${feature.tables.join(" AS ..., ") || "..."}`];
    if (feature.clauses.includes("WHERE")) lines.push("WHERE ...");
    if (feature.clauses.includes("GROUP BY")) lines.push("GROUP BY ...");
    if (feature.clauses.includes("HAVING")) lines.push("HAVING ...");
    if (feature.clauses.includes("ORDER BY")) lines.push("ORDER BY ...");
    return `${lines.join("\n")};`;
  }

  function renderSqlMenu() {
    const sessions = unique(DATA.sql.map((item) => item.session));
    if (!$("sqlSession").options.length) {
      sessions.forEach((session) => $("sqlSession").insertAdjacentHTML("beforeend", `<option value="${escapeHtml(session)}">${escapeHtml(session)}</option>`));
    }
    const item = DATA.sql[sqlIndex];
    $("sqlSession").value = item.session;
    const sessionItems = DATA.sql.filter((candidate) => candidate.session === item.session);
    $("sqlQuestionList").innerHTML = sessionItems.map((candidate) => `
      <button class="compact-item ${candidate.id === item.id ? "is-active" : ""}" data-sql-id="${candidate.id}">
        <strong>${escapeHtml(candidate.id.split("-").slice(-1)[0])}</strong><small>${candidate.marks} marks</small>
      </button>`).join("");
  }

  function renderSql() {
    const item = DATA.sql[sqlIndex];
    if (!item) return;
    renderSqlMenu();
    $("sqlPosition").textContent = `${sqlIndex + 1} / ${DATA.sql.length}`;
    $("sqlId").textContent = `${item.id} · ${item.session}`;
    $("sqlPrompt").textContent = item.prompt;
    $("sqlMarks").textContent = `${item.marks} marks`;
    $("sqlPaperLink").href = EXAM_PAPERS[item.session] || "#";
    $("sqlPaperLink").classList.toggle("is-hidden", !EXAM_PAPERS[item.session]);
    $("sqlContextText").textContent = item.context || "";
    $("sqlContext").classList.toggle("is-hidden", !item.context);
    $("sqlContext").open = true;
    $("sqlEditor").value = "";
    $("sqlFeedback").className = "feedback-panel";
    $("sqlFeedback").innerHTML = `<strong>Ready when you are.</strong><p>The checker will examine the structure of your attempt.</p>`;
    $("sqlModel").classList.add("is-hidden");
    $("revealSql").textContent = "Reveal model";
    $("revealSql").setAttribute("aria-expanded", "false");
    $("sqlModelCode").textContent = item.modelSql;
    $("sqlModelNote").textContent = item.modelNote || "";
    $("sqlModelNote").classList.toggle("is-hidden", !item.modelNote);
    $("sqlPrev").disabled = sqlIndex === 0;
    $("sqlNext").disabled = sqlIndex === DATA.sql.length - 1;
  }

  function checkCurrentSql() {
    const item = DATA.sql[sqlIndex];
    const text = $("sqlEditor").value.trim();
    if (!text) {
      $("sqlFeedback").className = "feedback-panel is-warning";
      $("sqlFeedback").innerHTML = `<strong>No SQL to check yet.</strong><p>Write an attempt or insert the skeleton first.</p>`;
      return;
    }
    addUnique("sqlAttempted", item.id);
    const requirements = sqlRequirements(item.features, analyseSql(text));
    const passed = requirements.filter((entry) => entry.ok).length;
    const complete = passed === requirements.length;
    $("sqlFeedback").className = `feedback-panel ${complete ? "is-review" : "is-warning"}`;
    $("sqlFeedback").innerHTML = `
      <strong>${complete ? "Structural cues found — answer not verified." : `${passed} of ${requirements.length} structural cues found — review your SQL.`}</strong>
      <p>This checker does not run Access or verify field names, join conditions, filters, thresholds, calculations, or results. Compare your answer with the model and source paper.</p>
      <ul class="feedback-list">${requirements.map((entry) => `<li><span class="status-icon ${entry.ok ? "yes" : "no"}">${entry.ok ? "✓" : "×"}</span><span>${escapeHtml(entry.label)}</span></li>`).join("")}</ul>`;
  }

  function bindEvents() {
    document.querySelectorAll(".nav-button").forEach((button) => button.addEventListener("click", () => showView(button.dataset.view)));
    document.querySelectorAll("[data-go]").forEach((button) => button.addEventListener("click", () => showView(button.dataset.go)));
    ["librarySearch", "libraryType", "librarySession", "libraryChapter"].forEach((id) => $(id).addEventListener(id === "librarySearch" ? "input" : "change", renderLibrary));
    $("libraryList").addEventListener("click", (event) => {
      const button = event.target.closest("[data-library-id]");
      if (!button) return;
      librarySelected = button.dataset.libraryId;
      renderLibrary();
    });

    $("sqlSession").addEventListener("change", () => {
      const index = DATA.sql.findIndex((item) => item.session === $("sqlSession").value);
      if (index >= 0) { sqlIndex = index; renderSql(); }
    });
    $("sqlQuestionList").addEventListener("click", (event) => {
      const button = event.target.closest("[data-sql-id]");
      if (!button) return;
      const index = DATA.sql.findIndex((item) => item.id === button.dataset.sqlId);
      if (index >= 0) { sqlIndex = index; renderSql(); }
    });
    $("sqlPrev").addEventListener("click", () => { if (sqlIndex > 0) { sqlIndex -= 1; renderSql(); } });
    $("sqlNext").addEventListener("click", () => { if (sqlIndex < DATA.sql.length - 1) { sqlIndex += 1; renderSql(); } });
    $("checkSql").addEventListener("click", checkCurrentSql);
    $("insertSkeleton").addEventListener("click", () => { $("sqlEditor").value = skeletonFor(DATA.sql[sqlIndex]); $("sqlEditor").focus(); });
    $("clearSql").addEventListener("click", () => { $("sqlEditor").value = ""; $("sqlEditor").focus(); });
    $("revealSql").addEventListener("click", () => {
      const item = DATA.sql[sqlIndex];
      const nowHidden = $("sqlModel").classList.toggle("is-hidden");
      $("revealSql").textContent = nowHidden ? "Reveal model" : "Hide model";
      $("revealSql").setAttribute("aria-expanded", String(!nowHidden));
      if (!nowHidden) addUnique("reviewed", item.id);
    });
    $("copySql").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(DATA.sql[sqlIndex].modelSql);
        $("copySql").textContent = "Copied";
      } catch {
        $("copySql").textContent = "Select and copy";
      }
    });

    $("progressButton").addEventListener("click", () => $("progressDialog").showModal());
    $("resetProgress").addEventListener("click", () => {
      if (!window.confirm("Reset all locally saved ICT450 practice progress on this device?")) return;
      state = { reviewed: [], sqlAttempted: [] };
      try { localStorage.removeItem(STORAGE_KEY); } catch { /* storage may be unavailable */ }
      updateProgress();
      $("progressDialog").close();
      renderLibrary();
    });
  }

  function init() {
    $("metricPractice").textContent = DATA.meta.practiceCount;
    $("metricSql").textContent = DATA.meta.sqlCount;
    $("metricErd").textContent = "8";
    populateFilters();
    bindEvents();
    updateProgress();
    renderLibrary();
    renderSql();
  }

  init();
})();
