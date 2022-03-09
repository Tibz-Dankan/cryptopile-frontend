import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { HouseFill } from "react-bootstrap-icons";
import HomeLink from "./links/HomeLink";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import axiosApiUnAuthorized from "./axiosUnAuthorized";
import "./../css/ResetPassword.css";

// The header  should also be added to this component as well
const ResetPassword = () => {
  const [passwordObject, setPasswordObject] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showBarLoader, setShowBarLoader] = useState(false);
  const [showCaughtError, setShowCaughtError] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState("");
  const [passwordLength, setPasswordLength] = useState("");
  const [passwordResetStatusMsg, setPasswordResetStatusMsg] = useState("");
  const [showWhenPasswordIsInvalid, setShowWhenPasswordIsInvalid] =
    useState(false);
  const [showPasswordOne, setShowPasswordOne] = useState(false);
  const [showPasswordTwo, setShowPasswordTwo] = useState(false);
  let history = useHistory();

  //  function to show password one first by changing the state to true
  const showingPasswordOne = () => {
    switch (showPasswordOne) {
      case true:
        setShowPasswordOne(false);
        break;
      case false:
        setShowPasswordOne(true);
        break;
      default:
    }
  };

  //  function to show password two by changing the state to true
  const showingPasswordTwo = () => {
    switch (showPasswordTwo) {
      case true:
        setShowPasswordTwo(false);
        break;
      case false:
        setShowPasswordTwo(true);
        break;
      default:
    }
  };

  //check password match
  const checkPasswordMatch = () => {
    setPasswordLength("");
    setShowCaughtError(false);
    setShowWhenPasswordIsInvalid(true);
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    if (newPassword === confirmPassword) {
      return true;
    } else {
      setPasswordMatch("**Passwords don't match");
      return false;
    }
  };

  //check password length
  const checkPasswordLength = () => {
    setPasswordMatch("");
    setShowCaughtError(false);
    setShowWhenPasswordIsInvalid(true);
    const newPassword = document.getElementById("newPassword").value;
    if (newPassword.length >= 6 && newPassword.length <= 15) {
      return true;
    } else {
      setPasswordLength(
        "**Passwords must be at least 6 characters and must not exceed 15"
      );
      return false;
    }
  };

  // onchange event `
  const handlePasswordResetChange = (e) => {
    const newPasswordObject = { ...passwordObject };
    newPasswordObject[e.target.id] = e.target.value;
    setPasswordObject(newPasswordObject);
  };

  // function to submit user's new password (when not logged in)
  const submitNewPassword = async (e) => {
    try {
      const userEmail = localStorage.getItem("userEmail");
      const userId = localStorage.getItem("userId");
      if (userEmail == null || userId == null) {
        setShowWhenPasswordIsInvalid(true);
        return setPasswordResetStatusMsg("**Cannot reset password !");
      }
      setShowCaughtError(false);
      setPasswordMatch("");
      setPasswordLength("");
      setShowBarLoader(true);
      setPasswordResetStatusMsg("");
      const response = await axiosApiUnAuthorized.post(
        `/reset-password/${userId}`,
        {
          userEmail: userEmail,
          newPassword: passwordObject.newPassword,
        }
      );
      console.log(response); // to be removed wen in production
      setShowBarLoader(false);
      if (response.data.passwordResetMsg === "password-reset-successful") {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userId");
        //   alert the user about successful reset of password
        setPasswordResetStatusMsg("The password has been successfully changed");
        history.push("/login");
      } else {
        //  some comment for clarification
        setPasswordResetStatusMsg(response.data.passwordResetMsg);
      }
    } catch (error) {
      console.log(error);
      setShowCaughtError(true);
      setShowBarLoader(false);
    }
  };

  // checking conditions on submitting the form
  const checkPasswordOnSubmittingForm = (e) => {
    e.preventDefault();
    checkPasswordLength() && checkPasswordMatch() && submitNewPassword(); // short hand for if statement
  };

  return (
    <div className="reset-password-wrapper">
      <div className="reset-password-header">
        <div className="reset-password-home-link">
          <HouseFill
            color={"hsl(0, 0%, 100%)"}
            size={17}
            style={{ marginRight: "3px" }}
          />
          <HomeLink />
        </div>
        <h4>New Password</h4>
      </div>
      {showBarLoader ? <BarLoader color="hsl(180, 40%, 40%)" /> : null}
      {showCaughtError ? (
        <div className="caught-error">
          <p>Sorry, something went wrong !</p>
        </div>
      ) : null}
      <form
        onSubmit={checkPasswordOnSubmittingForm}
        className="reset-password-form"
      >
        <h4 className="form-heading">Enter Your New Password</h4>
        {showWhenPasswordIsInvalid ? (
          <div className="show-when-password-is-invalid">
            <p className="password-match">{passwordMatch}</p>
            <p className="password-length">{passwordLength}</p>
            <p className="password-length">{passwordResetStatusMsg}</p>{" "}
          </div>
        ) : null}
        <label className="reset-password-label">New Password</label>
        <div className="input-field-wrapper-1">
          <input
            type={showPasswordOne ? "text" : "password"}
            id="newPassword"
            className="reset-password-input-field"
            onChange={(e) => handlePasswordResetChange(e)}
            value={passwordObject.newPassword}
            required
          />
          <div className="eye-icon" onClick={showingPasswordOne}>
            {showPasswordOne ? <EyeSlash /> : <Eye />}
          </div>
        </div>
        <br />
        <label className="reset-password-label">confirm Password</label>
        <div className="input-field-wrapper-2">
          <input
            type={showPasswordTwo ? "text" : "password"}
            id="confirmPassword"
            className="reset-password-input-field"
            onChange={(e) => handlePasswordResetChange(e)}
            value={passwordObject.confirmPassword}
            required
          />
          <div className="eye-icon" onClick={showingPasswordTwo}>
            {showPasswordTwo ? <EyeSlash /> : <Eye />}
          </div>
        </div>
        <br />
        <button className="reset-password-btn">Send</button>
      </form>
    </div>
  );
};

export default ResetPassword;
