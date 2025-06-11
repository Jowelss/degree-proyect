import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';

import './css/index.css'; //IMPORTACION DEL CSS
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
    domain={import.meta.env.VITE_DOMAIN_AUHT0}
    clientId={import.meta.env.VITE_CLIENTID_AUTH0}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <StrictMode>
      <App />
    </StrictMode>
  </Auth0Provider>
);
