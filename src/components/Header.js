import React from "react";
import { NavLink } from "react-router-dom";
import "./../App.css";

const Header = () => {
  return (
    <div>
      <nav>
        <div className="header-nav-links">
          <NavLink to="/mypile" className="header-link">
            MyPile
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
          {/* <NavLink to="/logout" className="header-link">
            Logout
          </NavLink> */}
        </div>
      </nav>
    </div>
  );
};

export default Header;
