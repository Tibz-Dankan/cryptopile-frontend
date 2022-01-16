import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import About from "./components/About";
import AddPile from "./components/AddPile";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Logout from "./components/Logout";
import ViewMypile from "./components/ViewMypile";
import ScrollToTop from "./components/ScrollToTop";
import AddSecretePile from "./components/AddSecretePile";
import ViewSecretePile from "./components/ViewSecretePile";
import VerifyEmail from "./components/VerifyEmail";
import ForgotPassword from "./components/ForgotPassword";
import PasswordResetCode from "./components/PasswordResetCode";
import ResetPassword from "./components/ResetPassword";
import ImageUploadToCloudinary from "./components/ImageUploadToCloudinary";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <div>
      <HashRouter>
        {/* scroll to the top copmponent here please */}
        <ScrollToTop />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/about" component={About} />
          <Route path="/signup" component={SignUp} />
          <Route path="/logout" component={Logout} />
          <Route path="/login" component={Login} />
          <Route path="/addpile" component={AddPile} />
          <Route path="/viewmypile" component={ViewMypile} />
          <Route path="/addsecretepile" component={AddSecretePile} />
          <Route path="/viewsecretepile" component={ViewSecretePile} />
          <Route path="/verify-user-email/" component={VerifyEmail} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/password-reset-code" component={PasswordResetCode} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route
            path="/image-upload-to-cloudinary"
            component={ImageUploadToCloudinary}
          />
          <Route component={NotFound} /> {/*more research for this compoent*/}
        </Switch>
      </HashRouter>
    </div>
  );
};

export default App;
