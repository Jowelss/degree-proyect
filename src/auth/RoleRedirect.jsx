import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import { Header } from '../components/Header';
import Logo from '../assets/Autentica2.png';

import meidy from '../assets/meidy.jpg';
import Mei from '../assets/Mei.jpg';

const images = import.meta.glob('../assets/*.{jpg,jpeg}', {
  eager: true,
});

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

          <ul className='flex items-center gap-6 text-white'>
            <li>Blog</li>
            <li>Contacto</li>
            <LoginButton />
          </ul>
        </header>
      </Header>

      <main>
        <div className='h-[500px] w-full rounded-b-lg'>
          <img
            className='w-full h-full object-cover rounded-b-2xl'
            src={meidy}
          />
        </div>

        <div className='w-[800px] h-[460px] mx-auto my-10 flex items-center gap-3 border rounded-3xl overflow-hidden'>
          <div className='min-w-[400px] h-full'>
            <img className='object-cover w-full h-full' src={Mei} />
          </div>

          <div className='p-2'>
            <span className='text-2xl block font-bold mb-3'>
              MEIDY GODOY (FUNDADORA)
            </span>
            <p>
              "Auténtica es un espacio creado para quienes buscan conectar con
              su esencia y vivir desde la autenticidad. Aquí encontrarás una
              combinación de tienda, eventos y blog, diseñados para inspirarte,
              motivarte y acompañarte en tu proceso personal. Nuestra misión es
              ofrecerte un lugar donde puedas descubrir productos con propósito,
              participar en experiencias significativas y formar parte de una
              comunidad que valora la conexión real y el crecimiento interior.
              Detrás de este proyecto está MEIDY GODOY, una mujer apasionada por
              el bienestar, la creatividad y el desarrollo personal, que soñó
              con construir un espacio digital que refleje lo que somos: únicos,
              imperfectos y profundamente valiosos."
            </p>
          </div>
        </div>

        <p className='text-center mb-10 text-lg'>
          “Auténtica nació para recordarte que ser tú mismo siempre será tu
          mayor fortaleza.”
        </p>

        <div className='grid grid-cols-5 auto-rows-[150px]'>
          {Object.values(images).map((img, i) => (
            <img key={i} src={img.default} />
          ))}
        </div>
      </main>
      <footer></footer>
    </>
  );
}
