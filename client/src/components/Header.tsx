import { Navbar, TextInput } from "flowbite-react";
import { IoSearch } from "react-icons/io5";
import { MdOutlinePerson } from "react-icons/md";
import { useNavigate, Link } from "react-router";

function Header() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar className="fixed left-0 top-0 z-20 w-full border-b-2 border-[#8900D9] bg-[#1A0726]">
        <div className="flex h-10 w-32 cursor-pointer justify-center self-center rounded-md bg-gradient-to-r from-[#447fcc] to-[#3d079b] text-center">
          <Link to={"/"} className="px-4 py-1 font-sans text-2xl font-semibold text-white">
            Fidhiss
          </Link>
        </div>
        <form className="">
          <TextInput
            type="text"
            placeholder="Search..."
            rightIcon={IoSearch}
            className="w-[500px]"
          />
        </form>
        <Navbar.Collapse>
          <Navbar.Link active={true} as={"div"}>
            <Link
              to={"/"}
              className="inline-block cursor-pointer self-center bg-gradient-to-b from-[#81C6FF] to-[#4F7EA4] bg-clip-text text-lg text-transparent"
            >
              Home
            </Link>
          </Navbar.Link>
          <Navbar.Link active={true} as={"div"}>
            <Link
              to={"/about"}
              className="inline-block cursor-pointer self-center bg-gradient-to-b from-[#81C6FF] to-[#4F7EA4] bg-clip-text text-center text-lg text-transparent"
            >
              About
            </Link>
          </Navbar.Link>
          <Navbar.Link active={true} as={"div"}>
            <Link
              to={"project"}
              className="inline-block cursor-pointer self-center bg-gradient-to-b from-[#81C6FF] to-[#4F7EA4] bg-clip-text text-lg text-transparent"
            >
              Projects
            </Link>
          </Navbar.Link>
          <Navbar.Link active={true} as={"div"}>
            <Link to={"/profile"} className="ml-5 flex size-9 cursor-pointer self-center rounded-full bg-[#4F7EA4]">
              <MdOutlinePerson className="flex w-full items-center self-center text-center text-xl text-[#06FF2F]" />
            </Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default Header;
