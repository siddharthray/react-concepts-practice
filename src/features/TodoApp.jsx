import { useState, useEffect, useCallback } from "react";
import Tasks from "../pages/Task";

import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";
import { useSaveEdit } from "../hooks/useSaveEdit";
import { useLocation } from "react-router";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const openTasks = tasks ? tasks.filter((t) => !t?.completed) : [];
  const doneTasks = tasks ? tasks.filter((t) => t?.completed) : [];

  // Persist on every change
  useEffect(() => {
    (async () => {
      try {
        const response = await fetchTasks();
        setTasks(response);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    })();
  }, []);

  // Add new
  const handleAddTask = useCallback(async (newTask) => {
    try {
      const created = await createTask(newTask);
      setTasks((prev) => [...prev, created]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }, []);

  // Delete
  const handleDelete = useCallback(async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }, []);

  // Toggle complete ↔ reopen (with timestamps)
  const handleToggle = useCallback(
    async (id) => {
      const task = tasks.find((t) => t.id === id);
      if (!task) return;

      const updates = {
        completed: !task.completed,
      };

      try {
        const updatedTask = await updateTask(id, updates);

        setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));
      } catch (err) {
        console.error("Toggle failed:", err);
        alert("Could not toggle task status");
      }
    },
    [tasks]
  );

  // Start editing: load the task into the form
  const handleEditStart = useCallback((task) => {
    setEditingTask(task);
  }, []);

  const handleSaveEdit = useSaveEdit(setTasks, setEditingTask);

  return (
    <>
      <Tasks
        onAddTask={handleAddTask}
        editingTask={editingTask}
        openTasks={openTasks}
        doneTasks={doneTasks}
        onDelete={handleDelete}
        onToggle={handleToggle}
        onSaveEdit={handleSaveEdit}
        onEdit={handleEditStart}
        title="Task Tracker"
        description="Keep track of your tasks: add new ones, mark them done, or reopen."
      />
    </>
  );
}
