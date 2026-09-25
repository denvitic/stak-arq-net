import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Developer / Agency Signature in Browser Console
if (typeof window !== 'undefined') {
  console.log(
    '%c DENVITIC TECNOLOGIAS %c Arquitectura Digital & Software Engineering %c https://www.denvitic.com ',
    'background: #c6a87c; color: #000000; font-weight: 700; font-size: 11px; padding: 4px 8px; border-radius: 4px 0 0 4px;',
    'background: #111216; color: #e5e7eb; font-size: 11px; padding: 4px 8px;',
    'background: #1f2937; color: #c6a87c; font-size: 11px; padding: 4px 8px; border-radius: 0 4px 4px 0;'
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
