import React, { useState, useEffect } from "react";
import AddTodos from "../../components/layouts/AddTodos/AddTodos";
import SeeTodos from "../../components/layouts/SeeTodos/SeeTodos";
import UserProfile from "../../components/layouts/UserProfile/UserProfile";
import NotLoggedIn from "../../components/layouts/NotLoggedIn/NotLoggedIn";
import HomeLink from "../../links/HomeLink";
import LogoutLink from "../../links/LogoutLink";
import { HouseFill, BoxArrowRight } from "react-bootstrap-icons";
import "./Todos.css";

const Todos = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
            <UserProfile />
            <AddTodos />
            <SeeTodos />
          </div>
        </div>
      ) : (
        <NotLoggedIn />
      )}
    </div>
  );
};

export default Todos;
