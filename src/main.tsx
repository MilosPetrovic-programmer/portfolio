import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found in document. Unable to mount application.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
