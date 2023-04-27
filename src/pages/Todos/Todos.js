/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import AddTodos from "../../components/UI/AddTodos/AddTodos";
import SeeTodos from "../../components/UI/SeeTodos/SeeTodos";
import NotLoggedIn from "../../components/UI/NotLoggedIn/NotLoggedIn";
import MiniFooter from "../../components/layouts/MiniFooter/MiniFooter";
import { TodoChangeContext } from "../../context/TodoChangeContext/TodoChangeContext";
import SwitchAdmin from "../../components/UI/SwitchAdmin/SwitchAdmin";
import CustomHeader from "../../components/layouts/CustomHeader/CustomHeader";
import "./Todos.css";

const Todos = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasTodosChanged, setHasTodosChanged] = useState(false);
  const role = sessionStorage.getItem("role");
  const [userRole, setUserRole] = useState(role);
  useEffect(() => {
    if (sessionStorage.getItem("accessToken") !== null) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <div className="todo-wrapper">
          <CustomHeader />
          <div className="the-component-wrapper">
            <TodoChangeContext.Provider
              value={[hasTodosChanged, setHasTodosChanged]}
            >
              <SwitchAdmin roleAsProp={"user"} />
              <AddTodos />
              <SeeTodos />
              <MiniFooter />
            </TodoChangeContext.Provider>
          </div>
        </div>
      ) : (
        <NotLoggedIn />
      )}
    </div>
  );
};

export default Todos;
