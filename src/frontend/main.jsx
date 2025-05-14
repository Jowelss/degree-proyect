import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';

import './css/index.css'; //IMPORTACION DEL CSS

import Login from './pages/Login.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
    domain='dev-cf87mubjgb6anf57.us.auth0.com'
    clientId='YkO8HghFwYfmVz1urY7IcQKJBCcojtFr'
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <StrictMode>
      <Login />
    </StrictMode>
  </Auth0Provider>
);
