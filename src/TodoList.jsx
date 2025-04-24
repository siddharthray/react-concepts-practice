import TodoItem from "./TodoItem";

// list all the todo Items
export default function TodoList({
  items = [],
  onDelete,
  onToggle,
  onEdit = null,
}) {
  if (items.length === 0) return <p>No tasks yet.</p>;
  return (
    <ul className="todo-list">
      {items.map((item) => (
        <TodoItem
          key={item.id}
          item={item}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
