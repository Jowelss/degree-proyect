const ProductCard = ({ item, onClick }) => {
  const isOutOfStock = item.estado !== 'Disponible';

  return (
    <div className='relative rounded-2xl overflow-hidden bg-white font-medium'>
      {isOutOfStock && (
        <div className='flex items-center justify-center absolute inset-0 bg-black/80 z-10 text-white'>
          <span className='font-medium'>AGOTADO</span>
        </div>
      )}

      <ul
        className='cursor-pointer'
        onClick={() => (isOutOfStock ? null : onClick(item))}
      >
        <div className='flex justify-center w-full h-60 bg-fuchsia-300'>
          <img
            className='object-cover h-full w-full'
            src={item.imagen}
            alt='Imagen'
          />
        </div>

        <div className='p-2'>
          <span>
            {item.nombre} - {item.autor}
          </span>

          <span className='block'>{item.precio}bs</span>

          <span className='block'>{item.cantidad} disponibles</span>
        </div>
      </ul>
    </div>
  );
};

export default ProductCard;
