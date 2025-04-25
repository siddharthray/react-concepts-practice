import React from "react";
import { NavLink } from "react-router";
import navStyles from "./navbar.module.css";

export default function NavBar() {
  return (
    <nav className={navStyles.navbar}>
      <div className={navStyles.logo}>Task Tracker</div>
      <ul className={navStyles.navbarLink}>
        <li>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? navStyles.activeLink : navStyles.navbarLink
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/openTasks"
            className={({ isActive }) =>
              isActive ? navStyles.activeLink : navStyles.navbarLink
            }
          >
            Open Task
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/completedTasks"
            className={({ isActive }) =>
              isActive ? navStyles.activeLink : navStyles.navbarLink
            }
          >
            Completed Task
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
