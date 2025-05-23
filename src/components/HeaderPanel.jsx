export function HeaderPanel({ children }) {
  return (
    <div className='flex justify-between items-center bg-gray-800 text-white p-4'>
      {children}
    </div>
  );
}
