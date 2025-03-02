import React, { useEffect, useRef, useState } from "react";
import { IoPersonCircle } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { PiSignOutFill } from "react-icons/pi";
import "../index.css";

function Profile() {
  const [userData, setUserData] = useState({});
  // const [imageSrc, setImageSrc] = useState("");
  const [bgimageFile, setBgImageFile] = useState(null);
  const [bgimageFileUrl, setBgImageFileUrl] = useState(null);
  const [uImageFile, setUImageFile] = useState(null);
  const [uImageFileUrl, setUImageFileUrl] = useState(null);
  const filePickerRef = useRef();
  const imagePickerRef = useRef();
  const defaultImage =
    "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";
  const defaultBg =
    "https://wikitravel.org/upload/shared//6/6a/Default_Banner.jpg";

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (!data) {
      console.log("Error occured data");
      return;
    }
    if (data) {
      setUserData(data.data);
    }
    if (userData && userData.profile_picture) {
      const buffer = userData.profile_picture.data;
      const base64String = buffer.toString("base64");
      setUImageFileUrl(base64String);
    } else {
      setUImageFileUrl(defaultImage);
    }
  }, []);
  const handleUserBgImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBgImageFile(file);
      setBgImageFileUrl(URL.createObjectURL(file));
    }
  };

  const handleUserImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUImageFile(file);
      setUImageFileUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {};

  return (
    <>
      <div className="mx-auto my-24 flex w-[540px] flex-col rounded-2xl bg-amber-50 p-3">
        <form onSubmit={handleSubmit} className="relative flex flex-col gap-2">
          <input
            type="file"
            id="inputImage"
            accept="image/*"
            onChange={handleUserBgImage}
            ref={filePickerRef}
            hidden
          />
          <div
            className="w-full bgImgP relative h-44 cursor-pointer self-center overflow-hidden rounded-t-2xl"
            onClick={() => filePickerRef.current.click()}
          >
            <img
              src={bgimageFileUrl || defaultBg}
              alt="user"
              className="absolute size-full object-cover"
            />
          </div>
          <input
            type="file"
            name="userImage"
            accept="image/*"
            onChange={handleUserImage}
            ref={imagePickerRef}
            hidden
          />
          <div
            className="absolute top-32 size-32 cursor-pointer self-center overflow-hidden rounded-full shadow-md"
            onClick={() => imagePickerRef.current.click()}
          >
            <img
              src={uImageFileUrl || defaultImage}
              alt=""
              className="size-full rounded-full border-4 border-[lightgray] object-cover"
            />
          </div>
          <div className="inputContainer w-4/5 relative self-center">
            <input
              type="text"
              id="username"
              placeholder="username"
              className="ldvioclr mt-1.5 w-full self-center rounded-lg bg-gradient-to-r from-violet-300 to-violet-500 outline-none backdrop-blur-2xl"
              defaultValue={userData.username}
            />
            <IoPersonCircle className="pIcon absolute" />
          </div>
          <div className="inputContainer w-4/5 relative self-center">
            <input
              type="email"
              id="email"
              placeholder="email"
              className="ldvioclr flex-1 w-full mt-1.5 self-center rounded-lg bg-gradient-to-r from-violet-300 to-violet-500 outline-none backdrop-blur-2xl"
              defaultValue={userData.email}
            />
            <MdEmail className="pIcon absolute" />
          </div>
          <div className="inputContainer w-4/5 relative self-center">
            <input
              type="password"
              name="password"
              id="password"
              className=" ldvioclr mt-1.5 w-full self-center rounded-lg bg-gradient-to-r from-violet-300 to-violet-500 outline-none backdrop-blur-2xl"
              placeholder="password"
            />
            <MdOutlinePassword className="pIcon absolute" />
          </div>
          <div className="inputContainer w-4/5 relative self-center">
            <button
              type="submit"
              className="  mt-1.5 w-full h-10 self-center rounded-lg bg-gradient-to-r from-violet-300 via-[#cc00ff] to-violet-300 outline-none backdrop-blur-2xl"
              id="pSubmit"
            >
              <IoIosSend className="pIcon absolute" />
              Update
            </button>
          </div>
          <div className="inputContainer w-4/5 relative self-center">
            <button
              type="submit"
              className=" mt-1.5 w-full h-10 self-center rounded-lg bg-gradient-to-r from-red-300 via-[#FFC300] to-red-300 outline-none backdrop-blur-2xl"
              id="pSignOut"
            >
              <PiSignOutFill className="pIcon absolute" />
              logout
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Profile;
