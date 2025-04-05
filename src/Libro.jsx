function Libro() {
  return (
    <div className="flex justify-between p-2.5 bg-amber-200">
      <h2>EL monje que vendio su ferrari</h2>

      <span>En venta</span>
      <div className="flex gap-2">
        <button>Actualizar</button>
        <button>ELiminar</button>
      </div>
    </div>
  );
}

export default Libro;
