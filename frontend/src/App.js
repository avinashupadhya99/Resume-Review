import React, { Component, useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import Home from "./pages/Home";
import View from "./pages/View";
import Invalid from "./pages/Invalid";
import Navbar from "./components/Navbar";
import Upload from "./pages/Upload";
import List from "./pages/List";
import CommentSection from "./components/CommentSection";

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const [resumePosts, setResumePosts] = useState([]);

  /**
   * TODO
   * get username
   */
  const getUsername = (userId) => {
    return 0;
  };

  /**
   * TODO
   * use axios or fetch to get database
   * populate resumePost objects
   */
  useEffect(() => {}, []);

  const dummyResumeList = [
    {
      pdfLink: "./images/sampleresume.jpg",
      title: "3rd year grad student at UCLA",
      description: "Hey! I'm looking for feedback on my resume",
      tags: ["premed", "bio", "research"],
      timestamp: new Date(),
      userId: 2,
      comments: [
        {
          userId: 1,
          timestamp: new Date(),
          text: "there's too much whitespace",
        },
        {
          userId: 3,
          timestamp: new Date(),
          text: "use less bullet points",
        },
      ],
    },
    {
      pdfLink: "./images/sampleresume.jpg",
      title: "Sophmore CS Major at UCSD",
      description: "Hey! I'm looking for feedback on my resume",
      tags: ["stem", "software engineering", "computer science"],
      timestamp: new Date(),
      userId: 3,
      comments: [
        {
          userId: 2,
          timestamp: new Date(),
          text: "nice resume",
        },
      ],
    },
  ];

  const handleSuccessfulLogin = (res) => {
    setCurrentUser(res.profileObj);
    setLoggedIn(true);
    console.log("Login Success! Current User: ", res.profileObj);
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

  const handleNewResumePost = (resume) => {
    /**
     * add the resume into our database
     * TODO
     */
  };

  const handleNewComment = (resume) => {
    /**
     * TODO
     * add comment into resume post in database
     */
    console.log("new comment");
  };

  return (
    <Router>
      <div className="App">
        <Navbar
          onSuccessfulLogin={handleSuccessfulLogin}
          onFailedLogin={handleFailedLogin}
          onLogOut={handleLogout}
          user={currentUser}
          loggedIn={loggedIn}
        />
        {/* <p> {currentUser.googleId} </p> */}
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route
              path="/upload"
              render={() => <Upload onSubmit={handleNewResumePost} />}
            ></Route>
            <Route
              path="/list"
              render={() => <List resumePostList={dummyResumeList} />}
            ></Route>
            <Route path="/test/:prop" component={View}></Route>
            <Route path="/view/:id" children={<View />}></Route>
            <Route component={Invalid}></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
