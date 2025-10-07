import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '../../components/Header.jsx';

import LogoutButton from '../../auth/LogoutButton.jsx';
import SideBar from '../admin/components/SideBar.jsx';
import Logo from '../../assets/Autentica2.png';
import Qr from './Qr.jsx';
import { IoQrCode } from 'react-icons/io5';
import { MdClose } from 'react-icons/md';

function Dashboard() {
  const [isOpenQr, setOpenQr] = useState(false);
  const handleClick = () => setOpenQr(!isOpenQr);

  return (
    <div className='flex flex-col min-h-screen '>
      <Header>
        <div className='bg-purple-700 max-w-[1500px] flex justify-between items-center w-full px-8 py-2'>
          <div className='w-16 rounded-full bg-white p-2'>
            <img src={Logo} alt='Autentica' />
          </div>

          <div
            className='cursor-pointer rounded-md bg-white p-1 shadow-[0_0_6px_0_#200035] '
            onClick={handleClick}
          >
            <IoQrCode className='text-purple-950 text-3xl' />
          </div>

          <ul className='flex gap-6'>
            <li>
              <h3>tema</h3>
            </li>
            <li>
              <LogoutButton />
            </li>
          </ul>
        </div>
      </Header>

      <Qr classState={isOpenQr ? 'block' : 'hidden'} setOpen={setOpenQr}>
        <div className='flex justify-end my-3 mr-3'>
          <button title='Eliminar' onClick={handleClick}>
            <MdClose className='text-4xl' />
          </button>
        </div>
      </Qr>

      <div className='max-w-[1500px] max-h-[800px] mx-auto my-3 px-3 flex-1 flex justify-between gap-2 w-full '>
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
