import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Header } from '@/src/components/header';
import { LayeredContainers } from '@/src/components/layered-containers';

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
