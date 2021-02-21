import React, { useState } from "react";
import axios from "axios";

const Upload = ({ onSubmit }) => {
  /**
   * TODO
   * add onClick to submit button after khiem makes it
   */
  const [file, setFile] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  

  const onChangeFile = (e) => {
    const new_file = e.target.files[0];
    setFile(new_file);
  };

  const handleSubmission = (event) => {
    event.preventDefault();
		const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', tags);
    // TODO: Removed hard coded value
    formData.append('user_id', '1234567899');

    axios({
      method: 'post',
      url: 'http://104.211.49.83/resume/add',
      data: formData,
      headers: {'Content-Type': 'multipart/form-data' }
      })
      .then(function (response) {
          //handle success
          console.log(response);
          // Clear fields
      })
      .catch(function (response) {
          //handle error
          console.log(response);
          // Display error message
      });
  }

  return (
    <div className="upload">
      <h1>Upload New Resume</h1>
      <br />
      <form onSubmit={handleSubmission}>
        <input
          type="file"
          name="file"
          className="file"
          id="file"
          accept="application/pdf"
          onChange={onChangeFile}
          style={{ display: "none" }}
        />
        <label htmlFor="file">Select File</label>
        {/* <h2>{file}</h2> */}

        <br />
        <br />
        <br />
        <br />

        <h2>Title</h2>
        <br />
      
        <textarea
          className="comment"
          placeholder="Title"
          style={{
            color: "black",
            width: "500px",
            height: "30px",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            fontSize: "20px",
            borderRadius: "10px",
            padding: "10px",
          }}
          onChange={e => setTitle(e.target.value)}
        ></textarea>

      <br />
      <br />

      <h2>Description</h2>
      <br />
        <textarea
          className="comment"
          placeholder="Description"
          style={{
            color: "black",
            width: "500px",
            height: "100px",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            fontSize: "20px",
            borderRadius: "10px",
            padding: "10px",
          }}
          onChange={e => setDescription(e.target.value)}
        ></textarea>

      <br />
      <br />

      <h2>Tags</h2>
      <br />
        <textarea
          className="comment"
          placeholder="Tags"
          style={{
            color: "black",
            width: "500px",
            height: "30px",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            fontSize: "20px",
            borderRadius: "10px",
            padding: "10px",
          }}
          onChange={e => setTags(e.target.value)}
        ></textarea>

        <br />
        <br />

        <input
          type="submit"
          value="Submit"
          style={{
            color: "white",
            width: "150px",
            height: "50px",
            borderRadius: "25px",
            border: "none",
            backgroundColor: "#00d46a",
            fontSize: "15px",
            resize: "none",
            boxShadow: "0 4px 7px rgba(0, 0, 0, 0.4)",
            cursor: "pointer",
          }}
        />
      </form>
    </div>
  );
};

export default Upload;
