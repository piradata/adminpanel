# Server Administration Dashboard PWA

This project is a **Vite + React** static dashboard that is installable as a **Progressive Web App (PWA)**.

---

## 🧪 How to Test Locally

1. Install dependencies and run the dev server:

   ```bash
   pnpm install
   pnpm dev
   ```
2. Open Chrome at [`http://localhost:3000`](http://localhost:3000).
3. Open **DevTools > Application > Manifest** to verify fields.
4. You should see an install icon in Chrome if eligible.
5. Click the install icon and confirm installation — the app should open in a standalone window.

---

## 🛰 Service Worker Notes

* Uses **cache-first with background population** for GET requests.
* Provides a cached fallback if navigation fails.

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

---

## 🧩 Troubleshooting

| Issue | Fix |
| ----- | --- |
| **App opens in browser tab after install** | Check `display: standalone` and `start_url` in the manifest. |

---

## 🛠 Future Improvements

* Smarter asset precaching (Workbox)
* Granular runtime cache strategies per resource type
* configurable service map instead of hammered in code
* Background sync for queued admin actions
* Push notifications (requires server integration)
