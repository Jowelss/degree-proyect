export function ItemCard({ children }) {
  return (
    <li className='h-18 flex justify-around items-center rounded-2xl overflow-hidden p-1'>
      {children}
    </li>
  );
}
