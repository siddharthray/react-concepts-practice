// pages/OpenTasksPage.tsx
import React from "react";
import TodoList from "../../components/todo/todoList";
import openTasksList from "./OpenTasksPage.module.css";

export default function OpenTasksPage({
  openTasks,
  onDelete,
  onToggle,
  onEdit,
}) {
  // const openTasks = tasks.filter((t) => !t?.completed);

  return (
    <div className={`${openTasksList.column} ${openTasksList.openTasks}`}>
      <h2>Open Tasks</h2>
      <TodoList
        items={openTasks}
        onDelete={onDelete}
        onToggle={onToggle}
        onEdit={onEdit}
      />
    </div>
  );
}
