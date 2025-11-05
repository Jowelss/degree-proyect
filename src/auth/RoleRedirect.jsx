import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import Inicio from '../Inicio.jsx';

export default function RoleRedirect() {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return; // espera a que cargue Auth0

    if (isAuthenticated && user) {
      // Aquí lees el claim personalizado que agregaste en el trigger
      // 👇 Cambia la URL por la que usaste en el trigger
      const roles = user[import.meta.env.VITE_AUTH0_NAMESPACE] || [];

      if (roles.includes('admin')) {
        navigate('/dashboard/productos', { replace: true });
      } else {
        // Si no es admin, lo tratamos como cliente
        navigate('/landing/tiendaCliente', { replace: true });
      }
    }
  }, [isAuthenticated, isLoading, user, navigate]);

  // Mientras carga, mostrar spinner
  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='w-16 h-16 border-4 border-pink-400 border-dashed rounded-full animate-spin'></div>
      </div>
    );
  } else {
    return <Inicio />;
  }
}
