const CACHE_NAME = "sss-moniteurs-v1";
const APP_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./logo-sss.png",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-192.png",
  "./icon-maskable-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  const req = event.request;

  // Supabase and CDN remain network-first to keep shared data current.
  if (req.url.includes("supabase.co") || req.url.includes("cdn.jsdelivr.net")) {
    event.respondWith(
      fetch(req).catch(() => caches.match(req))
    );
    return;
  }

  // App shell: cache-first with network fallback.
  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(response => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
      return response;
    }))
  );
});