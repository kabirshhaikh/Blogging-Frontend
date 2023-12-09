import React from "react";
import AllPosts from "./AllPosts";
import CreatePost from "./CreatePost";

const HomePage = () => {
  return (
    <div className="home-page-container">
      <div className="create-post-container">
        <CreatePost />
      </div>
      <div className="all-posts-component-container">
        <AllPosts />
      </div>
    </div>
  );
};

export default HomePage;
