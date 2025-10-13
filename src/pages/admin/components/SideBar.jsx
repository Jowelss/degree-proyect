import { useState } from 'react';

// icons
import { HiQrCode } from 'react-icons/hi2';
import { MdClose, MdEvent } from 'react-icons/md';
import { RiBookShelfLine } from 'react-icons/ri';
import { TbBrandBlogger } from 'react-icons/tb';
import { FaRegStar } from 'react-icons/fa';
import { HiOutlineVideoCamera } from 'react-icons/hi';
import { CgArrowsExchangeAltV } from 'react-icons/cg';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
// end

// image
import Logo from '../../../assets/Autentica2.png';
// end

// auth
import Profile from '../../../auth/Profile';
import LogoutButton from '../../../auth/LogoutButton';
// end

import Qr from '../Qr';
import { SideBarLink } from '../../../components/SideBarLink';

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
          <div className='grid grid-flow-col auto-cols-fr'>
            <li
              className='p_rounded_cursor-item flex justify-center hover:bg-gray-200'
              onClick={handleClick}
            >
              <HiQrCode className='text-lg' />
            </li>
            <li className='p_rounded_cursor-item flex justify-center hover:bg-gray-200'>
              <IoMdNotificationsOutline className='text-lg' />
            </li>
            <li className='p_rounded_cursor-item flex justify-center hover:bg-gray-200'>
              <MdDarkMode className='text-lg' />
            </li>
          </div>

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
            to={'/dashboard/sesiones'}
            icon={HiOutlineVideoCamera}
            label={'Sesiones'}
          />

          <SideBarLink
            to={'/dashboard/suscripciones'}
            icon={FaRegStar}
            label={'Suscripciones'}
          />
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
