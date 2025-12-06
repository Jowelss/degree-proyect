export function ModalItem({ state, children }) {
  return (
    <div
      className={`${state} fixed inset-0 z-40 flex justify-center items-center bg-[#00000091]`}
    >
      <div className=' p-4 bg-white rounded-2xl overflow-hidden'>
        <div>{children}</div>
      </div>
    </div>
  );
}
