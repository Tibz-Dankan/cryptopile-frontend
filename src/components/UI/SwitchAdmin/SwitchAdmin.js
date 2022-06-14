/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./SwitchAdmin.css";
import jwt_decode from "jwt-decode";

const SwitchAdmin = ({ roleAsProp }) => {
  // jwt decode
  const userInfoToken = sessionStorage.getItem("userInfoToken");
  const decodedUserInfo = jwt_decode(userInfoToken);
  const role = decodedUserInfo.role;

  const adminOnUserSection = role === "admin" && roleAsProp === "user";
  const adminOnAdminSection = role === "admin" && roleAsProp === "admin";
  const [showSwitchToAdmin, setShowSwitchToAdmin] =
    useState(adminOnUserSection);
  const [showSwitchToUser, setShowSwitchToUser] = useState(adminOnAdminSection);

  const history = useHistory();

  const directToAdmin = () => {
    history.push("/admin");
  };

  const directToTodos = () => {
    history.push("/todos");
  };

  return (
    <div className="switch-admin-wrapper">
      {showSwitchToAdmin && (
        <button onClick={() => directToAdmin()} className="switch-admin-btn">
          Switch To Admin
        </button>
      )}
      {showSwitchToUser && (
        <button onClick={() => directToTodos()} className="switch-admin-btn">
          Switch To User
        </button>
      )}
    </div>
  );
};

export default SwitchAdmin;
