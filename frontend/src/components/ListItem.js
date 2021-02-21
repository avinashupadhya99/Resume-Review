import React from "react";
import { Link } from "react-router-dom";

const ListItem = ({ resume }) => {
  console.log("[ListItem.js] data", resume);
  return (
    <div>
      <h1>{resume.title}</h1>
      <p>{resume.description}</p>
      <h6>{resume.timestamp}</h6>
      <Link to={`/view/${resume.id}`}> View Resume</Link>
    </div>
  );
};

export default ListItem;
