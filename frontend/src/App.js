import React, { Component, useState } from "react";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import Home from "./pages/Home";
import View from "./pages/View";
import Invalid from "./pages/Invalid";
import Navbar from "./components/Navbar";
import Upload from "./pages/Upload";
import List from "./pages/List";

/**
 * Navbar and content to display should be complete in this file basically but we still have to store all of the states in here
 */

/**
 * hi khiem
 */
const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSuccessfulLogin = (res) => {
    console.log("Login Success! Current User: ", res.profileObj);
    setCurrentUser(res.profileObj);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setCurrentUser({});
    setLoggedIn(false);
    console.log("Successfully logged out.");
  };

  const handleFailedLogin = (res) => {
    console.log("Login Failed: ", res);
    setLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <Navbar
          onSuccessfulLogin={handleSuccessfulLogin}
          onLogOut={handleLogout}
          user={currentUser}
          loggedIn={loggedIn}
        />
        {/* <p> {currentUser.googleId} </p> */}
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/upload" component={Upload}></Route>
            <Route path="/list" component={List}></Route>
            <Route path="/view" component={View}></Route>
            <Route component={Invalid}></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
