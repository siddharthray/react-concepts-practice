// pages/OpenTasksPage.tsx
import React from "react";
import CompletedTasksList from "./CompletedTasksPage.module.css";
import TodoList from "../../components/todo/todoList";

export default function CompletedTasksPage({ doneTasks, onDelete, onToggle }) {
  // const doneTasks = tasks.filter((t) => t?.completed);

  return (
    <div
      className={`${CompletedTasksList.column} ${CompletedTasksList.completedTasks}`}
    >
      <h2>Completed Tasks</h2>
      <TodoList items={doneTasks} onDelete={onDelete} onToggle={onToggle} />
    </div>
  );
}
