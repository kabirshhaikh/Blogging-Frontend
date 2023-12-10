import React, { useEffect, useState } from "react";
import Comments from "../Components/Comments";
import "./AllPost.css";

const AllPosts = () => {
  const [data, setData] = useState([]);

  const helperFunctionToFetch = async (url, options) => {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        };
      }
      const response = await fetch(url, options);
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    try {
      const response = await helperFunctionToFetch(
        "http://localhost:4040/get-all-posts",
        {
          method: "GET",
          headers: {},
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        setData(responseData.allPosts);
      } else {
        const error = await response.json();
        console.log(error.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="all-posts-container">
      {console.log(data)}
      {data ? (
        data.map((item) => (
          <div key={item._id} className="allposts">
            <div className="card">
              <img
                className="card-img-top"
                src={item.postPicture}
                alt="Card image cap"
              />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.content}</p>
              </div>
            </div>
            <div style={{marginBottom:"30px"}} className="post-comments-container">
              <div className="card">
                <div className="card-body">
                  <Comments postId={item._id} />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1>No post's to show</h1>
      )}
    </div>
  );
};

export default AllPosts;
