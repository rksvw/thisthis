import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPass() {
  const [newPass, setNewPass] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPass) {
      console.log("Enter your new password!");
    } else {
      try {
        const res = await fetch("/api/user/cgpass", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPass),
        });

        const data = res.json();
        if (data.success === false) {
          console.log("Password doesn't change successfully");
        }

        if (res.ok) {
          console.log("Password Change Successfully");
          navigate("/login");
        }
      } catch (err) {
        console.log("A forget password submit error: ", err.message);
      }
    }
  };

  const handleChange = (e) => {
    setNewPass({ ...setNewPass, [e.target.name]: e.target.value.trim() });
    console.log(newPass);
  };
  return (
    <>
      <div className="card flex w-[440px] flex-col items-center justify-center text-center">
        <form id="Fpass" onSubmit={handleSubmit}>
          <h1>New Pasword</h1>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="example@gmail.com"
            onChange={handleChange}
          />
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            placeholder="New password"
            onChange={handleChange}
          />
          <button type="submit" id="FpBtn">
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default ForgotPass;
