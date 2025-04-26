import { useState } from "react";
import "./App.css";
import AppLayout from "./components/Layout/AppLayout";
import NavBar from "./components/Layout/NavBar";
import Sidebar from "./components/Layout/SideBar";
import TodoApp from "./features/TodoApp";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="app">
      <NavBar onMenuClick={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <div className={`main-content ${sidebarOpen ? "with-sidebar" : ""}`}>
        <AppLayout>
          <TodoApp />
        </AppLayout>
      </div>
    </div>
  );
}

export default App;
