import { useEffect } from "react";
import { FaThumbsUp } from "react-icons/fa";

function Comment({ totalComment, setTotalComment, userId }) {


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
        body: JSON.stringify({ userId: userId }),
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

  // const handleLike = async (e) => {
  //   e.preventDefault();
  //   const res = await fetch('/api/likes/like', {

  //   })
  // };

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
                className="my-5 size-8 rounded-full border-2 border-orange-300"
              />
              <span className="text-sm">@{comment.username}</span>
            </div>
            <p className="rounded-md border-2 px-5 py-2 text-gray-500">
              {comment.comment}
            </p>
            <div className="my-3 ml-2 flex gap-2">
              <button
                className={`flex items-center justify-center gap-2 hover:text-blue-500 ${comment.likedByUser ? "text-blue-500" : "text-gray-400"}`}
                type="button"
                onClick={() => likeComment(comment.commentId)}
              >
                <FaThumbsUp className="text-sm" />{" "}
                <span className="flex items-center justify-center text-center ">
                  {comment.likeComment < 0 ||
                  comment.likeComment === undefined ||
                  comment.likeComment === null ||
                  !comment.likeComment
                    ? "0 likes"
                    : comment.likeComment == 1
                      ? comment.likeComment + " like"
                      : comment.likeComment + " likes"}
                </span>
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
