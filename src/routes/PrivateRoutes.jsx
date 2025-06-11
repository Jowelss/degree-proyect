import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export default function PrivateRoutes({ children }) {
  const { user } = useAuth0();

  return user ? children : <Navigate to={'/'} />;
}
