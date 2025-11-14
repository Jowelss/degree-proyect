export function ModalDelete({ children, classState }) {
  return (
    <div
      className={`${classState} fixed inset-0 flex justify-center items-center bg-[#00000091]`}
    >
      {children}
    </div>
  );
}
