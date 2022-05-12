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

const Admin = () => {
  const [showLoginAndSignupForms, setShowLoginAndSignupForms] = useState(true);
  const [isAdminKeyVerified, setIsAdminKeyVerified] = useState(false);
  const [showLoginForm, setShowLogin] = useState(true);

  const token = localStorage.getItem("accessToken");
  if (!token) {
    setShowLoginAndSignupForms(true);
  }

  return (
    <div className="admin-wrapper">
      {/* {showLoginAndSignupForms ? ( */}
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
      {/* ) : ( */}
      <>
        <GetAdminKeys />
        <GenerateAdminKey />
        <GetAdminProfile />
      </>
      {/* )} */}
    </div>
  );
};
export default Admin;
