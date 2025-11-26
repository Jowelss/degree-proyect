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
    <div className='my-11 grid grid-cols-[repeat(auto-fit,minmax(200px,1000px))] justify-center gap-5'>
      {post.map((item) => (
        <ul className='bg-white rounded-2xl overflow-hidden' key={item._id}>
          <div className='p-3'>
            <li className='uppercase text-3xl font-bold'>{item.titulo}</li>
            <li className='text-[16px] uppercase font-bold text-pink-400'>
              {item.tipo}
            </li>
            <li className='break-words'>{item.mensaje}</li>
          </div>

          <div className='h-100 flex justify-center bg-fuchsia-300'>
            <img
              className='object-cover h-full w-full'
              src={item.imagen}
              alt='post'
            />
          </div>
        </ul>
      ))}
    </div>
  );
}

export default Blog;
