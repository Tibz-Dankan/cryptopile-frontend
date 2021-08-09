import React, { Fragment, useState } from "react";
import axios from "axios";
import "./../App.css";
const Secretes = () => {
  const [secretePile, setSecretePile] = useState({
    title: "",
    description: "",
  });
  const [getMySecerete, setGetMySecrete] = useState([]);
  // get the token from the local storage
  const tokenFromLocalStorage = localStorage.getItem("accessToken");
  //request along the token
  const axiosApi = axios.create({
    baseURL: "http://localhost:5000/api",
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
    const response = await axiosApi.post(
      `/secretepile/${localStorage.getItem("userId")}`,
      {
        title: secretePile.title,
        description: secretePile.description,
      }
    );
    console.log(response);
  };
  //the get secretes
  const getSecretes = async () => {
    const response = await axiosApi.get(
      `/getsecretepile/${localStorage.getItem("userId")}`
    );
    console.log(response);
    setGetMySecrete(response);
  };
  return (
    <Fragment>
      <div className="secretes-page-wrapper">
        <div className="welcome-secrete-content">
          <p>
            Keep your seceretes here and be only to only one to know them in the
            world !{" "}
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
            />
            <label htmlFor="description">Description</label>
            <input
              type="text"
              placeholder="description"
              className="secrete-description"
              id="description"
              value={secretePile.description}
              onChange={(e) => handleChange(e)}
            />
            <button className="secrete-btn">submit</button>
          </form>
        </div>
        <div className="get-secretes-wrapper">
          <button onClick={getSecretes}>See my secretes</button>
          <p>{getMySecerete}</p>
        </div>
      </div>
    </Fragment>
  );
};

export default Secretes;
