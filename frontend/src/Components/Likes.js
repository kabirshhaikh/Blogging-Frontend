import React, { useState } from "react";
import "./Likes.css";

const Likes = ({ postId, userId }) => {
  const [data, setData] = useState([]);

  const handleLikes = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:4040/add-like/${postId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const DATA = await response.json();
        setData(DATA.postObject.likes);
        console.log("DATA from Like:", DATA);
        alert(DATA.message);
      } else {
        alert("Unable to post a like");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="likes-container">
      <button
        onClick={handleLikes}
        type="button"
        className="btn btn-outline-secondary"
      >
        Like {"->" + data.length === 0 ? "0 Likes" : data.length}
      </button>
    </div>
  );
};

export default Likes;
