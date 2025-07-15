import { hydrateRoot } from 'react-dom/client';
import App from './client/App';
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';

hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
