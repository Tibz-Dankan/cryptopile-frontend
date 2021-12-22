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
      if ((response.data.email = userEmail)) {
        history.push("/password-reset");
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
      {showCaughtError ? (
        <div className="caught-error">
          <p>Sorry something went wrong !</p>
        </div>
      ) : null}
      {showBarLoader ? <BarLoader color="hsl(180, 40%, 50%)" /> : null}
      <form onSubmit={submitEmailToResetPassword} className="user-email-form">
        <input
          type="email"
          onChange={handleUserEmailChange}
          value={userEmail}
          required
        />
        <button className="email-btn">send</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
