import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import LogoutButton from '../components/LogoutButton.jsx';
import SideBar from '../components/SideBar.jsx';
import Logo from '../assets/Autentica2.png';

function Dashboard() {
  return (
    <>
      <Header>
        <header className='fixed top-0 h-10 flex justify-between w-full pr-8 pl-8'>
          <div>
            <img className='w-8' src={Logo} alt='Autentica' />
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

      <div className='mt-10 h-[calc(100vh-2.5rem)] flex justify-between items-center w-full pr-4 pl-4 '>
        <SideBar />
        <Outlet />
      </div>
    </>
  );
}

export default Dashboard;
