import React, { useState } from "react";

/**
 * File upload page, require pdf format
 * allow them to tag the specific job industry or give comments about their goals
 * have to take the file upload and pass it to the database
 */

const Upload = () => {
  const [file, setFile] = useState("");

  const onChangeFile = (e) => {
    const new_file = e.target.files[0];
    console.log(new_file);
    if (new_file !== null) setFile(e.target.files[0]);
  };
  return (
    <div className="upload">
      <h1>Upload New Resume</h1>
      <br />
      <input
        type="file"
        name="file"
        className="file"
        id="file"
        accept=".pdf"
        onChange={onChangeFile}
        style={{ display: "none" }}
      />
      <label htmlFor="file">Select File</label>
      <img src={file} alt="" />
    </div>
  );
};

export default Upload;
