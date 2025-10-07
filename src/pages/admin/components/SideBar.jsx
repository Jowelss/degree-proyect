import { Link } from 'react-router-dom';

import { useState } from 'react';

import { HiQrCode } from 'react-icons/hi2';
import { MdClose } from 'react-icons/md';
import { RiBookShelfLine } from 'react-icons/ri';
import { MdEvent } from 'react-icons/md';
import { TbBrandBlogger } from 'react-icons/tb';
import { FaRegStar } from 'react-icons/fa';
import { HiOutlineVideoCamera } from 'react-icons/hi';
import { CgArrowsExchangeAltV } from 'react-icons/cg';

import Qr from '../Qr';
import Logo from '../../../assets/Autentica2.png';

import Profile from '../../../auth/Profile';

function SideBar() {
  const [isOpenQr, setOpenQr] = useState(false);
  const handleClick = () => setOpenQr(!isOpenQr);

  return (
    <aside className='p-4 overflow-hidden flex flex-col justify-between rounded-xl border border-gray-300'>
      <div>
        <div className='flex items-center gap-1.5 mb-5'>
          <img className='w-7' src={Logo} alt='Logo' />

          <h2 className='font-bold text-lg'>AUTENTICA</h2>
        </div>

        <ul className='flex gap-2 flex-col justify-around'>
          <li className='sidebar_item flex items-center gap-2'>
            <RiBookShelfLine className='text-lg' />
            <Link className='w-full' to={'/dashboard/productos'}>
              Libros
            </Link>
          </li>
          <li className='sidebar_item flex items-center gap-2'>
            <MdEvent className='text-lg' />
            <Link className='w-full' to={'/dashboard/eventos'}>
              Eventos
            </Link>
          </li>
          <li className='sidebar_item flex items-center gap-2'>
            <TbBrandBlogger className='text-lg' />
            <Link className='w-full' to={'/dashboard/blog'}>
              Blog
            </Link>
          </li>
          <li className='sidebar_item flex items-center gap-2'>
            <FaRegStar className='text-lg' />
            <Link className='w-full' to={'/dashboard/suscripciones'}>
              Suscripciones
            </Link>
          </li>
          <li className='sidebar_item flex items-center gap-2'>
            <HiOutlineVideoCamera className='text-lg' />
            <Link className='w-full' to={'/dashboard/sesiones'}>
              Sesiones
            </Link>
          </li>

          <li
            className='sidebar_item flex items-center gap-2'
            onClick={handleClick}
          >
            <HiQrCode className='text-lg' />
            <span>Codigo Qr</span>
          </li>
        </ul>
      </div>

      <div className='py-3 px-4 flex items-center gap-4 rounded-xl border border-gray-300'>
        <Profile />
        <CgArrowsExchangeAltV className='text-4xl' />
      </div>

      <Qr classState={isOpenQr ? 'block' : 'hidden'} setOpen={setOpenQr}>
        <div className='flex justify-end my-3 mr-3'>
          <button title='Eliminar' onClick={handleClick}>
            <MdClose className='text-4xl' />
          </button>
        </div>
      </Qr>
    </aside>
  );
}

export default SideBar;
