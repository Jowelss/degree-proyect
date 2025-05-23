export function ItemCard({ children }) {
  return (
    <li className='h-12 flex justify-between items-center border'>
      {children}
    </li>
  );
}
