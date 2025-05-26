export function ModalDelete({ onClosed, children, classState }) {
  return (
    <div
      className={`${classState} fixed inset-0 flex justify-center items-center`}
    >
      <button onClick={onClosed}>Cancelar</button>
      {children}
    </div>
  );
}
