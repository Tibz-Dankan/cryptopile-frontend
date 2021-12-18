import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./../css/VerifyEmail.css";
import axios from "axios";
import { FadeLoader } from "react-spinners";

const VerifyEmail = () => {
  // get the verification from the url using useParams hook
  const { verificationCode, userId } = useParams();
  let history = useHistory();
  //   send the code to the backend for verification
  const [showFadeLoader, setShowFadeLoader] = useState(false);
  const [showSuccessVerificationMsg, setShowSuccessVerificationMsg] =
    useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const verifyCode = async () => {
    try {
      setShowFadeLoader(true);
      const response = await axios.post(
        ` http://localhost:5000/verify-user-email/${userId}`,
        {
          verificationCode: parseInt(verificationCode),
        }
      );
      setSuccessMsg(response.data.verificationMsg);
      console.log(response);
      //   when successfully verify the user should be redirected to the home page
      setTimeout(() => {
        if (response.status === 200) {
          setShowFadeLoader(false);
          setShowSuccessVerificationMsg(true);
          // history.push("/login");
        } else {
          //   an error occurred during email verification
        }
      }, 5000);
    } catch (error) {
      console.log(error);
      setShowFadeLoader(false);
    }
  };
  // useEffect here
  useEffect(() => {
    //   verify code function should run on mounting of this component
    verifyCode();
  }, []);
  return (
    <div className="verify-email-wrapper">
      <h2>your code is {verificationCode}</h2>
      <h2>your user id is {userId}</h2>
      {/* spinner here  */}
      {showFadeLoader ? (
        <div>
          <FadeLoader color="lightseagreen" />
          <h5>verifying your account</h5>
        </div>
      ) : null}
      {showSuccessVerificationMsg ? (
        <div>
          <p>{successMsg}</p>
        </div>
      ) : null}
    </div>
  );
};

export default VerifyEmail;
