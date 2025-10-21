const ProductCard = ({ item, onClick }) => {
  const isOutOfStock = item.estado !== 'Disponible';

  return (
    <div className='relative z-0'>
      {isOutOfStock && (
        <div className='absolute inset-0 bg-black/80 z-10 flex items-center justify-center text-white'>
          <span>AGOTADO</span>
        </div>
      )}
      <ul
        className='rounded-3xl overflow-hidden cursor-pointer'
        onClick={() => (isOutOfStock ? null : onClick(item))}
      >
        <div className='flex justify-center w-full h-60 mb-1 bg-fuchsia-300'>
          <img
            className='object-cover h-full w-full'
            src={item.imagen}
            alt='Imagen'
          />
        </div>

        <div>
          <div className='flex justify-between'>
            <li>{item.nombre}</li>
            <li>{item.precio}bs</li>
          </div>
          <li className='text-center'>{item.cantidad} disponibles</li>
        </div>
      </ul>
    </div>
  );
};

export default ProductCard;
