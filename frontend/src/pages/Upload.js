import React from "react";

/**
 * File upload page, require pdf format
 * allow them to tag the specific job industry or give comments about their goals
 * have to take the file upload and pass it to the database
 */


const Upload = () => {
  const onChangeHandler = (e) => {
    console.log(e.target.files[0]);
  };
  return (
    <div className="upload">
      <h1>Upload New Resume</h1>
      <br/>
      <input type="file" name="file" class="file" id="file" onChange={onChangeHandler} style={{display: 'none'}} />
      <label for="file">Select File</label>
    </div>
  );
};

export default Upload;
