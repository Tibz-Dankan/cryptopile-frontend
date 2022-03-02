import React, { useState } from "react";
import axiosApiAuthorized from "./axiosAuthorized";
import "./../css/AddTodos.css";
import { PulseLoader } from "react-spinners";

const AddTodos = () => {
  const [todo, setTodo] = useState({ description: "" });
  const [showPulseLoader, setShowPulseLoader] = useState(false);

  const [showTodoAddedSuccessfullyMsg, setShowTodoAddedSuccessfullyMsg] =
    useState(false);
  const userId = localStorage.getItem("userId");

  const dateOfAdd = new Date().toDateString();
  const timeOfAdd = new Date().toLocaleTimeString();

  const [showCatchError, setShowCatchError] = useState(false);

  // function to remove the todo added successfully message after 3 seconds
  const removeTodoAddedSuccessfullyMsg = () => {
    setTimeout(() => {
      setShowTodoAddedSuccessfullyMsg(false);
    }, 3000);
  };

  // Post or submit the todo
  const addUserTodos = (e) => {
    e.preventDefault();
    setShowPulseLoader(true);
    setShowCatchError(false);
    axiosApiAuthorized
      .post(`api/todo/${userId}`, {
        description: todo.description,
        dateOfAdd: dateOfAdd,
        timeOfAdd: timeOfAdd,
      })
      .then((response) => {
        console.log(response);
        setShowPulseLoader(false);
        if (response.status === 200) {
          setShowTodoAddedSuccessfullyMsg(true);
          removeTodoAddedSuccessfullyMsg();
        }
      })
      .catch((error) => {
        console.log(error);
        setShowPulseLoader(false);
        setShowCatchError(true);
      });
  };

  // Handle  the changes in the todo
  const handleTodoChanges = (e) => {
    const newTodo = { ...todo };
    newTodo[e.target.id] = e.target.value;
    setTodo(newTodo);
    // console.log(newTodo);
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
          <p className="catch-error-msg">Sorry something went wrong!</p>
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
        <button className="btn add-todo-btn">Add</button>
      </form>
    </div>
  );
};

export default AddTodos;
