import { Button } from "flowbite-react";
import { RiArticleFill } from "react-icons/ri";
import { Link } from "react-router";

function CreatePost() {
  return (
    <>
      <Link
        to={"/create"}
        className="-mt-5 mb-12 flex w-4/5 items-center justify-center self-center"
      >
        <Button
          gradientMonochrome={"teal"}
          className="flex flex-1 items-center justify-center self-center text-center"
        >
          <RiArticleFill className="flex self-center text-xl" />{" "}
          <span className="ml-2 flex self-center font-semibold uppercase">
            CREATE POST
          </span>
        </Button>
      </Link>
    </>
  );
}

export default CreatePost;
