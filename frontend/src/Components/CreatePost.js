import React, { useState } from "react";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [picture, setPicture] = useState(null);

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleContent = (event) => {
    setContent(event.target.value);
  };

  const handlePicture = (event) => {
    setPicture(event.target.files);
  };

  const handleForm = async (event) => {
    event.preventDefault();

    console.log(title, content, picture);

    if (!title || !content || !picture) {
      alert("Please fill all the fileds");
      return;
    }

    const formData = {
      title: title,
      content: content,
      postPicture: picture,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:4040/create-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Post created sucessfully!");
        alert("Post created sucessfully");
        window.location.reload();
      } else {
        console.log("Unable to create post");
        alert("Unable to create the post!");
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="create-post-container">
      <form onSubmit={handleForm}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter Title"
            onChange={handleTitle}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="content"
            placeholder="Enter Content"
            onChange={handleContent}
          />
        </div>
        <div className="form-group">
          <label htmlFor="profile-picture">Picture For Post</label>
          <br />
          <input
            type="file"
            className="form-control-file"
            id="postPicture"
            onChange={handlePicture}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
