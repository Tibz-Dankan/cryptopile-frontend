import React from "react";
import { NavLink } from "react-router-dom";
import "./../../App.css";

const LogoutLink = () => {
  return (
    <div>
      <nav>
        <NavLink to="/logout" className="navigation-link">
          Logout
        </NavLink>
      </nav>
    </div>
  );
};

export default LogoutLink;
