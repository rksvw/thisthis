function PostCard() {
  return (
    <>
      <div className="mx-auto my-5 flex w-4/5 justify-center self-center">
        <div className="relative mx-auto my-5 flex w-4/5 flex-col justify-center rounded-2xl border-2 border-[#4F7EA4] bg-white">
          <img
            src="https://cdn.pixabay.com/photo/2020/02/19/06/51/landscape-4861494_960_720.jpg"
            alt=""
            className="overflow-hidden rounded-t-xl"
          />
          <h2 className="mt-4 pl-4 text-2xl font-bold">
            Came back stronger than ever
          </h2>
          <p className="mb-5 mt-2 inline-block pl-7 text-sm font-bold text-gray-500 opacity-60">
            Philosophy
          </p>
          <span className="absolute bottom-5 right-5 cursor-pointer text-xs font-medium text-[#1668ff]">
            Complete article...
          </span>
        </div>
      </div>
    </>
  );
}

export default PostCard;
