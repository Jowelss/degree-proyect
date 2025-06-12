import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header.jsx';
import LogoutButton from '../../components/LogoutButton.jsx';
import SideBar from '../../components/SideBar.jsx';
import Logo from '../../assets/Autentica2.png';

function Dashboard() {
  return (
    <>
      <Header>
        <header className='fixed top-0 h-16 flex justify-between items-center w-full pr-8 pl-8'>
          <div className='w-14'>
            <img src={Logo} alt='Autentica' />
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

      <div className='mt-16 h-[calc(100vh-4rem)] flex justify-between items-center w-full pr-4 pl-4 '>
        <SideBar />
        <Outlet />
      </div>
    </>
  );
}

export default Dashboard;
