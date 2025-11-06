import { useAuth0 } from '@auth0/auth0-react';

function LoginButton() {
  const { loginWithRedirect, isLoading } = useAuth0();

  if (isLoading) return null;

  return (
    <button
      className='select-none px-2 py-1 rounded-4xl bg-pink-400 text-white font-medium'
      onClick={() => loginWithRedirect()}
    >
      Inicia sesión
    </button>
  );
}

export default LoginButton;
