/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axiosApiAuthorized from "../../../constants/AxiosApi/axiosAuthorized";
import { log } from "../../../utils/ConsoleLog";
import "./GetAdminKeys.css";

const GetAdminKeys = () => {
  const userId = localStorage.getItem("userId");
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [showingResponse, setShowingResponseMsg] = useState(false);
  const [adminKeys, setAdminKeys] = useState([]);
  const [showKeys, setShowKeys] = useState(false);

  const showResponse = () => {
    setShowingResponseMsg(true);
    setShowSuccessMsg(true);
    setTimeout(() => {
      setShowingResponseMsg(false);
      setShowSuccessMsg(false);
    }, 3000);
  };
  const getKeys = async () => {
    try {
      const response = await axiosApiAuthorized(`/get-admin-key/${userId}`);
      if (response.status === 200) {
        showResponse();
        if (
          response.data.keys[0] == null ||
          response.data.keys[0] === undefined
        ) {
          return;
        }
        setAdminKeys(response.data.keys);
        setShowKeys(true);
      }
    } catch (error) {
      log(error);
    }
  };

  useEffect(() => {
    getKeys();
    return setAdminKeys([]);
  }, []);

  return (
    <div className="get-admin-key-wrapper">
      {/* {showingResponse &&
        (showSuccessMsg ? (
          <p className="success-msg"> Keys successfully fetched</p>
        ) : (
          <p className="failure-msg">Failed to fetch keys</p>
        ))} */}
      {showKeys ? (
        <div className="table-wrapper">
          <button
            onClick={() => getKeys()}
            className="Reload-button Reload-button-near-table"
            id="button"
          >
            RELOAD
          </button>
          <table>
            <tbody>
              <tr>
                <th>Generated On</th>
                <th>Admin key</th>
                <th>Used By</th>
                <th>Delete Key</th>
              </tr>
              {adminKeys.map((adminKey) => {
                return (
                  <tr key={adminKey.adminkeyid}>
                    <td>{adminKey.createdon}</td>
                    <td>{adminKey.adminKey}</td>
                    <td>{adminKey.description}</td>
                    <td>
                      <p>Delete key</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="you-have-no-keys">
          <button
            onClick={() => getKeys()}
            className="Reload-button"
            id="button"
          >
            RELOAD
          </button>
          <p>No keys loaded yet!</p>
        </div>
      )}
    </div>
  );
};

export default GetAdminKeys;
