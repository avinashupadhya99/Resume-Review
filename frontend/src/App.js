import React, { Component, useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import Home from "./pages/Home";
import View from "./pages/View";
import Invalid from "./pages/Invalid";
import Navbar from "./components/Navbar";
import Upload from "./pages/Upload";
import List from "./pages/List";

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const [resumePosts, setResumePosts] = useState([]);

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
      // timestamp: new Date(),
      userId: 2,
      id: 5,
      comments: [
        {
          userId: 1,
          // timestamp: new Date(),
          text: "there's too much whitespace",
        },
        {
          userId: 3,
          // timestamp: new Date(),
          text: "use less bullet points",
        },
      ],
    },
    {
      pdfLink: "./images/sampleresume.jpg",
      title: "Sophmore CS Major at UCSD",
      description: "Hey! I'm looking for feedback on my resume",
      tags: ["stem", "software engineering", "computer science"],
      // timestamp: new Date(),
      userId: 3,
      id: 4,
      comments: [
        {
          userId: 2,
          // timestamp: new Date(),
          text: "nice resume",
        },
      ],
    },
  ];
  console.log("[App.js] Resume Posts List in App.js:", dummyResumeList);

  const handleSuccessfulLogin = (res) => {
    setCurrentUser(res.profileObj);
    setLoggedIn(true);
    console.log("Login Success! Current User: ", res.profileObj);
  };

  const handleLogout = () => {
    setCurrentUser({});
    setLoggedIn(false);
    console.log("[App.js] Successfully logged out.");
  };

  const handleFailedLogin = (res) => {
    console.log("[App.js] Login Failed: ", res);
    setLoggedIn(false);
  };

  const handleNewResumePost = (resume) => {
    console.log("[App.js] New post submitted ");
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
    console.log("[App.js] New comment recieved");
  };

  const handleResumeId = (id) => {
    const res = dummyResumeList.find((x) => x.id == id);
    return res;
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
            <Route
              path="/view/:id"
              render={() => (
                <View
                  getResume={handleResumeId}
                  onNewComment={handleNewComment}
                />
              )}
            ></Route>
            <Route component={Invalid}></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
