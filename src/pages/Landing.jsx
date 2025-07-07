import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import Logo from '../assets/Autentica2.png';
import LogoutButton from '../components/LogoutButton';
import Coso from '../components/Coso';

function Landing() {
  return (
    <>
      <Header>
        <header className='fixed top-0 h-16 flex justify-between items-center w-full pr-8 pl-8'>
          <div className='w-14'>
            <img src={Logo} alt='Autentica' />
          </div>

          <div>
            <Coso />
          </div>

          <ul className='flex gap-6'>
            <li>
              <h3>tema</h3>
            </li>
            <li>
              <LogoutButton />
            </li>
          </ul>
        </header>
      </Header>

      <div className='mt-16 h-[calc(100vh-4rem)] w-full pr-4 pl-4'>
        <Outlet />
      </div>
    </>
  );
}

export default Landing;
