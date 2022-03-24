import React from "react";
import { NavLink } from "react-router-dom";
import "./../App.css";

const LoginLink = () => {
  return (
    <div>
      <nav>
        <NavLink to="/login" className="navigation-link">
          login
        </NavLink>
      </nav>
    </div>
  );
};

export default LoginLink;
