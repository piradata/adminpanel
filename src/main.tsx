import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Header } from '@/src/components/header';
import { LayeredContainers } from '@/src/components/layered-containers';

// Drop stale SWs from the old PWA build so they stop controlling the page.
navigator.serviceWorker?.getRegistrations().then((rs) => {
  for (const r of rs) void r.unregister();
});
if ('caches' in window) {
  caches.keys().then((keys) => {
    for (const k of keys) void caches.delete(k);
  });
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Header />
      <main>
        <LayeredContainers />
      </main>
    </StrictMode>
  );
}
