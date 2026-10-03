// Retire the former offline worker for visitors who opened earlier releases.
// Keep this file online while browsers migrate away from the old registration.
self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key.startsWith("ict450-revision-hub-")).map((key) => caches.delete(key)));
    await self.clients.claim();
    await self.registration.unregister();
  })());
});
