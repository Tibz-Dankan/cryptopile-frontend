import axiosApiAuthorized from "./../../../constants/AxiosApi/axiosAuthorized";
import React, { useState } from "react";
import { log } from "../../../utils/ConsoleLog";
import "./GenerateAdminKey.css";

const GenerateAdminKey = () => {
  const createdOn = new Date().toLocaleString();
  const [showResponseMsg, setShowResponseMsg] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const showingResponse = () => {
    setShowResponseMsg(true);
    setTimeout(() => {
      setShowResponseMsg(false);
    }, 3000);
  };

  const generateKey = async (e) => {
    e.preventDefault();
    try {
      log(createdOn);
      const generatedById = localStorage.getItem("userId");
      const response = await axiosApiAuthorized.post(
        `/generate-admin-key/${generatedById}`,
        {
          createdOn: createdOn,
        }
      );
      if (response.status === 200) {
        showingResponse();
        if (response.data[0].status === "success") {
          setShowSuccessMsg(true);
        }
      }
      console.log(response);
    } catch (error) {
      showingResponse();
      log(error);
    }
  };

  return (
    <div className="generate-admin-key-wrapper">
      {showResponseMsg &&
        (showSuccessMsg ? (
          <p className="generated-successfully">Key successfully generated</p>
        ) : (
          <p className="failed-to-generate">Failed to generate key</p>
        ))}
      <button className="generate-button" onClick={generateKey}>
        Generate Admin key
      </button>
    </div>
  );
};

export default GenerateAdminKey;
