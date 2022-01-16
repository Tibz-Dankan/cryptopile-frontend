import React, { useState, Fragment, useEffect } from "react";
import HomeLink from "./links/HomeLink";
import SeeTodos from "./SeeTodos";
import SeeTodosLink from "./links/SeeTodosLink";
import LoginLink from "./links/LoginLink";
import LogoutLink from "./links/LogoutLink";
import axiosApiAuthorized from "./axiosAuthorized";
import axiosApiUnAuthorized from "./axiosUnAuthorized";
import "./../css/AddTodos.css";
import { PacmanLoader } from "react-spinners"; //another spinner
import NotLoggedIn from "./NotLoggedIn";
const AddTodos = () => {
  const [pile, setPile] = useState({ description: "" });
  // const date = new Date();
  const dateOfPileStorage = new Date();
  // const dateOfPileStorage = date.toString();

  const [displayWhenTokenError, setDisplayWhenTokenError] = useState("");
  const [displayWhenUserNotLoggedIn, setDisplayWhenUserNotLoggedIn] =
    useState(false);
  const [userName, setUserName] = useState({});
  // Db represents database
  const [hidePileFormWhenAddedToDb, setHidePileFormWhenAddedToDb] =
    useState(false);
  // display the beat loader
  const [displayPacmanLoader, setDisplayPacmanLoader] = useState(false);
  //catch some errors
  const [catchError, setCatchError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // get the user profile
  const getUserProfile = async (e) => {
    try {
      const response = await axiosApiUnAuthorized.get(
        `api/getusername/${localStorage.getItem("userId")}`
      );
      console.log(response.data);
      setUserName(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "isLoggedIn") {
      // Render the user profile on  mounting nd after every  update
      getUserProfile();
      setIsLoggedIn(true);
    }
  }, []);

  // Post or submit the pile
  const submitPile = async (e) => {
    e.preventDefault();
    // display  the beat loaders
    setDisplayPacmanLoader(true);
    setCatchError("");
    try {
      // to be removed
      console.log(dateOfPileStorage); // this line will be removed
      const postPile = await axiosApiAuthorized.post(
        `api/pile/${localStorage.getItem("userId")}`,
        {
          description: pile.description,
          // storageDate: dateOfPileStorage, // more research here
        }
      );
      console.log(postPile);

      if (postPile.status === 200) {
        setDisplayPacmanLoader(false);
        if (!localStorage.getItem("accessToken")) {
          setDisplayWhenUserNotLoggedIn(true);
        }
        // else if (postPile.data.Error.name === "JsonWebTokenError") {
        //   // display msg jwt is tampered with
        //   setDisplayWhenTokenError(postPile.data.Error.message);
        else {
          setPile({ description: "" });
          setHidePileFormWhenAddedToDb(true);
        }
      }
    } catch (err) {
      console.log(err);
      setCatchError("Sorry, something went wrong!");
      setDisplayPacmanLoader(false);
    }
  };

  // Handle  the changes in the pile
  const handlePileChanges = (e) => {
    const newpile = { ...pile };
    newpile[e.target.id] = e.target.value;
    setPile(newpile);
    console.log(newpile);
  };

  return (
    <Fragment>
      <div>
        {isLoggedIn ? (
          <div className="mypile-wrapper">
            <div className="mypile-header-wrapper">
              <div className="mypile-home-link header-link">
                <HomeLink />
              </div>
              <div className="mypile-viewpile-link header-link">
                <SeeTodos />
              </div>
              <div className="mypile-logout-link">
                <LogoutLink />
              </div>
            </div>
            <div className="mypile-content-wrapper">
              <div
                className="mypile-catch-error"
                style={{ textAlign: "center" }}
              >
                <p style={{ color: "black" }}>{catchError}</p>
              </div>
              {displayWhenUserNotLoggedIn ? (
                <div className="display-when-not-logged-in">
                  <h3>{displayWhenTokenError}</h3>
                  <p>{catchError}</p>
                  <div>
                    <LoginLink />
                  </div>
                </div>
              ) : (
                /* display user profile */
                <div className="user-profile">
                  <div className="user-profile-picture">
                    <h4>Your Profile pic</h4>
                  </div>
                  <div className="user-name">
                    <h3>
                      {userName.firstname} {userName.lastname}
                    </h3>
                  </div>
                </div>
              )}
              <div className="beat-loader-component-mypile-wrapper">
                {displayPacmanLoader ? (
                  <div className="beat-loader-component-mypile-inner">
                    <PacmanLoader color="lightseagreen" /> {/*To be changed*/}
                    <h1>...</h1>
                  </div>
                ) : null}
              </div>
              {/* hide the pile form when the pile has been added to the database */}
              {hidePileFormWhenAddedToDb ? (
                <div className="pile-added-successfully">
                  <div className="pile-added">
                    <p> Your pile has been added sucessfully</p>
                    <p> click to checkout pile to see the pile</p>
                  </div>
                  <div className="view-pile-link-in-mypile">
                    <SeeTodosLink />
                  </div>
                </div>
              ) : (
                <div className="pile-form">
                  {/* THE PILE FORM */}
                  <form onSubmit={(e) => submitPile(e)}>
                    <br />
                    <br />
                    <label htmlFor="description">Description:</label>
                    <br />
                    <textarea
                      className="mypile-input-field pile-description-input-field"
                      value={pile.description}
                      onChange={(e) => handlePileChanges(e)}
                      id="description"
                      placeholder="Short Description"
                      required
                    ></textarea>
                    <br />
                    <br />
                    <button className="btn mypile-btn">Add</button>
                  </form>
                </div>
              )}
            </div>
          </div>
        ) : (
          <NotLoggedIn />
        )}
      </div>
    </Fragment>
  );
};

export default AddTodos;
