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
    <>
      <Header>
        <header className='grid grid-flow-col auto-cols-fr'>
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
                <div className='bg-gray-200 rounded-xl absolute -bottom-23 -left-30'>
                  <SideBarLink to={'/landing/history'} label={'Historial'} />

                  <span>tema</span>

                  <LogoutButton />
                </div>
              )}
            </div>
          </div>
        </header>
      </Header>

      <div className='max-w-[1400px] mx-auto mt-20 px-4'>
        <Outlet />
      </div>
    </>
  );
}

export default Landing;
