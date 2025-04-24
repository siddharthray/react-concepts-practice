export default function TodoItem({ item, onDelete, onToggle }) {
  return (
    <li style={{ marginBottom: "0.5rem" }}>
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => onToggle(item.id)}
      />
      <span
        style={{
          marginLeft: "0.5rem",
          textDecoration: "none",
        }}
      >
        {item.text}
      </span>

      <button style={{ marginLeft: "1rem" }} onClick={() => onDelete(item.id)}>
        Delete
      </button>

      <div style={{ fontSize: "0.8rem", color: "#666", marginTop: "0.2rem" }}>
        Created: {new Date(item.createdAt).toLocaleString()}
        {item.completed && (
          <>
            <br />
            Completed: {new Date(item.completedAt).toLocaleString()}
          </>
        )}
        {!item.completed && item.reopenedAt && (
          <>
            <br />
            Reopened: {new Date(item.reopenedAt).toLocaleString()}
          </>
        )}
      </div>
    </li>
  );
}
