const ProductCard = ({ item, onClick }) => {
  const isOutOfStock = item.estado !== 'Disponible';

  return (
    <div className='relative rounded-2xl overflow-hidden bg-[#e2e2e2]'>
      {isOutOfStock && (
        <div className='flex items-center justify-center absolute inset-0 bg-black/80 z-10 text-white'>
          <span>AGOTADO</span>
        </div>
      )}
      <ul
        className='cursor-pointer'
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
