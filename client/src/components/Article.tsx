import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";

export default function Article() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPost, setRecentPost] = useState(null);
  const { postSlug } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/article/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (res.ok) {
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

  const text = ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque  tempor sed lacus in suscipit. Morbi ultrices augue vitae molestie  malesuada. Morbi purus neque, eleifend vel convallis sit amet, fermentum non augue. Praesent nec purus sit amet ipsum lobortis efficitur a eu  tortor. Pellentesque ipsum tellus, cursus quis leo in, consectetur  commodo neque. In et porttitor dui. Maecenas dictum pretium ullamcorper. Vivamus aliquet felis nunc, ac commodo erat tempor ac. Nullam non  faucibus libero. Etiam malesuada faucibus arcu. Maecenas dapibus nibh at velit sollicitudin, sed porta tortor vulputate. Proin porttitor lacus  enim, quis aliquet sem tincidunt nec.

 Etiam pulvinar nisl a dui sollicitudin, quis aliquet erat sollicitudin.  Phasellus sed est arcu. Nunc luctus, turpis ac ornare lobortis, lectus  ipsum blandit neque, in porttitor magna nisi sed purus. Nullam nec  accumsan nulla. Mauris convallis orci vel augue porttitor, eu elementum  quam pretium. Quisque sodales accumsan mi ut consectetur. Proin lectus  arcu, iaculis ac aliquet in, condimentum id ex. Mauris nec luctus nunc.

 Quisque sodales nibh porttitor lobortis luctus. Proin mauris risus,  tempus at est et, ultricies fringilla justo. Donec eleifend lacinia  mauris. In gravida porta risus a ultricies. Proin lorem mauris, luctus  vitae elit sit amet, egestas porttitor orci. Ut sollicitudin vulputate  aliquam. Ut in sem tempus, faucibus nisi ut, suscipit lacus. Praesent  interdum tortor ut justo tincidunt, eu iaculis sem laoreet. Maecenas  facilisis mi id pretium suscipit. Vivamus molestie, neque cursus rutrum  condimentum, massa sapien luctus libero, ac maximus diam justo et  ligula. Sed non massa dapibus tellus ornare tincidunt. Nullam dolor  sapien, blandit id molestie nec, tempor vel magna. Vivamus sodales  volutpat dolor, quis maximus lacus venenatis eu.

 Vestibulum at mi erat. Morbi sed odio ut tortor finibus gravida non et  nisi. Quisque ultricies ante non turpis porttitor tincidunt. Aliquam  consectetur, ipsum sit amet varius blandit, enim dui interdum tortor,  faucibus viverra nunc ante in risus. Maecenas aliquam rutrum leo, et  efficitur odio dapibus eget. Aenean nibh nulla, porta et porta sed,  malesuada sed sem. Aenean non eleifend neque. Mauris ornare sodales  eros, sed viverra neque convallis a. Praesent commodo facilisis turpis,  ac dapibus arcu vestibulum eu. Duis laoreet viverra enim vel tempus.  Donec ut tempor neque, eu ornare tortor. Vestibulum ac tincidunt massa.  Vivamus faucibus ligula sit amet dolor dictum sagittis. Sed dapibus  interdum risus nec fringilla. Sed aliquet aliquam gravida. Cras eu  turpis eleifend sem interdum aliquam.

 Donec viverra quis augue ut egestas. Sed risus erat, imperdiet sed  consectetur non, aliquet vel sem. Sed congue lacus tellus, sit amet  tempor odio blandit quis. Mauris in elit arcu. Lorem ipsum dolor sit  amet, consectetur adipiscing elit. Aenean varius nibh et orci aliquam,  eget hendrerit nunc molestie. Phasellus nec ex in justo molestie  lobortis. Integer augue ligula, condimentum non elementum eget, rutrum  quis libero. Pellentesque aliquet commodo vulputate. Aenean euismod  lacus ac elementum aliquam. Vestibulum leo purus, fermentum ut rhoncus  quis, molestie a diam. In posuere, dolor at ultrices finibus, justo sem  semper dui, in finibus ipsum dolor nec metus. Praesent congue metus et  leo mattis condimentum. Fusce at felis felis. Aliquam erat volutpat.`;

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
        <span className="mx-auto mb-10 flex w-[100px] justify-center self-center rounded-xl border-2 border-[#8900D9] px-5 py-1 font-medium text-[#808080]">
          {post && post.category}
        </span>
        <img
          src={post && post.image}
          alt={post && post.title}
          className="rounded-lg"
        />
        <div className="m-5 flex justify-between border-b-2 pb-5">
          <p className="flex text-[#808080]">
            Created by:
            <span className="pl-2 font-bold">@mrdeamio</span>
            <strong className="mx-2 flex items-center justify-center border-l-2 border-black text-center"></strong>
            <span className="font-mono font-semibold text-[#808080]">
              {post && new Date(post.createdAt).toLocaleDateString()}
            </span>
          </p>
          <p className="text-[#808080]">
            Read:
            <span className="pl-2 font-mono font-semibold">
              {post && (post.content.length / 1000).toFixed(0)}, minutes read
            </span>
          </p>
        </div>
        <div className="mx-auto my-10 w-4/5">
          <div
            className="flex items-center justify-center border-b-2 pb-5 text-start font-sans text-lg/7 text-[#252525]"
            dangerouslySetInnerHTML={{ __html: post && post.content }}
          ></div>
        </div>
      </div>
    </>
  );
}
