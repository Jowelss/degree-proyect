import { NavLink } from 'react-router-dom';

export function SideBarLink({ to, label }) {
  return (
    <li className='list-none'>
      <NavLink
        className={({ isActive }) =>
          `px-2 rounded-2xl p-1 font-medium ${
            isActive ? 'bg-pink-400 text-white' : 'hover:bg-gray-200'
          }`
        }
        to={to}
      >
        {label}
      </NavLink>
    </li>
  );
}
