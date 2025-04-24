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
  const handleToggle = useCallback((id) => {
    setTask((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;

        // flipping from open → completed
        if (!t.completed) {
          return {
            ...t,
            completed: true,
            completedAt: new Date().toISOString(),
            reopenedAt: null,
          };
        }

        // flipping from completed → open
        return {
          ...t,
          completed: false,
          reopenedAt: new Date().toISOString(),
          completedAt: null,
        };
      })
    );
  }, []);
  const openTasks = task.filter((t) => !t.completed);
  const doneTasks = task.filter((t) => t.completed);

  return (
    <div>
      <div className="todo-container">
        <div className="todo-column">
          <h2>Open Tasks</h2>
          <TodoForm onAddTask={handleAddTask} />
          <TodoList
            items={openTasks}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        </div>

        <div className="todo-column">
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
