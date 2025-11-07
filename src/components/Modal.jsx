export function Modal({ children, classState }) {
  return (
    <div
      className={`${classState} fixed inset-0 z-40 flex justify-center items-center bg-[#00000091]`}
    >
      <div className='w-[900px] bg-white rounded-2xl overflow-hidden'>
        <div>{children}</div>
      </div>
    </div>
  );
}
