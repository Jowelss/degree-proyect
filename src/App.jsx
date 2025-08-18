import AppRoutes from './routes/AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

function App() {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_DOMAIN_AUTH0}
      clientId={import.meta.env.VITE_CLIENTID_AUTH0}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Auth0Provider>
  );
}

export default App;
