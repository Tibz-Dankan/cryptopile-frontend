import React from "react";
import { NavLink } from "react-router-dom";
import "./../../App.css";

const LogoutLink = () => {
  return (
    <div className="logout-header-link">
      <NavLink to="/Logout" className="navigation-link">
        Logout
      </NavLink>
    </div>
  );
};

export default LogoutLink;
