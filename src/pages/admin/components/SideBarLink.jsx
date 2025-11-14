import { NavLink } from 'react-router-dom';

export function SideBarLink({ to, icon: Icon, label }) {
  return (
    <li className='list-none'>
      <NavLink
        className={({ isActive }) =>
          `p_rounded_cursor-item py-2 px-2 flex items-center gap-2 rounded-2xl ${
            isActive ? 'bg-pink-400 text-white' : 'hover:bg-gray-200'
          }`
        }
        to={to}
      >
        <Icon className='text-lg' />
        {label}
      </NavLink>
    </li>
  );
}
