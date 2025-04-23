import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useEffect, useState, useCallback } from "react";

export default function TodoApp() {
  //Initialize with whatever is in localStorage (or empty array)
  const [task, setTask] = useState(() => {
    const storedTasks = localStorage.getItem("task");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  //Whenever `tasks` changes, persist it to localStorage
  // This is a side effect, so we use useEffect
  // This will run after every renderand after every change to `tasks`
  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(task));
  }, [task]);

  // Create a callback for adding a new task
  const handleAddTask = useCallback((newTask) => {
    setTask((prev) => [...prev, newTask]);
  }, []);

  // And one for deleting
  const handleDelete = useCallback((id) => {
    setTask((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // And one for toggling completed task status
  const handleToggle = (id) => {
    setTask((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <div>
      <h1 className="todo-app-title">Todo App</h1>
      <p className="todo-app-description">Manage your tasks efficiently!</p>
      {/* *Pass the add-callback into the form */}
      <TodoForm onAddTask={handleAddTask} />
      <TodoList items={task} onDelete={handleDelete} onToggle={handleToggle} />
    </div>
  );
}
