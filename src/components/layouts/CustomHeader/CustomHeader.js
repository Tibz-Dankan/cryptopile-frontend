import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { HouseFill } from "react-bootstrap-icons";
import LoggedInAs from "../../UI/LoggedInAs/LoggedInAs";
import "./CustomHeader.css";

const CustomHeader = ({ sectionName }) => {
  return (
    <Fragment>
      <header className="custom-header-wrapper">
        <div className="custom-header-link-wrapper">
          <HouseFill style={{ marginRight: "3px" }} size={18} />
          <Link to="/" className="custom-header-home-link">
            Home
          </Link>
        </div>
        <LoggedInAs />
      </header>
    </Fragment>
  );
};

export default CustomHeader;
