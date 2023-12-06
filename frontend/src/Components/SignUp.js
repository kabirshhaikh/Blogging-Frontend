import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  let navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastName = (event) => {
    setLastName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleProfilePicture = (event) => {
    setProfilePicture(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !gender ||
      !email ||
      !password ||
      !profilePicture
    ) {
      alert("Please enter all the fields");
      return;
    }

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("gender", gender);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profilePicture", profilePicture);

    try {
      const response = await fetch("http://localhost:4040/signup", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        if (data.redirectTo) {
          navigate(data.redirectTo);
        } else {
          navigate(data.redirectTo);
        }
      } else {
        console.log("Failed to sign up the user");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="signup-container">
      <div className="bootstrap-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              onChange={handleFirstName}
              placeholder="First Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Last Name"
              onChange={handleLastName}
            />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="male"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={handleGenderChange}
              />
              <label className="form-check-label" htmlFor="male">
                Male
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="female"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={handleGenderChange}
              />
              <label className="form-check-label" htmlFor="female">
                Female
              </label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="emailId"
              aria-describedby="emailHelp"
              placeholder="Email"
              onChange={handleEmail}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="passWord"
              placeholder="Password"
              onChange={handlePassword}
            />
          </div>
          <div className="form-group">
            <label htmlFor="profile-picture">Profile Picture</label>
            <input
              type="file"
              className="form-control-file"
              id="profilePicture"
              onChange={handleProfilePicture}
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

export default SignUp;
