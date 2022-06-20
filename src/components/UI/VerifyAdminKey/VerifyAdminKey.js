/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import { FadeLoader } from "react-spinners";
import axiosApiUnAuthorized from "../../../constants/AxiosApi/axiosUnAuthorized";
import { log } from "../../../utils/ConsoleLog";
import { enableButton, disableButton } from "../../../utils/ButtonState";
import "./VerifyAdminKey.css";
import AdminKeyVerifiedContext from "../../../context/AdminKeyVerifiedContext/AdminKeyVerifiedContext";
import ShowLoginFormContext from "../../../context/ShowLoginFormContext/ShowLoginFormContext";

const VerifyAdminKey = () => {
  const [adminKey, setAdminKey] = useState("");
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [showFailureMsg, setShowFailureMsg] = useState(false);
  const [showCatchError, setShowCatchError] = useState(false);
  const [showingResponseMsg, setShowingResponseMsg] = useState(false);
  const [showFadeLoader, setShowFadeLoader] = useState(false);
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
      setShowFadeLoader(true);
      disableButton("button");
      setShowCatchError(false);
      const response = await axiosApiUnAuthorized.post("/verify-admin-key", {
        key: adminKey,
      });
      setShowFadeLoader(false);
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
      log(err);
      setShowCatchError(true);
      setShowFadeLoader(false);
      enableButton("button");
    }
  };

  return (
    <div className="verify-admin-key-wrapper">
      {showCatchError && (
        <p className="verify-admin-key-catch-error">
          Sorry, something went wrong!
        </p>
      )}
      {showingResponseMsg && showSuccessMsg && (
        <p className="verify-admin-key-success-msg">
          Key successfully verified
        </p>
      )}
      {showingResponseMsg && showFailureMsg && (
        <p className="verify-admin-key-failure-msg">Incorrect key</p>
      )}
      {showFadeLoader && (
        <div className="verify-admin-key-fade-loader-wrapper">
          <FadeLoader color="hsl(180, 100%, 30%)" size={5} />
          <p>Verifying...</p>
        </div>
      )}
      {showVerifyAdminKeyForm && (
        <>
          <form
            onSubmit={(e) => verifyKey(e)}
            className="verify-admin-key-form"
          >
            <h3 className="verify-admin-key-form-heading">
              Enter Admin Verification Key
            </h3>
            <input
              type="text"
              value={adminKey}
              onChange={(e) => handleAdminKeyChange(e)}
              className="verify-admin-key-input-field"
              placeholder="Admin Key"
              required
            />
            <button type="submit" id="button" className="verify-admin-key-btn">
              Verify
            </button>
          </form>
          <p>
            Already have an account?{" "}
            <span
              onClick={() => changeShowLoginFormState()}
              className="supposed-to-be-link site-link"
            >
              Log In
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default VerifyAdminKey;
