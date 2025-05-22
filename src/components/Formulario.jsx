export function Formulario({ children, classState, onClosed }) {
  return (
    <article
      className={`${classState} fixed inset-0 flex justify-center items-center`}
    >
      <div className='w-[1000px] bg-gray-200 border rounded-2xl overflow-hidden p-2'>
        <div className='flex justify-between mb-3'>
          <span className='text-5xl'>Nuevo libro</span>
          <button onClick={onClosed}>Cerrar</button>
        </div>

        <div>{children}</div>
      </div>
    </article>
  );
}
