import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Header } from '@/src/components/header';
import { LayeredContainers } from '@/src/components/layered-containers';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Header />
      <LayeredContainers />
    </React.StrictMode>
  );
}
