# Server Administration Dashboard PWA

This project is a **Vite + React** static dashboard that is installable as a **Progressive Web App (PWA)**.

---

## ✅ PWA Features Implemented

* Web App Manifest with icons (including maskable) and standalone display
* Service Worker caching app shell + runtime caching of GET requests
* Offline fallback page (`offline.html`)
* Custom install button using the `beforeinstallprompt` event
* Proper handling of `appinstalled` + standalone detection

---

## 🧪 How to Test Locally

1. Install dependencies and run the dev server:

   ```bash
   pnpm install
   pnpm dev
   ```
2. Open Chrome at [`http://localhost:5173`](http://localhost:5173) (default Vite port).
3. Open **DevTools > Application > Manifest** to verify fields.
4. You should see an install icon in Chrome’s omnibox or the custom **“Install App”** button in the header if eligible.
5. Click the custom button and confirm installation — the app should open in a standalone window.

---

## 🛰 Service Worker Notes

* Versioned via `CACHE_NAME` — bump the number when changing the cached asset list.
* Uses **cache-first with background population** for GET requests.
* Provides an offline fallback (`/offline.html`) if navigation fails.

---

## 🔄 Updating the PWA

After modifying static assets or the service worker:

1. Increment the `CACHE_NAME` constant.
2. Rebuild and redeploy.
3. Users will get the new version on the next visit (during the activate phase).

---

## 📦 Production Build

```bash
pnpm build
```

Deploy the contents of `dist/` behind an **HTTPS origin** (required for PWA installation).

---

## ❗ Icon Requirements

Ensure the following files exist at the root of the `public/` directory:

* `icon-192x192.png`
* `icon-512x512.png`
* `icon-192x192-maskable.png`
* `icon-512x512-maskable.png`

> Maskable icons ensure the app icon displays correctly on Android launchers.

---

## 🧩 Troubleshooting

| Issue                                      | Fix                                                                                                             |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| **Install button not showing**             | Verify served over HTTPS, not already installed, and that `beforeinstallprompt` fired (check DevTools console). |
| **App opens in browser tab after install** | Check `display: standalone` and `start_url` in the manifest.                                                    |
| **Offline page not shown**                 | Confirm `offline.html` is added to `CORE_ASSETS` and that the fetch handler returns it on errors.               |

---

## 🛠 Future Improvements

* Smarter asset precaching (Workbox)
* Granular runtime cache strategies per resource type
* Background sync for queued admin actions
* Push notifications (requires server integration)

---

**Happy hacking! 🚀**

---

Would you like me to add badges (like “Built with Vite” or “PWA Ready”) at the top for a more polished README?
