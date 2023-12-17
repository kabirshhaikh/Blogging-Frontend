import React, { useEffect, useState } from "react";
import "./Comments.css";

const Comments = ({ postId, userId }) => {
  const [commentData, setCommentData] = useState("");
  const [addedComment, setAddedComment] = useState("");
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const toggleDropDown = () => {
    setDropDownOpen(!dropDownOpen);
  };

  const handleEditCommment = () => {
    console.log("Edit comment");
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:4040/delete-comment/${postId}/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        alert("Comment deleted sucessfully!");
        window.location.reload();
      } else {
        alert("Unable to delete the comment!");
        return;
      }
    } catch (err) {
      console.log(err + "delete comment error");
    }
  };

  const handleAddedComment = (event) => {
    setAddedComment(event.target.value);
  };

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

  const addComment = async (event) => {
    event.preventDefault();
    if (!addedComment) {
      alert("Add something to comment");
      return;
    }

    try {
      const commentPostedByUser = {
        comment: addedComment,
        post: postId,
        user: userId,
      };

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:4040/add-comment/${postId}`,
        {
          method: "POST",
          body: JSON.stringify(commentPostedByUser),
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        alert("Comment added sucessfully");
        window.location.reload();
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
          <div className="add-comment-container">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <button
                  onClick={addComment}
                  type="button"
                  className="btn btn-outline-primary"
                >
                  Add Comment
                </button>
              </div>
              <input
                type="text"
                className="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                onChange={handleAddedComment}
              />
            </div>
          </div>
          {commentData.map((item) => (
            <div key={item._id} className="existing-comment-container">
              <div className="comment">
                <p>{item.comment}</p>
              </div>
              <div className="edit-dropdown-container">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={toggleDropDown}
                >
                  ...
                </button>
                {dropDownOpen && (
                  <>
                    <a
                      className="edit-button"
                      onClick={() => handleEditCommment(item._id)}
                    >
                      Edit
                    </a>
                    <a
                      className="delete-button"
                      onClick={() => handleDeleteComment(item._id)}
                    >
                      Delete
                    </a>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;
