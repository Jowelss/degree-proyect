import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './css/index.css'; //IMPORTACION DEL CSS

import App from './App.jsx'; //IMPORTACION DEL PRIMER COMPONENTE POR DEFECTO

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
