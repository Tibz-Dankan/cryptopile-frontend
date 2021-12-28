import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import NotLoggedIn from "./NotLoggedIn";
import "./../App.css";
const AddSecretePile = () => {
  const [secretePile, setSecretePile] = useState({
    title: "",
    description: "",
  });
  // const [getMySecerete, setGetMySecrete] = useState([]);
  const [catchError, setCatchError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // get the token from the local storage
  const tokenFromLocalStorage = localStorage.getItem("accessToken");
  //request along the token
  //https://stockpile-backend.herokuapp.com/
  const axiosApi = axios.create({
    baseURL:
      "http://localhost:5000/api" ||
      "https://stockpile-backend.herokuapp.com/api",
    headers: {
      Authorization: "Bearer " + tokenFromLocalStorage,
    },
  });
  // handle the changes
  const handleChange = (e) => {
    const secretePileInfo = { ...secretePile };
    secretePileInfo[e.target.id] = e.target.value;
    setSecretePile(secretePileInfo);
    console.log(secretePileInfo);
  };
  // submit the secretes
  const submitSecretePileInfo = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosApi.post(
        `/secretepile/${localStorage.getItem("userId")}`,
        {
          secrete_title: secretePile.title,
          secrete_description: secretePile.description,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
      setCatchError(" sorry, some thing went wrong!");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "isLoggedIn") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Fragment>
      {isLoggedIn ? (
        <div className="secretes-page-wrapper">
          <div className="welcome-secrete-content">
            <p>
              Keep your seceretes here and be only to only one to know them in
              the world !{" "}
            </p>
          </div>
          <div className="secrete-form-wrapper">
            <form onSubmit={(e) => submitSecretePileInfo(e)}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                placeholder="title"
                className="secrete-title"
                id="title"
                value={secretePile.title}
                onChange={(e) => handleChange(e)}
                required
              />
              <label htmlFor="description">Description</label>
              <input
                type="text"
                placeholder="description"
                className="secrete-description"
                id="description"
                value={secretePile.description}
                onChange={(e) => handleChange(e)}
                required
              />
              <button className="secrete-btn">submit</button>
            </form>
          </div>
          <div className="catch-error" style={{ color: "red" }}>
            <p>{catchError}</p>
          </div>
        </div>
      ) : (
        <NotLoggedIn />
      )}
    </Fragment>
  );
};

export default AddSecretePile;
