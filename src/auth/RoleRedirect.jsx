import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import { Header } from '../components/Header';
import Logo from '../assets/Autentica2.png';

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

  // Opcional: mientras decide, puedes mostrar un loader
  return (
    <>
      <Header>
        <header className='max-w-[1500px] flex justify-between items-center w-full px-8 py-2'>
          <div className='w-16 rounded-full bg-white p-2'>
            <img src={Logo} alt='Autentica' />
          </div>

          <ul className='flex gap-3'>
            <li>Blog</li>
            <li>Contacto</li>
          </ul>

          <div>
            <LoginButton />
          </div>
        </header>
      </Header>

      <main className='h-screen flex justify-center items-center'>
        <h1 className='text-6xl'>@ AUTENTICA Love Self</h1>
      </main>
    </>
  );
}
