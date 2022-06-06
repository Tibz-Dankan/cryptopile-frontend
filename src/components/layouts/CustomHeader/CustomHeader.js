import React, { Fragment } from "react";
import LoggedInAs from "../../UI/LoggedInAs/LoggedInAs";
import "./CustomHeader.css";

const CustomHeader = ({ sectionName }) => {
  return (
    <Fragment>
      <header className="custom-header-wrapper">
        <p className="section-name">{sectionName}</p>
        <LoggedInAs />
      </header>
    </Fragment>
  );
};

export default CustomHeader;
