import { Button, TextInput } from "flowbite-react";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";
import Comment from "./Comment";
import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";

function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ comment: "" });
  const [totalComment, setTotalComment] = useState([]);
  // const [likes, setLikes] = useState(totalComment.likeCount)
  useEffect(() => {
    setFormData({
      ...formData,
      postId: postId,
      userId: parseInt(currentUser._id),
    });
    fetchComment();
  }, []);

  const fetchComment = async () => {
    try {
      const res = await fetch(`/api/likes/getuc/${postId}`);
      if (res.ok) {
        const data = await res.json();
        console.log(data.results);
        setTotalComment(data.results);
      } else {
        console.log("Error fetching response");
      }
    } catch (error) {
      console.log(`Error fetching comments: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/likes/createcomment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: formData.comment,
        postId: formData.postId,
        userId: formData.userId,
      }),
    });
    if (res.ok) {
      await res.json();
      fetchComment();
    } else {
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log(totalComment)

  return (
    <>
      <div className="mx-auto w-4/5 self-center">
        <h2 className="mb-5 text-2xl font-semibold">
          Comments: <span className="text-xl font-medium">125k</span>
        </h2>
        {currentUser ? (
          <div>
            <div className="flex items-center gap-2 self-center">
              <img
                src={`http://localhost:3000${currentUser?.profilePicture}`}
                alt="Profile"
                className="my-5 size-9 rounded-full border-2 border-orange-300"
              />
              <span className="text-sm">{currentUser?.username}</span>
            </div>
            <form
              className="mb-10 flex gap-5"
              ref={formRef}
              onSubmit={handleSubmit}
            >
              <TextInput
                type="text"
                placeholder="Comment here..."
                id="comment"
                name="comment"
                className="flex-1"
                value={formData.comment}
                onChange={handleChange}
              />
              <Button
                type="submit"
                className="flex items-center justify-center self-center px-2 text-center"
              >
                Save <IoSend className="ml-3 self-center" />
              </Button>
            </form>
          </div>
        ) : (
          <div>
            <p>
              Please sign up to comment:{" "}
              <Link to={"/signup"} className="text-red-700">
                Click here!
              </Link>
            </p>
          </div>
        )}

        <Comment totalComment={totalComment} setTotalComment={setTotalComment} userId={currentUser._id} />
      </div>
    </>
  );
}

export default CommentSection;
