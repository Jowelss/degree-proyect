import { Link } from 'react-router-dom';

function SideBar() {
  return (
    <aside>
      <ul className='h-[500px] w-[200px] flex gap-2 flex-col justify-around shadow rounded-2xl'>
        <Link className='sidebar_item' to={'/dashboard/productos'}>
          Productos
        </Link>
        <Link className='sidebar_item' to={'/dashboard/eventos'}>
          Eventos
        </Link>
        <Link className='sidebar_item' to={'/dashboard/blog'}>
          Blog
        </Link>
        <Link className='sidebar_item' to={'/dashboard/suscripciones'}>
          Suscripciones
        </Link>
        <Link className='sidebar_item' to={'/dashboard/coaching'}>
          Sesiones
        </Link>
      </ul>
    </aside>
  );
}

export default SideBar;
