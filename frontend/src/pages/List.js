import React from "react";
import { Link } from "react-router-dom";
import ListItem from "../components/ListItem";

const List = ({ resumePostList }) => {
  return (
    <div className="list">
      <div className="pad"></div>
      <section className="items">
        {resumePostList.map((resume, i) => {
          console.log("post", i, resume);
          <ListItem key={i} resume={resume} />;
        })}
      </section>

      {/**
       * TODO
       * figure out how to pass props to a link
       */}
      <Link to="/view">View Resume #1</Link>
    </div>
  );
};

export default List;
