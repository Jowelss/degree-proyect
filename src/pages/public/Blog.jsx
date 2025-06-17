import { useState } from 'react';
import { useForm } from 'react-hook-form';

// Componentes
import { HeaderPanel } from '../../components/HeaderPanel';
import { Panel } from '../../components/Panel';
import { ModalForm } from '../../components/ModalForm';
// end

// services
import { Add } from '../../services/Add';
// end

function Blog() {
  // Abrir y cerrar modal
  const [isOpen, setIsOpen] = useState(false);
  const state = isOpen ? 'block' : 'hidden';

  const handleClick = () => setIsOpen(!isOpen);
  // end

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    await Add(data, 'posts');
    reset();
  });

  return (
    <Panel>
      <HeaderPanel>
        <h1 className='text-4xl font-bold'>Blog</h1>

        <button onClick={handleClick}>Publicar</button>
      </HeaderPanel>

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

          <div>
            <label>Mensaje</label>
            <input type='text' {...register('mensaje')} />
          </div>

          <div>
            <label>Tipo de publicacion</label>

            <select type='text' {...register('tipo')}>
              <option value='Ninguno'>Ninguno</option>
              <option value='Crecimiento personal y emocional'>
                Crecimiento personal y emocional
              </option>
              <option value='Reflexion y frases'>Reflexiones y frases</option>
              <option value='Mujer autentica y emprendedora'>
                Mujer autentica y emprendedora
              </option>
              <option value='Duelo animal, vinculo ser humano y animal'>
                Duelo animal, vinculo ser humano y animal
              </option>
              <option value='Espacio para adolescentes'>
                Espacio para adolescentes
              </option>
            </select>
          </div>

          <div>
            <label>Imagen</label>
            <input type='text' {...register('imagen')} />
          </div>

          <button type='submit'>Publicar</button>
        </form>
      </ModalForm>
    </Panel>
  );
}

export default Blog;
