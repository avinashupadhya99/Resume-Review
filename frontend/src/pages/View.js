import React from "react";
import sampleresume from "../images/sampleresume.jpg";

/**
 * view a specific resume and all comments, timestamp from database
 */

const View = () => {
  return (
    <div>
      {/** need the database before we can fill */}
      <h1>Resume #1</h1>
      <img className="pdf" src={sampleresume} alt="PDF Could Not Be Loaded" />
    </div>
  );
};

export default View;
