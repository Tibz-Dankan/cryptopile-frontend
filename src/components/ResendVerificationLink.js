import React, { useState } from "react";
import axios from "axios";
import { BarLoader } from "react-spinners";

const ResendVerificationLink = () => {
  const [verificationLinkStatusMsg, setVerificationLinkStatusMsg] =
    useState("");
  const [showVerificationLinkStatusMsg, setShowVerificationLinkStatusMsg] =
    useState(false);
  const [showCaughtError, setShowCaughtError] = useState(false);
  const [showBarLoader, setShowBarLoader] = useState(false);
  const partlyRegisteredEmail = localStorage.getItem("partlyRegisteredEmail");

  // function to resend the verification link
  const resendingVerificationLink = async () => {
    try {
      setVerificationLinkStatusMsg("");
      setShowBarLoader(true);
      setShowCaughtError(false);
      const response = await axios.post(
        "http://localhost:5000/resend-verification-link",
        {
          partlyRegisteredEmail: partlyRegisteredEmail,
        }
      );
      console.log(response); // to be comment wen pushing to production
      setShowBarLoader(false); // stop react spinners
      if (response.status === 200) {
        setVerificationLinkStatusMsg(response.data.verificationLinkStatus);
        setShowVerificationLinkStatusMsg(true);
      }
    } catch (error) {
      console.log(error);
      setShowBarLoader(false);
      setVerificationLinkStatusMsg("");
      setShowCaughtError(true);
      setShowVerificationLinkStatusMsg(false);
    }
  };

  return (
    <div
      className="resend-verification-link-wrapper"
      style={{ textAlign: "center", padding: "10px" }}
    >
      {/* {showBarLoader ?  */}
      <BarLoader color="red" size={5} /> {/*this bug should be fixed*/}
      {/* : null} */}
      {/* show the verification msg and hide the button when the request is successful */}
      {showVerificationLinkStatusMsg ? (
        <p style={{ color: "green" }}>{verificationLinkStatusMsg}</p>
      ) : (
        <div>
          <p>
            If did not get the verification link when signing up click the
            button below.
          </p>
          <button
            onClick={resendingVerificationLink}
            className="resend-verification-link-btn"
          >
            Resend verification link
          </button>
        </div>
      )}
      {showCaughtError ? <p style={{color:"hsl(0, 100%, 50%)"}}>sorry ,something went wrong</p> : null}
    </div>
  );
};

export default ResendVerificationLink;
