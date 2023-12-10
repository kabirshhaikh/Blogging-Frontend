import React, { useEffect, useState } from "react";

const Comments = ({ postId }) => {
  const [commentData, setCommentData] = useState("");
  console.log("Post id from frontend:" + postId);

  const fetchComments = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:4040/get-all-comments/${postId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const recievedComments = await response.json();
        setCommentData(recievedComments.comments);
      } else {
        console.log("Unable to get comments");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return (
    <div>
      {console.log("Comment data" + commentData)}
      {commentData.length === 0 ? (
        <h1>No Comments to has been posted as of yet!</h1>
      ) : (
        <div>
          {commentData.map((item) => (
            <div key={item._id}>
              <p>{item.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;
