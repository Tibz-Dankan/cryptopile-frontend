import React from "react";
import { NavLink } from "react-router-dom";
import "./../../App.css";

const MypileLink = () => {
  return (
    <div>
      <nav>
        <NavLink to="/mypile" className="navigation-link">
          Add Pile
        </NavLink>
      </nav>
    </div>
  );
};

export default MypileLink;
