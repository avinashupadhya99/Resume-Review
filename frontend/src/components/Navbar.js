import React from "react";
import { GoogleLogin } from "react-google-login";
import { Route, BrowserRouter as Router, Link, Switch } from "react-router-dom";
// import ResumeFeedback from "../pages/View";
// import ResumeList from "../pages/View";
// import ResumeUpload from "../pages/Upload";
// import Home from "../pages/Home";
// import Invalid from "../pages/Invalid";

const CLIENT_ID =
  "956626273843-t281em1k26amkus44arum6lk434gr8su.apps.googleusercontent.com";

const Navbar = () => {
  const onLoginSuccess = (res) => {
    console.log("Successful login! Current user: ", res.profileObj);
  };

  const onLoginFailure = (res) => {
    console.log("Login failed");
  };

  return (
    <nav className="navbar">
      <Link className="navbar-title" to="/">
        Resume Review
      </Link>
      <div className="links">
        <Link to="/upload"> Upload New Resume </Link>
        <Link to="/list"> View Resumes</Link>
        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText="Login"
          onSuccess={onLoginSuccess}
          onFailure={onLoginFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
        {/* <Link
          style={{
            color: "white",
            backgroundColor: "#f1356d",
            borderRadius: "7px",
          }}
        >
          Log In
        </Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
