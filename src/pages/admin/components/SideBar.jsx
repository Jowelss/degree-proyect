import { useState } from 'react';

// auth
import LogoutButton from '../../../auth/LogoutButton';
// end

// icons
import { HiQrCode } from 'react-icons/hi2';
import { LuCalendarHeart, LuText, LuBookMarked, LuVideo } from 'react-icons/lu';
import { MdClose } from 'react-icons/md';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
// end

// image
import Logo from '../../../assets/Autentica2.png';
// end

import Qr from '../Qr';
import { SideBarLink } from './SideBarLink';

function SideBar() {
  const [isOpenQr, setOpenQr] = useState(false);
  const handleClick = () => setOpenQr(!isOpenQr);

  return (
    <aside className='min-w-[260px] p-4 overflow-hidden flex flex-col justify-between rounded-2xl bg-white font-medium text-black/90'>
      <div>
        <div className='flex items-center gap-1.5 mb-5'>
          <img className='w-7' src={Logo} alt='Logo' />

          <h2 className='pero font-bold text-lg text-pink-400'>AUTÉNTICA</h2>
        </div>

        <div className='mb-3 grid grid-flow-col auto-cols-fr'>
          <li
            className='p_rounded_cursor-item flex justify-center hover:bg-gray-200 p-2 rounded-2xl'
            onClick={handleClick}
          >
            <HiQrCode className='text-lg' />
          </li>

          <li className='p_rounded_cursor-item flex justify-center hover:bg-gray-200 p-2 rounded-2xl'>
            <MdDarkMode className='text-lg' />
          </li>

          <li className='p_rounded_cursor-item flex justify-center hover:bg-gray-200 p-2 rounded-2xl'>
            <IoMdNotificationsOutline className='text-lg' />
          </li>
        </div>

        <ul className='flex flex-col justify-around gap-1'>
          <SideBarLink
            to={'/dashboard/productos'}
            icon={LuBookMarked}
            label={'Libros'}
          />

          <SideBarLink
            to={'/dashboard/eventos'}
            icon={LuCalendarHeart}
            label={'Eventos'}
          />

          <SideBarLink to={'/dashboard/blog'} icon={LuText} label={'Blog'} />

          <SideBarLink
            to={'/dashboard/sesiones'}
            icon={LuVideo}
            label={'Sesiones'}
          />
        </ul>
      </div>

      <div>
        <LogoutButton />
      </div>

      <Qr classState={isOpenQr ? 'block' : 'hidden'} setOpen={setOpenQr}>
        <div className='relative flex justify-center mb-3'>
          <span className='text-lg font-bold text-pink-400 uppercase'>
            Código QR de pago
          </span>

          <button className='absolute right-0' onClick={handleClick}>
            <MdClose className='text-lg' />
          </button>
        </div>
      </Qr>
    </aside>
  );
}

export default SideBar;
