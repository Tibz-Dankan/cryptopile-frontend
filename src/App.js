import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import About from "./components/About";
import Mypile from "./components/Mypile";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Logout from "./components/Logout";
import ViewMypile from "./components/ViewMypile";
import ScrollToTop from "./components/ScrollToTop";
import { TokenContext } from "./components/context/TokenContext";
// visit some websites for design and what to go with man isn't !
const App = () => {
  const [globalUserId, setGlobalUserId] = useState("");

  return (
    <div>
      <BrowserRouter>
        {/* scroll to the top copmponent here please */}
        <ScrollToTop />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/about" component={About} />
          <Route path="/signup" component={SignUp} />
          <Route path="/logout" component={Logout} />
          <TokenContext.Provider value={{ globalUserId, setGlobalUserId }}>
            <Route path="/login" component={Login} />
            <Route path="/mypile" component={Mypile} />
            <Route path="/viewmypile" component={ViewMypile} />
          </TokenContext.Provider>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
