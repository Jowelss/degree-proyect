export function Formulario({ children, classState, onClosed }) {
  return (
    <article className={classState}>
      <div>
        <button onClick={onClosed}>Cerrar</button>
      </div>

      <div>{children}</div>
    </article>
  );
}
