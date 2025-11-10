function ModalCart({ classState, children }) {
  return (
    <div
      className={`${classState} fixed inset-0 z-50 flex justify-center items-center bg-[#00000091]`}
    >
      <div className='w-[600px] bg-gray-100 text-black/90 rounded-2xl font overflow-hidden p-2 font-medium'>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default ModalCart;
