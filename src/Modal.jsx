function Modal() {
  return (
    <div>
      <button>Cerrar</button>
      <form>
        <h1 className="text-4xl font-bold text-gray-800">Tienda</h1>
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

        <input type="select" />

        <button className="block p-2 bg-blue-500 mt-2 cursor-pointer">
          Agregar a tienda
        </button>
      </form>
    </div>
  );
}

export default Modal;
