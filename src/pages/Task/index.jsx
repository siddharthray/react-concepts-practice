import React from "react";
import styles from "./Task.module.css";
import TaskList from "../../features/todo/taskList";
import TodoForm from "../../features/todo/todoForm";

export default function Tasks({
  onAddTask,
  editingTask = null,
  onSaveEdit = null,
  openTasks,
  doneTasks,
  onDelete,
  onToggle,
  onEdit,
}) {
  return (
    <div className={styles.container}>
      {/* Row 1: title + description */}
      <div className={styles.title}>
        <h1>Task Tracker</h1>
        <p>
          Keep track of your tasks: add new ones, mark them done, or reopen.
        </p>
      </div>

      {/* Row 2: form */}
      <div className={styles.todoForm}>
        <TodoForm
          onAddTask={onAddTask}
          editingTask={editingTask}
          onSaveEdit={onSaveEdit}
        />
      </div>
      <TaskList
        openTasks={openTasks}
        doneTasks={doneTasks}
        onDelete={onDelete}
        onToggle={onToggle}
        onEdit={onEdit}
      />
    </div>
  );
}
