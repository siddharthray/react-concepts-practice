import { useState } from "react";

export default function TodoForm({ onAddTask }) {
  const intialTask = {
    id: null,
    text: "",
    completed: false,
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
    };
    onAddTask(newTask);
    setTask(newTask);
  };

  return (
    <form onSubmit={addTask}>
      <input
        type="text"
        value={task.text}
        onChange={handleChange}
        placeholder="Enter new task"
      />
      <button type="submit" disabled={!task.text.trim()}>
        Add Task
      </button>
    </form>
  );
}
