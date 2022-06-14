import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { HouseFill, PersonCircle } from "react-bootstrap-icons";
import "./SideBar.css";

const SideBar = () => {
  return (
    <Fragment>
      <div className="side-bar-wrapper">
        <div className="side-bar-links-wrapper">
          <div className="sidebar-home-link-wrapper">
            <span className="span-bar-1"></span>
            <HouseFill size={17} style={{ marginRight: "0.5em" }} />
            <Link to="/" className="sidebar-home-link">
              Home
            </Link>
          </div>
          <div className="side-bar-profile-wrapper">
            <span className="span-bar-2"></span>
            <PersonCircle style={{ marginRight: "0.5em" }} size={18} />
            <Link to="/profile">
              <p>Profile</p>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SideBar;
