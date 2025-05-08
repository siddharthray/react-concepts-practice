import { useState, useEffect, useCallback } from "react";
import { Navigate, Route, Routes } from "react-router";
import Tasks from "../pages/Task";
import OpenTasksPage from "../pages/OpenTasksList";
import CompletedTasksPage from "../pages/CompletedTasksList";
import TaskDetailsPage from "../pages/TaskDetailsPage";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";
import { useSaveEdit } from "../hooks/useSaveEdit";

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
      {/* <Routes>
        <Route
          path="/openTasks"
          element={
            <OpenTasksPage
              openTasks={openTasks}
              onDelete={handleDelete}
              onToggle={handleToggle}
              onEdit={handleEditStart}
            />
          }
        />
        <Route
          path="/completedTasks"
          element={
            <CompletedTasksPage
              doneTasks={doneTasks}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          }
        />
      </Routes> */}
    </>
  );
}
