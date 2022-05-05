import axiosApiUnAuthorized from "../../../constants/AxiosApi/axiosUnAuthorized";
import React, { useState } from "react";
import { log } from "../../../utils/ConsoleLog";
import "./VerifyAdminKey.css";

const VerifyAdminKey = () => {
  const [showResponseMsg, setShowResponseMsg] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [adminKey, setAdminKey] = useState("");

  const showingResponse = () => {
    setShowResponseMsg(true);
    setTimeout(() => {
      setShowResponseMsg(false);
    }, 3000);
  };

  const handleAdminKeyChange = () => {
    setAdminKey((e) => e.target.value);
  };

  const verifyKey = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosApiUnAuthorized.post(`/verify-admin-key`, {
        key: adminKey,
      });
      log(response);
      //   if (response.status === 200) {
      if (response.statusText === "OK") {
        if (response.data[0].status === "success") {
          setShowSuccessMsg(true);
          showingResponse();
        }
      }
    } catch (error) {
      showingResponse();
      log(error);
    }
  };

  return (
    <div className="verify-admin-key-wrapper">
      {showResponseMsg &&
        (showSuccessMsg ? (
          <p className="verified-successfully">Key successfully verified</p>
        ) : (
          <p className="failed-to-verify">Incorrect key</p>
        ))}
      <form onSubmit={verifyKey} className="verify-key-form">
        <h3>Enter the Admin API key</h3>
        <input
          type="text"
          value={adminKey}
          onChange={handleAdminKeyChange}
          className="verify-key-input-field"
          id="button"
          placeholder="admin api key"
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default VerifyAdminKey;
