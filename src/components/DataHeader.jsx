export function DataHeader({ children }) {
  return (
    <ul className='mb-4 pb-2 grid auto-cols-fr grid-flow-col gap-1 border-b-1 border-gray-200 select-none'>
      <div className='flex gap-2 col-span-2'>
        <li className='min-w-7 text-center'>#</li>
        <li>Titulo</li>
      </div>

      {children}
      <li className='text-center col-span-2'>Acción</li>
    </ul>
  );
}
