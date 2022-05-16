/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from "react";
import AddTodos from "../../components/UI/AddTodos/AddTodos";
import SeeTodos from "../../components/UI/SeeTodos/SeeTodos";
import UserProfile from "../../components/UI/UserProfile/UserProfile";
import NotLoggedIn from "../../components/UI/NotLoggedIn/NotLoggedIn";
import MiniFooter from "../../components/layouts/MiniFooter/MiniFooter";
import HomeLink from "../../links/HomeLink";
import LogoutLink from "../../links/LogoutLink";
import { HouseFill, BoxArrowRight } from "react-bootstrap-icons";
import { TodoChangeContext } from "../../context/TodoChangeContext/TodoChangeContext";
import SwitchAdmin from "../../components/UI/SwitchAdmin/SwitchAdmin";
import "./Todos.css";

const Todos = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasTodosChanged, setHasTodosChanged] = useState(false);
  const role = localStorage.getItem("role");
  const [userRole, setUserRole] = useState(role);
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "isLoggedIn") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <div className="todo-wrapper">
          <header className="todo-header">
            <div className="todo-home-link">
              <HouseFill
                size={18}
                style={{ marginRight: "3px", color: "hsl(0, 0%, 100%)" }}
              />
              <HomeLink />
            </div>
            <div className="todo-logout-link">
              <BoxArrowRight
                size={19}
                style={{
                  marginRight: "3px",
                  color: "hsl(0, 0%, 100%)",
                }}
              />
              <LogoutLink />
            </div>
          </header>
          <div className="the-component-wrapper">
            <TodoChangeContext.Provider
              value={[hasTodosChanged, setHasTodosChanged]}
            >
              <SwitchAdmin roleAsProp={"user"} />
              <UserProfile />
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
