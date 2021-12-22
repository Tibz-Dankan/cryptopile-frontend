import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { BarLoader } from "react-spinners";
import axios from "axios";
import "./../css/ResetPassword.css";

const ResetPassword = () => {
  const [passwordObject, setPasswordObject] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showBarLoader, setShowBarLoader] = useState(false);
  const [showCaughtError, setShowCaughtError] = useState(false);
  let history = useHistory();
  // function to submit user email
  const submitNewPassword = async (e) => {
    e.preventDefault();
    setShowBarLoader(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/reset-password",
        {
          newPassword: passwordObject.newPassword,
        }
      );
      console.log(response); // to be removed wen in production
      setShowBarLoader(false); // stop BarLoader
      if (response.data.passwordResetMsg === "reset-successful") {
        //   alert the user about successful reset of pswd
        history.push("/login");
      }
    } catch (error) {
      console.log(error);
      setShowCaughtError(true);
      setShowBarLoader(false);
    }
  };

  // onchange event `
  const handlePasswordResetChange = (e) => {
    const newPasswordObject = { ...passwordObject };
    newPasswordObject[e.target.id] = e.target.value;
    setPasswordObject(newPasswordObject);
  };

  return (
    <div className="reset-password-wrapper">
      {showBarLoader ? <BarLoader color="hsl(180, 40%, 50%)" /> : null}
      {showCaughtError ? (
        <div className="caught-error">
          <p>Sorry, something went wrong !</p>
        </div>
      ) : null}
      <form onSubmit={submitNewPassword} className="reset-password-form">
        <p className="form-heading">Enter Your New Password</p>
        <label className="reset-password-label">New Password:</label>
        <br />
        <input
          type="text"
          id="newPassword"
          className="reset-password-input-field"
          onChange={(e) => handlePasswordResetChange(e)}
          value={passwordObject.newPassword}
          required
        />
        <br />
        <label className="reset-password-label">confirm Password:</label>
        <br />
        <input
          type="text"
          id="confirmPassword"
          className="reset-password-input-field"
          onChange={(e) => handlePasswordResetChange(e)}
          value={passwordObject.confirmPassword}
          required
        />
        <br />
        <button className="reset-password-btn">Get Code</button>
      </form>
    </div>
  );
};

export default ResetPassword;
