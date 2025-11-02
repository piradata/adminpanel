// Service worker for offline caching & installability
// Increment this when updating cached assets
const CACHE_NAME = 'adminpanel-cache-v12'
const CORE_ASSETS = [
  '/',
  '/manifest.json',
  '/offline.html'
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', event => {
  const req = event.request
  if (req.method !== 'GET') return

  // For navigation requests, try network first, fall back to offline page
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).catch(() => caches.match('/offline.html'))
    )
    return
  }

  // Cache-first for other GET requests
  event.respondWith(
    caches.match(req).then(cached =>
      cached || fetch(req).then(resp => {
        // Avoid caching opaque cross-origin responses unnecessarily
        if (resp.type === 'basic' && resp.status === 200) {
          const copy = resp.clone()
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy))
        }
        return resp
      }).catch(() => caches.match('/offline.html'))
    )
  )
})
