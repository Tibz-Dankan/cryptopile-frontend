import React, { useState, useContext } from "react";
import { TodoChangeContext } from "../../../context/TodoChangeContext/TodoChangeContext";
import backendBaseURL from "../../../constants/AxiosApi/axiosAuthorized";
import { enableButton, disableButton } from "../../../utils/ButtonState";
import { log } from "../../../utils/ConsoleLog";
import axios from "axios";
import "./AddTodos.css";
import { PulseLoader } from "react-spinners";
import jwt_decode from "jwt-decode";
import { AccessTokenContext } from "../../../context/AccessTokenContext/AccessTokenContext";

const AddTodos = () => {
  const [todo, setTodo] = useState({ description: "" });
  const [showPulseLoader, setShowPulseLoader] = useState(false);

  const [showTodoAddedSuccessfullyMsg, setShowTodoAddedSuccessfullyMsg] =
    useState(false);

  const dateOfAdd = new Date().toDateString();
  const timeOfAdd = new Date().toLocaleTimeString();

  const [showCatchError, setShowCatchError] = useState(false);

  const [hasTodoChanged, setHasTodoChanged] = useContext(TodoChangeContext);

  const TodoChanged = (value, setValue) => {
    switch (value) {
      case true:
        setValue(false);
        break;
      case false:
        setValue(true);
        break;
      default:
    }
  };

  // function to remove the todo added successfully message after 3 seconds
  const removeTodoAddedSuccessfullyMsg = () => {
    setTimeout(() => {
      setShowTodoAddedSuccessfullyMsg(false);
    }, 3000);
  };

  // jwt decode
  const userInfoToken = sessionStorage.getItem("userInfoToken");
  const decodedUserInfo = jwt_decode(userInfoToken);
  // log(decodedUserInfo);
  const userId = decodedUserInfo.userId;

  const [accessToken, setAccessToken] = useContext(AccessTokenContext);
  const updateAccessTokenContextWhenNull = () => {
    if (!accessToken) {
      setAccessToken(sessionStorage.getItem("accessToken"));
    }
  };
  updateAccessTokenContextWhenNull();
  console.log("AccessToken in the context " + accessToken);

  const axiosApiAuthorized = axios.create({
    baseURL: backendBaseURL,
    headers: {
      // Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      Authorization: "Bearer " + accessToken,
    },
  });

  // Post or submit the todo
  const addUserTodos = (e) => {
    e.preventDefault();
    disableButton("button");
    setShowPulseLoader(true);
    setShowCatchError(false);
    axiosApiAuthorized
      .post(`api/todo/${userId}`, {
        description: todo.description,
        dateOfAdd: dateOfAdd,
        timeOfAdd: timeOfAdd,
      })
      .then((response) => {
        log(response);
        setShowPulseLoader(false);
        // if (response.status === 200) {
        if (response.data.status === "success") {
          setShowTodoAddedSuccessfullyMsg(true);
          removeTodoAddedSuccessfullyMsg();
          enableButton("button");
          setTodo({ description: "" });
          TodoChanged(hasTodoChanged, setHasTodoChanged);
        }
      })
      .catch((error) => {
        log(error);
        setShowPulseLoader(false);
        setShowCatchError(true);
        enableButton("button");
      });
  };

  // Handle  the changes in the todo
  const handleTodoChanges = (e) => {
    const newTodo = { ...todo };
    newTodo[e.target.id] = e.target.value;
    setTodo(newTodo);
  };

  return (
    <div className="add-todos-wrapper">
      {/* THE TODO FORM */}
      <form onSubmit={(e) => addUserTodos(e)} className="add-todo-form">
        <div className="todo-form-heading">
          <p>Add TodoDescription</p>
        </div>
        {showPulseLoader ? (
          <PulseLoader size={12} color="hsl(180, 100%, 30%)" />
        ) : null}
        {showTodoAddedSuccessfullyMsg ? (
          <div className="todo-added-successfully">
            <p>Todo added successfully</p>
          </div>
        ) : null}
        {showCatchError ? (
          <p className="add-todo-catch-error-msg">
            Sorry, something went wrong!
          </p>
        ) : null}
        <label htmlFor="description">Description</label>
        <textarea
          className="add-todo-input-field"
          value={todo.description}
          onChange={(e) => handleTodoChanges(e)}
          id="description"
          placeholder=" Add Short Description"
          required
        ></textarea>
        <button className="btn add-todo-btn" id="button">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddTodos;
