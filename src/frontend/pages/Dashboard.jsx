import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import LogoutButton from '../components/LogoutButton.jsx';
import SideBar from '../components/SideBar.jsx';
import Logo from '../assets/Autentica2.png';

function Dashboard() {
  return (
    <>
      <Header>
        <header className='flex justify-around w-full'>
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
      <div className='flex justify-around w-full'>
        <SideBar />
        <Outlet />
      </div>
    </>
  );
}

export default Dashboard;
