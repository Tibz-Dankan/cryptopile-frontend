/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./SwitchAdmin.css";

const SwitchAdmin = ({ roleAsProp }) => {
  //   consider using jwt-decode to get user from local Storage or session storage
  const role = sessionStorage.getItem("role");
  const adminOnUseSection = role === "admin" && roleAsProp === "user";
  const adminOnAdminSection = role === "admin" && roleAsProp === "admin";
  const [showSwitchToAdmin, setShowSwitchToAdmin] = useState(adminOnUseSection);
  const [showSwitchToUser, setShowSwitchToUser] = useState(adminOnAdminSection);

  const history = useHistory();

  const directToAdmin = () => {
    history.push("/admin");
  };

  const directToTodos = () => {
    history.push("/todos");
  };

  return (
    <div>
      {showSwitchToAdmin && (
        <button onClick={() => directToAdmin()}>Switch To Admin</button>
      )}
      {showSwitchToUser && (
        <button onClick={() => directToTodos()}>Switch To User</button>
      )}
    </div>
  );
};

export default SwitchAdmin;
