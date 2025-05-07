import React from "react";
import TextArea from "../../../components/Elements/TextArea";
import styles from "./TaskDetails.module.css";

export default function TaskDetails({ task, onChange, onSave, children }) {
  const [isEditing, setIsEditing] = React.useState(false);

  const onEditClick = () => {
    setIsEditing(!isEditing);
    console.log("Editing task", task);
    console.log("isEditing", isEditing);
  };
  return (
    <div className={styles.detailsWrapper}>
      <div className={styles.childrenContainer}>{children}</div>

      <div className={styles.taskInfo}>
        <div className={styles.taskInfoHeader}>
          <div className={styles.taskInfoTitle}>
            <p>
              <strong>Task ID:</strong> {task.id || "No ID"}
            </p>
            <p>
              <strong>Task Name:</strong> {task.name || "Unnamed Task"}
            </p>
          </div>
          <div className={styles.timeStamp}>
            <p>
              <strong>Created At:</strong>{" "}
              {task.created_at
                ? new Date(task.created_at).toLocaleString()
                : "NA"}
            </p>
            <p>
              <strong>Updated At:</strong>{" "}
              {task.updated_at
                ? new Date(task.updated_at).toLocaleString()
                : "NA"}
            </p>
          </div>
        </div>

        <TextArea
          placeholder="Enter task details..."
          value={task.text || ""}
          rows={2}
          maxRows={8}
          onChange={onChange}
          disabled={!isEditing}
          readOnly={!isEditing}
        />
      </div>
      <div className={`${styles.btnActions}`}>
        <button className={styles.EditBtn} onClick={onEditClick}>
          Edit
        </button>
        <button
          type="submit"
          className={`${!isEditing ? styles.disabled : styles.saveBtn}`}
          onClick={() => onSave(task)}
          disabled={!isEditing}
        >
          Save Task
        </button>
      </div>
    </div>
  );
}
