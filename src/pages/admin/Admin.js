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
import SwitchAdmin from "../../components/UI/SwitchAdmin/SwitchAdmin";

const Admin = () => {
  const [isAdminKeyVerified, setIsAdminKeyVerified] = useState(false);
  const [showLoginForm, setShowLogin] = useState(true);
  const role = sessionStorage.getItem("role");

  const token = sessionStorage.getItem("accessToken");
  const adminToken = token && role === "admin";
  const [showLoginAndSignupForms, setShowLoginAndSignupForms] = useState(
    !adminToken ? true : false
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
          <SwitchAdmin roleAsProp={"admin"} />
          <GetAdminProfile />
          <GetAdminKeys />
          <GenerateAdminKey />
        </>
      )}
    </div>
  );
};
export default Admin;
