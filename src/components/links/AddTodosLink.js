import React from "react";
import { NavLink } from "react-router-dom";
import "./../../App.css";

const AddTodosLink = () => {
  return (
    <div>
      <nav>
        <NavLink to="/addtodos" className="navigation-link">
          AddTodos
        </NavLink>
      </nav>
    </div>
  );
};

export default AddTodosLink;
