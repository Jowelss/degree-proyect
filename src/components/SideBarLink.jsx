import { NavLink } from 'react-router-dom';

export function SideBarLink({ to, icon: Icon, label }) {
  return (
    <li>
      <NavLink
        className={({ isActive }) =>
          `p_rounded_cursor-item flex items-center gap-2 ${
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
