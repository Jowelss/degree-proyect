import { Link } from 'react-router-dom';

function SideBar() {
  return (
    <aside className='h-full'>
      <ul className='flex gap-2 flex-col'>
        <Link to={'/dashboard/productos'}>Productos</Link>
        <Link to={'/dashboard/eventos'}>Eventos</Link>
        <Link to={'/dashboard/blog'}>Blog</Link>
        <li>Suscripciones</li>
        <li>Coaching</li>
        <li>Duelo Animal</li>
        <li>Contacto</li>
      </ul>
    </aside>
  );
}

export default SideBar;
