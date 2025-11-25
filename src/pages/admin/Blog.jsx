import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { IoClose, IoRemove, IoAdd } from 'react-icons/io5';

// Componentes
import { HeaderPanel } from '../../components/HeaderPanel.jsx';
import { Panel } from '../../components/Panel.jsx';
import { Modal } from '../../components/Modal.jsx';
import { ModalDelete } from '../../components/ModalDelete.jsx';
import { ItemCard } from '../../components/ItemCard.jsx';
import { DropImagen } from './components/DropImagen.jsx';
import { DataHeader } from '../../components/DataHeader.jsx';
// end

// services
import { Add } from '../../services/Add.jsx';
import { Update } from '../../services/Update.jsx';
import { Get } from '../../services/Get.jsx';
import { Delete } from '../../services/Delete.jsx';
// end

function Blog() {
  // Abrir y cerrar modal
  const [isOpen, setIsOpen] = useState(false);
  const state = isOpen ? 'block' : 'hidden';

  const handleClick = () => setIsOpen(!isOpen);
  // end

  const [isNombre, setIsNombre] = useState('');
  const changeName = (nombre) => setIsNombre(nombre);

  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const data = await Get('posts');

    if (data === undefined) {
      console.log('No funca pa');
    } else {
      setPosts(data);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const [selectId, setSelectId] = useState(null);

  const [openButtonDelete, setIsOpenButtonDelete] = useState(false);
  const stateButton = openButtonDelete ? 'block' : 'hidden';

  const handleClickDelete = () => setIsOpenButtonDelete(!openButtonDelete);

  const { register, handleSubmit, setValue, reset, watch } = useForm();

  const imagenURL = watch('imagen');

  const onSubmit = handleSubmit(async (data) => {
    if (selectId) {
      await Update(selectId, 'posts', data);
    } else {
      await Add(data, 'posts');
    }

    reset();

    fetchPosts();
  });

  const handleEdit = (post) => {
    setSelectId(post._id);

    Object.entries(post).forEach(([key, value]) => {
      if (key !== '_id') setValue(key, value);
    });
  };

  return (
    <Panel>
      <HeaderPanel>
        <h1 className='text-4xl font-bold'>BLOG</h1>

        <button
          className='py-1 px-2 rounded-2xl bg-pink-400 text-white'
          onClick={() => {
            setSelectId(null);
            reset();
            handleClick();
            changeName('Publicar');
          }}
        >
          + Nuevo Post
        </button>
      </HeaderPanel>

      <DataHeader>
        <li className='col-span-2 text-center'>Tipo</li>
      </DataHeader>

      <ul className='flex flex-col'>
        {posts.map((post, i) => (
          <ItemCard key={post._id}>
            <div className='flex items-center gap-2'>
              <span className='min-w-7 text-center'>{i}</span>

              <div className='w-14 h-14 bg-pink-400 rounded-2xl overflow-hidden'>
                <img
                  className='object-contain w-full h-full'
                  src={post.imagen}
                  alt='Imagen del producto'
                />
              </div>

              <span>{post.titulo}</span>
            </div>

            <span className='text-center'>{post.tipo}</span>

            <div className='flex justify-center gap-2'>
              <button
                className='px-2 py-1 bg-gray-100 rounded-2xl'
                onClick={() => {
                  setSelectId(post._id);
                  handleClickDelete();
                }}
              >
                Eliminar
              </button>

              <button
                className='px-2 py-1 bg-pink-400 text-white rounded-2xl'
                onClick={() => {
                  handleClick();
                  handleEdit(post);
                  changeName('Actualizar');
                }}
              >
                Actualizar
              </button>
            </div>
          </ItemCard>
        ))}
      </ul>

      <ModalDelete classState={stateButton}>
        <div className='border p-4 rounded-2xl bg-white'>
          <h2>¿Estas seguro que quieres eliminar este producto?</h2>

          <div className='mt-3 flex justify-center gap-2'>
            <button
              className='px-2 py-1 bg-pink-400 text-white rounded-2xl'
              onClick={() => {
                Delete(selectId, setPosts, posts, 'posts');
                handleClickDelete();
              }}
            >
              Confirmar
            </button>
            <button
              className='px-2 py-1 bg-gray-100 rounded-2xl'
              onClick={handleClickDelete}
            >
              Cancelar
            </button>
          </div>
        </div>
      </ModalDelete>

      <Modal classState={state} onClosed={handleClick}>
        <div className='flex justify-between items-center mb-3'>
          <span className='text-4xl'>Nuevo Post</span>

          <button onClick={handleClick}>
            <IoClose className='text-2xl bg-pink-400 rounded-full text-white' />
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <div className='w-[750px] flex gap-4'>
            <div className='min-w-80'>
              <div>
                <label className='pl-2'>Titulo</label>
                <input className='coso' type='text' {...register('titulo')} />
              </div>

              <div className='mt-2'>
                <label className='pl-2'>Mensaje</label>
                <textarea
                  className='coso resize-none w-full'
                  rows={6}
                  type='text'
                  {...register('mensaje')}
                />
              </div>

              <div>
                <label className='pl-2'>Tipo</label>

                <select className='coso' type='text' {...register('tipo')}>
                  <option value='eventos'>Eventos</option>
                  <option value='club de lectura'>Club de lectura</option>
                  <option value='puro amor'>Puro amor</option>
                  <option value='coaching'>Coaching</option>
                  <option value='vida autentica'>Vida autentica</option>
                  <option value='testimonios'>Testimonios</option>
                  <option value='noticias'>Noticias</option>
                  <option value='detras de escena'>Detras de escena</option>
                </select>
              </div>

              <button
                className='px-2 py-1 bg-pink-400 rounded-2xl text-white mt-2'
                onClick={handleClick}
                type='submit'
              >
                {isNombre}
              </button>
            </div>

            <div className='w-full'>
              <label className='pl-2'>Imagen</label>

              <input {...register('imagen')} hidden />
              <div className='w-full h-90'>
                <DropImagen setValue={setValue}>
                  {imagenURL && (
                    <img
                      className='object-contain h-full w-full'
                      src={imagenURL}
                      alt='Imagen del evento'
                    />
                  )}
                </DropImagen>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </Panel>
  );
}

export default Blog;
