import { useState, useEffect } from 'react';

import { Get } from '../../services/Get.jsx';

function Eventos() {
  const [eventos, setEventos] = useState([]);

  const fetchEventos = async () => {
    const data = await Get('eventos');

    setEventos(data);
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  return (
    <div className='flex justify-center'>
      {eventos.map((item) => (
        <div
          className='relative bg-pink-700 w-[1000px] rounded-xl overflow-hidden'
          key={item._id}
        >
          <div className='w-full h-[400px]'>
            <img
              className='object-cover object-center w-full h-full'
              src={item.imagen}
              alt='sexo'
            />
          </div>

          <div className='p-4 absolute inset-0 flex items-center'>
            <div>
              <h1 className='block text-6xl'>{item.nombre}</h1>
              <p>{item.descripcion}</p>
              <p>{item.hora}</p>
              <p>{new Date(item.fecha).toLocaleDateString()}</p>
              <p>{item.ubicacion}</p>
              <p>{item.cupos}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Eventos;
