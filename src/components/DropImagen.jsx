import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useState } from 'react';

export function DropImagen({ setValue }) {
  const [loading, setLoading] = useState(false);
  const [isImagen, setImagen] = useState(undefined);
  const [isAviso, setAviso] = useState('');

  const onDrop = async (acceptedFiles) => {
    setLoading(true);
    setAviso('hidden');

    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    formData.append('upload_preset', 'autentica_loveSelf');

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/drazdkofq/image/upload',
        formData
      );

      setValue('imagen', res.data.secure_url);
      setImagen(res.data.secure_url);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className='drop-imagen'>
      <input {...getInputProps()} />
      <span className={isAviso}>Dale click o arrastra una imagen</span>
      <img className='object-contain h-full' src={isImagen} />
      {loading && <span>Cargando imagen</span>}
    </div>
  );
}
