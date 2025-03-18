import { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";

function Comment({ postId }) {
  const [totalComment, setTotalComment] = useState([]);
  console.log(postId);

  const fetchComment = async () => {
    try {
      const res = await fetch(`/api/likes/getuc/${postId}`);
      if (res.ok) {
        const data = await res.json();
        console.log(data.results);
        setTotalComment(data.results);
      }
      if (!res.ok) {
        console.log("Error fetching response");
        return;
      }
    } catch (error) {
      console.log(`Error fetching comments: ${error.message}`);
    }
  };

  fetchComment();

  console.log(totalComment);

  return (
    <>
      {totalComment &&
        totalComment.map((comment) => (
          <div
            key={comment.commentId}
            className="my-5 rounded-sm border-2 border-b-2 border-gray-400 px-10 py-2 "
          >
            <div className="flex items-center gap-2 self-center">
              <img
                src={`http://localhost:3000${comment.profile_picture}`}
                alt="Profile"
                className="my-5 size-9 rounded-full border-2 border-orange-300"
              />
              <span className="text-sm">@{comment.username}</span>
            </div>
            <p className="rounded-md border-2 px-5 py-2 text-gray-500">
              {comment.comment}
            </p>
            <div className="my-3 ml-2 flex gap-2">
              <button
                className="text-gray-400 hover:text-blue-500"
                type="button"
              >
                <FaThumbsUp className="text-sm" />
              </button>
              <p className="text-gray-400">{comment.likeCount} likes</p>
            </div>
          </div>
        ))}
    </>
  );
}

export default Comment;
