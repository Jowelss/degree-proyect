import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

function RequireAuth({ children }) {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect({ appState: { returnTo: window.location.pathname } });
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  if (isLoading || !isAuthenticated) return null;
  return children;
}

export default RequireAuth;
