import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Formulario } from '../components/Formulario.jsx';
import { HeaderPanel } from '../components/HeaderPanel.jsx';
import { Panel } from '../components/Panel.jsx';
import { ItemCard } from '../components/ItemCard.jsx';

import { Add } from '../services/Add';
import { Get } from '../services/Get.jsx';

function Eventos() {
  // abrir y cerrar modal
  const [isOpen, setIsOpen] = useState(false);
  const state = isOpen ? 'block' : 'hidden';

  const handleClick = () => setIsOpen(!isOpen);
  // end

  // Agregar libro al panel
  const [eventos, setEventos] = useState([]);

  const fetchLibros = async () => {
    const data = await Get('eventos');
    setEventos(data);
  };
  useEffect(() => {
    fetchLibros();
  }, []);
  // end

  // enviar datos del formulario
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    await Add(data, 'eventos');
    reset();

    fetchLibros();
  });
  // end

  return (
    <Panel>
      <HeaderPanel>
        <h1 className='text-4xl font-bold'>Eventos</h1>
        <button onClick={handleClick}>Agregar Evento</button>
      </HeaderPanel>

      <ul>
        {eventos.map((evento) => (
          <ItemCard key={evento._id}>
            <span>{evento.nombre}</span>
            <span>{evento.descripcion}</span>
            <span>{evento.hora}</span>
            <span>{evento.fecha}</span>

            <span className='flex gap-1'>
              <button>Eliminar</button>
              <button>Actualizar</button>
            </span>
          </ItemCard>
        ))}
      </ul>

      <Formulario classState={state} onClosed={handleClick}>
        <form onSubmit={onSubmit}>
          <div>
            <label>Nombre</label>
            <input type='text' {...register('nombre')} />
          </div>

          <div>
            <label>Imagen</label>
            <input type='text' {...register('imagen')} />
          </div>

          <div>
            <label>Descripción</label>
            <input type='text' {...register('descripcion')} />
          </div>

          <div>
            <label>Lugar del evento</label>
            <input type='text' {...register('ubicacion')} />
          </div>

          <div>
            <label>Fecha</label>
            <input type='date' {...register('fecha')} />
          </div>

          <div>
            <label>Hora</label>
            <input type='time' {...register('hora')} />
          </div>

          <button
            type='submit'
            className='block p-2 bg-blue-500 mt-2 cursor-pointer'
          >
            Agregar Evento
          </button>
        </form>
      </Formulario>
    </Panel>
  );
}

export default Eventos;
