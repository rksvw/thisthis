import { Button, TextInput } from "flowbite-react";
import { IoSend } from "react-icons/io5";
import Comment from "./Comment";

function CommentSection() {
  return (
    <>
      <div className="self-center w-4/5 mx-auto">
        <h2 className="mb-5 text-2xl font-semibold">
          Comments: <span className="text-xl font-medium">125k</span>
        </h2>
        <div className="flex gap-5 mb-10">
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
        <Comment />
      </div>
    </>
  );
}

export default CommentSection;
