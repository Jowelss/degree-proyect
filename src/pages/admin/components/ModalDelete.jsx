export default function ModalDelete() {
  return (
    <div className='border p-4 rounded-2xl bg-white'>
      <h2>¿Estas seguro que quieres eliminar este producto?</h2>

      <div className='mt-3 flex justify-center gap-2'>
        <button
          className='px-2 py-1 bg-pink-400 text-white rounded-2xl'
          onClick={() => {
            Delete(selectId, setPosts, posts, 'posts');
            handleClickDelete();
          }}
        >
          Confirmar
        </button>
        <button
          className='px-2 py-1 bg-gray-100 rounded-2xl'
          onClick={handleClickDelete}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
