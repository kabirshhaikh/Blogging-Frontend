import React from "react";
import "./App.css";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Home from "./Components/Home";
import AllPosts from "./Components/AllPosts";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="root-container">
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/sign-up" Component={SignUp} />
        <Route path="/login" Component={Login} />
        <Route path="/get-all-posts" Component={AllPosts} />
      </Routes>
    </div>
  );
};

export default App;
