import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

// Componentes
import { HeaderPanel } from '../../components/HeaderPanel.jsx';
import { Panel } from '../../components/Panel.jsx';
import { ItemCard } from '../../components/ItemCard.jsx';
import { DropImagen } from './components/DropImagen.jsx';
import { DataHeader } from '../../components/DataHeader.jsx';
import { TitlePanel } from './components/TitlePanel.jsx';
import { ModalItem } from './components/ModalItem.jsx';
// end

// services
import { Add } from '../../services/Add.jsx';
import Update from '../../services/Update.jsx';
import { Get } from '../../services/Get.jsx';
import Delete from '../../services/Delete.jsx';
// end

function Blog() {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [buttonTitle, setButtonTitle] = useState('');

  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const data = await Get('posts');
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const [selectId, setSelectId] = useState(null);

  const { register, handleSubmit, setValue, reset, watch } = useForm();

  const imagenURL = watch('imagen');

  const onSubmit = handleSubmit(async (data) => {
    if (selectId) {
      await Update(selectId, 'posts', data);
    } else {
      await Add(data, 'posts');
    }

    reset();
    setOpen(false);

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
        <TitlePanel title={'BLOG'} />

        <button
          className='py-1 px-2 rounded-2xl bg-pink-400 text-white'
          onClick={() => {
            setSelectId(null);
            setOpen(true);
            reset();
            setTitle('Nuevo Post');
            setButtonTitle('Agregar');
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
              <Delete
                id={post._id}
                setItem={setPosts}
                name={'posts'}
                item={posts}
              >
                <h2>
                  ¿ Estas seguro que quieres eliminar este{' '}
                  <b className='text-pink-400'>POST</b> ?
                </h2>
              </Delete>

              <button
                className='px-2 py-1 bg-pink-400 text-white rounded-2xl'
                onClick={() => {
                  handleEdit(post);
                  setOpen(true);
                  setButtonTitle('Actualizar');
                  setTitle('Actualizar post');
                }}
              >
                Actualizar
              </button>
            </div>
          </ItemCard>
        ))}
      </ul>

      {open && (
        <ModalItem onClose={setOpen} title={title}>
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
                  type='submit'
                >
                  {buttonTitle}
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
        </ModalItem>
      )}
    </Panel>
  );
}

export default Blog;
