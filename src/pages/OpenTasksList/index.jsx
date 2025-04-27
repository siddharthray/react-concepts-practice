// pages/OpenTasksPage.tsx
import React from "react";
import TodoList from "../../features/todo/todoList";
import openTasksList from "./OpenTasksPage.module.css";

export default function OpenTasksPage({
  openTasks,
  onDelete,
  onToggle,
  onEdit,
}) {
  // const openTasks = tasks.filter((t) => !t?.completed);

  return (
    <div
      className={`${openTasksList.openTasksColumn} ${openTasksList.openTasks}`}
    >
      <h2 className={openTasksList.title}>Open Tasks</h2>
      <TodoList
        items={openTasks}
        onDelete={onDelete}
        onToggle={onToggle}
        onEdit={onEdit}
      />
    </div>
  );
}
