import { IoMdPerson } from "react-icons/io";
import { MdOutlinePassword } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import Google from "./Google";
import "../index.css";
import { Alert, Spinner } from "flowbite-react";
import { useState } from "react";
import {
  signInStart,
  signInSuccess,
  singInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const [formData, setFormData] = useState({});
  const { loading, error: errMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.email === "" ||
      formData.password === "" ||
      !formData.email ||
      !formData.password
    ) {
      // console.log("Please fill out all required fields");
      return dispatch(singInFailure("Please fill out all required fields."));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        // console.log("Data is not successed");
        dispatch(singInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/profile");
        // this.setState(userData);
      }
    } catch (error) {
      // console.log("Facing Render Error: ", err.message);
      dispatch(singInFailure(error.message));
    }
  };

  return (
    <>
      <div className="card my-32 flex w-[440px] flex-col items-center justify-center text-center">
        <div className="flex w-[280px] flex-col items-center justify-center py-6">
          <h1
            className="flex h-[50px] w-[280px] flex-col items-center justify-center bg-[#2F008099] text-[20px] font-bold text-[#fff]"
            id="login-text"
          >
            Login to your account
          </h1>
          <p className="flex justify-center" id="Nacc">
            Don't have account?{" "}
            <span>
              {" "}
              <Link to={"/signup"}>Sign up</Link>
            </span>
          </p>
          <form
            id="login-form"
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center"
          >
            <IoMdPerson id="person-icon" />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="email"
              onChange={handleChange}
              className="flex h-[39px] w-[280px] text-xl"
            />

            <MdOutlinePassword id="pass-icon" />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={handleChange}
              className="flex h-[39px] w-[280px] text-xl"
            />
            <div className="flex w-[280px] items-center justify-between text-[12px]">
              <div className="flex" id="rem-me">
                <input type="checkbox" name="remember" id="remember" />
                <label htmlFor="remember" id="remember-me">
                  Remember me
                </label>
              </div>
              <div className="flex" id="repass">
                <Link to="/fgquiz">Forgotten password?</Link>
              </div>
            </div>
            <button
              type="submit"
              id="login"
              disabled={loading}
              className="h-[39px] w-[158px] cursor-pointer"
            >
              {loading ? (
                <>
                  <Spinner size={"sm"} />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <Google />
        </div>
        {errMessage && (
          <Alert className="mb-10" color={"failure"}>
            {errMessage}
          </Alert>
        )}
      </div>
    </>
  );
}
