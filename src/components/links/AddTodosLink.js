import React from "react";
import { NavLink } from "react-router-dom";
import "./../../App.css";

const AddPileLink = () => {
  return (
    <div>
      <nav>
        <NavLink to="/addpile" className="navigation-link">
          AddPile
        </NavLink>
      </nav>
    </div>
  );
};

export default AddPileLink;
