import { useAuth0 } from '@auth0/auth0-react';

function LogoutButton() {
  const { logout, isAuthenticated } = useAuth0();

  if (!isAuthenticated) return null;

  return (
    <button
      className='py-1 px-2 mt-2 bg-pink-400 rounded-2xl text-white font-medium'
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Cerrar sesión
    </button>
  );
}

export default LogoutButton;
