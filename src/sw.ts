/// <reference lib="webworker" />
/// <reference types="vite/client" />

// Service worker for offline caching & installability
const APP_VERSION = import.meta.env.VITE_APP_VERSION;
const CACHE_NAME = `adminpanel-cache-${APP_VERSION}`;
const CORE_ASSETS = ['/', '/manifest.json', '/offline.html'];
const offlineFallback = () =>
  caches.match('/offline.html').then((res) => res ?? new Response('Offline', { status: 503 }));

const cachedFallback = (req: Request) =>
  caches
    .match(req)
    .then((res) => res ?? caches.match('/'))
    .then((res) => res ?? new Response('Offline', { status: 503 }));
const sw = globalThis as unknown as ServiceWorkerGlobalScope;

sw.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => sw.skipWaiting())
  );
});

sw.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => sw.clients.claim())
  );
});

sw.addEventListener('fetch', (event: FetchEvent) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // For navigation requests, try network first, fall back to cached content
  if (req.mode === 'navigate') {
    // event.respondWith(fetch(req).catch(offlineFallback));
    event.respondWith(fetch(req).catch(() => cachedFallback(req)));
    return;
  }

  // Cache-first for other GET requests
  event.respondWith(
    caches.match(req).then(
      (cached) =>
        cached ||
        fetch(req)
          .then((resp) => {
            // Avoid caching opaque cross-origin responses unnecessarily
            if (resp.type === 'basic' && resp.status === 200) {
              const copy = resp.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
            }
            return resp;
          })
          // .catch(offlineFallback)
          .catch(() => cachedFallback(req))
    )
  );
});
