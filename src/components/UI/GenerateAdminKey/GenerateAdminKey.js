import React, { useState, useContext } from "react";
import axios from "axios";
import backendBaseURL from "../../../constants/AxiosApi/axiosAuthorized";
import { log } from "../../../utils/ConsoleLog";
import { AccessTokenContext } from "../../../context/AccessTokenContext/AccessTokenContext";
import jwt_decode from "jwt-decode";
import { BeatLoader } from "react-spinners";
import "./GenerateAdminKey.css";

const GenerateAdminKey = () => {
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [showingResponse, setShowingResponseMsg] = useState(false);
  const [showCatchError, setShowCatchError] = useState(false);
  const [showBeatLoader, setShowBeatLoader] = useState(false);
  const timeOfGenerate = new Date().toLocaleTimeString();
  const dateOfGenerate = new Date().toDateString();
  const generatedOn = `${dateOfGenerate} ${timeOfGenerate} `;

  const showResponse = () => {
    setShowingResponseMsg(true);
    setShowSuccessMsg(true);
    setTimeout(() => {
      setShowingResponseMsg(false);
      setShowSuccessMsg(false);
    }, 3000);
  };

  // jwt decode
  const userInfoToken = sessionStorage.getItem("userInfoToken");
  const decodedUserInfo = jwt_decode(userInfoToken);
  const userId = decodedUserInfo.userId;

  const [accessToken, setAccessToken] = useContext(AccessTokenContext);
  const updateAccessTokenContextWhenNull = () => {
    if (!accessToken) {
      setAccessToken(sessionStorage.getItem("accessToken"));
    }
  };
  updateAccessTokenContextWhenNull();

  const axiosApiAuthorized = axios.create({
    baseURL: backendBaseURL,
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  const generateKey = async () => {
    try {
      setShowBeatLoader(true);
      setShowCatchError(false);
      const response = await axiosApiAuthorized.post(
        `/generate-admin-key/${userId}`,
        { createdOn: generatedOn }
      );
      setShowBeatLoader(false);
      if (response.status === 200) {
        showResponse();
      }
    } catch (error) {
      log(error);
      showBeatLoader(false);
      showCatchError(true);
    }
  };

  return (
    <div className="generate-admin-key-wrapper">
      <div className="generate-admin-key-alert">
        {showingResponse &&
          (showSuccessMsg ? (
            <p className="generate-admin-key-success-msg">
              Key successfully generated
            </p>
          ) : (
            <p className="generate-admin-key-failure-msg">
              Failed to generate key
            </p>
          ))}
        {showBeatLoader && (
          <div className="generate-admin-key-beat-loader-wrapper">
            <BeatLoader color="hsl(180, 100%, 30%)" size={8} />
          </div>
        )}
        {showCatchError && (
          <p className="catch-error">Sorry something went wrong</p>
        )}
      </div>
      <button onClick={() => generateKey()} className="generate-key-btn">
        Generate Key
      </button>
    </div>
  );
};

export default GenerateAdminKey;
