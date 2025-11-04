function ModalCart({ classState, children }) {
  return (
    <div
      className={`${classState} fixed inset-0 z-50 flex justify-center items-center bg-[#00000091]`}
    >
      <div className='w-[600px] bg-white rounded-2xl overflow-hidden p-2'>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default ModalCart;
