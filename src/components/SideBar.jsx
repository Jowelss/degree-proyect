import { Link } from 'react-router-dom';

function SideBar() {
  return (
    <aside className='h-full'>
      <ul className='flex gap-2 flex-col'>
        <Link to={'/dashboard/productos'}>Productos</Link>
        <Link to={'/dashboard/eventos'}>Eventos</Link>
        <Link to={'/dashboard/blog'}>Blog</Link>
        <Link to={'/dashboard/suscripciones'}>Suscripciones</Link>
        <Link to={'/dashboard/coaching'}>Coaching</Link>
        <Link to={'/dashboard/duelo-animal'}>Duelo Animal</Link>
        <Link to={'/dashboard/contacto'}>Contacto</Link>
      </ul>
    </aside>
  );
}

export default SideBar;
