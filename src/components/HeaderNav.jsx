import { Link } from 'react-router-dom';

function HeaderBar() {
  return (
    <ul className='flex gap-10 p-2 rounded-2xl border'>
      <li>
        <Link to={'/landing/tiendaCliente'}>Tienda</Link>
      </li>
      <li>
        <Link to={'/landing/blogclient'}>Blog</Link>
      </li>
      <li>
        <Link to={'/landing/eventosclient'}>Eventos</Link>
      </li>
    </ul>
  );
}

export default HeaderBar;
