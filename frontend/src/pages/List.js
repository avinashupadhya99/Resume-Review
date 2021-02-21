import React from "react";
import { Link } from "react-router-dom";
import ListItem from "../components/ListItem";

const List = ({ resumePostList }) => {
  console.log("Resume Post List in List:", resumePostList);
  let listMarkup = (
    <div>
      resumePostList.map(<h1>Hello World</h1>)
    </div>
  );
  return (
    <div className="list">
      <div className="pad"></div>
      <section className="items">
        {resumePostList.map((resume, i) => (
          <ListItem key={i} resume={resume} />
        ))}
      </section>

      <Link to="/view/5">View Resume #1</Link>
    </div>
  );
};

export default List;
