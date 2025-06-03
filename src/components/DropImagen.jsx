import { useDropzone } from 'react-dropzone';
import axios from 'axios';

export function DropImagen({ setValue }) {
  const onDrop = async (acceptedFiles) => {
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    formData.append('upload_preset', 'autentica_loveSelf');

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/drazdkofq/image/upload',
        formData
      );

      await setValue('imagen', res.data.secure_url);
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
