import React from "react";
import { NavLink } from "react-router-dom";
import "./../App.css";

const HomeLink = () => {
  // remember to delete the-home-link in the css file
  return (
    <div>
      <nav>
        <NavLink to="/" className="navigation-link">
          Home
        </NavLink>
      </nav>
    </div>
  );
};

export default HomeLink;
