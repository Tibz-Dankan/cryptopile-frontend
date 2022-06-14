/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import backendBaseURL from "../../../constants/AxiosApi/axiosAuthorized";
import axios from "axios";
import { log } from "../../../utils/ConsoleLog";
import { AccessTokenContext } from "../../../context/AccessTokenContext/AccessTokenContext";
import jwt_decode from "jwt-decode";
import GenerateAdminKey from "../GenerateAdminKey/GenerateAdminKey";
import "./GetAdminKeys.css";
import { BeatLoader } from "react-spinners";

const GetAdminKeys = () => {
  const [adminKeys, setAdminKeys] = useState([]);
  const [showKeys, setShowKeys] = useState(false);
  const [showBeatLoader, setShowBeatLoader] = useState(false);
  const [showCatchError, setShowCatchError] = useState(false);

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

  // const accessToken = sessionStorage.getItem("accessToken");
  const getKeys = async () => {
    try {
      if (!accessToken) return;
      setShowBeatLoader(true);
      setShowCatchError(false);
      const response = await axiosApiAuthorized.get(`/get-admin-key/${userId}`);
      setShowBeatLoader(false);
      log(response);
      if (response.status === 200) {
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
      setShowBeatLoader(false);
      setShowCatchError(true);
      log(error);
    }
  };

  const changeBackgroundColorOfTableRow = (userId) => {
    //Ensure useId is even or zero
    if (userId === 0 || userId % 2 === 0) {
      log("userId even " + userId);
      return true;
    } else {
      log("userId odd " + userId);
      return false;
    }
  };

  useEffect(() => {
    getKeys();
    return setAdminKeys([]);
  }, []);

  // // Copy admin key
  // const copyAdminKey = () => {
  //   /* Get the text field */
  //   var copyText = document.getElementById("adminKey");

  //   // /* Select the text field */
  //   // copyText.select();
  //   // copyText.setSelectionRange(0, 99999); /* For mobile devices */

  //   /* Copy the text inside the text field */
  //   navigator.clipboard.writeText(copyText.value);

  //   /* Alert the copied text */
  //   alert("Copied the text: " + copyText.value);
  // };

  return (
    <div className="get-admin-key-wrapper">
      {showCatchError && (
        <p className="get-admin-key-catch-error">Something went wrong!</p>
      )}
      <div className="admin-key-heading">
        <p>Admin keys generated by Me</p>
      </div>
      {showBeatLoader && (
        <div className="get-admin-key-beat-loader">
          <BeatLoader color="hsl(180, 100%, 30%)" size={8} />
        </div>
      )}
      {showKeys ? (
        <div className="admin-key-table-wrapper">
          <button
            onClick={() => getKeys()}
            className="Reload-button reload-button-near-key-table"
            id="button"
          >
            RELOAD
          </button>
          <table className="table">
            <tbody>
              <tr className="table-row-heading">
                <th>Generated On</th>
                <th>Admin key</th>
                <th>Used By</th>
                <th>Delete Key</th>
              </tr>
              {adminKeys.map((adminKey) => {
                return (
                  <tr
                    key={adminKey.adminkeyid}
                    className="table-row-content"
                    style={{
                      backgroundColor: changeBackgroundColorOfTableRow(
                        adminKey.adminkeyid
                      )
                        ? "hsl(0, 0%, 96%)"
                        : "hsl(0, 0%, 100%)",
                    }}
                  >
                    <td>{adminKey.createdon}</td>
                    <td id="adminKey" className="admin-key-wrapper">
                      {adminKey.adminkey}
                      {/* <span
                        style={{ marginLeft: "3px" }}
                        onClick={() => copyAdminKey()}
                        >
                        copy
                      </span> */}
                    </td>
                    <td>{adminKey.usedby}</td>
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
      <GenerateAdminKey />
    </div>
  );
};

export default GetAdminKeys;

//THE COPY FUNCTIONALITY
// <!-- The text field -->
// <input type="text" value="Hello World" id="myInput">

// <!-- The button used to copy the text -->
// <button onclick="myFunction()">Copy text</button>

// function myFunction() {
//   /* Get the text field */
//   var copyText = document.getElementById("myInput");

//   /* Select the text field */
//   copyText.select();
//   copyText.setSelectionRange(0, 99999); /* For mobile devices */

//    /* Copy the text inside the text field */
//   navigator.clipboard.writeText(copyText.value);

//   /* Alert the copied text */
//   alert("Copied the text: " + copyText.value);
// }
