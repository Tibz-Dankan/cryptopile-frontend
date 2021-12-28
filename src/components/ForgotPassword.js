import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { BarLoader } from "react-spinners";
import axios from "axios";
import "./../css/ForgotPassword.css";

const ForgotPassword = () => {
  const [userEmail, setUserEmail] = useState("");
  const [showBarLoader, setShowBarLoader] = useState(false);
  const [showCaughtError, setShowCaughtError] = useState(false);
  const [errorInSendingPasswordResetCode, setErrorInSendingPasswordResetCode] =
    useState("");
  let history = useHistory();

  const axiosApi = axios.create({
    baseURL:
      "http://localhost:5000" || "https://stockpile-backend.herokuapp.com",
  });

  // function to submit user email
  const submitEmailToResetPassword = async (e) => {
    e.preventDefault();
    try {
      setShowBarLoader(false);
      setShowBarLoader(true);
      setErrorInSendingPasswordResetCode("");
      const response = await axiosApi.post("/forgot-password", {
        userEmail: userEmail,
      });
      console.log(response); // to be removed wen in production
      setShowBarLoader(false); // stop BarLoader
      if (response.data.email === userEmail) {
        localStorage.setItem("userEmail", response.data.email);
        localStorage.setItem("userId", response.data.id);
        setErrorInSendingPasswordResetCode(response.data.forgotPasswordMsg);
        history.push("/password-reset-code");
      }
    } catch (error) {
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
      <div className="forgot-password-heading">
        <h2>Forgot Password</h2>
      </div>
      {showCaughtError ? (
        <div className="caught-error">
          <p>Sorry, something went wrong !</p>
        </div>
      ) : null}
      <div className="forgot-password-msg">
        <p>
          Incase you forget your password or you just want to reset it, we
          usually ask for an email associated with your account where a{" "}
          <b>Password Reset Code</b> required in the next step, is sent
        </p>
      </div>
      {showBarLoader ? <BarLoader color="hsl(180, 40%, 50%)" /> : null}
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
        <button className="email-btn">Get Code</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
