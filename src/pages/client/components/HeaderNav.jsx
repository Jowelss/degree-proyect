import { SideBarLink } from '../../../components/SideBarLink';

import { RiBookShelfLine } from 'react-icons/ri';
import { MdClose, MdEvent } from 'react-icons/md';
import { TbBrandBlogger } from 'react-icons/tb';
import { HiOutlineVideoCamera } from 'react-icons/hi';

function HeaderBar() {
  return (
    <ul className='flex gap-2 rounded-2xl'>
      <SideBarLink
        to={'/landing/tiendaCliente'}
        icon={RiBookShelfLine}
        label={'Tienda'}
      />

      <SideBarLink
        to={'/landing/blogclient'}
        icon={TbBrandBlogger}
        label={'Blog'}
      />

      <SideBarLink
        to={'/landing/eventosclient'}
        icon={MdEvent}
        label={'Eventos'}
      />

      <SideBarLink
        to={'/landing/sesiones'}
        icon={HiOutlineVideoCamera}
        label={'Sesiones'}
      />
    </ul>
  );
}

export default HeaderBar;
