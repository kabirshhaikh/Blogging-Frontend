import React from "react";
import AllPosts from "./AllPosts";
import CreatePost from "./CreatePost";
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page-container">
      <div className="create-post-container">
        <h1 style={{marginBottom:"10px"}}>Create a Post:</h1>
        <CreatePost />
      </div>
      <div className="all-posts-component-container">
        <h1 style={{marginBottom:"10px"}}>All Post's</h1>
        <AllPosts />
      </div>
    </div>
  );
};

export default HomePage;
