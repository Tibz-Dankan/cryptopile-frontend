import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./../css/VerifyEmail.css";
import axios from "axios";
import { FadeLoader } from "react-spinners";

const VerifyEmail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId");
  const verificationCode = queryParams.get("verificationCode");
  // cater for the cases when the url parameters have been changed for security purposes

  let history = useHistory();
  const [showFadeLoader, setShowFadeLoader] = useState(false);
  const [showSuccessVerificationMsg, setShowSuccessVerificationMsg] =
    useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [count, setCount] = useState(5);

  const redirectToLoginAfterSeconds = () => {
    setTimeout(() => {
      history.push("/login");
    }, 5000);
  };

  const increaseCounterEverySecond = () => {
    setInterval(() => {
      setCount(count - 1);
    }, 1000);
  };

  const verifyCode = async () => {
    try {
      if (userId == null || verificationCode == null) {
        setErrorMsg("Invalid link");
      } else {
        setShowFadeLoader(true);
        const response = await axios.post(
          ` http://localhost:5000/verify-user-email/${parseInt(userId)}`,
          {
            verificationCode: parseInt(verificationCode),
          }
        );
        setSuccessMsg(response.data.verificationStatusMsg);
        console.log(response); //to be commented out
        if (response.status === 200) {
          setShowFadeLoader(false);
          setShowSuccessVerificationMsg(true);
          redirectToLoginAfterSeconds();
        } else {
          //   an error occurred during email verification
        }
      }
    } catch (error) {
      console.log(error);
      setShowFadeLoader(false);
    }
  };

  useEffect(() => {
    verifyCode();
  }, []);

  return (
    <div className="verify-email-wrapper">
      <p style={{ color: "red" }}>{errorMsg}</p>

      {/* react spinner */}
      {showFadeLoader ? (
        <div className="fade-loader">
          <FadeLoader color="lightseagreen" />
          <h5>verifying your account</h5>
        </div>
      ) : null}
      {showSuccessVerificationMsg ? (
        <div>
          <p>{successMsg}</p>
          <p onLoad={increaseCounterEverySecond}>
            Redirects to login in {count}s
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default VerifyEmail;
