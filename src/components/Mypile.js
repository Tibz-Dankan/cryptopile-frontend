import React, { useState, Fragment, useContext, useEffect } from "react";
import HomeLink from "./links/HomeLink";
import ViewPileLink from "./links/ViewPileLink";
import ViewLink from "./links/ViewLink";
import LoginLink from "./links/LoginLink";
import LogoutLink from "./links/LogoutLink";
import axios from "axios";
import "./../App.css";
import { PacmanLoader } from "react-spinners";
import NotLoggedIn from "./NotLoggedIn";
// import { TokenContext } from "./context/TokenContext";
const Mypile = () => {
  const [pile, setPile] = useState({ title: "", description: "" });
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

  const axiosApi = axios.create({
    // baseURL: "https://stockpile-backend.herokuapp.com/api",
    baseURL: "http://localhost:5000/api",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });
  // get the user profile
  const getUserProfile = async (e) => {
    try {
      const response = await axiosApi.get(
        `/getusername/${localStorage.getItem("userId")}`
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
    try {
      // to be removed
      console.log(dateOfPileStorage); // this line will be removed
      const postPile = await axiosApi.post(
        `/pile/${localStorage.getItem("userId")}`,
        {
          title: pile.title,
          description: pile.description,
          // storageDate: dateOfPileStorage, // more research here
        }
      );
      console.log(postPile);

      if (postPile.status === 200) {
        // stop displaying the beat loader
        setDisplayPacmanLoader(false);
        // display msg if not logged in
        if (postPile.data.messageCheck === "error") {
          setDisplayWhenTokenError(postPile.data.messageDisplay);
          setDisplayWhenUserNotLoggedIn(true);
          setCatchError("");
        } else {
          // if The pile was successful posted the make input fields the empty
          setPile({ title: "", description: "" });
          // display some cool msg
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

  // // select the file to be uploaded
  // const Handleselectfile = (event) => {
  //   setFile(event.target.files[0]);
  //   setFilename(event.target.files[0].name);
  // };
  // // upload the selected file
  // const Handlefileupload = () => {
  //   const formData = new FormData();
  //   formData.append("file", file, filename);

  //   axios.post("/uploads", formData, {
  //     //  upload progress
  //     onUploadProgress: (progressEvent) => {
  //       console.log(
  //         "upload progress: " +
  //           Math.round((progressEvent.load / progressEvent.total) * 100) +
  //           "%"
  //       );
  //       // to add  html progress bar
  //     },
  //   });
  // };

  return (
    <Fragment>
      <div>
        {isLoggedIn ? (
          <div className="mypile-wrapper">
            <div className="mypile-header-wrapper">
              <div className="mypile-home-link">
                <HomeLink />
              </div>
              <div className="mypile-viewpile-link">
                <ViewPileLink />
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
                <p style={{ color: "lightyellow" }}>{catchError}</p>
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
                    <PacmanLoader color="lightseagreen" />
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
                    <ViewLink />
                  </div>
                </div>
              ) : (
                <div className="pile-form">
                  {/* THE PILE FORM */}
                  <form onSubmit={(e) => submitPile(e)}>
                    <label htmlFor="Title">Title:</label> <br />
                    <input
                      type="text"
                      value={pile.title}
                      onChange={(e) => handlePileChanges(e)}
                      id="title"
                      placeholder="Title"
                      className="input-field mypile-input-field pile-title-input-field"
                      required
                    />
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
            {/* <div className="file-uploader">
        <h1>File Uploader Here</h1>
        <input
        type="file"
        onChange={Handleselectfile}
        className="input-field"
        />
        <button onClick={Handlefileupload} className="btn">
        Upload
        </button>
      </div> */}
          </div>
        ) : (
          <NotLoggedIn />
        )}
      </div>
    </Fragment>
  );
};

export default Mypile;
