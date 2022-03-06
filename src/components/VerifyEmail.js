import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./../css/VerifyEmail.css";
import axiosApiUnAuthorized from "./axiosUnAuthorized";
import { FadeLoader } from "react-spinners";
import Footer from "./Footer";
import { CheckCircleFill } from "react-bootstrap-icons";

const VerifyEmail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId");
  const verificationCode = queryParams.get("verificationCode");
  // cater for the cases when the url parameters have been changed for security purposes
  // also cater for when the user email already been verified

  let history = useHistory();
  const [showFadeLoader, setShowFadeLoader] = useState(false);
  const [showSuccessVerificationMsg, setShowSuccessVerificationMsg] =
    useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [count, setCount] = useState(10);
  const [showCaughtError, setShowCaughtError] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  const redirectToLoginAfterTenSeconds = () => {
    setTimeout(() => {
      history.push("/login");
    }, 10000);
  };

  const verifyCode = async () => {
    try {
      if (userId == null || verificationCode == null)
        return setErrorMsg("Invalid link !");
      setShowCaughtError(false);
      setShowFadeLoader(true);
      const response = await axiosApiUnAuthorized.post(
        `/verify-user-email/${parseInt(userId)}`,
        {
          verificationCode: parseInt(verificationCode),
        }
      );
      setSuccessMsg(response.data.verificationStatusMsg);
      console.log(response); //to be commented out
      if (response.status === 200) {
        setShowFadeLoader(false);
        if (response.data.code === parseInt(verificationCode)) {
          setShowTimer(true);
          setShowSuccessVerificationMsg(true);
          redirectToLoginAfterTenSeconds();
        } else {
          setShowSuccessVerificationMsg(true);
        }
      }
    } catch (error) {
      console.log(error);
      setShowFadeLoader(false);
      setShowCaughtError(true);
      // provide with a button to reload in case of a server error
    }
  };

  useEffect(() => {
    verifyCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // starts counting while decreasing when the user is successfully verified
    const counter =
      count > 0 &&
      showTimer &&
      setInterval(() => {
        setCount(count - 1);
      }, 1000);
    return () => clearInterval(counter);
  }, [count, showTimer]);

  return (
    <div className="verify-email-wrapper">
      <header className="verify-email-header">
        <h1>Email Verification</h1>
      </header>
      {showCaughtError ? (
        <p className="verify-email-catch-error">Sorry, something went wrong!</p>
      ) : null}
      <p className="error-msg" style={{ color: "red", textAlign: "center" }}>
        {errorMsg}
      </p>
      {showFadeLoader ? (
        <div className="fade-loader">
          <h4>verifying your email...</h4>
          <FadeLoader color="lightseagreen" />
        </div>
      ) : null}
      {showSuccessVerificationMsg ? (
        // more styling to different types of messages depending on their color
        <div className="success-msg">
          <p>
            {successMsg} <CheckCircleFill />
          </p>
        </div>
      ) : null}
      {showTimer ? <p>Redirects to login in {count}s</p> : null}
      <div className="verify-email-footer">
        <Footer />
      </div>
    </div>
  );
};

export default VerifyEmail;
