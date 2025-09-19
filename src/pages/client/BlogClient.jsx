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
      <div className='flex'>
        {post.map((item) => (
          <ul className='border' key={item._id}>
            <li>{item.tipo}</li>
            <li>{item.titulo}</li>
            <li>{item.mensaje}</li>

            <div className='h-80'>
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
