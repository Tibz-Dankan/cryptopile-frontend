/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import AddTodos from "../../components/UI/AddTodos/AddTodos";
import SeeTodos from "../../components/UI/SeeTodos/SeeTodos";
import UserProfile from "../../components/UI/UserProfile/UserProfile";
import NotLoggedIn from "../../components/UI/NotLoggedIn/NotLoggedIn";
import MiniFooter from "../../components/layouts/MiniFooter/MiniFooter";
import HomeLink from "../../links/HomeLink";
import LogoutLink from "../../links/LogoutLink";
import { HouseFill, BoxArrowRight } from "react-bootstrap-icons";
import { TodoChangeContext } from "../../context/TodoChangeContext/TodoChangeContext";
import "./Todos.css";

const Todos = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasTodosChanged, setHasTodosChanged] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "isLoggedIn") {
      setIsLoggedIn(true);
    }
  }, []);

  // const reloadPage = () => {
  //   window.location.reload();
  // };
  // useEffect(
  //   // () => {

  //   // reloadPage()
  //   // const Interval = setInterval(reloadPage, 100);
  //   // clearInterval(Interval);
  //   // },
  //   [reloadPage]
  // );

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
