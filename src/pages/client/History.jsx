import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import { Get } from '../../services/Get.jsx';

function History() {
  const [history, setHistory] = useState([]);

  const { user } = useAuth0();

  const getHistory = async () => {
    const dataUser = await Get('orden');

    const dataProducts = await dataUser.filter(
      (item) => item.userId === user.sub
    );

    const allItems = await dataProducts.flatMap((item) => item.items);

    setHistory(allItems);
  };

  useEffect(() => {
    getHistory();
  }, [history]);

  return (
    <div className='mt-11 max-w-max mx-auto font-medium'>
      <span className='block mb-3 text-4xl'>HISTORIAL</span>

      <div className='flex flex-col items-center gap-2'>
        {history.map((item) => (
          <ul
            className='w-200 flex items-center gap-3 bg-white rounded-2xl overflow-hidden'
            key={item._id}
          >
            <li>
              <div className='w-20 h-20'>
                <img
                  className='object-contain h-full'
                  src={item.imagen}
                  alt='Imagen'
                />
              </div>
            </li>

            <div className='w-full p-2 flex justify-between'>
              <li>{item.nombre}</li>
              <li>x{item.cantidad}</li>
              <li>{item.precio}bs</li>
            </div>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default History;
