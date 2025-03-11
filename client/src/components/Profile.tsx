import { useEffect, useRef, useState } from "react";
import { IoPersonCircle } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  signoutSuccess,
} from "../redux/user/userSlice";
import { PiSignOutFill } from "react-icons/pi";
import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

function Profile() {
  const [userData, setUserData] = useState({});
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [bgimageFile, setBgImageFile] = useState(null);
  const [bgimageFileUrl, setBgImageFileUrl] = useState(null);
  const [uImageFile, setUImageFile] = useState(null);
  const [uImageFileUrl, setUImageFileUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const filePickerRef = useRef();
  const imagePickerRef = useRef();
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile_picture = `/uploads/blank-profile-picture-973460_1280.png`;
  const bgImg = `/uploads/30510.jpg`;

  const handleSignOut = async () => {
    dispatch(signoutSuccess());
    navigate("/");
  };

  const handleUserBgImage = (e) => {
    const file = e.target.files[0];
    if (file.size > MAX_FILE_SIZE) {
      setImageFileUploadError("File size exceeds 2MB limit.");
      return;
    }
    setImageFileUploading(true);
    setImageFileUploadError(null);

    setBgImageFile(file);
    setBgImageFileUrl(URL.createObjectURL(file));
  };

  const handleUserImage = (e) => {
    const file = e.target.files[0];
    console.log(file.size);
    if (file.size > MAX_FILE_SIZE) {
      setImageFileUploadError("File size exceeds 2MB limit.");
      return;
    }
    setImageFileUploading(true);
    setImageFileUploadError(null);

    setUImageFile(file);
    setUImageFileUrl(URL.createObjectURL(file));
    console.log(uImageFile);
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);

    // If the userData Array is empty it returns 0 size of array
    if (!uImageFile && !bgimageFile && Object.keys(userData).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }

    try {
      dispatch(updateStart());

      const formData = new FormData();
      formData.append("username", userData.username || currentUser.username);
      formData.append("fullname", userData.fullname || currentUser.fullname);
      formData.append("email", userData.email || currentUser.email);

      if (uImageFile) {
        formData.append("profile_picture", uImageFile);
      }

      if (bgimageFile) {
        formData.append("bg_img", bgimageFile);
      }

      const res = await fetch(`api/user/upload/${currentUser._id}`, {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (err) {
      dispatch(updateFailure(err.message));
      setUpdateUserError(err.message);
    }
  };

  return (
    <>
      <div className="mx-auto my-24 flex w-[540px] flex-col rounded-2xl bg-amber-50 p-3">
        <form onSubmit={handleSubmit} className="relative flex flex-col gap-2">
          <input
            type="file"
            id="bg_img"
            accept="image/*"
            onChange={handleUserBgImage}
            ref={filePickerRef}
            hidden
          />
          <div
            className="bgImgP relative h-44 w-full cursor-pointer self-center overflow-hidden rounded-t-2xl"
            onClick={() => filePickerRef.current.click()}
          >
            <img
              src={`http://localhost:3000${currentUser.bgImage || bgImg}`}
              alt="user"
              className="absolute size-full object-cover"
            />
          </div>
          <input
            type="file"
            name="userImage"
            id="profile_picture"
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
              src={`http://localhost:3000${
                currentUser.profilePicture === null
                  ? false
                  : currentUser.profilePicture || profile_picture
              }`}
              alt=""
              className="size-full rounded-full border-4 border-[lightgray] object-cover"
            />
          </div>
          <div className="inputContainer relative w-4/5 self-center">
            <input
              type="text"
              id="username"
              placeholder="username"
              className="ldvioclr mt-1.5 w-full self-center rounded-lg bg-gradient-to-r from-violet-300 to-violet-500 outline-none backdrop-blur-2xl"
              defaultValue={currentUser.username}
              onChange={handleChange}
            />
            <IoPersonCircle className="pIcon absolute" />
          </div>
          <div className="inputContainer relative w-4/5 self-center">
            <input
              type="email"
              id="email"
              placeholder="email"
              className="ldvioclr mt-1.5 w-full flex-1 self-center rounded-lg bg-gradient-to-r from-violet-300 to-violet-500 outline-none backdrop-blur-2xl"
              defaultValue={currentUser.email}
              onChange={handleChange}
            />
            <MdEmail className="pIcon absolute" />
          </div>
          <div className="inputContainer relative w-4/5 self-center">
            <input
              type="password"
              name="password"
              id="password"
              className=" ldvioclr mt-1.5 w-full self-center rounded-lg bg-gradient-to-r from-violet-300 to-violet-500 outline-none backdrop-blur-2xl"
              placeholder="password"
              onChange={handleChange}
            />
            <MdOutlinePassword className="pIcon absolute" />
          </div>
          <div className="inputContainer relative w-4/5 self-center">
            <button
              type="submit"
              className="  mt-1.5 h-10 w-full self-center rounded-lg bg-gradient-to-r from-violet-300 via-[#cc00ff] to-violet-300 outline-none backdrop-blur-2xl"
              id="pSubmit"
            >
              <IoIosSend className="pIcon absolute" />
              Update
            </button>
          </div>
          <div className="inputContainer relative w-4/5 self-center">
            <button
              type="submit"
              className=" mt-1.5 h-10 w-full self-center rounded-lg bg-gradient-to-r from-red-300 via-[#FFC300] to-red-300 outline-none backdrop-blur-2xl"
              id="pSignOut"
              onClick={handleSignOut}
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
