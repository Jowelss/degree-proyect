function Reuniones() {
  return (
    <section className="w-[900px] border">
      <h1 className="text-4xl font-bold text-gray-800">Reuniones</h1>
      <div>
        <form>
          <label htmlFor="">Imagen de la Reunion</label>
          <input type="file" />

          <label htmlFor="">Nombre de la Reunion</label>
          <input type="text" />

          <label htmlFor="">Motivo de la reunion</label>
          <input type="text" />

          <label htmlFor="">Inicio y terminacion de la reunion</label>
          <input type="number" />

          <label htmlFor="">Fecha de la reunion</label>
          <input type="text" />

          <button className="block p-2 bg-blue-500 mt-2 cursor-pointer">
            Agregar a tienda
          </button>
        </form>
      </div>
    </section>
  );
}

export default Reuniones;
