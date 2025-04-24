import { useState, useEffect, useCallback } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import styles from "./TodoApp.module.css";

export default function TodoApp() {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });
  const [editingTask, setEditingTask] = useState(null);

  // Persist on every change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add new
  const handleAddTask = useCallback((newTask) => {
    setTasks((prev) => [...prev, newTask]);
  }, []);

  // Delete
  const handleDelete = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Toggle complete ↔ reopen (with timestamps)
  const handleToggle = useCallback((id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              completed: !t.completed,
              completedAt: !t.completed ? new Date().toISOString() : null,
              reopenedAt: t.completed ? new Date().toISOString() : null,
            }
          : t
      )
    );
  }, []);

  // Start editing: load the task into the form
  const handleEditStart = useCallback((task) => {
    setEditingTask(task);
  }, []);

  // Save edited text, then clear edit mode
  const handleSaveEdit = useCallback((id, newText) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );
    setEditingTask(null);
  }, []);

  const openTasks = tasks.filter((t) => !t.completed);
  const doneTasks = tasks.filter((t) => t.completed);

  return (
    <div className={styles.container}>
      {/* Row 1: title + description */}
      <div className={styles.title}>
        <h1>Todo App</h1>
        <p>
          Keep track of your tasks: add new ones, mark them done, or reopen.
        </p>
      </div>

      {/* Row 2: form */}
      <div className={styles.todoForm}>
        <TodoForm
          onAddTask={handleAddTask}
          editingTask={editingTask}
          onSaveEdit={handleSaveEdit}
        />
      </div>

      {/* Row 3: two columns */}
      <div className={`${styles.row} ${styles.thirdRow}`}>
        <div className={`${styles.column} ${styles.openTasks}`}>
          <h2>Open Tasks</h2>
          <TodoList
            items={openTasks}
            onDelete={handleDelete}
            onToggle={handleToggle}
            onEdit={handleEditStart}
          />
        </div>

        <div className={`${styles.column} ${styles.completedTasks}`}>
          <h2>Completed Tasks</h2>
          <TodoList
            items={doneTasks}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        </div>
      </div>
    </div>
  );
}
