export function Formulario({ children, classState, onClosed }) {
  return (
    <article className={classState}>
      <button onClick={onClosed}>Cerrar</button>

      {children}
    </article>
  );
}
