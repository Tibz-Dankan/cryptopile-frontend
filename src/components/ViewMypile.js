import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HomeLink from "./links/HomeLink";
import MypileLink from "./links/MypileLink";
import LogoutLink from "./links/LogoutLink";
import NotLoggedIn from "./NotLoggedIn";
import EditPileDescription from "./EditPileDescription";
import EditPileTitle from "./EditPileTitle";
import DeletePile from "./DeletePile";
import "./../App.css";

const ViewMypile = () => {
  const [renderAllPile, setRenderAllPile] = useState([]);
  const [displayWhenNoToken, setDisplayWhenNoToken] = useState(false);
  const [catchError, setCatchError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const tokenFromLocalStorage = localStorage.getItem("accessToken");

  const axiosApi = axios.create({
    // baseURL: "https://stockpile-backend.herokuapp.com/api",
    baseURL: "http://localhost:5000/api",
    headers: {
      Authorization: "Bearer " + tokenFromLocalStorage,
    },
  });
  const getPile = async () => {
    try {
      const getMypile = await axiosApi.get(
        `/getpile/${localStorage.getItem("userId")}`
      );
      if (!tokenFromLocalStorage) {
        setDisplayWhenNoToken(true);
      } else {
        console.log(getMypile);
        const arrayPile = getMypile.data.rows;
        console.log(arrayPile);
        setRenderAllPile(arrayPile);
        setCatchError("");
      }
    } catch (err) {
      console.log(err);
      setCatchError("Sorry, something went wrong!");
    }
  };

  // show pile on rendering and after every update
  useEffect(() => {
    let isActive = true;
    if (isActive) {
      if (localStorage.getItem("isLoggedIn") === "isLoggedIn") {
        getPile();
        setIsLoggedIn(true);
      }
    }
    return (isActive = false);
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <div className="view-pile-wrapper">
          <div className="viewpile-header-wrapper">
            <div className="viewpile-home-link">
              <HomeLink />
            </div>
            <div className="viewpile-mypile-link">
              <MypileLink />
            </div>
            <div className="viewpile-logout-link">
              <LogoutLink />
            </div>
          </div>
          <div className="view-pile-heading" style={{ textAlign: "center" }}>
            <h3> check pile here </h3>
            <p style={{ color: "lightyellow" }}>{catchError}</p>
          </div>
          {/* trying this and it works i will push it into production */}
          {displayWhenNoToken ? (
            <div className="view-pile-when-not-loggedin">
              <p>You have no token!</p>
              <p>
                Is this your first time here?
                <Link to="/signup" className="view-link">
                  {" "}
                  Create Account
                </Link>
              </p>
              <p>
                Do you already have an Account?{" "}
                <Link to="/login" className="view-link">
                  Login
                </Link>
              </p>
            </div>
          ) : (
            <div className="pile-wrapper">
              {renderAllPile.map((pile) => (
                <div key={pile.pile_id}>
                  <div className="pile-date-time">
                    {" "}
                    {pile.date_of_add} {pile.time_of_add}{" "}
                  </div>
                  <div className="pile-title user-pile" id="pile-title-id">
                    {pile.title}{" "}
                  </div>
                  <EditPileTitle pile={pile} />

                  <div
                    className="pile-description user-pile"
                    id="pile-description-id"
                  >
                    {" "}
                    {pile.description}{" "}
                  </div>
                  <EditPileDescription pile={pile} />
                  <DeletePile pile={pile} />
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <NotLoggedIn />
      )}
    </div>
  );
};

export default ViewMypile;
