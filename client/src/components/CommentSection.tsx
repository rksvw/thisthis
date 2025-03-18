import { Button, TextInput } from "flowbite-react";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";
import Comment from "./Comment";
import { Link } from "react-router";

function CommentSection({postId}) {
  const { currentUser } = useSelector((state) => state.user);
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
            <div className="mb-10 flex gap-5">
              <TextInput
                type="text"
                placeholder="Comment here..."
                id="comment"
                className="flex-1"
              />
              <Button
                type="submit"
                className="flex items-center justify-center self-center px-2 text-center"
              >
                Save <IoSend className="ml-3 self-center" />
              </Button>
            </div>
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

        <Comment postId={postId} />
      </div>
    </>
  );
}

export default CommentSection;
