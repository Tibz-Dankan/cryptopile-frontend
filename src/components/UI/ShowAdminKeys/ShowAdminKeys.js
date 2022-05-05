import axiosApiAuthorized from "../../../constants/AxiosApi/axiosAuthorized";
import React, { useState, useEffect } from "react";
import { log } from "../../../utils/ConsoleLog";
import "./ShowAdminKeys.css";

const ShowAdminKeys = () => {
  const [showFailMsg, setShowFailMsg] = useState(false);
  const [showKeys, setShowKeys] = useState(false);
  const [keys, setKeys] = useState([]);

  const showingFailResponse = () => {
    setShowFailMsg(true);
    setTimeout(() => {
      setShowFailMsg(false);
    }, 3000);
  };

  const getKey = async (e) => {
    // e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      const response = await axiosApiAuthorized.get(`/get-admin-key/${userId}`);
      log(response);
      //   if (response.status === 200) {
      if (response.statusText === "OK") {
        if (response.data[0].status === "success") {
          setShowKeys(true);
          setKeys(response.data);
        }
      }
    } catch (error) {
      showingFailResponse();
      log(error);
    }
  };

  useEffect(() => {
    getKey();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="show-admin-key-wrapper">
      {showFailMsg && <p className="fail-msg">Failed to get keys</p>}
      {showKeys ? (
        <table>
          <tbody>
            <tr>
              <th>Keys</th>
              <th>Generated On</th>
              <th>Used By</th>
            </tr>
            {keys.map((key) => {
              return (
                <tr key={key.adminkeyid}>
                  <td>{key.adminkey}</td>
                  <td>{key.createdon}</td>
                  <td>{key.usedby}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="no-keys-fetched">No keys fetched</p>
      )}
    </div>
  );
};

export default ShowAdminKeys;
