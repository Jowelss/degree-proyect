function Libro({ libro }) {
  return (
    <ul className='h-12 flex justify-between items-center border'>
      <li>{libro.nombre}</li>
      <li>{libro.estado}</li>
      <li>{libro.precio}</li>
      <li>{libro.formato}</li>

      <li className='flex gap-1'>
        <button>Eliminar</button>
        <button>Actualizar</button>
      </li>
    </ul>
  );
}

export default Libro;
