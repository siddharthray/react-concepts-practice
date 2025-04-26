import React, { useEffect } from "react";
import { NavLink } from "react-router";
import styles from "./Sidebar.module.css";

export default function Sidebar({ isOpen, onClose }) {
  // Close sidebar when clicking outside of it
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (event.target.closest(`.${styles.sidebar}`) === null) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div
          className={`${styles.overlay} ${isOpen ? styles.visible : ""}`}
          onClick={onClose}
        ></div>
      )}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.sidebarHeader}>
          <h3>Task Tracker</h3>
          <button
            className={styles.closeButton}
            onClick={() => {
              console.log("Close button clicked");
              onClose();
            }}
            type="button"
          >
            &times;
          </button>
        </div>

        <div className={styles.sidebarContent}>
          <nav>
            <ul className={styles.sidebarNav}>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive ? styles.activeLink : ""
                  }
                >
                  <span className={styles.icon}>📊</span>
                  <span className={styles.label}>Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    isActive ? styles.activeLink : ""
                  }
                >
                  <span className={styles.icon}>🏠</span>
                  <span className={styles.label}>Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/openTasks"
                  className={({ isActive }) =>
                    isActive ? styles.activeLink : ""
                  }
                >
                  <span className={styles.icon}>📝</span>
                  <span className={styles.label}>Open Tasks</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/completedTasks"
                  className={({ isActive }) =>
                    isActive ? styles.activeLink : ""
                  }
                >
                  <span className={styles.icon}>✅</span>
                  <span className={styles.label}>Completed Tasks</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    isActive ? styles.activeLink : ""
                  }
                >
                  <span className={styles.icon}>⚙️</span>
                  <span className={styles.label}>Settings</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.sidebarFooter}>
          <p>Task Tracker v1.0</p>
        </div>
      </aside>
    </>
  );
}
