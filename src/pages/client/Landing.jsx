import { Outlet } from 'react-router-dom';
// import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';

import { Header } from '../../components/Header.jsx';
import { SideBarLink } from './components/SideBarLink.jsx';

import Logo from '../../assets/Autentica2.png';

import LogoutButton from '../../auth/LogoutButton.jsx';
import Profile from '../../auth/Profile.jsx';

import HeaderNav from '../client/components/HeaderNav.jsx';

function Landing() {
  const [open, setOpen] = useState(false);

  // const { user } = useAuth0();

  return (
    <div className='bg-gray-100 min-h-screen'>
      <Header>
        <header className='py-2 px-3 rounded-2xl grid grid-flow-col auto-cols-fr bg-white'>
          <div className='w-14'>
            <img src={Logo} alt='Autentica' />
          </div>

          <div className='flex justify-center items-center'>
            <HeaderNav />
          </div>

          <div className='flex gap-2 justify-end items-center'>
            <div
              onClick={() => setOpen(!open)}
              className='relative cursor-pointer'
            >
              <Profile />

              {open && (
                <div className='w-50 p-2 flex flex-col items-center gap-3 bg-black/20 rounded-2xl absolute -bottom-20 -left-48'>
                  <SideBarLink to={'/landing/history'} label={'Historial'} />

                  <LogoutButton />
                </div>
              )}
            </div>
          </div>
        </header>
      </Header>

      <div className='max-w-[1400px] mx-auto pt-20 px-4 bg-gradient-to-b from-pink-100 to-white'>
        <Outlet />
      </div>
    </div>
  );
}

export default Landing;
