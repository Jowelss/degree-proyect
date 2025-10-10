export default function ActionsButtons({
  item,
  onDelete,
  onEdit,
  onModalDelete,
}) {
  return (
    <div>
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
