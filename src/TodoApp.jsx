// src/components/TodoApp.jsx
import { useState, useEffect, useCallback } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import styles from "./TodoApp.module.css";

export default function TodoApp() {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = useCallback((newTask) => {
    setTasks((prev) => [...prev, newTask]);
  }, []);

  const handleDelete = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleToggle = useCallback((id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              completed: !t.completed,
              completedAt: t.completed ? null : new Date().toISOString(),
              reopenedAt: t.completed ? new Date().toISOString() : null,
            }
          : t
      )
    );
  }, []);

  const openTasks = tasks.filter((t) => !t.completed);
  const doneTasks = tasks.filter((t) => t.completed);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Todo App</h1>
        <p>
          Keep track of your tasks: add new ones, mark them done, or reopen.
        </p>
      </div>

      <div className={styles.todoForm}>
        <TodoForm onAddTask={handleAddTask} />
      </div>

      <div className={`${styles.row} ${styles.thirdRow}}`}>
        <div className={`${styles.column} ${styles.openTasks}`}>
          <h2>Open Tasks</h2>
          <TodoList
            items={openTasks}
            onDelete={handleDelete}
            onToggle={handleToggle}
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
