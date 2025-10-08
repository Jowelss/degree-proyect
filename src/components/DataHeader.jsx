export function DataHeader({ children }) {
  return (
    <ul className='mb-4 pb-2 grid grid-flow-col auto-cols-fr border-b-1 border-gray-300'>
      <li>#</li>
      <li>Titulo</li>
      {children}
      <li>Acción</li>
    </ul>
  );
}
