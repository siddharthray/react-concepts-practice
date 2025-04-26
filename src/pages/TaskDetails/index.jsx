import React from "react";

export default function TaskDetails({ task }) {
  return (
    <div>
      <h2>Task Details</h2>
      <p>Title: {task.title}</p>
      <p>Description: {task.description}</p>
      <p>Due Date: {task.dueDate}</p>
      <p>Status: {task.completed ? "Completed" : "Open"}</p>
    </div>
  );
}
