import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      alert("Please enter both the fields");
      return;
    }

    try {
      const data = {
        email: email,
        password: password,
      };

      const response = await fetch("http://localhost:4040/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        alert(responseData.message);
        localStorage.setItem("token", responseData.token);
        navigate("/get-all-posts");
      } else {
        const errorMessage = await response.json();
        alert(errorMessage.message);
        return;
      }
    } catch (err) {
      console.log("Error", err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="loginEmailAddress">Email address</label>
            <input
              type="email"
              className="form-control"
              id="login-email"
              placeholder="Enter email"
              onChange={handleEmail}
            />
          </div>
          <div className="form-group">
            <label htmlFor="loginPassWord">Password</label>
            <input
              type="password"
              className="form-control"
              id="loginPassword"
              placeholder="Password"
              onChange={handlePassword}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
