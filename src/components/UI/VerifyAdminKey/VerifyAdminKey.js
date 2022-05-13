/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import axiosApiUnAuthorized from "../../../constants/AxiosApi/axiosAuthorized";
import { log } from "../../../utils/ConsoleLog";
import "./VerifyAdminKey";
import AdminKeyVerifiedContext from "../../../context/AdminKeyVerifiedContext/AdminKeyVerifiedContext";
import ShowLoginFormContext from "../../../context/ShowLoginFormContext/ShowLoginFormContext";

const VerifyAdminKey = () => {
  const [adminKey, setAdminKey] = useState("");
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [showingResponseMsg, setShowingResponseMsg] = useState(false);
  const [isAdminKeyVerified, setIsAdminKeyVerified] = useContext(
    AdminKeyVerifiedContext
  );
  const [showVerifyAdminKeyForm, setShowVerifyAdminKeyForm] = useState(true);

  const [showLoginForm, setShowLogin] = useContext(ShowLoginFormContext);

  const changeShowLoginFormState = () => {
    switch (showLoginForm) {
      case true:
        setShowLogin(false);
        break;
      case false:
        setShowLogin(true);
        break;
      default:
    }
  };

  useEffect(() => {
    //if the admin key is verified then hide the verifyAdminKeyForm
    isAdminKeyVerified && setShowVerifyAdminKeyForm(true);
  }, [isAdminKeyVerified]);

  const handleAdminKeyChange = () => {
    setAdminKey((e) => e.target.value);
  };

  const showResponse = () => {
    setTimeout(() => {
      setShowingResponseMsg(true);
      setShowSuccessMsg(true);
    }, 3000);
  };
  const verifyKey = async () => {
    try {
      const response = await axiosApiUnAuthorized("/verify-admin-key", {
        key: adminKey,
      });
      if (response.status === 200) {
        showResponse();
        setIsAdminKeyVerified(true);
      }
    } catch (error) {
      log(error);
    }
  };

  return (
    <div className="verify-admin-key-wrapper">
      {showingResponseMsg &&
        (showSuccessMsg ? (
          <p className="success-msg"> Key successfully verified</p>
        ) : (
          <p className="failure-msg">Incorrect key</p>
        ))}
      {showVerifyAdminKeyForm && (
        <form onSubmit={() => verifyKey()}>
          <h3>Enter Admin Verification Key</h3>
          <input
            type="text"
            value={adminKey}
            onChange={() => handleAdminKeyChange()}
            className="verify-admin-key-input-field"
          />
          <button type="submit" id="button" className="verify-admin-key-btn">
            Verify
          </button>

          <p>
            Already have an account?{" "}
            <span
              onClick={() => changeShowLoginFormState()}
              className="supposed-to-be-link"
            >
              Log In
            </span>
          </p>
        </form>
      )}
    </div>
  );
};

export default VerifyAdminKey;
