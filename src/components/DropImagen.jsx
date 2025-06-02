import { useDropzone } from 'react-dropzone';
import axios from 'axios';
// import { useState } from 'react';

export function DropImagen({ setValue }) {
  //   const [isImage, setIsImage] = useState('');

  const onDrop = async (acceptedFiles) => {
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    formData.append('upload_preset', 'jowelss');

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/drazdkofq/image/upload',
        formData
      );

      //   setIsImage(res.data.secure_url);

      await setValue('imagen', res.data.secure_url.url);
    } catch (error) {
      console.log(error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className='w-full h-40 flex items-center justify-center border'
    >
      <input {...getInputProps()} />
      <span>Arrastra aqui tu imagen</span>
    </div>
  );
}
