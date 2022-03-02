import React from "react";
import { NavLink } from "react-router-dom";
import {
  FileTextFill,
  InfoCircle,
  BoxArrowInRight,
  PencilSquare,
} from "react-bootstrap-icons";
import "./../App.css";

const Header = () => {
  return (
    <div>
      <nav>
        <header className="header-nav-links">
          <NavLink to="/todos" className="header-link header-link-icon">
            <FileTextFill style={{ marginRight: "3px" }} />
            Todos
          </NavLink>
          <NavLink to="/about" className="header-link header-link-icon">
            <InfoCircle style={{ marginRight: "3px" }} />
            About
          </NavLink>
          <NavLink to="/login" className="header-link header-link-icon">
            <BoxArrowInRight style={{ marginRight: "3px" }} size={18.5} />
            Login
          </NavLink>
          <NavLink to="/signup" className="header-link header-link-icon">
            <PencilSquare style={{ marginRight: "3px" }} />
            SignUp
          </NavLink>
        </header>
      </nav>
    </div>
  );
};

export default Header;
