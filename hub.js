(() => {
  "use strict";
  const RELEASE = "2026.10.04-r58";
  const $ = (id) => document.getElementById(id);
  const escapeHtml = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");

  const mainReferences = [
    {id:"CHAPTER-SLIDES",title:"Chapter Slides: Chapters 1-8",meta:"Main subject reference",description:"Follow the official chapter slides supplied through the university platform before using the supporting materials below.",format:"University platform",availability:"Open through the university platform"},
  ];

  const additionalNotes = [
    {id:"TEXTBOOK",title:"Database Systems: Design, Implementation, & Management",meta:"Cengage Learning · 13th edition",description:"Use the prescribed textbook for deeper explanations, extended examples and supporting reading.",format:"Textbook",availability:"Use the prescribed textbook copy"},
    {id:"GUIDE-NORM",title:"Normalization: UNF to 3NF",meta:"Beginner study guide",description:"Colour-guided worked example with relations, dependencies, decomposition and reconstruction checks.",href:"03-study-guides/Normalization%20Guide%20-%20From%20UNF%20to%203NF.html",format:"Interactive HTML",secondary:{label:"PDF",href:"03-study-guides/Normalization%20Guide%20-%20From%20UNF%20to%203NF.pdf"}},
    {id:"GUIDE-SQL",title:"Writing SQL in Microsoft Access",meta:"Main SQL reference",description:"Access-specific DDL, DML, dates, wildcards, joins, grouping, subqueries and safe action queries.",href:"03-sql-guide/A%20Beginner's%20Guide%20to%20Writing%20SQL%20in%20Microsoft%20Access.html",format:"Interactive HTML",secondary:{label:"PDF",href:"03-sql-guide/A%20Beginner's%20Guide%20to%20Writing%20SQL%20in%20Microsoft%20Access.pdf"}},
    {id:"GUIDE-ERD",title:"Past Examination ERD Worked Examples",meta:"Nine Question 5 cases",description:"Study each question, highlight its business rules and build the Crow's Foot model step by step.",href:"03-erd-guide/past-examination-erd.html",format:"Interactive HTML"},
  ];

  const interactiveTools = [
    {id:"GUIDE-PRACTICE",title:"ICT450 Practice Studio",meta:"122 question parts",description:"Search the question bank, write SQL, and use eight interactive ERD builders with their own question extracts.",href:"06-interactive-practice/index.html",format:"Interactive tool"},
    {id:"GUIDE-RECALL",title:"Chapter Quizzes and Flashcards",meta:"96 activities · 160 cards",description:"Complete formal chapter quizzes, study focused memory cards and keep separate local progress signals.",href:"08-revision/index.html",format:"Interactive tool"},
  ];
  const studyMaterials = [...mainReferences, ...additionalNotes, ...interactiveTools];

  const exams = [
    {id:"FEB23",session:"February 2023",paper:"04-exams/repaired/FEB23%20-%20repaired%20derivative.pdf",status:"Question paper"},
    {id:"JULY23",session:"July 2023",paper:"04-exams/ocr/JULY23%20-%20searchable%20OCR.pdf",status:"Question paper"},
    {id:"JAN24",session:"January 2024",paper:"04-exams/ocr/JAN24%20-%20searchable%20OCR.pdf",status:"Question paper"},
    {id:"JULY24",session:"July 2024",paper:"04-exams/official/JULY24.pdf",status:"Question paper"},
    {id:"FEB25",session:"February 2025",paper:"04-exams/repaired/FEB25%20-%20repaired%20derivative.pdf",status:"Question paper"},
    {id:"JULY25",session:"July 2025",paper:"04-exams/official/JULY25.pdf",status:"Question paper"},
    {id:"JULY26",session:"July 2026",paper:"04-exams/ocr/JULY26%20-%20searchable%20OCR.pdf",status:"Question paper"},
  ];
  const paperOnly = [
    {id:"DEC19",session:"December 2019",paper:"04-exams/repaired/DEC19%20-%20repaired%20derivative.pdf",status:"Question paper"},
    {id:"FEB22",session:"February 2022",paper:"04-exams/official/FEB22.pdf",status:"Question paper"},
  ];

  function resourceCard(item) {
    const actions = item.href
      ? `<div class="card-actions"><a class="primary-action" href="${item.href}" target="_blank" rel="noopener">Open</a>${item.secondary ? `<a class="secondary-action" href="${item.secondary.href}" target="_blank" rel="noopener">${escapeHtml(item.secondary.label)}</a>` : ""}</div>`
      : `<p class="availability-note">${escapeHtml(item.availability)}</p>`;
    return `<article class="resource-card"><h2>${escapeHtml(item.title)}</h2><p>${escapeHtml(item.description)}</p>${actions}</article>`;
  }

  function renderResources() {
    $("mainReferenceGrid").innerHTML = mainReferences.map(resourceCard).join("");
    $("additionalNotesGrid").innerHTML = additionalNotes.map(resourceCard).join("");
    $("interactiveToolsGrid").innerHTML = interactiveTools.map(resourceCard).join("");
    const papers = [...exams, ...paperOnly].map((exam) => `<article class="exam-card"><div><h2>${escapeHtml(exam.session)}</h2></div><div class="card-actions"><a class="primary-action" href="${exam.paper}" target="_blank" rel="noopener">Open question paper</a></div></article>`).join("");
    $("examGrid").innerHTML = `<div class="exam-intro"><strong>Past examination papers</strong><p>Choose a paper to practise a complete examination question.</p><a class="primary-action" href="06-interactive-practice/index.html">Open Practice Studio</a></div><div class="exam-list">${papers}</div>`;
  }

  const searchCatalog = [
    ...studyMaterials.map((item) => ({...item,kind:"Study material"})),
    ...[...exams, ...paperOnly].map((item) => ({id:item.id,title:item.session,meta:"Past examination",description:"Question paper for revision practice.",href:item.paper,format:"Exam",kind:"Examination"})),
  ];
  function search(query) {
    const value = query.trim().toLowerCase();
    if (value.length < 2) { show("home"); return; }
    const results = searchCatalog.filter((item) => `${item.id} ${item.title} ${item.meta} ${item.description} ${item.kind}`.toLowerCase().includes(value));
    $("searchHeading").textContent = results.length ? `${results.length} result${results.length === 1 ? "" : "s"} for “${query.trim()}”` : `No results for “${query.trim()}”`;
    $("searchResults").innerHTML = results.length ? results.map(resourceCard).join("") : `<div class="empty-state"><strong>Try SQL, normalization, ERD or an examination session.</strong></div>`;
    show("search");
  }

  function show(route) {
    const resolved = route === "guides" ? "materials" : route;
    document.querySelectorAll("[data-view]").forEach((view) => view.classList.toggle("is-visible", view.dataset.view === resolved));
    document.querySelectorAll(".hub-sidebar [data-route]").forEach((link) => link.classList.toggle("is-active", link.dataset.route === resolved));
    $("hubSidebar").classList.remove("is-open"); $("sidebarBackdrop").classList.remove("is-open"); $("menuButton").setAttribute("aria-expanded", "false"); window.scrollTo({top:0,behavior:"smooth"});
  }

  function bind() {
    document.querySelectorAll("[data-route]").forEach((link) => link.addEventListener("click", (event) => { event.preventDefault(); show(link.dataset.route); history.replaceState(null,"",`#${link.dataset.route}`); }));
    $("menuButton").addEventListener("click", () => { const open=!$("hubSidebar").classList.contains("is-open"); $("hubSidebar").classList.toggle("is-open",open); $("sidebarBackdrop").classList.toggle("is-open",open); $("menuButton").setAttribute("aria-expanded",String(open)); });
    $("sidebarBackdrop").addEventListener("click", () => { $("hubSidebar").classList.remove("is-open"); $("sidebarBackdrop").classList.remove("is-open"); });
    let timer; $("globalSearch").addEventListener("input", () => { clearTimeout(timer); timer=setTimeout(() => search($("globalSearch").value),120); });
  }

  renderResources(); bind();
  const initial=location.hash.slice(1);
  if (initial === "semester") { history.replaceState(null, "", "#materials"); show("materials"); }
  else if (initial && (initial === "guides" || document.querySelector(`[data-view="${initial}"]`))) show(initial);
  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
    navigator.serviceWorker.getRegistration("./").then((registration) => registration?.unregister()).catch(() => {});
  }
  if ("caches" in window) {
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith("ict450-revision-hub-")).map((key) => caches.delete(key)))).catch(() => {});
  }
})();
