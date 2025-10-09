export function DataHeader({ children }) {
  return (
    <ul className='mb-4 pb-2 grid grid-flow-col auto-cols-fr gap-4 border-b-1 border-gray-300'>
      <div className='flex gap-3'>
        <li className='mr-3'>#</li>
        <li>Titulo</li>
      </div>
      {children}
      <li>Acción</li>
    </ul>
  );
}
