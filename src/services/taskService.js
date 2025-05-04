// src/services/taskService.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

// Fetch all tasks (GET /tasks)
export function fetchTasks() {
  return api.get("/tasks").then((res) => res.data);
}

// Create a new task (POST /tasks)
export function createTask(text) {
  return api.post("/tasks", { text }).then((res) => res.data); // assumes server returns { id: ..., ... }
}

// Delete a task (DELETE /tasks/:id)
export function deleteTask(id) {
  return api.delete(`/tasks/${id}`);
}
