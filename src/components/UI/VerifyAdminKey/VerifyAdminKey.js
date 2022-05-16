/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import axiosApiUnAuthorized from "../../../constants/AxiosApi/axiosAuthorized";
import { log } from "../../../utils/ConsoleLog";
import { enableButton, disableButton } from "../../../utils/ButtonState";
import "./VerifyAdminKey";
import AdminKeyVerifiedContext from "../../../context/AdminKeyVerifiedContext/AdminKeyVerifiedContext";
import ShowLoginFormContext from "../../../context/ShowLoginFormContext/ShowLoginFormContext";

const VerifyAdminKey = () => {
  const [adminKey, setAdminKey] = useState("");
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [showFailureMsg, setShowFailureMsg] = useState(false);
  const [error, setError] = useState("");
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
    isAdminKeyVerified && setShowVerifyAdminKeyForm(false);
  }, [isAdminKeyVerified]);

  const handleAdminKeyChange = (e) => {
    setAdminKey(e.target.value);
  };

  const showResponse = (msgStatusFunction) => {
    setShowingResponseMsg(true);
    msgStatusFunction(true);
    setTimeout(() => {
      setShowingResponseMsg(false);
      msgStatusFunction(false);
    }, 3000);
  };
  const verifyKey = async (e) => {
    e.preventDefault();
    try {
      disableButton("button");
      const response = await axiosApiUnAuthorized.post("/verify-admin-key", {
        key: adminKey,
      });
      enableButton("button");
      log(response);
      if (response.data.status === "success") {
        showResponse(setShowSuccessMsg);
        setIsAdminKeyVerified(true);
        setAdminKey("");
      }
      // if (response.status === 404) {
      if (response.data.status === "fail") {
        showResponse(setShowFailureMsg);
      }
    } catch (err) {
      enableButton("button");
      log(err);
    }
  };

  return (
    <div className="verify-admin-key-wrapper">
      {showingResponseMsg && showSuccessMsg && (
        <p className="success-msg"> Key successfully verified</p>
      )}
      {showingResponseMsg && showFailureMsg && (
        <p className="failure-msg">Incorrect key</p>
      )}
      {showVerifyAdminKeyForm && (
        <form onSubmit={(e) => verifyKey(e)}>
          <h3>Enter Admin Verification Key</h3>
          <input
            type="text"
            value={adminKey}
            onChange={(e) => handleAdminKeyChange(e)}
            className="verify-admin-key-input-field"
            required
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
