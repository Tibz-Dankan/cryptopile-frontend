import React, { useState, useEffect } from "react";
import { PropagateLoader } from "react-spinners";
import { Link } from "react-router-dom";
import HomeLink from "./links/HomeLink";
import axiosApiAuthorized from "./axiosAuthorized";
import AddTodosLink from "./links/AddTodosLink";
import LogoutLink from "./links/LogoutLink";
import NotLoggedIn from "./NotLoggedIn";
import EditPileDescription from "./EditPileDescription";
import DeletePile from "./DeletePile";
import "./../css/SeeTodos.css";

const SeeTodos = () => {
  const [renderAllPile, setRenderAllPile] = useState([]);
  const [displayWhenNoToken, setDisplayWhenNoToken] = useState(false);
  const [displayCatchError, setDisplayCatchError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displayPropagateLoader, setDisplayPropagateLoader] = useState(false);
  const [displayTable, setDisplayTable] = useState(false);
  const tokenFromLocalStorage = localStorage.getItem("accessToken");

  const getPile = async () => {
    try {
      setDisplayPropagateLoader(true);
      const getMyPile = await axiosApiAuthorized.get(
        `api/getpile/${localStorage.getItem("userId")}`
      );
      if (!tokenFromLocalStorage) {
        setDisplayWhenNoToken(true);
      } else {
        setDisplayPropagateLoader(false);
        console.log(getMyPile); // to be removed
        const arrayPile = getMyPile.data.rows;
        console.log(arrayPile);
        setRenderAllPile(arrayPile);
        setDisplayCatchError(false);
        window.scrollTo(0, 0); // scrolling to the top
        if (getMyPile.status === 200) {
          setDisplayTable(true);
        }
      }
    } catch (err) {
      console.log(err);
      window.scrollTo(0, 0); // scrolling to the top
      setDisplayCatchError(true);
      setDisplayPropagateLoader(false);
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
            <div className="viewpile-home-link header-link">
              <HomeLink />
            </div>
            <div className="viewpile-mypile-link header-link">
              <AddTodosLink />
            </div>
            <div className="viewpile-logout-link header-link">
              <LogoutLink />
            </div>
          </div>
          {/* display an error to user wen backend has the problem */}
          {displayCatchError ? (
            <div className="view-pile-error-msg">
              <p>Sorry, something went wrong!</p>
            </div>
          ) : null}
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
                  <PropagateLoader size={12} color="hsl(180, 100%, 30%)" />
                  <h5>Loading...</h5>
                </div>
              ) : null}
            </div>
          )}
          {displayTable ? (
            <table>
              <tr>
                {/* <th>Date</th> */}
                {/* <th>Time</th> */}
                <th>Title</th>
                <th>Description</th>
                {/* <th>Edit Title</th> */}
                {/* <th>Edit Description</th> */}
                <th>Delete</th>
              </tr>
              {/* map method here */}
              {renderAllPile.map((pile) => {
                return (
                  <tr key={pile.pile_id}>
                    {/* <td>{pile.date_of_add}</td> */}
                    {/* <td>{pile.time_of_add}</td> */}
                    <td id="pile-description-id">
                      {pile.description} {<EditPileDescription pile={pile} />}
                    </td>
                    <td>{<DeletePile pile={pile} />}</td>
                  </tr>
                );
              })}
            </table>
          ) : null}
        </div>
      ) : (
        <NotLoggedIn />
      )}
    </div>
  );
};

export default SeeTodos;
