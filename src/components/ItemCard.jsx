export function ItemCard({ children }) {
  return (
    <li className='p_rounded_cursor-item hover_item p-1 grid auto-cols-fr grid-flow-col items-center gap-1 rounded-2xl overflow-hidden'>
      {children}
    </li>
  );
}
