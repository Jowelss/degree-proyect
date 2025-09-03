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

  const [state, setState] = useState('Agrega una imagen');

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

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  useEffect(() => {
    fecthQr();
  }, []);

  return (
    <div
      className={`${classState} fixed inset-0 flex justify-center items-center bg-[#00000091]`}
    >
      <div className='w-[500px] bg-white rounded-2xl overflow-hidden p-2'>
        {children}
        <div {...getRootProps()} className='drop-imagen cursor-pointer'>
          <input {...getInputProps()} />

          <span className={show}>{state}</span>

          {qr && (
            <img
              className='object-contain h-full'
              src={qr[0].imagen}
              alt='Qr'
            />
          )}
        </div>
        <div className='flex justify-around mt-1.5'>
          <button
            onClick={() => {
              setOpen(false);
            }}
          >
            Guardar
          </button>

          <button onClick={handleClickDelete}>Eliminar</button>
        </div>

        <ModalDelete classState={openDelete ? 'block' : 'hidden'}>
          <div className='border p-4 rounded-2xl bg-white'>
            <h2>¿Estas seguro que quieres eliminar este producto?</h2>

            <div className='flex justify-center gap-2'>
              <button
                onClick={() => {
                  deleteQr(), handleClickDelete();
                }}
              >
                Eliminar
              </button>
              <button onClick={handleClickDelete}>Cancelar</button>
            </div>
          </div>
        </ModalDelete>
      </div>
    </div>
  );
}
