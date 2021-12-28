import React, { useState, useEffect } from "react";
import axios from "axios";

import NotLoggedIn from "./NotLoggedIn";

const ViewSecretePile = () => {
  const [secretePile, setSecretePile] = useState([]);
  const [catchError, setCatchError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const tokenFromLocalStorage = localStorage.getItem("accessToken");

  const axiosApi = axios.create({
    baseURL:
      "http://localhost:5000/api" ||
      "https://stockpile-backend.herokuapp.com/api",
    headers: {
      Authorization: "Bearer " + tokenFromLocalStorage,
    },
  });

  //the get secretes
  const getSecretePile = async () => {
    try {
      const response = await axiosApi.get(
        `/getsecretepile/${localStorage.getItem("userId")}`
      );
      const renderSecretePile = response.data;
      setSecretePile(renderSecretePile);
      console.log(response);
      console.log(renderSecretePile);
    } catch (error) {
      console.log(error);
      setCatchError("sorry, some thing went wrong!");
    }
  };
  useEffect(() => {
    let isActive = true;
    if (isActive) {
      if (localStorage.getItem("isLoggedIn") === "isLoggedIn") {
        setIsLoggedIn(true);
        getSecretePile();
      }
    }
    return (isActive = false);
  }, []);
  return (
    <div>
      {isLoggedIn ? (
        <div className="secrete-pile-wrapper">
          <div className="catch-error-in-view-secrete-pile">
            <p>{catchError}</p>
          </div>
          <div className="get-secretes-wrapper">
            <button onClick={getSecretePile}>See my secretes</button>
            {/* <p>{getMySecerete}</p> */}
          </div>
          {/* check this error wen back to coding again */}
          <div>
            {secretePile.map((pile) => {
              <div key={pile.secrete_id}>
                <div className="secrete-title">{pile.secrete_title}</div>
                <div className="secrete-description">
                  {pile.secrete_description}
                </div>
              </div>;
            })}
          </div>
        </div>
      ) : (
        <NotLoggedIn />
      )}
    </div>
  );
};

export default ViewSecretePile;
