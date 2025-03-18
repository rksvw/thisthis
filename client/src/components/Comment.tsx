import { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";

function Comment({postId}) {
  const [totalComment, setTotalComment] = useState([]);
  console.log(postId);
  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await fetch(`/api/likes/getcomment/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setTotalComment(data.data);
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
  }, [postId]);

  console.log(totalComment);
  return (
    <>
      <div className="my-5 rounded-sm border-2 px-10 py-2">
        <div className="flex items-center gap-2 self-center">
          <img
            src="https://images.unsplash.com/photo-1491349174775-aaafddd81942?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Profile"
            className="my-5 size-9 rounded-full border-2 border-orange-300"
          />
          <span className="text-sm">@ritik120</span>
        </div>
        <p className="rounded-md border-2 px-5 py-2 text-gray-500">
          I like it like that
        </p>
        <div className="my-3 ml-2 flex gap-2">
          <button className="text-gray-400 hover:text-blue-500" type="button">
            <FaThumbsUp className="text-sm" />
          </button>
          <p className="text-gray-400">5 likes</p>
        </div>
      </div>
    </>
  );
}

export default Comment;
