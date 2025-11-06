import { SideBarLink } from '../components/SideBarLink';

function HeaderBar() {
  return (
    <ul className='flex gap-2 rounded-2xl font-medium'>
      <SideBarLink to={'/landing/tiendaCliente'} label={'Tienda'} />

      <SideBarLink to={'/landing/blogclient'} label={'Blog'} />

      <SideBarLink to={'/landing/eventosclient'} label={'Eventos'} />

      <SideBarLink to={'/landing/sesiones'} label={'Sesiones'} />
    </ul>
  );
}

export default HeaderBar;
