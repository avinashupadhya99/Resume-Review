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
  const [currentUser, setCurrentUser] = useState(null);

  const handleSuccessfulLogin = (res) => {
    console.log("Login Success! Current User: ", res.profileObj);
  };

  const handleFailedLogin = (res) => {
    console.log("Login Failed: ", res);
  };

  return (
    <Router>
      <div className="App">
        <Navbar onSuccessfulLogin={handleSuccessfulLogin} />
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
