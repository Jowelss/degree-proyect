import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

// Componentes
import { HeaderPanel } from '../../components/HeaderPanel';
import { Panel } from '../../components/Panel';
import { ModalForm } from '../../components/ModalForm';
import { ModalDelete } from '../../components/ModalDelete';
import { ItemCard } from '../../components/ItemCard';
import { DropImagen } from '../../components/DropImagen';
// end

// services
import { Add } from '../../services/Add';
import { Update } from '../../services/Update';
import { Get } from '../../services/Get';
import { Delete } from '../../services/Delete';
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
        <h1 className='text-4xl font-bold'>Blog</h1>

        <button
          onClick={() => {
            setSelectId(null);
            reset();
            handleClick();
            changeName('Publicar');
          }}
        >
          Publicar
        </button>
      </HeaderPanel>

      <ul className='flex flex-col gap-2 p-4'>
        {posts.map((post) => (
          <ItemCard key={post._id}>
            <div className='flex justify-center w-40 h-full'>
              <img
                className='object-contain h-full'
                src={post.imagen}
                alt='Imagen del producto'
              />
            </div>
            <span className='w-40'>{post.titulo}</span>
            <span className='w-40'>{post.mensaje}</span>
            <span className='w-40'>{post.tipo}</span>

            <div className='flex justify-center w-40 gap-1'>
              <button
                onClick={() => {
                  setSelectId(post._id);
                  handleClickDelete();
                }}
              >
                Eliminar
              </button>
              <button
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

          <div className='flex justify-center gap-2'>
            <button
              onClick={() => {
                Delete(selectId, setPosts, posts, 'posts');
                handleClickDelete();
              }}
            >
              Confirmar
            </button>
            <button onClick={handleClickDelete}>Cancelar</button>
          </div>
        </div>
      </ModalDelete>

      <ModalForm classState={state} onClosed={handleClick}>
        <div className='flex justify-between items-center mb-3'>
          <span className='text-4xl'>Nuevo Post</span>
          <button onClick={handleClick}>Cerrar</button>
        </div>
        <form onSubmit={onSubmit}>
          <div>
            <label>Titulo</label>
            <input type='text' {...register('titulo')} />
          </div>

          <div className='mb-1.5'>
            <label>Mensaje</label>
            <input type='text' {...register('mensaje')} />
          </div>

          <div className='flex gap-1.5'>
            <label>Tipo de publicacion</label>

            <select className='border' type='text' {...register('tipo')}>
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

          <div className='flex gap-1.5'>
            <label>Comentarios</label>
            <select className='border'>
              <option value='activado'>Activado</option>
              <option value='desactivado'>Desactivado</option>
            </select>
          </div>

          <div>
            <label>Imagen</label>
            <input {...register('imagen')} hidden />
            <DropImagen setValue={setValue}>
              {imagenURL && (
                <img
                  src={imagenURL}
                  alt='Imagen'
                  className='object-contain h-full'
                />
              )}
            </DropImagen>
          </div>
          <button onClick={handleClick} type='submit'>
            {isNombre}
          </button>
        </form>
      </ModalForm>
    </Panel>
  );
}

export default Blog;
