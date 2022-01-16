import React from "react";
import { NavLink } from "react-router-dom";
import "./../../App.css";

const SeeTodosLink = () => {
  return (
    <div>
      <nav>
        <NavLink to="/seetodos" className="navigation-link">
          ViewPile
        </NavLink>
      </nav>
    </div>
  );
};

export default SeeTodosLink;
