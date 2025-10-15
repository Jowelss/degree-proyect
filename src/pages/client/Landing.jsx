import { Outlet } from 'react-router-dom';
import { useState } from 'react';

import { Header } from '../../components/Header.jsx';
import { SideBarLink } from '../../components/SideBarLink.jsx';

import Logo from '../../assets/Autentica2.png';

import LogoutButton from '../../auth/LogoutButton.jsx';
import Profile from '../../auth/Profile.jsx';

import HeaderNav from '../client/components/HeaderNav.jsx';

function Landing() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Header>
        <div className='w-14'>
          <img src={Logo} alt='Autentica' />
        </div>

        <div className='flex gap-2 items-center'>
          <HeaderNav />
        </div>

        <button>Suscribete</button>

        <div onClick={() => setOpen(!open)} className='relative cursor-pointer'>
          <Profile />

          {open && (
            <div className='bg-white border absolute -bottom-23 -left-30'>
              <SideBarLink
                to={'/landing/history'}
                icon={'sexo'}
                label={'Historial'}
              />

              <span>tema</span>

              <LogoutButton />
            </div>
          )}
        </div>
      </Header>

      <div className='max-w-[1400px] mx-auto mt-20 px-4'>
        <Outlet />
      </div>
    </>
  );
}

export default Landing;
