import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

export function DropImagen({ setValue, children }) {
  const [isEstado, setEstado] = useState('Agrega una imagen');

  const show = children ? 'hidden' : 'block'; //Si el children exite oculta el texto de 'Agregar una imagen'

  const onDrop = async (acceptedFiles) => {
    setEstado('Cargando');

    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    formData.append('upload_preset', 'autentica_loveSelf');

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/drazdkofq/image/upload',
        formData
      );

      setValue('imagen', res.data.secure_url);
    } catch (error) {
      console.log(error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    //Si el formulario se cierra el nombre del estado cambia
    setEstado('Agrega una imagen');
  }, [children]);

  return (
    <div
      {...getRootProps()}
      className={`
                ${
                  isDragActive
                    ? 'border-pink-400 bg-pink-100 text-pink-400'
                    : 'border-gray-300'
                }
                 w-full h-full flex items-center justify-center rounded-2xl text-gray-400 border`}
    >
      <input {...getInputProps()} />
      <span className={`${show} select-none`}>{isEstado}</span>
      {children}
    </div>
  );
}
