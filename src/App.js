import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import About from "./components/About";
import Todos from "./components/Todos";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Logout from "./components/Logout";
import SeeTodos from "./components/SeeTodos";
import ScrollToTop from "./components/ScrollToTop";
import VerifyEmail from "./components/VerifyEmail";
import ForgotPassword from "./components/ForgotPassword";
import PasswordResetCode from "./components/PasswordResetCode";
import ResetPassword from "./components/ResetPassword";
import ImageUploadToCloudinary from "./components/ImageUploadToCloudinary";
import Admin from "./components/Admin";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <div>
      <HashRouter>
        {/* scroll to the top components here please */}
        <ScrollToTop />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/todos" component={Todos} exact />
          <Route path="/about" component={About} />
          <Route path="/signup" component={SignUp} />
          <Route path="/logout" component={Logout} />
          <Route path="/login" component={Login} />
          <Route path="/seetodos" component={SeeTodos} />
          <Route path="/verify-user-email/" component={VerifyEmail} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/password-reset-code" component={PasswordResetCode} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/authorized-cryptopile-admin" component={Admin} />
          <Route
            path="/image-upload-to-cloudinary"
            component={ImageUploadToCloudinary}
          />
          <Route component={NotFound} /> {/*more research for this component*/}
        </Switch>
      </HashRouter>
    </div>
  );
};

export default App;
