import styles from "./TodoItem.module.css";

export default function TodoItem({ item, onDelete, onToggle, onEdit }) {
  return (
    <li className={styles.todoItem}>
      {/* Row 1: checkbox + text, with actions on the right */}
      <div className={styles.content}>
        <div className={styles.left}>
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => onToggle(item.id)}
          />
          <span className={styles.todoText}>{item.text}</span>
        </div>
        <div className={styles.actions}>
          {!item.completed && onEdit && (
            <button
              className={`${styles.button} ${styles.editButton}`}
              onClick={() => onEdit(item)}
            >
              Edit
            </button>
          )}
          <button
            className={`${styles.button} ${styles.deleteButton}`}
            onClick={() => onDelete(item.id)}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Row 2: timestamps below */}
      <div className={styles.timestamps}>
        <div className={styles.timestamp}>
          <span className={styles.timestampLabel}>Created:</span>
          <span className={styles.timestampValue}>
            {new Date(item.createdAt).toLocaleString()}
          </span>
        </div>

        {item.completed && (
          <div className={styles.timestamp}>
            <span className={styles.timestampLabel}>Completed:</span>
            <span className={styles.timestampValue}>
              {new Date(item.completedAt).toLocaleString()}
            </span>
          </div>
        )}

        {!item.completed && item.reopenedAt && (
          <div className={styles.timestamp}>
            <span className={styles.timestampLabel}>Reopened:</span>
            <span className={styles.timestampValue}>
              {new Date(item.reopenedAt).toLocaleString()}
            </span>
          </div>
        )}
      </div>
    </li>
  );
}
