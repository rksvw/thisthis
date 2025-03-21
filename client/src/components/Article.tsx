import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";
import { useSelector } from "react-redux";
import CommentSection from "./CommentSection";
import CallToAction from "./CallToAction";

export default function Article() {
  const { currentUser, error: errMessage } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState({});
  const [recentPost, setRecentPost] = useState({});
  const { postSlug } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/article/getposts?slug=${postSlug}`);
        if (res.ok) {
          const data = await res.json();
          console.log(data.posts[0]);
          setPost(data.posts[0]);
          setLoading(false);
        }
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.log("Error Article :", err.message);
        setError(true);
        setLoading(false);
      }
    };
    fetchPosts();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetcheRecentPosts = async () => {
        const res = await fetch(`/api/article/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPost(data.posts);
        }
      };
      fetcheRecentPosts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size={"xl"} />
      </div>
    );

  return (
    <>
      <div className=" my-8 ml-14 w-[72%] self-center rounded-sm bg-[#fff] p-[25px]">
        <h1 className="my-5 self-center px-5 py-3 text-center text-4xl font-bold">
          {post && post.title}
        </h1>
        <span className="mx-auto mb-10 flex w-40 justify-center self-center rounded-xl border-2 border-[#8900D9] px-5 py-1 font-medium text-[#808080]">
          {post && post.category}
        </span>
        <img src={post.image} alt={post && post.title} className="rounded-lg" />
        <div className="m-5 flex justify-between border-b-2 pb-5">
          <p className="flex justify-center self-center text-center text-[#808080]">
            Created by:
            <span className="self-center pl-2 font-bold">
              @{currentUser?.username}
            </span>
            <strong className="mx-2 flex items-center justify-center  border-l-2 border-black text-center"></strong>
            <span className="flex items-center justify-center self-center pt-1 text-center font-mono font-semibold text-[#808080]">
              {post && new Date(post.createdAt).toLocaleDateString()}
            </span>
          </p>
          <p className="text-[#808080]">
            Read:
            <span className="pl-2 font-mono font-semibold">
              {post && (post.content.length / 1000).toFixed(0)} minutes read
            </span>
          </p>
        </div>
        <div className="mx-auto my-10 w-4/5">
          <div
            className="flex flex-col items-center justify-center border-b-2 pb-5 text-start font-sans text-lg/7 text-[#252525]"
            dangerouslySetInnerHTML={{ __html: post && post.content }}
          ></div>
        </div>
        <CallToAction />
        <CommentSection postId={post.postId} />
      </div>
    </>
  );
}
