import { useDropzone } from 'react-dropzone';
import axios from 'axios';

import { useState } from 'react';
import { useEffect } from 'react';

export default function DropImgQr({ setQr, children }) {
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

      setQr(res.data.secure_url);
    } catch (error) {
      console.log(error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  useEffect(() => {
    //Si el formulario se cierra el nombre del estado cambia
    setEstado('Agrega una imagen');
  }, [children]);

  return (
    <div {...getRootProps()} className='drop-imagen'>
      <input {...getInputProps()} />
      <span className={show}>{isEstado}</span>
      {children}
    </div>
  );
}
