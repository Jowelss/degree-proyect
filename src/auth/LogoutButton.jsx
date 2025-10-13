import { useAuth0 } from '@auth0/auth0-react';

import { IoIosLogOut } from 'react-icons/io';

function LogoutButton() {
  const { logout, isAuthenticated } = useAuth0();

  if (!isAuthenticated) return null;

  return (
    <button
      className='p-1 flex items-center gap-2 rounded'
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      <IoIosLogOut className='text-lg' />
      Cerrar sesión
    </button>
  );
}

export default LogoutButton;
