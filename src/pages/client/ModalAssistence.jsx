import { IoClose } from 'react-icons/io5';

import { useForm } from 'react-hook-form';

function ModalAssistence({ state, setOpen, setAssistence }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const mensaje = `
Hola, soy ${data.nombre} y asistiré al evento.`;

    const numeroAutentica = import.meta.env.VITE_NUMBER_AUTENTICA;

    const urlWhatsapp = `https://wa.me/${numeroAutentica}?text=${encodeURIComponent(
      mensaje
    )}`;

    window.open(urlWhatsapp, '_blank');

    await setAssistence('Asistirás');
    reset();
  });

  return (
    <div
      className={`${state} fixed inset-0 z-40 flex justify-center items-center bg-[#00000091]`}
    >
      <div className='w-100 p-3 relative bg-white rounded-2xl font-medium text-black/80'>
        <div className='mb-3 font-bold text-pink-400 text-center'>
          <span className='pl-2 text-2xl uppercase'>
            Registro de asistencia
          </span>

          <button
            className='absolute -top-2 -right-2'
            onClick={() => {
              setOpen(), reset();
            }}
          >
            <IoClose className='text-2xl bg-pink-400 rounded-full text-white' />
          </button>
        </div>

        <div className='px-2'>
          <form onSubmit={onSubmit}>
            <div>
              <label className='pl-2 font-bold'>Nombre</label>
              <input
                className='coso'
                type='text'
                {...register('nombre', {
                  required: 'Debes ingresar tu nombre*',
                })}
              />
              {errors.nombre && (
                <p className='pl-2 text-red-500 text-sm mt-1'>
                  {errors.nombre.message}
                </p>
              )}
            </div>

            <div className='mt-3 mb-5'>
              <label className='pl-2 font-bold'>Edad</label>
              <input
                className='coso'
                type='number'
                {...register('edad', {
                  required: 'Debes ingresar tu edad*',
                })}
              />
              {errors.edad && (
                <p className='pl-2 text-red-500 text-sm mt-1'>
                  {errors.edad.message}
                </p>
              )}
            </div>

            <div className='flex justify-center'>
              <button
                className='px-2 py-1 font-bold text-white bg-pink-400 rounded-2xl'
                onClick={handleSubmit}
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalAssistence;
