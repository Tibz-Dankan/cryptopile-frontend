/* eslint-disable no-unused-vars */
import React, { Fragment, useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { log } from "./../../../utils/ConsoleLog";
import {
  FileTextFill,
  InfoCircle,
  BoxArrowInRight,
  PencilSquare,
  List,
  X,
} from "react-bootstrap-icons";
import "./Header.css";

const Header = () => {
  const [showNavLinks, setShowNavLinks] = useState(false);
  const [showListIcon, setShowListIcon] = useState(false);
  const [showXIcon, setShowXIcon] = useState(false);

  const getBrowserWindowWidth = () => {
    // const { innerWidth: width } = window;
    const width = window.innerWidth;
    return width;
  };

  const [browserWindowWidth, setBrowserWindowWidth] = useState(
    getBrowserWindowWidth()
  );
  const showNavLinksAndXIconAndHideListIcon = () => {
    setShowNavLinks(true);
    setShowXIcon(true);
    setShowListIcon(false);
  };
  const showTheListIconAndHideNavLinks = () => {
    log("Showing List Icons");
    setShowListIcon(true);
    setShowNavLinks(false);
    setShowXIcon(false);
  };

  useEffect(() => {
    const handleWidthResize = () => {
      log("Getting browser window width");
      setBrowserWindowWidth(getBrowserWindowWidth());
    };
    window.addEventListener("resize", handleWidthResize);
    // Optimized event listener #debouncing
    // window.addEventListener("resize", () => {
    //   const timeout = setTimeout(handleWidthResize, 500);
    //   clearTimeout(timeout);
    // });
    if (window.matchMedia("(min-width: 800px)").matches) {
      log("Showing Desktop links");
      setShowNavLinks(true);
      setShowXIcon(false);
      setShowListIcon(false);
    }
    // show icons on screens with 800px and below
    if (window.matchMedia("(max-width: 800px)").matches) {
      showTheListIconAndHideNavLinks();
    }
    return () => window.removeEventListener("resize", handleWidthResize);
  }, [browserWindowWidth]);

  return (
    <Fragment>
      <header className="header-wrapper">
        <div className="header-logo-wrapper">CryptoPile</div>
        {showXIcon && (
          <X
            size={30}
            className="header-icon"
            onClick={() => showTheListIconAndHideNavLinks()}
          />
        )}
        {showListIcon && (
          <List
            size={25}
            className="header-icon"
            onClick={() => showNavLinksAndXIconAndHideListIcon()}
          />
        )}
        {showNavLinks && (
          <nav className="header-link-wrapper">
            <ul className="header-unordered-list">
              <li className="header-list">
                <Link to="/todos" className="header-link header-todos-link">
                  <FileTextFill className="header-link-icon" />
                  Todos
                </Link>
              </li>
              <li className="header-list">
                <Link to="/about" className="header-link header-about-link">
                  <InfoCircle className="header-link-icon" />
                  About
                </Link>
              </li>
              <li className="header-list">
                <Link to="/login" className="header-link header-login-link">
                  <BoxArrowInRight size={18.5} className="header-link-icon" />
                  Log in
                </Link>
              </li>
              <li className="header-list">
                <Link to="/signup" className="header-link  header-signup-link">
                  <PencilSquare className="header-link-icon" />
                  Sign up
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </header>
    </Fragment>
  );
};

export default Header;
