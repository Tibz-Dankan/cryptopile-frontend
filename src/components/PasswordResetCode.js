import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { BarLoader } from "react-spinners";
import axios from "axios";
import "./../css/PasswordResetCode.css";

const PasswordResetCode = () => {
  const [passwordResetCode, setPasswordResetCode] = useState();
  const [showBarLoader, setShowBarLoader] = useState(false);
  const [showCaughtError, setShowCaughtError] = useState(false);
  let history = useHistory();
  // function to submit user email
  const submitPasswordResetCode = async (e) => {
    e.preventDefault();
    setShowBarLoader(true);
    try {
      if (passwordResetCode !== null) {
        const response = await axios.post(
          "http://localhost:5000/password-reset-code",
          {
            passwordResetCode: passwordResetCode,
          }
        );
        console.log(response); // to be removed wen in production
        setShowBarLoader(false);
        if (response.data.verification_code === passwordResetCode) {
          history.push("/reset-password");
        }
      }
    } catch (error) {
      console.log(error);
      setShowCaughtError(true);
      setShowBarLoader(false);
    }
  };

  // onchange event `
  const handleResetCodeChange = (e) => {
    setPasswordResetCode(e.target.value);
  };

  // Research about disabling a button after click for some seconds

  // Resend the password Reset Code
  const resendPasswordResetCode = async (e) => {
    e.preventDefault();
    setShowBarLoader(true);
    try {
      const userEmail = localStorage.get("userEmail");
      const userId = localStorage.get("userId");
      if (userEmail !== null && userId !== null) {
        const response = await axios.post(
          "http://localhost:5000/resend-password-reset-code",
          {
            userId: userId,
            userEmail: userEmail,
          }
        );
        console.log(response);
      }
      setShowBarLoader(false);
    } catch (error) {
      setShowBarLoader(false);
      setShowCaughtError(true);
      console.log(error);
    }
  };

  return (
    <div className="password-reset-code-wrapper">
      {showBarLoader ? <BarLoader color="hsl(180, 40%, 50%)" /> : null}
      {showCaughtError ? (
        <div className="caught-error">
          <p>Sorry something went wrong !</p>
        </div>
      ) : null}
      <form
        onSubmit={submitPasswordResetCode}
        className="password-reset-code-form"
      >
        <p className="form-heading">
          Enter Password Reset Code Sent your Email
        </p>
        <label className="reset-code-label">Password Reset code:</label>
        <br />
        <input
          type="number"
          className="reset-code-input-field"
          onChange={handleResetCodeChange}
          value={passwordResetCode}
          required
        />
        <br />
        <button type="submit" className="reset-code-btn reset-code-btn-1">
          Verify Code
        </button>
        <br />
        <button
          onClick={resendPasswordResetCode}
          className="reset-code-btn reset-code-btn-2"
        >
          Resend Code
        </button>
      </form>
    </div>
  );
};

export default PasswordResetCode;
