import { useState, useEffect } from 'react';

import { Get } from '../../services/Get';

function Blog() {
  const [post, setPost] = useState([]);

  const getDataPost = async () => {
    const data = await Get('posts');
    console.log(data);
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
      <div>
        {post.map((item) => (
          <ul key={item._id}>
            <div>
              <img src={item.imagen} alt='post' />
            </div>
            <li>{item.tipo}</li>
            <li>{item.titulo}</li>
            <li>{item.mensaje}</li>
          </ul>
        ))}
      </div>
    </>
  );
}

export default Blog;
