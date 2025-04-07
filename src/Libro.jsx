const data = [
  {
    id: 142343,
    nombre: "Libro",
    autor: "Autor",
    editorial: "Editorial",
    formato: "Formato",
    paginas: "Paginas",
    precio: "24 bs",
    disponibilidad: "Disponibilidad",
  },
];

function Libro() {
  return (
    <article>
      {data.map((item) => {
        return (
          <div key={item.id}>
            <h2>{item.nombre}</h2>
            <p>{item.autor}</p>
            <p>{item.disponibilidad}</p>
            <p>{item.formato}</p>
            <p>{item.precio}</p>
            <p>{item.editorial}</p>
            <p>{item.paginas}</p>
          </div>
        );
      })}
    </article>
  );
}

export default Libro;
