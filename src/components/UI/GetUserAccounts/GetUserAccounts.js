/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import backendBaseURL from "../../../constants/AxiosApi/axiosAuthorized.js";
import "./GetUserAccounts.css";
import AdminVerifyUser from "../AdminVerifyUser/AdminVerifyUser";
import AdminDeleteUser from "../AdminDeleteUser/AdminDeleteUser";
import { log } from "../../../utils/ConsoleLog.js";
import { AccessTokenContext } from "../../../context/AccessTokenContext/AccessTokenContext.js";
import {
  CheckCircleFill,
  ExclamationTriangleFill,
} from "react-bootstrap-icons";
import { BeatLoader } from "react-spinners";

const GetAdminProfile = () => {
  const [userAccounts, setUserAccounts] = useState([]);
  const [showCaughtError, setShowCaughtError] = useState(false);
  const token = sessionStorage.getItem("accessToken");
  const isVerified = true;
  const [showBeatLoader, setShowBeatLoader] = useState(false);

  const [accessToken, setAccessToken] = useContext(AccessTokenContext);
  // const updateAccessTokenContextWhenNull = () => {
  //   if (!accessToken) {
  //     setAccessToken(sessionStorage.getItem("accessToken"));
  //   }
  // };
  // updateAccessTokenContextWhenNull();
  useEffect(() => {
    setAccessToken(window.sessionStorage.getItem("accessToken"));
  }, [accessToken]);

  const axiosApiAuthorized = axios.create({
    baseURL: backendBaseURL,
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  //   get to get user accounts
  const getUserAccounts = async () => {
    try {
      if (!token) return;
      setShowBeatLoader(true);
      const response = await axiosApiAuthorized.get("/get-user-accounts");
      log(response);
      setShowBeatLoader(false);
      if (response.data[0] == null || response.data[0] === undefined) {
        return;
      }
      if (response.status === 200) {
        setUserAccounts(response.data);
        // some react spinner
      }
    } catch (error) {
      log(error);
      setShowBeatLoader(false);
      setShowCaughtError(true);
    }
  };

  const changeBackgroundColorOfTableRow = (userId) => {
    //ensure useId is even or zero
    if (userId === 0 || userId % 2 === 0) {
      log("userId even " + userId);
      return true;
    } else {
      log("userId odd " + userId);
      return false;
    }
  };
  changeBackgroundColorOfTableRow();

  //   calling the method on page loading
  useEffect(() => {
    getUserAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="user-account-wrapper">
      <button
        onClick={() => getUserAccounts()}
        className="Reload-button Reload-button-near-user-account-table"
        id="button"
      >
        RELOAD
      </button>
      {showCaughtError && <p>sorry something went wrong</p>}
      <div className="user-account-heading">
        <p>Registered Users</p>
      </div>
      {showBeatLoader && (
        <div className="user-account-beat-loader-wrapper">
          <BeatLoader color="hsl(180, 100%, 30%)" size={8} />
        </div>
      )}
      <table className="table">
        <tbody>
          <tr className="table-row-heading">
            <th>User ID</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Email</th>
            <th>Verification Status</th>
            <th>Verify User</th>
            <th>Delete User</th>
          </tr>
          {userAccounts.map((accounts) => {
            return (
              <tr
                key={accounts.userid}
                className="table-row-content"
                style={{
                  backgroundColor: changeBackgroundColorOfTableRow(
                    accounts.userid
                  )
                    ? "hsl(0, 0%, 96%)"
                    : "hsl(0, 0%, 100%)",
                }}
              >
                <td>{accounts.userid}</td>
                <td>{accounts.firstname}</td>
                <td>{accounts.lastname}</td>
                <td>{accounts.email}</td>
                <td>
                  {isVerified === accounts.isverifiedemail ? (
                    <div className="verified-user">
                      Verified
                      <CheckCircleFill color="hsl(120,100%, 60%)" />
                    </div>
                  ) : (
                    <div className="not-verified-user">
                      Not verified
                      <ExclamationTriangleFill color="hsl(60,100%,45%)" />
                    </div>
                  )}
                </td>
                <td id="account-id">
                  {<AdminVerifyUser account={accounts} />}
                </td>
                <td>{<AdminDeleteUser account={accounts} />}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default GetAdminProfile;
