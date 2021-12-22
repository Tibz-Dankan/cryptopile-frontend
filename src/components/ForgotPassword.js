import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { BarLoader } from "react-spinners";
import axios from "axios";
import "./../css/ForgotPassword.css";

const ForgotPassword = () => {
  const [userEmail, setUserEmail] = useState("");
  const [showBarLoader, setShowBarLoader] = useState(false);
  const [showCaughtError, setShowCaughtError] = useState(false);
  let history = useHistory();
  // function to submit user email
  const submitEmailToResetPassword = async (e) => {
    e.preventDefault();
    setShowBarLoader(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/forgot-password",
        {
          userEmail: userEmail,
        }
      );
      console.log(response); // to be removed wen in production
      setShowBarLoader(false); // stop BarLoader
      if (response.data.email === userEmail) {
        localStorage.setItem("userEmail", response.data.email);
        localStorage.setItem("userId", response.data.id);
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
      {showBarLoader ? <BarLoader color="hsl(180, 40%, 50%)" /> : null}
      {showCaughtError ? (
        <div className="caught-error">
          <p>Sorry, something went wrong !</p>
        </div>
      ) : null}
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
