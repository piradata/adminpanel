const CACHE_NAME = "server-admin-v1"
const urlsToCache = ["/", "/manifest.json", "/favicon.ico"]

// Install event - cache essential files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).catch((err) => {
        console.log("Cache addAll error:", err)
        return Promise.resolve()
      })
    }),
  )
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
  self.clients.claim()
})

// Fetch event - cache first for assets, network first for navigation
self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Network first for navigation requests
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, response.clone())
            return response
          })
        })
        .catch(() => {
          return caches.match(request)
        }),
    )
    return
  }

  // Cache first for static assets
  event.respondWith(
    caches.match(request).then((response) => {
      if (response) {
        return response
      }
      return fetch(request).then((response) => {
        if (!response || response.status !== 200 || response.type === "error") {
          return response
        }
        const responseClone = response.clone()
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseClone)
        })
        return response
      })
    }),
  )
})
