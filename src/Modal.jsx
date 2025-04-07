export function Modal() {
  return (
    <article className='border'>
      <button>Cerrar</button>
      <form>
        <h1 className='text-4xl font-bold text-gray-800'>Tienda</h1>

        <label>Imagen del libro</label>
        <input type='file' />

        <label>Nombre del libro</label>
        <input type='text' />

        <label>Nombre del author</label>
        <input type='text' />

        <label>Formato</label>
        <input type='text' />

        <label>Cantidad de paginas</label>
        <input type='number' />

        <label>Nombre de la editorial</label>
        <input type='text' />

        <label>Precio</label>
        <input type='number' />

        <label>Disponibilidad</label>

        <input type='select' />

        <button className='block p-2 bg-blue-500 mt-2 cursor-pointer'>
          Agregar a tienda
        </button>
      </form>
    </article>
  );
}
