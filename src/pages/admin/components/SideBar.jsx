import { useState } from 'react';

import { HiQrCode } from 'react-icons/hi2';
import { MdClose } from 'react-icons/md';
import { RiBookShelfLine } from 'react-icons/ri';
import { MdEvent } from 'react-icons/md';
import { TbBrandBlogger } from 'react-icons/tb';
import { FaRegStar } from 'react-icons/fa';
import { HiOutlineVideoCamera } from 'react-icons/hi';
import { CgArrowsExchangeAltV } from 'react-icons/cg';
import { SideBarLink } from '../../../components/SideBarLink';

import Qr from '../Qr';
import Logo from '../../../assets/Autentica2.png';

import Profile from '../../../auth/Profile';
import LogoutButton from '../../../auth/LogoutButton';

function SideBar() {
  const [isOpenQr, setOpenQr] = useState(false);
  const handleClick = () => setOpenQr(!isOpenQr);

  const [openProfile, setOpenProfile] = useState(false);

  const showLogout = () => setOpenProfile(!openProfile);

  return (
    <aside className='p-4 overflow-hidden flex flex-col justify-between rounded-xl border border-gray-300'>
      <div>
        <div className='flex items-center gap-1.5 mb-5'>
          <img className='w-7' src={Logo} alt='Logo' />

          <h2 className='font-bold text-lg'>AUTENTICA</h2>
        </div>

        <ul className='flex gap-2 flex-col justify-around'>
          <SideBarLink
            to={'/dashboard/productos'}
            icon={RiBookShelfLine}
            label={'Libros'}
          />

          <SideBarLink
            to={'/dashboard/eventos'}
            icon={MdEvent}
            label={'Eventos'}
          />

          <SideBarLink
            to={'/dashboard/blog'}
            icon={TbBrandBlogger}
            label={'Blog'}
          />

          <SideBarLink
            to={'/dashboard/suscripciones'}
            icon={FaRegStar}
            label={'Suscripciones'}
          />

          <SideBarLink
            to={'/dashboard/sesiones'}
            icon={HiOutlineVideoCamera}
            label={'Sesiones'}
          />

          <li
            className='p_rounded_cursor-item flex items-center gap-2 hover:bg-gray-200 '
            onClick={handleClick}
          >
            <HiQrCode className='text-lg' />
            <span>Codigo Qr</span>
          </li>
        </ul>
      </div>

      <div
        onClick={showLogout}
        className='py-3 px-4 rounded-xl border border-gray-300 cursor-pointer'
      >
        <div className='mb-2 flex items-center gap-4'>
          <Profile />
          <CgArrowsExchangeAltV className='text-4xl' />
        </div>

        {openProfile && <LogoutButton />}
      </div>

      <Qr classState={isOpenQr ? 'block' : 'hidden'} setOpen={setOpenQr}>
        <div className='relative flex justify-center mb-3'>
          <h1 className='text-lg'>CODIGO QR DE PAGO</h1>

          <button className='absolute right-0' onClick={handleClick}>
            <MdClose className='text-lg' />
          </button>
        </div>
      </Qr>
    </aside>
  );
}

export default SideBar;
