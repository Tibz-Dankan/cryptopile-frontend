import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { HouseFill, PersonCircle } from "react-bootstrap-icons";
import "./SideBar.css";

const SideBar = () => {
  return (
    <Fragment>
      <div className="side-bar-wrapper">
        <div className="side-bar-links-wrapper">
          <div className="side-bar-link">
            <HouseFill />
            <Link to="/">Home</Link>
          </div>
          <div className="side-bar-profile">
            <PersonCircle />
            {/* <Link to="">Profile</Link> */}
            <p>Profile</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SideBar;
