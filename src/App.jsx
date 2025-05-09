import React, { useState } from "react";
import "./App.css";
import AppLayout from "./components/Layout/AppLayout";
import NavBar from "./components/Layout/NavBar";
import Sidebar from "./components/Layout/SideBar";
import Home from "./pages/Home";
import { Routes, Route, Navigate, Outlet } from "react-router";
import TaskDetailsPage from "./pages/TaskDetailsPage";
import OpenTasksPage from "./pages/OpenTasksList";
import CompletedTasksPage from "./pages/CompletedTasksList";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
    console.log("toggleSidebar", !sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    console.log("Closing sidebar");
  };

  const toggleCollapsed = () => {
    setSidebarCollapsed((prev) => !prev);
  };
  return (
    <div className="app">
      <NavBar onMenuClick={toggleSidebar} />
      <AppLayout
        sidebar={sidebarOpen ? <Sidebar onClose={closeSidebar} /> : null}
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebar={toggleCollapsed}
      >
        <Routes>
          {/* Redirect root → /tasks */}
          <Route path="/" element={<Navigate to="/tasks" replace />} />

          <Route path="tasks/*" element={<Outlet />}>
            <Route index element={<Home />} />
            <Route path="openTasks" element={<OpenTasksPage />} />
            <Route path="completedTasks" element={<CompletedTasksPage />} />
            <Route path=":id" element={<TaskDetailsPage />} />
          </Route>
          <Route path="*" element={<h2>404: Not Found</h2>} />
        </Routes>
      </AppLayout>
    </div>
  );
}

export default App;
