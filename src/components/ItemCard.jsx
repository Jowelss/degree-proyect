export function ItemCard({ children }) {
  return (
    <li className='h-18 flex justify-between items-center rounded-2xl overflow-hidden shadow-[0_0_10px_rgba(0,_0,_0,_0.1)] pr-3'>
      {children}
    </li>
  );
}
