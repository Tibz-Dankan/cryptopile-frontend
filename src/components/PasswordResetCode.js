import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { BarLoader } from "react-spinners";
import axios from "axios";
import "./../css/PasswordResetCode.css";

const PasswordResetCode = () => {
  const [passwordResetCode, setPasswordResetCode] = useState();
  const [showBarLoader, setShowBarLoader] = useState(false);
  const [showCaughtError, setShowCaughtError] = useState(false);
  const [passwordResetCodeMsg, setPasswordResetCodeMsg] = useState("");
  let history = useHistory();

  const axiosApi = axios.create({
    baseURL:
      "http://localhost:5000" || "https://stockpile-backend.herokuapp.com",
  });

  // function to submit user email
  const submitPasswordResetCode = async (e) => {
    e.preventDefault();
    try {
      setPasswordResetCodeMsg("");
      setShowCaughtError("");
      setShowBarLoader(true);
      if (passwordResetCode !== null) {
        const response = await axiosApi.post("/password-reset-code", {
          passwordResetCode: passwordResetCode,
        });
        console.log(response); // to be removed wen in production
        setShowBarLoader(false);
        if (response.data.verification_code === parseInt(passwordResetCode)) {
          history.push("/reset-password");
        } else {
          // some error here
          setPasswordResetCodeMsg(
            response.data.PasswordRestCodeVerificationMsg
          );
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
    try {
      setPasswordResetCodeMsg("");
      setShowBarLoader(true);
      setShowCaughtError("");
      const userEmail = localStorage.getItem("userEmail");
      const userId = localStorage.getItem("userId");
      if (userEmail !== null && userId !== null) {
        const response = await axios.post(
          "http://localhost:5000/resend-password-reset-code",
          {
            userId: userId,
            userEmail: userEmail,
          }
        );
        console.log(response); // to be removed
        if (response.data.email === userEmail) {
          setPasswordResetCodeMsg(
            "password reset code sent to " + response.data.email
          );
        } else {
          setPasswordResetCodeMsg(response.data.passwordResetCodeMsg);
        }
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
      <div className="password-resend-code-msg">
        <p>{passwordResetCodeMsg}</p>{" "}
        {/*to be styled custom colors according msg communicated next time*/}
      </div>
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
