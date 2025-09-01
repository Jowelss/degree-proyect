import { Outlet } from 'react-router-dom';
import Logo from '../../assets/Autentica2.png';

import { Header } from '../../components/Header.jsx';
import LogoutButton from '../../auth/LogoutButton.jsx';
import Profile from '../../auth/Profile.jsx';
import HeaderNav from '../client/components/HeaderNav.jsx';

function Landing() {
  return (
    <>
      <Header>
        <header className='h-16 flex justify-between items-center w-full pr-8 pl-8'>
          <div className='w-14'>
            <img src={Logo} alt='Autentica' />
          </div>

          <div className='flex gap-2 items-center'>
            <HeaderNav />
          </div>

          <ul className='flex gap-6'>
            <li>
              <h3>tema</h3>
            </li>
            <li className='flex'>
              <LogoutButton />
              <Profile />
            </li>
          </ul>
        </header>
      </Header>

      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Landing;
