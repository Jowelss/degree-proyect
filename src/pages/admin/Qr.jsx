import { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import axios from 'axios';

import { Get } from '../../services/Get';
import { Add } from '../../services/Add';
import Update from '../../services/Update';
import Delete from '../../services/Delete.jsx';

import { ModalDelete } from '../../components/ModalDelete.jsx';

export default function Qr({ children, classState, setOpen }) {
  const [openDelete, setOpenDelete] = useState(false);
  const handleClickDelete = () => setOpenDelete(!openDelete);

  const [qr, setQr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState('Agregar Qr');

  const show = qr ? 'hidden' : 'block';

  const fetchQr = useCallback(async () => {
    try {
      const data = await Get('qr');
      if (data && data.length > 0) {
        setQr(data);
        setState('QR Cargado');
      } else {
        setQr(null);
        setState('Agregar Qr');
      }
    } catch (error) {
      console.error('Error al obtener QR:', error);
      setState('Error al cargar QR');
    }
  }, []);

  const deleteQr = async () => {
    try {
      setLoading(true);
      if (qr && qr[0]?._id) {
        await Delete(qr[0]._id, setQr, qr, 'qr');
        setQr(null);
        setState('QR eliminado. Agregar uno nuevo');
        handleClickDelete();
        await fetchQr();
      }
    } catch (error) {
      console.error('Error al eliminar QR:', error);
      setState('Error al eliminar QR');
    } finally {
      setLoading(false);
    }
  };

  const onDrop = async (acceptedFiles) => {
    if (!acceptedFiles || acceptedFiles.length === 0) {
      setState('Por favor selecciona una imagen');
      return;
    }

    setState('Cargando...');
    setLoading(true);

    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    formData.append('upload_preset', 'autentica_loveSelf');

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/drazdkofq/image/upload',
        formData,
      );

      const data = await Get('qr');

      if (data && data.length > 0) {
        await Update(data[0]._id, 'qr', { imagen: res.data.secure_url });
        setState('QR actualizado');
      } else {
        await Add({ imagen: res.data.secure_url }, 'qr');
        setState('QR agregado');
      }

      await fetchQr();
    } catch (error) {
      console.error('Error al cargar QR:', error);
      setState('Error: No se pudo cargar la imagen');
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    fetchQr();
  }, [fetchQr]);

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
              drop-imagen text-gray-400
                ${
                  isDragActive
                    ? 'border-pink-400 bg-pink-100 text-pink-400'
                    : 'border-gray-300'
                }
                ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <input {...getInputProps()} disabled={loading} />

            <span className={show}>{loading ? 'Procesando...' : state}</span>

            {qr && qr[0]?.imagen && (
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
            disabled={loading}
            onClick={() => {
              setOpen(false);
            }}
          >
            <span
              className={`py-1 px-2 rounded-2xl ${loading ? 'bg-gray-300' : 'bg-pink-400'} text-white`}
            >
              Guardar
            </span>
          </button>

          <button
            className='flex items-center gap-1.5'
            title='Eliminar Qr'
            disabled={loading || !qr}
            onClick={handleClickDelete}
          >
            <span
              className={`py-1 px-2 rounded-2xl ${loading || !qr ? 'bg-gray-300' : 'bg-pink-400'} text-white`}
            >
              Eliminar
            </span>
          </button>
        </div>

        <ModalDelete classState={openDelete ? 'block' : 'hidden'}>
          <div className='p-4 rounded-2xl bg-white'>
            <span className='block mb-3'>
              ¿Estas seguro que quieres eliminar este QR?
            </span>

            <div className='flex justify-center gap-3'>
              <button
                className='py-1 px-2 rounded-2xl bg-pink-400 text-white'
                disabled={loading}
                onClick={async () => {
                  await deleteQr();
                }}
              >
                Eliminar
              </button>

              <button
                className='py-1 px-2 rounded-2xl bg-gray-200'
                disabled={loading}
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
