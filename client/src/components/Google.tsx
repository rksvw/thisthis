import React from "react";
import { app } from "../firebase";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

function Google() {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
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
      await res.json();
      if (res.ok) {
        navigate("/");
      }
    } catch (error) {
      console.log("A Big error", error.message);
    }
  };

  return (
    <>
      <button id="gglOAuth" type="button" onClick={handleGoogleClick}>
        <FcGoogle id="gglIcon" />
        <p>Sign in with Google</p>
      </button>
    </>
  );
}

export default Google;
