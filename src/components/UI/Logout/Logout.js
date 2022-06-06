import React, { useEffect, useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { BoxArrowRight } from "react-bootstrap-icons";
import "./Logout.css";

const Logout = () => {
  let history = useHistory();

  const logOutUser = async () => {
    sessionStorage.clear();
    history.push("/login");
  };

  return (
    <Fragment>
      <div className="logout-wrapper">
        <BoxArrowRight className="box-arrow-right-icon" />
        <p onClick={() => logOutUser()}>Logout</p>
      </div>
    </Fragment>
  );
};

export default Logout;
