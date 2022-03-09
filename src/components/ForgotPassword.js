import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { BarLoader } from "react-spinners";
import HomeLink from "./links/HomeLink";
import { HouseFill } from "react-bootstrap-icons";
import axiosApiUnAuthorized from "./axiosUnAuthorized";
import "./../css/ForgotPassword.css";

const ForgotPassword = () => {
  const [userEmail, setUserEmail] = useState("");
  const [showBarLoader, setShowBarLoader] = useState(false);
  const [showCaughtError, setShowCaughtError] = useState(false);
  const [errorInSendingPasswordResetCode, setErrorInSendingPasswordResetCode] =
    useState("");
  let history = useHistory();

  // function to disable a button
  const disableButton = () => {
    document.getElementById("button").disabled = true;
  };

  // function to enable a button
  const enableButton = () => {
    document.getElementById("button").disabled = false;
  };

  // function to submit user email
  const submitEmailToResetPassword = async (e) => {
    e.preventDefault();
    try {
      disableButton();
      setShowBarLoader(false);
      setShowBarLoader(true);
      setShowCaughtError(false);
      setErrorInSendingPasswordResetCode("");
      const response = await axiosApiUnAuthorized.post("/forgot-password", {
        userEmail: userEmail,
      });
      console.log(response); // to be removed wen in production
      setShowBarLoader(false); // stop BarLoader
      if (response.status === 200) {
        setErrorInSendingPasswordResetCode(response.data.forgotPasswordMsg);
        enableButton();
        if (response.data.email === userEmail) {
          localStorage.setItem("userEmail", response.data.email);
          localStorage.setItem("userId", response.data.userid);
          history.push("/password-reset-code");
        }
      }
    } catch (error) {
      enableButton();
      console.log(error);
      setShowCaughtError(true);
      setShowBarLoader(false);
    }
  };

  // onchange event `
  const handleUserEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  return (
    <div className="forgot-password-wrapper">
      <div className="forgot-password-header">
        <div className="forgot-password-home-link">
          <HouseFill
            color={"hsl(0, 0%, 100%)"}
            size={17}
            style={{ marginRight: "3px" }}
          />
          <HomeLink />
        </div>
        <h4>Forgot Password</h4>
      </div>
      <div className="forgot-password-msg">
        <p>
          Incase you forget your password or you just want to reset it, we
          usually ask for an email associated with your account where a{" "}
          <b>Password Reset Code</b> required in the next step, is sent
        </p>
      </div>
      {showBarLoader ? <BarLoader color="hsl(180, 40%, 50%)" /> : null}

      {showCaughtError ? (
        <div className="caught-error">
          <p>Sorry, something went wrong!</p>
        </div>
      ) : null}
      <div className="errors-in-sending-pwsd-reset-code">
        <p>{errorInSendingPasswordResetCode}</p> {/* to be styled next day*/}
      </div>
      <form onSubmit={submitEmailToResetPassword} className="user-email-form">
        <p className="form-heading">Enter Email Associated With Your Account</p>
        <label className="email-label">Email Address:</label>
        <br />
        <input
          type="email"
          className="email-input-field"
          onChange={handleUserEmailChange}
          value={userEmail}
          required
        />
        <br />
        <button className="email-btn" id="button">
          Get Code
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
