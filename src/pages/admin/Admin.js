/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

import "./Admin.css";
import GetAdminProfile from "../../components/UI/GetAdminProfile/GetAdminProfile";
import SignupAdmin from "../../components/UI/SignupAdmin/SignupAdmin";
import LoginAdmin from "../../components/UI/LoginAdmin/LoginAdmin";
import GenerateAdminKey from "../../components/UI/GenerateAdminKey/GenerateAdminKey";
import GetAdminKeys from "../../components/UI/GetAdminKeys/GetAdminKeys";
import VerifyAdminKey from "../../components/UI/VerifyAdminKey/VerifyAdminKey";
import AdminKeyVerifiedContext from "../../context/AdminKeyVerifiedContext/AdminKeyVerifiedContext";
import ShowLoginFormContext from "../../context/ShowLoginFormContext/ShowLoginFormContext";
import UserRole from "../../components/UI/UserRole/UserRole";

const Admin = () => {
  const [isAdminKeyVerified, setIsAdminKeyVerified] = useState(false);
  const [showLoginForm, setShowLogin] = useState(true);
  const role = localStorage.getItem("role");
  const [userRole, setUserRole] = useState(role);

  const token = localStorage.getItem("accessToken");
  const [showLoginAndSignupForms, setShowLoginAndSignupForms] = useState(
    !token ? true : false
  );
  return (
    <div className="admin-wrapper">
      {showLoginAndSignupForms ? (
        <ShowLoginFormContext.Provider value={[showLoginForm, setShowLogin]}>
          <>
            {showLoginForm ? (
              <LoginAdmin />
            ) : (
              <>
                <AdminKeyVerifiedContext.Provider
                  value={[isAdminKeyVerified, setIsAdminKeyVerified]}
                >
                  <VerifyAdminKey />
                  <SignupAdmin />
                </AdminKeyVerifiedContext.Provider>
              </>
            )}
          </>
        </ShowLoginFormContext.Provider>
      ) : (
        <>
          <UserRole theUserRole={userRole} />
          <GetAdminKeys />
          <GenerateAdminKey />
          <GetAdminProfile />
        </>
      )}
    </div>
  );
};
export default Admin;
