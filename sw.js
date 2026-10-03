const RELEASE = "2026.10.03-r44";
const CACHE_PREFIX = "ict450-revision-hub-";
const CACHE_NAME = `${CACHE_PREFIX}${RELEASE}`;
const CORE = [
  "./",
  "./index.html",
  `./hub.css?v=${RELEASE}`,
  `./hub-content.css?v=${RELEASE}`,
  `./hub.js?v=${RELEASE}`,
  `./manifest.webmanifest?v=${RELEASE}`,
  "./icon.svg",
  "./03-study-guides/Normalization Guide - From UNF to 3NF.html",
  "./03-sql-guide/A Beginner's Guide to Writing SQL in Microsoft Access.html",
  "./03-erd-guide/A Beginner's Guide to Building an ERD from Business Rules.html",
  "./03-erd-guide/assets/july-2026-question-5-source.png",
  "./03-erd-guide/past-examination-erd.html",
  "./03-erd-guide/past-examination-erd.css",
  "./03-erd-guide/past-examination-erd-data.js",
  "./03-erd-guide/past-examination-erd-pending-data.js",
  "./03-erd-guide/past-examination-erd.js",
  "./03-erd-guide/assets/december-2019-q5-source.png",
  "./03-erd-guide/assets/february-2022-q5-source.png",
  "./03-erd-guide/assets/february-2023-q5-source.png",
  "./03-erd-guide/assets/july-2023-q5-source.png",
  "./03-erd-guide/assets/january-2024-q5-source.png",
  "./03-erd-guide/assets/july-2024-q5-source.png",
  "./03-erd-guide/assets/february-2025-q5-source.png",
  "./03-erd-guide/assets/july-2025-q5-source-1.png",
  "./03-erd-guide/assets/july-2025-q5-source-2.png",
  "./06-interactive-practice/index.html",
  `./06-interactive-practice/styles.css?v=${RELEASE}`,
  `./06-interactive-practice/app.js?v=${RELEASE}`,
  `./06-interactive-practice/practice-data.js?v=${RELEASE}`,
  "./08-revision/index.html",
  `./08-revision/styles.css?v=${RELEASE}`,
  `./08-revision/revision-enhancements.css?v=${RELEASE}`,
  `./08-revision/revision-data.js?v=${RELEASE}`,
  `./08-revision/app.js?v=${RELEASE}`,
  "./06-interactive-practice/erd-exercises/chen-studio.css",
  "./06-interactive-practice/erd-exercises/chen-studio.js",
  "./06-interactive-practice/erd-exercises/crow-studio.css",
  "./06-interactive-practice/erd-exercises/crow-studio.js",
  "./06-interactive-practice/erd-exercises/fini-co-chen.html",
  "./06-interactive-practice/erd-exercises/fini-co-crows-foot.html",
  "./06-interactive-practice/erd-exercises/tarpack-gallery-chen.html",
  "./06-interactive-practice/erd-exercises/tarpack-gallery-crows-foot.html",
  "./06-interactive-practice/erd-exercises/official-registration-chen.html",
  "./06-interactive-practice/erd-exercises/splash-swim-crows-foot.html",
  "./06-interactive-practice/erd-exercises/medical-clinic-chen.html",
  "./06-interactive-practice/erd-exercises/medical-clinic-crows-foot.html"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      const subjectCaches = keys.filter((key) => key.startsWith(CACHE_PREFIX)).sort().reverse();
      const keep = new Set(subjectCaches.slice(0, 2));
      keep.add(CACHE_NAME);
      return Promise.all(subjectCaches.filter((key) => !keep.has(key)).map((key) => caches.delete(key)));
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      }).catch(() => caches.match(event.request).then((cached) => cached || caches.match("./index.html")))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
      }
      return response;
    }))
  );
});
