import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Formulario } from '../components/Formulario.jsx';

function Tienda() {
  // Metodo para abrir y cerrar el modal
  const [isOpen, setIsOpen] = useState(false);
  const state = isOpen ? 'block' : 'hidden';
  // end

  // enviar datos del formulario
  const {
    register, //Conecta los campos de entrada
    handleSubmit, // Se ocupa de lo que sucede cuando se envia el formulario
    formState: { errors }, // Maneja los errores
    reset, // Para usarlo en la funcion donde manejo los datos recolectados
  } = useForm();

  // Funcion con los datos recolectados
  const onSubmit = (data) => {
    console.log(data); // Datos del formulario
    reset(); //Vacia los datos de los inputs y los reinicia
  };
  // end

  return (
    <section className='w-[900px] border relative'>
      <div className='flex justify-end items-center bg-gray-800 text-white p-4 mb-4'>
        <button onClick={() => setIsOpen(true)}>Abrir Modal</button>
      </div>

      <Formulario classState={state} onClosed={() => setIsOpen(false)}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className='text-4xl font-bold text-gray-800'>Tienda</h1>

          <ul>
            <li>
              <label>Nombre</label>
              <input
                {...register('nombre', {
                  required: 'Agregue el nombre del libro',
                })}
              />
              {errors.nombre && <p>{errors.nombre.message}</p>}
            </li>

            <li>
              <label>Precio</label>
              <input
                {...register('precio', {
                  required: 'Agrega el nombre del author',
                })}
              />
              {errors.precio && <p>{errors.precio.message}</p>}
            </li>
            <li>
              <label>Descripción</label>
              <input
                {...register('descripcion', {
                  required: 'Agrega el numero de paginas',
                })}
              />
              {errors.descripcion && <p>{errors.descripcion.message}</p>}
            </li>

            <li>
              <label>Autor</label>
              <input
                {...register('autor', {
                  required: 'El nombre de author es obligatorio',
                })}
              />
              {errors.autor && <p>{errors.autor.message}</p>}
            </li>

            <li>
              <label>Cantidad</label>
              <input
                {...register('cantidad', {
                  required: 'Cantidad de libros requerido',
                })}
              />
              {errors.cantidad && <p>{errors.cantidad.message}</p>}
            </li>

            <li>
              <label>Editorial</label>
              <input
                {...register('editorial', {
                  required: 'Cantidad de libros requerido',
                })}
              />
              {errors.editorial && <p>{errors.editorial.message}</p>}
            </li>
            <li>
              <label>Formato</label>
              <input
                {...register('formato', {
                  required: 'Cantidad de libros requerido',
                })}
              />
              {errors.formato && <p>{errors.formato.message}</p>}
            </li>
          </ul>

          <button
            type='submit'
            className='block p-2 bg-blue-500 mt-2 cursor-pointer'
          >
            Agregar a tienda
          </button>
        </form>
      </Formulario>
    </section>
  );
}

export default Tienda;
