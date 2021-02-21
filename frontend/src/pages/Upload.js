import React, { useState } from "react";

const Upload = ({ onSubmit }) => {
  /**
   * TODO
   * add onClick to submit button after khiem makes it
   */
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
        accept="application/pdf"
        onChange={onChangeFile}
        style={{ display: "none" }}
      />
      <label htmlFor="file">Select File</label>
      <img src={file} alt="" />

      <br/>
      <br/>
      <br/>
      <br/>

      <h2>Title</h2>
      <br/>
      <form>
        <textarea className="comment" placeholder="Title" style={{color:"black", width:"500px", height:"30px", display: "block", marginLeft: "auto", marginRight:"auto", fontSize:"20px", borderRadius: "10px", padding: "10px" }}>
          
        </textarea>
      </form>

      <br/>
      <br/>

      <h2>Description</h2>
      <br/>
      <form>
        <textarea className="comment" placeholder="Description" style={{color:"black", width:"500px", height:"100px", display: "block", marginLeft: "auto", marginRight:"auto", fontSize:"20px", borderRadius: "10px", padding: "10px" }}>
          
        </textarea>
      </form>

      <br/>
      <br/>

      <h2>Tags</h2>
      <br/>
      <form>
        <textarea className="comment" placeholder="Tags" style={{color:"black", width:"500px", height:"30px", display: "block", marginLeft: "auto", marginRight:"auto", fontSize:"20px", borderRadius: "10px", padding: "10px" }}>
          
        </textarea>
      </form>

      <br/>
      <br/>

      <input type="submit" value="Submit" style={{
        color:"white", 
        width:"150px", 
        height:"50px",
        borderRadius: "25px", 
        border:"none", 
        backgroundColor:"#00d46a",
        fontSize: "15px",
        resize: "none",
        boxShadow: "0 4px 7px rgba(0, 0, 0, 0.4)",
        cursor:"pointer"
        }}/>

    </div>
  );
};

export default Upload;
