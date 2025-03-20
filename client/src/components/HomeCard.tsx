import { useEffect, useState } from "react";
import { Link } from "react-router";

function HomeCard() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(
          `/api/article/getposts?limit=3&sortDirection=desc`,
        );

        if (res.ok) {
          const data = await res.json();
          console.log(data.posts);
          setPosts(data.posts);
        }
      } catch (error) {
        console.error(`Error retrieving posts: ${error.message}`);
      }
    };
    fetchPost();
  }, []);

  return (
    <>
      <div className="mx-auto my-5 w-4/5 flex-col justify-center self-center">
        {posts ? (
          posts.map((post) => (
            <Link to={`/article/${post.slug}`}
              key={post.postId}
              className="relative mx-auto my-5 flex w-4/5 cursor-pointer flex-col justify-center rounded-2xl border-2 border-[#4F7EA4] bg-white p-2"
            >
              <img
                src={`${post.image}`}
                className="size-full overflow-hidden rounded-t-xl "
              />
              <h2 className="mt-4 pl-4 text-2xl font-bold">{post.title}</h2>
              <p className="mb-5 mt-2 inline-block pl-7 text-sm font-bold text-gray-500 opacity-60">
                {post.category}
              </p>
              <p
                className=" mx-auto line-clamp-3 h-12 w-full cursor-pointer self-center overflow-hidden px-1 text-xs font-normal text-[rgb(64,64,64)] "
                dangerouslySetInnerHTML={{ __html: post && post.content }}
              ></p>
            </Link>
          ))
        ) : (
          <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div className="h-2.5 w-[45%] rounded-full bg-blue-600"></div>
          </div>
        )}
      </div>
    </>
  );
}

export default HomeCard;
