import React, { useEffect, useState } from "react";

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

  useEffect(() => {
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
    fetchData();
  }, []);

  return (
    <div className="all-posts-container">
      {console.log(data)}
      <div>All posts </div>
      <h1>Title: {data.title}</h1>
    </div>
  );
};

export default AllPosts;
