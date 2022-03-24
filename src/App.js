import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Todos from "./pages/Todos/Todos";
import SignUp from "./pages/Signup/SignUp";
import Login from "./pages/Login/Login";
import Logout from "./components/layouts/Logout/Logout";
import SeeTodos from "./components/layouts/SeeTodos/SeeTodos";
import ScrollToTop from "./utils/ScrollToTop";
import VerifyEmail from "./components/layouts/VerifyEmail/VerifyEmail";
import ForgotPassword from "./components/layouts/ForgotPassword/ForgotPassword";
import PasswordResetCode from "./components/layouts/PasswordResetcode/PasswordResetCode";
import ResetPassword from "./components/layouts/ResetPassword/ResetPassword";
import ImageUploadToCloudinary from "./components/layouts/ImageUploadToCloudinary/ImageUploadToCloudinary";
import Admin from "./pages/Admin/Admin";
import NotFound from "./components/layouts/NotFound/NotFound";

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
