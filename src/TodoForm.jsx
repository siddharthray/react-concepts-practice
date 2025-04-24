import { useState } from "react";
import styles from "./TodoForm.module.css";

export default function TodoForm({ onAddTask }) {
  const intialTask = {
    id: null,
    text: "",
    completed: false,
    createdAt: null,
    completedAt: null,
    reopenedAt: null,
  };
  const [task, setTask] = useState(intialTask);

  // Handle the change in the input field
  const handleChange = (e) => {
    setTask({
      ...task,
      text: e.target.value,
    });
  };

  // Create and send new task to parent component
  const addTask = (e) => {
    e.preventDefault();
    // Check if the task is empty
    if (!task.text.trim()) return;
    const newTask = {
      id: Math.floor(Math.random() * 1000),
      text: task.text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
      reopenedAt: null,
    };
    onAddTask(newTask);
    setTask(intialTask);
  };

  return (
    <form onSubmit={addTask} className={styles["todo-form-container"]}>
      <input
        type="text"
        value={task.text}
        onChange={handleChange}
        placeholder="Enter new task"
        className={styles["todo-input"]}
        autoFocus
      />
      <button
        type="submit"
        disabled={!task.text.trim()}
        className={styles["add-task-button"]}
      >
        Add Task
      </button>
    </form>
  );
}
