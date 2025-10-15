import { SideBarLink } from '../../../components/SideBarLink';

function HeaderBar() {
  return (
    <ul className='flex gap-10 p-2 rounded-2xl border'>
      <SideBarLink
        to={'/landing/tiendaCliente'}
        icon={'sexo'}
        label={'Tienda'}
      />

      <SideBarLink to={'/landing/blogclient'} icon={'sexo'} label={'Blog'} />

      <SideBarLink
        to={'/landing/eventosclient'}
        icon={'sexo'}
        label={'Eventos'}
      />

      <SideBarLink to={'/landing/sesiones'} icon={'sexo'} label={'Sesiones'} />
    </ul>
  );
}

export default HeaderBar;
