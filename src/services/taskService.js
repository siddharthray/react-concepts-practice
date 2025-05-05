// src/services/taskService.js
import axios from "axios";
const { API_URL } = import.meta.env;

const api = axios.create({
  baseURL: API_URL || "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

// Fetch all tasks (GET /tasks)
export function fetchTasks() {
  return api.get("/tasks").then((res) => res.data);
}

// Create a new task (POST /tasks)
export function createTask(text) {
  return api.post("/tasks", { text }).then((res) => res.data);
}

// Delete a task (DELETE /tasks/:id)
export function deleteTask(id) {
  return api.delete(`/tasks/${id}`);
}

// Update a task (PUT /tasks/:id)
export function updateTask(id, updates) {
  return api.put(`/tasks/${id}`, updates).then((res) => res.data);
}
