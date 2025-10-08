export function ItemCard({ children }) {
  return (
    <li className='effect_hover h-18 grid grid-flow-col auto-cols-fr items-center rounded-2xl overflow-hidden p-1'>
      {children}
    </li>
  );
}
