import React from "react";
import { NavLink } from "react-router-dom";
import "./../App.css";

const Header = () => {
  return (
    <div>
      <nav>
        <header className="header-nav-links">
          <NavLink to="/addtodos" className="header-link">
            AddTodos
          </NavLink>
          <NavLink to="/seetodos" className="header-link">
            SeeTodos
          </NavLink>
          <NavLink to="/about" className="header-link">
            About
          </NavLink>
          <NavLink to="/signup" className="header-link">
            SignUp
          </NavLink>
          <NavLink to="/login" className="header-link">
            Login
          </NavLink>
        </header>
      </nav>
    </div>
  );
};

export default Header;
