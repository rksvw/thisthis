import { useSelector } from "react-redux";
import Profile from "../components/Profile";
import { useNavigate } from "react-router";
import { useEffect } from "react";

function ProfilePage() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || currentUser === null) {
      navigate("/login");
    }
  },[]);
  return (
    <>
      <div>{currentUser && <Profile />}</div>
    </>
  );
}

export default ProfilePage;
