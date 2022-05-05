// import { useState, useEffect } from "react";
// import axiosApiAuthorized from "../../constants/AxiosApi/axiosAuthorized.js";
import "./Admin.css";

import SignUpAdmin from "../../components/UI/SignUpAdmin/SignUpAdmin";
import LogInAdmin from "../../components/UI/LogInAdmin/LogInAdmin";
import AdminGetUsers from "../../components/UI/AdminGetUsers/AdminGetUsers";
import GenerateAdminKey from "../../components/UI/GenerateAdminKey/GenerateAdminKey";
import ShowAdminKeys from "../../components/UI/ShowAdminKeys/ShowAdminKeys";
import VerifyAdminKey from "../../components/UI/VerifyAdminKey/VerifyAdminKey";
const Admin = () => {
  return (
    <div className="admin-wrapper">
      <LogInAdmin />
      <VerifyAdminKey />
      <SignUpAdmin />
      <ShowAdminKeys />
      <GenerateAdminKey />
      <AdminGetUsers />
    </div>
  );
};
export default Admin;
