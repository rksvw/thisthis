import React, { useState } from "react";
import { Link } from "react-router-dom";
import Google from "./Google";

function Signup() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.username ||
      !formData.fullname ||
      !formData.email ||
      !formData.password
    ) {
      console.log("Please fill out all fields");
    }
    try {
      const res = await fetch("/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        console.log("Data is not successed");
      }
      if (res.ok) {
        console.log(data);
      }
    } catch (err) {
      console.log("Facing Render Error: ", err.message);
    }
  };
  return (
    <>
      <div className="card flex w-[440px] flex-col items-center justify-center text-center">
        <form onSubmit={handleSubmit}>
          <div
            className="flex w-[280px] flex-col items-center justify-center text-center"
            id="CNacc"
          >
            <h1 className="flex items-center justify-center" id="Cacc">
              Create new account
            </h1>
            <p id="Log">
              Have an account?{" "}
              <span>
                {" "}
                <Link to={"/login"}> Login</Link>
              </span>
            </p>
          </div>
          <div className="container">
            <input
              type="text"
              name="fullname"
              id="fullname"
              onChange={handleChange}
              placeholder="Your name"
            />
          </div>
          <div className="container">
            <input
              type="text"
              name="username"
              id="username"
              onChange={handleChange}
              placeholder="Your username"
            />
          </div>
          <div className="container">
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              placeholder="example@gmail.com"
            />
          </div>
          <div className="container">
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              placeholder="********"
            />
          </div>

          <button type="submit" id="signup">
            Sign up
          </button>
          <Google />
        </form>
      </div>
    </>
  );
}

export default Signup;
