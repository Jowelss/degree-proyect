import { Link } from 'react-router-dom';
import LogoutButton from './components/LogoutButton';

function Header() {
  return (
    <header className='flex justify-between items-center bg-gray-800 text-white p-4 mb-4'>
      <h1>LOGO AUTENTICA</h1>

      <ul className='flex space-x-4'>
        <li>
          <Link to={'/tienda'}>Tienda</Link>
        </li>
        <li>
          <Link to={'/eventos'}>Eventos</Link>
        </li>
        <li>
          <Link to={'/reuniones'}>Sesiones</Link>
        </li>
      </ul>

      <LogoutButton />
    </header>
  );
}

export default Header;
