import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import axios from 'axios';

import { Get } from '../../services/Get';
import { Add } from '../../services/Add';
import { Update } from '../../services/Update';
import { Delete } from '../../services/Delete';

import { ModalDelete } from '../../components/ModalDelete.jsx';

export default function Qr({ children, classState, setOpen }) {
  const [openDelete, setOpenDelete] = useState(false);
  const handleClickDelete = () => setOpenDelete(!openDelete);

  const [qr, setQr] = useState(null);

  const [state, setState] = useState('Agregar Qr');

  const show = qr ? 'hidden' : 'block';

  const fecthQr = async () => {
    const data = await Get('qr');

    if (data.length > 0) {
      setQr(data);
    }
  };

  const deleteQr = async () => {
    try {
      await Delete(qr[0]._id, setQr, qr, 'qr'),
        setQr(null),
        setState('Agrega una imagen');
    } catch (error) {
      console.log(error);
    }
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

      const data = await Get('qr');

      if (data.length > 0) {
        await Update(data[0]._id, 'qr', { imagen: res.data.secure_url });
      } else {
        await Add({ imagen: res.data.secure_url }, 'qr');
      }

      fecthQr();
    } catch (error) {
      console.log(error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    fecthQr();
  }, []);

  return (
    <div
      className={`${classState} fixed inset-0 flex justify-center items-center bg-[#00000091]`}
    >
      <div className='w-110 p-3 bg-white rounded-2xl'>
        {children}

        <div className='h-100'>
          <div
            {...getRootProps()}
            className={`
              drop-imagen text-gray-400 border rounded-2xl
                ${
                  isDragActive
                    ? 'border-pink-400 bg-pink-100 text-pink-400'
                    : 'border-gray-300'
                }`}
          >
            <input {...getInputProps()} />

            <span className={show}>{state}</span>

            {qr && (
              <img
                className='object-contain w-full h-full'
                src={qr[0].imagen}
                alt='Qr'
              />
            )}
          </div>
        </div>

        <div className='flex justify-around mt-3 font-medium'>
          <button
            className='flex items-center gap-1'
            title='Guardar Qr'
            onClick={() => {
              setOpen(false);
            }}
          >
            <span className='py-1 px-2 rounded-2xl bg-pink-400 text-white'>
              Guardar
            </span>
          </button>

          <button
            className='flex items-center gap-1.5'
            title='Eliminar Qr'
            onClick={handleClickDelete}
          >
            <span className='py-1 px-2 rounded-2xl bg-pink-400 text-white'>
              Eliminar
            </span>
          </button>
        </div>

        <ModalDelete classState={openDelete ? 'block' : 'hidden'}>
          <div className='p-4 rounded-2xl bg-white'>
            <span className='block mb-3'>
              ¿Estas seguro que quieres eliminar este QR?
            </span>

            <div className='flex justify-center gap-10'>
              <button
                className='py-1 px-2 rounded-2xl bg-pink-400 text-white'
                onClick={() => {
                  deleteQr(), handleClickDelete();
                }}
              >
                Eliminar
              </button>

              <button
                className='py-1 px-2 rounded-2xl bg-gray-200'
                onClick={handleClickDelete}
              >
                Cancelar
              </button>
            </div>
          </div>
        </ModalDelete>
      </div>
    </div>
  );
}
