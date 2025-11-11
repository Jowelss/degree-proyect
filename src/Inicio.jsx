import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import { FaInstagram, FaTiktok, FaYoutube, FaFacebook } from 'react-icons/fa';

import { Header } from './components/Header.jsx';
import LoginButton from './auth/LoginButton.jsx';
import Logo from './assets/Autentica2.png';
import LogoFooter from './assets/Autentica3.png';

import meidy from './assets/meidy.jpg';
import Mei from './assets/Mei.jpg';

const images = import.meta.glob('./assets/*.{jpg,jpeg}', {
  eager: true,
});

function Inicio() {
  const numeroAutentica = import.meta.env.VITE_NUMBER_AUTENTICA;

  const urlWhatsapp = `https://wa.me/${numeroAutentica}`;

  return (
    <div className='bg-zinc-100'>
      <Header>
        <header className='max-w-[1500px] mx-auto flex justify-between items-center px-6 py-2 font-medium bg-white/90 rounded-2xl'>
          <div className='w-16 rounded-full bg-white p-2'>
            <img src={Logo} alt='Autentica' />
          </div>

          <ul className='flex items-center gap-6 text-pink-400'>
            <li>Blog</li>
            <a href={urlWhatsapp} target='_blank'>
              Contacto
            </a>

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

        <div className='w-[900px] h-[400px] mx-auto my-10 flex items-center gap-3 rounded-2xl overflow-hidden bg-white/100'>
          <div className='min-w-[400px] h-full'>
            <img className='object-cover w-full h-full' src={Mei} />
          </div>

          <div className='p-2 font-medium'>
            <span className='mb-2 text-2xl block text-pink-400'>
              MEIDY GODOY (FUNDADORA)
            </span>

            <p className='text-gray-700'>
              "Auténtica Self Love es un espacio creado para quienes buscan
              conectar con su esencia y vivir desde la autenticidad. Aquí
              encontrarás una combinación de tienda, eventos y blog, diseñados
              para inspirarte, motivarte y acompañarte en tu proceso personal.
              Nuestra misión es ofrecerte un lugar donde puedas descubrir
              productos con propósito, participar en experiencias significativas
              y formar parte de una comunidad que valora la conexión real y el
              crecimiento interior. Detrás de este proyecto estoy yo, una mujer
              apasionada por el bienestar, la creatividad y el desarrollo
              personal, que soñó con construir un espacio digital que refleje lo
              que somos: únicos, imperfectos y profundamente valiosos."
            </p>
          </div>
        </div>

        <p className='max-w-max mx-auto px-4 rounded-2xl mb-10 py-2 text-center text-sx text-white font-medium bg-pink-400'>
          “Auténtica nació para recordarte que ser tú mismo siempre será tu
          mayor fortaleza.”
        </p>

        <div className='w-full'>
          <Swiper
            modules={[Autoplay]}
            slidesPerView={2} // cuántas imágenes visibles a la vez
            loop={true} // ciclo infinito
            autoplay={{
              delay: 0, // sin pausa entre imágenes
              disableOnInteraction: false,
            }}
            speed={6000} // velocidad del desplazamiento (más alto = más lento)
            className='mySwiper'
          >
            {Object.values(images).map((src, i) => (
              <SwiperSlide key={i}>
                <img src={src.default} className='w-full h-120 object-cover' />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </main>

      <footer className='w-full mt-10 py-10 flex justify-around items-center bg-pink-400'>
        <div>
          <div className='w-20 mb-3'>
            <img src={LogoFooter} />
          </div>

          <h2 className='pero text-white'>@Autentica Self Love</h2>
        </div>

        <div>
          <ul className='flex justify-between mb-5'>
            <a
              href='https://www.facebook.com/share/19LTMSZgFq/'
              target='_blank'
            >
              <FaFacebook className='text-2xl text-white' />
            </a>

            <a
              href='https://www.instagram.com/autentica_selflove?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
              target='_blank'
            >
              <FaInstagram className='text-2xl text-white' />
            </a>
            <a
              href='https://www.tiktok.com/@autentica_selflove?_r=1&_t=ZM-919hylo6JDA'
              target='_blank'
            >
              <FaTiktok className='text-2xl text-white' />
            </a>
            <a
              href='https://youtube.com/@autenticacomunidad?si=H6XneD0abbwI9CTj'
              target='_blank'
            >
              <FaYoutube className='text-2xl text-white' />
            </a>
          </ul>

          <a
            className='text-1xl text-white font-medium'
            href='mailto:autentica.comunidad@gmail.com'
          >
            autentica.comunidad@gmail.com
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Inicio;
