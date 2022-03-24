import React from "react";
import { NavLink } from "react-router-dom";
import "./../App.css";

const SignupLink = () => {
  return (
    <div>
      <nav>
        <NavLink to="/signup" className="navigation-link">
          signup
        </NavLink>
      </nav>
    </div>
  );
};

export default SignupLink;
