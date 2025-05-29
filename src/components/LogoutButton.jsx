import { useAuth0 } from '@auth0/auth0-react';

function LogoutButton() {
  const { logout } = useAuth0();

  return (
    <button className='p-1 rounded' onClick={() => logout()}>
      Cerrar Sesion
    </button>
  );
}

export default LogoutButton;
