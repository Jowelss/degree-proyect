import { useAuth0 } from '@auth0/auth0-react';

function LoginButton() {
  const { loginWithRedirect, isLoading } = useAuth0();

  if (isLoading) return null;

  return <button onClick={() => loginWithRedirect()}>Iniciar sesión</button>;
}

export default LoginButton;
