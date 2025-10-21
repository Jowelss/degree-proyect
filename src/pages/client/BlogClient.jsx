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
    <div className='flex flex-col gap-5 mx-[100px]'>
      {post.map((item) => (
        <ul key={item._id}>
          <div className='p-3'>
            <li className='uppercase text-3xl font-bold mb-2'>{item.titulo}</li>
            <li className='text-xs uppercase font-bold'>{item.tipo}</li>
            <li className=' text-lg break-words'>{item.mensaje}</li>
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
