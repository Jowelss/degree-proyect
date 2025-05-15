import { Header } from '../components/Header';
import LogoutButton from '../components/LogoutButton.jsx';
import SideBar from '../components/SideBar.jsx';

function Dashboard() {
  return (
    <>
      <Header>
        <header className='flex justify-around w-full'>
          <div>
            <h1>LOGO AUTENTICA</h1>
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
      <SideBar />
      {/* Aqui ira el contenido dependiendo el sidebar */}
    </>
  );
}

export default Dashboard;
