import React, { useState, useEffect } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Todos from "./pages/Todos/Todos";
import SignUp from "./pages/Signup/SignUp";
import Login from "./pages/Login/Login";
import Logout from "./components/UI/Logout/Logout";
import SeeTodos from "./components/UI/SeeTodos/SeeTodos";
import ScrollToTop from "./utils/ScrollToTop";
import VerifyEmail from "./components/UI/VerifyEmail/VerifyEmail";
import ForgotPassword from "./components/UI/ForgotPassword/ForgotPassword";
import PasswordResetCode from "./components/UI/PasswordResetCode/PasswordResetCode";
import ResetPassword from "./components/UI/ResetPassword/ResetPassword";
import ImageUploadToCloudinary from "./components/UI/ImageUploadToCloudinary/ImageUploadToCloudinary";
import UserProfile from "./components/UI/UserProfile/UserProfile";
import Admin from "./pages/Admin/Admin";
import NotFound from "./components/UI/NotFound/NotFound";
import { AccessTokenContext } from "./context/AccessTokenContext/AccessTokenContext";
import { log } from "./utils/ConsoleLog";

const App = () => {
  const [accessToken, setAccessToken] = useState(null);
  useEffect(() => {
    setAccessToken(() => sessionStorage.getItem("accessToken"));
    log(accessToken);
  }, [accessToken]);

  return (
    <div>
      <HashRouter>
        <ScrollToTop />
        <Switch>
          <AccessTokenContext.Provider value={[accessToken, setAccessToken]}>
            <Route path="/" component={Home} exact />
            <Route path="/todos" component={Todos} />
            <Route path="/about" component={About} />
            <Route path="/signup" component={SignUp} />
            <Route path="/logout" component={Logout} />
            <Route path="/login" component={Login} />
            <Route path="/seetodos" component={SeeTodos} />
            <Route path="/verify-user-email/" component={VerifyEmail} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/password-reset-code" component={PasswordResetCode} />
            <Route path="/reset-password" component={ResetPassword} />
            <Route path="/admin" component={Admin} />
            <Route path="/profile" component={UserProfile} />
            <Route
              path="/image-upload-to-cloudinary"
              component={ImageUploadToCloudinary}
            />
          </AccessTokenContext.Provider>
          {/*more research for this component*/}
          <Route component={NotFound} />{" "}
        </Switch>
      </HashRouter>
    </div>
  );
};

export default App;
