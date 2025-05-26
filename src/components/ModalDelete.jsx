export function ModalDelete({ children, classState }) {
  return (
    <div
      className={`${classState} fixed inset-0 flex justify-center items-center`}
    >
      {children}
    </div>
  );
}
