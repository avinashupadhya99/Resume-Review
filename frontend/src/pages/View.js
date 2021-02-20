import React from "react";
import sampleresume from "../images/sampleresume.jpg";

/**
 * view a specific resume with all comments below and timestamp + details to the side maybe
 * probably have to pass in an object representing the resume to the props
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
