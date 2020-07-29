import React from "react";

const CreatePost = () => {
  return (
    <div className="card main">
      <input type="text" placeholder="Title" />
      <input type="text" placeholder="Body" />
      <div className="file-field input-field">
        <div className="btn">
          <span>Choose an Image</span>
          <input type="file" />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button className="btn waves-effect waves-light">Submit</button>
    </div>
  );
};

export default CreatePost;
