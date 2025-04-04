function Inicio() {
  return (
    <section className="w-[900px] border">
      <h1 className="text-4xl font-bold text-gray-800">Tienda</h1>
      <div>
        <form>
          <label htmlFor="">Imagen del libro</label>
          <input type="file" />

          <label htmlFor="">Nombre del libro</label>
          <input type="text" />

          <label htmlFor="">Nombre del author</label>
          <input type="text" />

          <label htmlFor="">Formato</label>
          <input type="text" />

          <label htmlFor="">Cantidad de paginas</label>
          <input type="number" />

          <label htmlFor="">Nombre de la editorial</label>
          <input type="text" />

          <label htmlFor="">Precio</label>
          <input type="number" />

          <label htmlFor="">Disponibilidad</label>
          {/* Agotado, stock, preventa */}
          <input type="select" />

          <button className="block p-2 bg-blue-500 mt-2 cursor-pointer">
            Agregar a tienda
          </button>
        </form>
      </div>
    </section>
  );
}

export default Inicio;
