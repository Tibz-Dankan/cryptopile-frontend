import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { HouseFill } from "react-bootstrap-icons";
import HomeLink from "../../../links/HomeLink";
import axiosApiUnAuthorized from "../../../constants/AxiosApi/axiosUnAuthorized";
import "./PasswordResetCode.css";

const PasswordResetCode = () => {
  const [passwordResetCode, setPasswordResetCode] = useState();
  const [showBarLoader, setShowBarLoader] = useState(false);
  const [showCaughtError, setShowCaughtError] = useState(false);
  const [passwordResetCodeMsg, setPasswordResetCodeMsg] = useState("");
  const [
    isPassWordResetCodeMsgSuccessful,
    setIsPassWordResetCodeMsgSuccessful,
  ] = useState(false);
  const [isPassWordResetCodeMsgError, setIsPassWordResetCodeMsgError] =
    useState(false);
  const [
    passwordResetCodeSentSuccessfully,
    setPasswordResetCodeSentSuccessfully,
  ] = useState("");
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
  const submitPasswordResetCode = async (e) => {
    e.preventDefault();
    try {
      disableButton();
      setPasswordResetCodeMsg("");
      setShowCaughtError("");
      setPasswordResetCodeSentSuccessfully("");
      setShowBarLoader(true);
      if (passwordResetCode !== null) {
        const response = await axiosApiUnAuthorized.post(
          "/password-reset-code",
          {
            passwordResetCode: passwordResetCode,
          }
        );
        console.log(response); // to be removed wen in production
        setShowBarLoader(false);
        if (response.data.verificationcode === parseInt(passwordResetCode)) {
          history.push("/reset-password");
        } else {
          enableButton();
          // some error here
          setPasswordResetCodeMsg(
            response.data.PasswordRestCodeVerificationMsg
          );
          setIsPassWordResetCodeMsgError(true);
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
  const handleResetCodeChange = (e) => {
    setPasswordResetCode(e.target.value);
  };

  // Research about disabling a button after click for some seconds

  // Resend the password Reset Code
  const resendPasswordResetCode = async (e) => {
    e.preventDefault();
    try {
      disableButton();
      setPasswordResetCodeMsg("");
      setIsPassWordResetCodeMsgSuccessful(false);
      setIsPassWordResetCodeMsgError(false);
      setShowBarLoader(true);
      setShowCaughtError("");
      const userEmail = sessionStorage.getItem("userEmail");
      const userId = sessionStorage.getItem("userId");
      if (userEmail !== null && userId !== null) {
        const response = await axiosApiUnAuthorized.post(
          "http://localhost:5000/resend-password-reset-code",
          {
            userId: userId,
            userEmail: userEmail,
          }
        );
        console.log(response); // to be removed
        if (response.data.email === userEmail) {
          setPasswordResetCodeSentSuccessfully(
            "Password Reset Code sent to " + response.data.email
          );
          setIsPassWordResetCodeMsgSuccessful(true);
        } else {
          enableButton();
          setPasswordResetCodeMsg(response.data.passwordResetCodeMsg);
          setIsPassWordResetCodeMsgError(true);
        }
      }
      setShowBarLoader(false);
    } catch (error) {
      enableButton();
      setShowBarLoader(false);
      setShowCaughtError(true);
      console.log(error);
    }
  };

  return (
    <div className="password-reset-code-wrapper">
      <div className="password-reset-code-header">
        <div className="password-reset-code-home-link">
          <HouseFill
            color={"hsl(0, 0%, 100%)"}
            size={17}
            style={{ marginRight: "3px" }}
          />
          <HomeLink />
        </div>
        <h4>Password Reset Code</h4>
      </div>
      {showBarLoader ? (
        <div className="show-beat-loader">
          <BeatLoader color="hsl(180, 50%, 20%)" />
        </div>
      ) : null}
      {showCaughtError ? (
        <div className="caught-error">
          <p>Sorry something went wrong !</p>
        </div>
      ) : null}
      <div className="password-reset-code-msg">
        {isPassWordResetCodeMsgSuccessful ? (
          <p style={{ color: "hsl(120, 100%, 35%)" }}>
            {passwordResetCodeSentSuccessfully}
          </p>
        ) : null}
        {isPassWordResetCodeMsgError ? (
          <p style={{ color: "hsl(0, 100%, 60%)" }}>{passwordResetCodeMsg}</p>
        ) : null}
      </div>
      <form
        onSubmit={submitPasswordResetCode}
        className="password-reset-code-form"
      >
        <p className="form-heading">
          Enter Password Reset Code sent to your Email
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
        <button
          type="submit"
          className="reset-code-btn reset-code-btn-1"
          id="button"
        >
          Verify Code
        </button>
        <br />
        <button
          onClick={resendPasswordResetCode}
          className="reset-code-btn reset-code-btn-2"
          id="button"
        >
          Resend Code
        </button>
      </form>
    </div>
  );
};

export default PasswordResetCode;
