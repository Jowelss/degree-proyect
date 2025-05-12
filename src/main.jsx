import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './frontend/css/index.css'; //IMPORTACION DEL CSS

import App from './frontend/App.jsx'; //IMPORTACION DEL PRIMER COMPONENTE POR DEFECTO

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
