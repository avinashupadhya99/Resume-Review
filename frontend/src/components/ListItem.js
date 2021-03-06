import React from "react";
import { Link } from "react-router-dom";

const ListItem = ({ resume }) => {
  console.log("[ListItem.js] data", resume);
  return (
    <div id="item-list">
      <div className="search"></div>
      <ul>
        <li>
          <div className="item">
              <h2 className="list-title">{resume.title}</h2>
              <span>{resume.description}</span>
            <br/>
            <br/>
            <Link className="button" to={`/view/${resume.id}`}>
              View Resume
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ListItem;
