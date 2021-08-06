import React from "react";
import { NavLink } from "react-router-dom";
import "./../../App.css";

const ViewPileLink = () => {
  return (
    <div>
      <nav>
        <NavLink to="/viewmypile" className="navigation-link">
          View pile
        </NavLink>
      </nav>
    </div>
  );
};

export default ViewPileLink;
