import React, { useState } from "react";
import axiosApiAuthorized from "../../../constants/AxiosApi/axiosAuthorized";
import { log } from "../../../utils/ConsoleLog";

const GenerateAdminKey = () => {
  const userId = localStorage.getItem("userId");
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
  const generateAdminKey = async () => {
    try {
      const response = await axiosApiAuthorized(
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
      <button onClick={generateAdminKey}>Generate Key</button>
    </div>
  );
};

export default GenerateAdminKey;
