export default function TodoItem({ item, onDelete, onToggle }) {
  return (
    <li className="todo-item" key={item.id}>
      <div>
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() => onToggle(item.id)}
        />
        <span
          style={{ textDecoration: item.completed ? "line-through" : "none" }}
        >
          {item.text}
        </span>
      </div>
      <button onClick={() => onDelete(item.id)}>Delete</button>
      {/* <button onClick={() => onEdit(item.id)}>Edit</button> */}
    </li>
  );
}
