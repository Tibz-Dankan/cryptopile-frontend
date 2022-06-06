/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import backendBaseURL from "../../../constants/AxiosApi/axiosAuthorized";
import axios from "axios";
import { log } from "../../../utils/ConsoleLog";
import { AccessTokenContext } from "../../../context/AccessTokenContext/AccessTokenContext";
import jwt_decode from "jwt-decode";
import "./GetAdminKeys.css";

const GetAdminKeys = () => {
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
      const response = await axiosApiAuthorized.get(`/get-admin-key/${userId}`);
      log(response);
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
                    <td style={{ color: "hsl(140 100% 55%)" }} id="adminKey">
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
