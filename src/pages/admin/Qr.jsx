import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import axios from 'axios';

import { Get } from '../../services/Get';
import { Add } from '../../services/Add';
import { Update } from '../../services/Update';
import { Delete } from '../../services/Delete';

export default function Qr({ children, classState }) {
  const [qr, setQr] = useState(null);

  const [state, setState] = useState('Agrega una imagen');

  const show = qr ? 'hidden' : 'block';

  const addQr = () => {
    Add({ imagen: qr }, 'qr');
  };

  const onDrop = async (acceptedFiles) => {
    setState('Cargando');

    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    formData.append('upload_preset', 'autentica_loveSelf');

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/drazdkofq/image/upload',
        formData
      );

      setQr(res.data.secure_url);
    } catch (error) {
      console.log(error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  useEffect(() => {
    //Si el formulario se cierra el nombre del estado cambia
    setState('Agrega una imagen');
  }, [qr]);

  return (
    <div
      className={`${classState} fixed inset-0 flex justify-center items-center bg-[#00000091]`}
    >
      <div className='w-[500px] bg-white rounded-2xl overflow-hidden p-2'>
        {children}

        <div {...getRootProps()} className='drop-imagen cursor-pointer'>
          <input {...getInputProps()} />

          <span className={show}>{state}</span>

          {qr && <img className='object-contain h-full' src={qr} alt='Qr' />}
        </div>

        <div className='flex justify-around mt-1.5'>
          <button onClick={addQr}>Guardar</button>
          <button>Eliminar</button>
        </div>
      </div>
    </div>
  );
}
