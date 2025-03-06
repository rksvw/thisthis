import React from "react";
import { app } from ".././firebase";
import "../index.css";

import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, UseDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  singInFailure,
} from "../redux/user/userSlice";

function Google() {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const { loading, error: errMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      dispatch(signInStart());
      const resultFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch("/api/user/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          googlePhotoUrl: resultFromGoogle.user.photoURL,
        }),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(singInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(singInFailure(error.message));
    }
  };

  return (
    <>
      <button
        id="gglOAuth"
        type="button"
        onClick={handleGoogleClick}
        className="mb-5"
      >
        <FcGoogle id="gglIcon" />
        <p>Sign in with Google</p>
      </button>
    </>
  );
}

export default Google;
