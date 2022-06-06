import React, { useState, useContext } from "react";
import axios from "axios";
import backendBaseURL from "../../../constants/AxiosApi/axiosAuthorized";
import { log } from "../../../utils/ConsoleLog";
import { AccessTokenContext } from "../../../context/AccessTokenContext/AccessTokenContext";
import jwt_decode from "jwt-decode";

const GenerateAdminKey = () => {
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [showingResponse, setShowingResponseMsg] = useState(false);
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
      const response = await axiosApiAuthorized.post(
        `/generate-admin-key/${userId}`,
        { createdOn: generatedOn }
      );
      if (response.status === 200) {
        showResponse();
      }
    } catch (error) {
      log(error);
    }
  };

  return (
    <div className="generate-admin-key-wrapper">
      {showingResponse &&
        (showSuccessMsg ? (
          <p className="success-msg"> Key successfully generated</p>
        ) : (
          <p className="failure-msg">Failed to generate key</p>
        ))}
      <button onClick={() => generateKey()}>Generate Key</button>
    </div>
  );
};

export default GenerateAdminKey;
