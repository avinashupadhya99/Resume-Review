import React from "react";
import { GoogleLogin } from "react-google-login";
import { Route, BrowserRouter as Router, Link, Switch } from "react-router-dom";

import logo from "../images/logo.png";

/**
 * you can change the css to match the figma. i scrapped my progress and followed a tutorial just to get the links working first bc i wasted at least an hour on that
 * overall link structure should be okay
 */
const CLIENT_ID =
  "956626273843-t281em1k26amkus44arum6lk434gr8su.apps.googleusercontent.com";

const Navbar = ({ onSuccessfulLogin, onLogOut, user, loggedIn }) => {
  const onLoginFailure = (res) => {
    console.log("Login failed");
  };

  return (
    <nav className="navbar">
      <Link className="navbar-title" to="/">
        <img src={logo} width="170" height="40" />
      </Link>
      <div className="links">
        <Link to="/upload"> Upload New Resume </Link>
        <Link to="/list">View Resumes</Link>
        {loggedIn ? (
          <>
            <Link to="#"> Hello, {user.name}</Link>
            <button
              onClick={onLogOut}
              style={{
                backgroundColor: "black",
                color: "white",
                borderRadius: "2px",
                padding: "10px",
                cursor: "pointer",
                border: "1px solid rgba(255, 255, 255, 1)",
                width: "100px",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <GoogleLogin
            className="google-login"
            clientId={CLIENT_ID}
            buttonText="Login"
            onSuccess={onSuccessfulLogin}
            onFailure={onLoginFailure}
            cookiePolicy={"single_host_origin"}
            isSignedIn={false}
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                style={{
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "2px",
                  padding: "10px",
                  cursor: "pointer",
                  border: "1px solid rgba(255, 255, 255, 1)",
                  width: "100px",
                }}
              >
                Login
              </button>
            )}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
