import axios from "axios";
import React, { useState, useEffect } from "react";
import { PropagateLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import HomeLink from "./links/HomeLink";
import AddPileLink from "./links/AddPileLink";
import LogoutLink from "./links/LogoutLink";
import NotLoggedIn from "./NotLoggedIn";
import EditPileDescription from "./EditPileDescription";
import EditPileTitle from "./EditPileTitle";
import DeletePile from "./DeletePile";
import CopyPileTitle from "./CopyPileTitle";
import "./../css/Viewpile.css";

const ViewMypile = () => {
  const [renderAllPile, setRenderAllPile] = useState([]);
  const [displayWhenNoToken, setDisplayWhenNoToken] = useState(false);
  const [catchError, setCatchError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displayPropagateLoader, setDisplayPropagateLoader] = useState(false);
  const tokenFromLocalStorage = localStorage.getItem("accessToken");
  const [isCopied, setIsCopied] = useState(false);

  const axiosApi = axios.create({
    // baseURL: "https://stockpile-backend.herokuapp.com/api",
    baseURL: "http://localhost:5000/api",
    headers: {
      Authorization: "Bearer " + tokenFromLocalStorage,
    },
  });
  const getPile = async () => {
    try {
      setDisplayPropagateLoader(true);
      const getMypile = await axiosApi.get(
        `/getpile/${localStorage.getItem("userId")}`
      );
      if (!tokenFromLocalStorage) {
        setDisplayWhenNoToken(true);
      } else {
        setDisplayPropagateLoader(false);
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

  //copy text tol the clipboard
  const titleToBeCopied = renderAllPile.title;
  const copyTextToClipboard = async (titleToBeCopied) => {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(titleToBeCopied);
    } else {
      document.execCommand("copy", true, titleToBeCopied);
    }
  };
  // function to handle onclick
  const handleOnclick = () => {
    console.log(titleToBeCopied); // to be removed
    copyTextToClipboard(titleToBeCopied)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(true);
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {isLoggedIn ? (
        <div className="view-pile-wrapper">
          <div className="viewpile-header-wrapper">
            <div className="viewpile-home-link header-link">
              <HomeLink />
            </div>
            <div className="viewpile-mypile-link header-link">
              <AddPileLink />
            </div>
            <div className="viewpile-logout-link">
              <LogoutLink />
            </div>
          </div>
          <div className="view-pile-heading" style={{ textAlign: "center" }}>
            {/* display an error to user wen backend has the problem */}
            <p style={{ color: "lightyellow" }}>{catchError}</p>
          </div>
          {/* trying this and if works i will push it into production */}
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
            // display the react spinner
            <div className="pile-wrapper">
              {displayPropagateLoader ? (
                <div className="propagate-loader-wrapper">
                  <PropagateLoader color="red" color="lightseagreen" />
                  <h5>Loading...</h5>
                </div>
              ) : null}
            </div>
          )}
          {/* table here */}
          <table>
            <tr>
              {/* <th>Date</th> */}
              {/* <th>Time</th> */}
              <th>Title</th>
              <th>Description</th>
              <th>Edit Title</th>
              <th>Edit Description</th>
              <th>Delete</th>
            </tr>
            {/* map method here */}
            {renderAllPile.map((pile) => {
              return (
                <tr key={pile.pile_id}>
                  {/* <td>{pile.date_of_add}</td> */}
                  {/* <td>{pile.time_of_add}</td> */}
                  <td>{pile.title}</td>
                  <td>{pile.description}</td>
                  <td id="pile-title-id">{<EditPileTitle pile={pile} />}</td>
                  <td id="pile-description-id">
                    {<EditPileDescription pile={pile} />}
                  </td>
                  <td>{<DeletePile pile={pile} />}</td>
                </tr>
              );
            })}
          </table>
        </div>
      ) : (
        <NotLoggedIn />
      )}
    </div>
  );
};

export default ViewMypile;
