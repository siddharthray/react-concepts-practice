// pages/TaskDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import TaskDetails from "../../features/todo/TaskDetails";
import { fetchTaskById, updateTask } from "../../services/taskService";

export default function TaskDetailsPage() {
  const { id: idParam } = useParams();
  const id = parseInt(idParam, 10);
  const location = useLocation();
  const navigate = useNavigate();
  // 1) try to get the passed-in task:
  const passedTask = location.state?.task;
  const [task, setTask] = useState(passedTask || null);
  const [isLoading, setLoading] = useState(!passedTask);

  useEffect(() => {
    if (!passedTask) {
      setLoading(true);
      fetchTaskById(id)
        .then((task) => setTask(task))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [passedTask, id]);

  const handleChange = (e) => {
    setTask((prev) => ({
      ...prev,
      text: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateTask(id, { text: task.text });
      navigate(-1);
    } catch (err) {
      console.error("Failed to save detail:", err);
      alert("Could not save changes");
    }
  };

  if (isLoading) return <div>Loading…</div>;
  if (!task)
    return (
      <div>
        <p>Task not found.</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );

  return (
    <TaskDetails task={task} onChange={handleChange} onSave={handleSave}>
      <button onClick={() => navigate(-1)}>Go Back</button>
      <p>Make sure to review the task details before proceeding.</p>
    </TaskDetails>
  );
}
