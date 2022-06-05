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
import MiniFooter from "../../components/layouts/MiniFooter/MiniFooter";
import jwt_decode from "jwt-decode";

const Admin = () => {
  const [isAdminKeyVerified, setIsAdminKeyVerified] = useState(false);
  const [showLoginForm, setShowLogin] = useState(true);

  let userInfoToken = sessionStorage.getItem("userInfoToken");
  let role;
  if (!userInfoToken) {
    role = null;
  } else {
    // jwt decode
    const decodedUserInfo = jwt_decode(userInfoToken);
    role = decodedUserInfo.role;
  }

  const token = sessionStorage.getItem("accessToken");
  const isAdminToken = token && role === "admin";
  const [showLoginAndSignupForms, setShowLoginAndSignupForms] = useState(
    !isAdminToken ? true : false
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
      <MiniFooter />
    </div>
  );
};
export default Admin;
