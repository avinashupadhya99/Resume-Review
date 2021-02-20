import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import ResumeFeedback from "./pages/ResumeFeedback";
import ResumeList from "./pages/ResumeList";
import ResumeUpload from "./pages/ResumeUpload";

function App() {
  return (
    <Router basename="/">
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Resume Reviewer
          </a>
          <ul>
            <li>
              <Link to="/" exact>
                {" "}
                Home
              </Link>
            </li>
            <li>
              <Link to="/upload"> Upload New Resume</Link>
            </li>
            <li>
              <Link to="/list"> View all resumes</Link>
            </li>
          </ul>
          <button className="login">Log In</button>
        </div>
      </nav>

      <Switch>
        <Route path="/feedback" exact component={ResumeFeedback}></Route>
        <Route path="/upload" exact component={ResumeUpload}></Route>
        <Route path="/list" exact component={ResumeList}></Route>
        <Route path="/" exact component={Home}></Route>
      </Switch>
    </Router>
  );
}

export default App;
