import React, { useState } from "react";
import { BeatLoader } from "react-spinners";
import axiosApiUnAuthorized from "../../../AxiosApi/axiosUnAuthorized";
import "./ResendVerificationLink.css";

const ResendVerificationLink = () => {
  const [verificationLinkStatusMsg, setVerificationLinkStatusMsg] =
    useState("");
  const [showVerificationLinkStatusMsg, setShowVerificationLinkStatusMsg] =
    useState(false);
  const [showCaughtError, setShowCaughtError] = useState(false);
  const [showBeatLoader, setShowBeatLoader] = useState(false);
  const partlyRegisteredEmail = localStorage.getItem("partlyRegisteredEmail");

  // function to resend the verification link
  const resendingVerificationLink = async () => {
    try {
      setVerificationLinkStatusMsg("");
      setShowBeatLoader(true);
      setShowCaughtError(false);
      const response = await axiosApiUnAuthorized.post(
        "/resend-verification-link",
        {
          partlyRegisteredEmail: partlyRegisteredEmail,
        }
      );
      console.log(response); // to be comment wen pushing to production
      setShowBeatLoader(false); // stop react spinners
      if (response.status === 200) {
        setVerificationLinkStatusMsg(response.data.verificationLinkStatus);
        setShowVerificationLinkStatusMsg(true);
        localStorage.removeItem("partlyRegisteredEmail");
      }
    } catch (error) {
      console.log(error);
      setShowBeatLoader(false);
      setVerificationLinkStatusMsg("");
      setShowCaughtError(true);
      setShowVerificationLinkStatusMsg(false);
    }
  };

  return (
    <div className="resend-verification-link-wrapper">
      {showBeatLoader ? (
        <div className="react-spinner-beat-loader">
          <BeatLoader color={"hsl(180, 100%, 30%)"} />
        </div>
      ) : null}
      {/* show the verification msg and hide the button when the request is successful */}
      {showVerificationLinkStatusMsg ? (
        <p className="verification-link-status-msg">
          {verificationLinkStatusMsg}
        </p>
      ) : (
        <div>
          <p className="did-not-receive-link-msg">
            If you didn't get the verification link when signing up click the
            button below.
          </p>
          {showCaughtError ? (
            <p className="catch-error">Sorry, something went wrong!</p>
          ) : null}
          <button
            onClick={resendingVerificationLink}
            className="resend-verification-link-btn"
          >
            Resend verification link
          </button>
        </div>
      )}
    </div>
  );
};

export default ResendVerificationLink;
