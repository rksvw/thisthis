import { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";

function Comment({ postId }) {
  const [totalComment, setTotalComment] = useState([]);
  // const [likes, setLikes] = useState(totalComment.likeCount)

  const fetchComment = async () => {
    try {
      const res = await fetch(`/api/likes/getuc/${postId}`);
      if (res.ok) {
        const data = await res.json();
        setTotalComment(data.results);
      } else {
        console.log("Error fetching response");
      }
    } catch (error) {
      console.log(`Error fetching comments: ${error.message}`);
    }
  };

  const likeComment = async (commentId) => {
    try {
      // Optimistic UI update
      setTotalComment((prevComments) =>
        prevComments.map((comment) =>
          comment.commentId === commentId
            ? {
                ...comment,
                likeComment: comment.likedByUser
                  ? comment.likeCount - 1
                  : comment.likeCount + 1,
                likedByUser: !comment.likedByUser,
              }
            : comment,
        ),
      );

      const res = await fetch(`/api/likes/update/like/${commentId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: totalComment.userId }),
      });

      if (!res.ok) {
        console.log("Failed to like comment");
        setTotalComment((prevComments) =>
          prevComments.map((comment) =>
            comment.commentId === commentId
              ? {
                  ...comment,
                  likeCount: comment.likedByUser
                    ? comment.likeCount + 1
                    : comment.likeCount - 1,
                  likedByUser: !comment.likedByUser,
                }
              : comment,
          ),
        );
      }
    } catch (err) {
      console.log("Error updating likes: ", err.message);
      return;
    }
  };

  useEffect(() => {
    fetchComment();
  }, []);

  // const handleLike = async (e) => {
  //   e.preventDefault();
  //   const res = await fetch('/api/likes/like', {

  //   })
  // };

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
                className="my-5 size-8 rounded-full border-2 border-orange-300"
              />
              <span className="text-sm">@{comment.username}</span>
            </div>
            <p className="rounded-md border-2 px-5 py-2 text-gray-500">
              {comment.comment}
            </p>
            <div className="my-3 ml-2 flex gap-2">
              <button
                className={`text-gray-400 hover:text-blue-500 ${comment.likedByUser ? "text-blue-500" : "text-gray-400"}`}
                type="button"
                onClick={() => likeComment(comment.commentId)}
              >
                <FaThumbsUp className="text-sm" /> {comment.likeCount}
              </button>
              {/* <button className="text-gray-400">
                {comment.likeCount == null
                  ? "0 like"
                  : comment.likeCount > 1
                    ? comment.likeCount + " likes"
                    : "1 like"}
              </button> */}
            </div>
          </div>
        ))}
    </>
  );
}

export default Comment;
