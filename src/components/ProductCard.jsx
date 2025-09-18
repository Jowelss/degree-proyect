const ProductCard = ({ item, onClick }) => {
  const isOutOfStock = item.estado !== 'Disponible';

  return (
    <div className='relative z-0'>
      {isOutOfStock && (
        <div className='absolute inset-0  bg-black/80 z-10 flex items-center justify-center text-white'>
          <span>AGOTADO</span>
        </div>
      )}
      <ul
        className='border w-70 cursor-pointer'
        onClick={() => (isOutOfStock ? null : onClick(item))}
      >
        <div className='flex justify-center w-full h-60 mb-1 bg-fuchsia-300'>
          <img
            className='object-contain h-full'
            src={item.imagen}
            alt='Imagen'
          />
        </div>
        <li>{item.nombre}</li>
        <li>{item.precio}bs</li>
        <li>{item.cantidad} disponibles</li>
      </ul>
    </div>
  );
};

export default ProductCard;
