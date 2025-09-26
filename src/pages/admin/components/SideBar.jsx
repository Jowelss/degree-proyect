import { Link } from 'react-router-dom';

function SideBar() {
  return (
    <aside className='overflow-hidden shadow-[0_0_6px_0_#bababa] rounded-lg'>
      <h2 className='text-3xl mt-3 font-bold border-b-1 px-4 pb-3'>
        DASHBOARD
      </h2>

      <ul className='flex gap-2 flex-col justify-around px-4 pt-4'>
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
        <Link className='sidebar_item' to={'/dashboard/sesiones'}>
          Sesiones
        </Link>
      </ul>
    </aside>
  );
}

export default SideBar;
