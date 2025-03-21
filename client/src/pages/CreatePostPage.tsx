import { useSelector } from "react-redux";
import Editor from "../components/Editor";
import { useNavigate } from "react-router";
import { useEffect } from "react";

function CreatePostPage() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser || currentUser === null) {
      navigate("/login");
    }
  }, []);
  return <>{currentUser && <Editor />}</>;
}

export default CreatePostPage;
