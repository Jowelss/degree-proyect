import { Header } from './components/Header.jsx';
import LoginButton from './auth/LoginButton.jsx';
import Logo from './assets/Autentica2.png';

import meidy from './assets/meidy.jpg';
import Mei from './assets/Mei.jpg';

const images = import.meta.glob('./assets/*.{jpg,jpeg}', {
  eager: true,
});

function Inicio() {
  return (
    <div className='bg-zinc-100'>
      <Header>
        <header className='max-w-[1500px] mx-auto flex justify-between items-center px-6 py-2 font-medium bg-black/30 rounded-2xl'>
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
        <div className='h-[500px] w-full flex items-center justify-center relative'>
          <img
            className='w-full h-full object-cover rounded-b-2xl'
            src={meidy}
          />
          <span className='pero absolute text-6xl font-bold text-pink-400'>
            @AUTENTICA SELF LOVE
          </span>
        </div>

        <div className='w-[800px] h-[400px] mx-auto my-10 flex items-center gap-3 rounded-2xl overflow-hidden bg-white/50'>
          <div className='min-w-[400px] h-full'>
            <img className='object-cover w-full h-full' src={Mei} />
          </div>

          <div className='p-2'>
            <span className='text-2xl block font-bold text-pink-400'>
              MEIDY GODOY (FUNDADORA)
            </span>
            <p>
              "Auténtica Self Love es un espacio creado para quienes buscan
              conectar con su esencia y vivir desde la autenticidad. Aquí
              encontrarás una combinación de tienda, eventos y blog, diseñados
              para inspirarte, motivarte y acompañarte en tu proceso personal.
              Nuestra misión es ofrecerte un lugar donde puedas descubrir
              productos con propósito, participar en experiencias significativas
              y formar parte de una comunidad que valora la conexión real y el
              crecimiento interior. Detrás de este proyecto está MEIDY GODOY,
              una mujer apasionada por el bienestar, la creatividad y el
              desarrollo personal, que soñó con construir un espacio digital que
              refleje lo que somos: únicos, imperfectos y profundamente
              valiosos."
            </p>
          </div>
        </div>

        <p className='mb-10 py-4 text-center text-lg text-white font-bold bg-pink-400'>
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
    </div>
  );
}

export default Inicio;
