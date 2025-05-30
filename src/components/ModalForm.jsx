export function ModalForm({ children, classState }) {
  return (
    <article
      className={`${classState} fixed inset-0 flex justify-center items-center bg-[#00000091]`}
    >
      <div className='w-[900px] bg-white rounded-2xl overflow-hidden p-2'>
        <div>{children}</div>
      </div>
    </article>
  );
}
