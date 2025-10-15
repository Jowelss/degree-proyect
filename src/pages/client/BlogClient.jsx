import { useState, useEffect } from 'react';

import { Get } from '../../services/Get';

function Blog() {
  const [post, setPost] = useState([]);

  const getDataPost = async () => {
    const data = await Get('posts');

    if (data) {
      setPost(data);
    } else {
      console.log('Algo salio mal wachin');
    }
  };

  useEffect(() => {
    getDataPost();
  }, []);

  return (
    <>
      <div className='grid grid-flow-col auto-cols-fr gap-5'>
        {post.map((item) => (
          <ul className='border p-2 rounded-2xl' key={item._id}>
            <li className='uppercase text-3xl font-bold mb-2'>{item.titulo}</li>
            <li className='text-xs uppercase font-bold'>{item.tipo}</li>
            <li className=' text-lg break-words mb-8'>{item.mensaje}</li>

            <div className='h-80 flex justify-center bg-fuchsia-300'>
              <img
                className='object-contain h-full'
                src={item.imagen}
                alt='post'
              />
            </div>
          </ul>
        ))}
      </div>
    </>
  );
}

export default Blog;
