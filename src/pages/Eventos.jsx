function Eventos() {
  return (
    <section className="w-[900px] border">
      <h1 className="text-4xl font-bold text-gray-800">Eventos</h1>
      <div>
        <form>
          <label htmlFor="">Imagen del Evento</label>
          <input type="file" />

          <label htmlFor="">Nombre del Evento</label>
          <input type="text" />

          <label htmlFor="">Fecha del evento</label>
          <input type="text" />

          <label htmlFor="">Cantidad de paginas</label>
          <input type="number" />

          <button className="block p-2 bg-blue-500 mt-2 cursor-pointer">
            Agregar Evento
          </button>
        </form>
      </div>
    </section>
  );
}

export default Eventos;
