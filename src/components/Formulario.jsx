export function Formulario({ children, classState }) {
  return (
    <article
      className={`${classState} fixed inset-0 flex justify-center items-center`}
    >
      <div className='w-[1000px] bg-gray-200 border rounded-2xl overflow-hidden p-2'>
        <div>{children}</div>
      </div>
    </article>
  );
}
