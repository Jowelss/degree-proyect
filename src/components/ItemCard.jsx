export function ItemCard({ children }) {
  return (
    <li className='p_rounded_cursor-item hover_item h-18 grid grid-flow-col auto-cols-fr gap-4 items-center rounded-2xl overflow-hidden p-1'>
      {children}
    </li>
  );
}
