import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HomeLink from "./links/HomeLink";
import MypileLink from "./links/MypileLink";
import LogoutLink from "./links/LogoutLink";
import NotLoggedIn from "./NotLoggedIn";
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
  const getpile = async () => {
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

  // // edit pile title
  // const editPileTitle = async (pile_id, title) => {
  //   try {
  //     const response = await axiosApi.put(`editpile/${pile_id}`, {
  //       title: title,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // // edit pile description
  // const editPileDescription = async (pile_id, description) => {
  //   try {
  //     const response = await axiosApi.put(`editdescription/${pile_id}`, {
  //       description: description,
  //       setRenderAllPile,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  //edit the pile (both the title and description)
  // const deletePile = async (pile_id) => {
  //   try {
  //     const response = await axiosApi.delete(`/deletepile/${pile_id}`);
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // show pile on rendering and after every update
  useEffect(() => {
    let isActive = true;
    if (isActive) {
      if (localStorage.getItem("isLoggedIn") === "isLoggedIn") {
        getpile();
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
                  <div className="pile-title">
                    {pile.title}{" "}
                    {/* <button onClick={editPileTitle(pile.pile_id, pile.title)}>
                  Edit
                </button> */}
                  </div>
                  <div className="pile-description">
                    {" "}
                    {pile.description}
                    {/* <button
                  onClick={editPileDescription(pile.pile_id, pile.description)}
                >
                  Edit
                </button>{" "} */}
                  </div>
                  {/* <div className="delete-pile-button">
                <button onClick={deletePile(pile.pile_id)}>delete</button>
              </div> */}
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
