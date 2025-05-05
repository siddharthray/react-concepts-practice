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

      const now = new Date().toISOString();
      const isReopening = task.completed;

      const updates = {
        completed: !task.completed,
        ...(isReopening ? { reopenedAt: now } : {}),
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

  // Save edited text, then clear edit mode
  // const handleSaveEdit = useCallback((id, newText, updatedAt) => {
  //   setTasks((prev) =>
  //     prev.map((t) =>
  //       t.id === id ? { ...t, text: newText, updatedAt: updatedAt } : t
  //     )
  //   );
  //   setEditingTask(null);
  // }, []);

  const handleSaveEdit = useCallback(async (id, newText) => {
    try {
      // only send the text; server sets updatedAt
      const updated = await updateTask(id, { text: newText });
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
      setEditing(null);
    } catch (err) {
      console.error("Edit failed:", err);
    }
  }, []);

  return (
    <Routes>
      {/* Redirect root → /tasks */}
      <Route path="/" element={<Navigate to="/tasks" replace />} />
      {/* List view */}
      <Route
        path="tasks"
        element={
          <Tasks
            onAddTask={handleAddTask}
            editingTask={editingTask}
            onSaveEdit={handleSaveEdit}
            openTasks={openTasks}
            doneTasks={doneTasks}
            onDelete={handleDelete}
            onToggle={handleToggle}
            onEdit={handleEditStart}
            title="Task Tracker"
            description="Keep track of your tasks: add new ones, mark them done, or reopen."
          />
        }
      />
      <Route
        path="/task/:id"
        element={<TaskDetailsPage allTasks={tasks} onSave={handleSaveEdit} />}
      />

      {/* Detail view with nested edit form */}
      {/* <Route
          path="tasks/:id"
          element={
            <TaskDetailPage
              task={tasks}
              onDelete={handleDelete}
              onToggle={handleToggle}
              onEdit={handleEditStart}
            />
          }
        > */}
      {/* nested route for editing */}
      {/* <Route
            path="edit"
            element={
              <TaskEditForm
                editingTask={editingTask}
                onAddTask={handleAddTask}
                onSaveEdit={handleSaveEdit}
              />
            }
          />
        </Route> */}

      {/* Fallback */}
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
      <Route path="*" element={<h2>404: Not Found</h2>} />
    </Routes>
  );
}
