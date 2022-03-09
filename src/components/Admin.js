import { useState, useEffect } from "react";
import axiosApiAuthorized from "./axiosAuthorized.js";
import "./../css/Admin.css";
import AdminVerifyUser from "./AdminVerifyUser";
import AdminDeleteUser from "./AdminDeleteUser";
import {
  CheckCircleFill,
  ExclamationTriangleFill,
} from "react-bootstrap-icons";

const Admin = () => {
  const [userAccounts, setUserAccounts] = useState([]);
  const [showCaughtError, setShowCaughtError] = useState(false);
  const [adminProfile, setAdminProfile] = useState([]);
  const [isUserVerified, setIsUserVerified] = useState(false);
  const [tokenErrorMsg, setTokenErrorMsg] = useState("");
  const [hasNoToken, setHasNoToken] = useState(false);
  const token = localStorage.getItem("accessToken");

  //   calling methods on page loading
  useEffect(() => {
    getUserAccounts();
    getAdminProfile();
    return setUserAccounts([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //   get to get user accounts
  const getUserAccounts = async () => {
    try {
      if (!token) {
        setHasNoToken(true);
        setTokenErrorMsg("You have no token login into your account");
      } else {
        setTokenErrorMsg("");
        const response = await axiosApiAuthorized.get("/get-user-accounts");
        console.log(response);
        if (response.status === 200) {
          setUserAccounts(response.data);
          // some react spinner
        }
      }
    } catch (error) {
      console.log(error);
      setShowCaughtError(true);
    }
  };

  //   function to get admin profile details
  const getAdminProfile = async () => {
    try {
      if (!token) {
        setHasNoToken(true);
        setTokenErrorMsg("You have no token login into your account");
      } else {
        setTokenErrorMsg("");
        const response = await axiosApiAuthorized.get("/get-admin-profile");
        console.log(response);
        if (response.status === 200) {
          setAdminProfile(response.data);
          // some react spinner
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // let userStatus = false;
  const checkUserVerificationStatus = (userStatus) => {
    // let status = false;
    // switch (userAccounts.isverifiedemail) {
    switch (userStatus) {
      // switch (status) {
      case true:
        setIsUserVerified(true);
        break;
      case false:
        setIsUserVerified(false);
        break;
      default:
    }
    return isUserVerified;
    // return false; // to be removed
  };

  return (
    <div className="admin-wrapper">
      {hasNoToken ? <p style={{ color: "red" }}>{tokenErrorMsg}</p> : null}
      {showCaughtError ? <p>sorry something went wrong</p> : null}
      {/* Admin profile*/}
      <div className="admin-profile">
        <p>Admin firstname: {adminProfile.adminfirstname}</p>
        <p>Admin lastname: {adminProfile.adminlastname}</p>
        <p>Admin email: {adminProfile.adminemail}</p>
      </div>
      {/* user accounts */}
      <table className="user-account-table">
        <tbody>
          <tr>
            <th>User ID</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Verification Status</th>
            <th>Verify User</th>
            <th>Delete User</th>
          </tr>
          {userAccounts.map((accounts) => {
            return (
              <tr key={accounts.userid}>
                <td>{accounts.userid}</td>
                <td>{accounts.firstname}</td>
                <td>{accounts.lastname}</td>
                <td>{accounts.email}</td>
                <td>
                  {checkUserVerificationStatus(accounts.isverifiedemail) ? (
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
      {/* upload images by admin here */}
    </div>
  );
};
export default Admin;
