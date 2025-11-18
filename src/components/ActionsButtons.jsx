export default function ActionsButtons({
  item,
  onDelete,
  onEdit,
  onModalDelete,
}) {
  return (
    <div className='flex gap-2'>
      <button
        onClick={() => {
          onDelete(item._id);
          onModalDelete();
        }}
      >
        Eliminar
      </button>

      <button
        onClick={() => {
          onEdit(item);
        }}
      >
        Actualizar
      </button>
    </div>
  );
}
