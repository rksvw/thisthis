import { List } from "flowbite-react";
import {
  BsDiscord,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitterX,
} from "react-icons/bs";

function AsideLink() {
  const text = "FOLLOW";
  return (
    <>
      <div className="relative  flex h-full w-[100px] items-center justify-center self-center">
        <div className="static flex h-[900px] w-full flex-col justify-between rounded-3xl bg-white">
          <p className="mt-14 flex h-auto w-11 flex-col items-center justify-center self-center rounded-full border-2 border-[#1A0726] py-3 text-3xl font-bold text-[#8900D9]">
            {text.split("").map((char, index) => (
              <span key={index}>{char}</span>
            ))}
          </p>
          <List className="flex h-4/5 list-none flex-col items-center justify-evenly text-center text-4xl">
            <List.Item className="cursor-pointer">
              <BsFacebook />
            </List.Item>
            <List.Item className="cursor-pointer">
              <BsDiscord />
            </List.Item>
            <List.Item className="cursor-pointer">
              <BsGithub />
            </List.Item>
            <List.Item className="cursor-pointer">
              <BsInstagram />
            </List.Item>
            <List.Item className="cursor-pointer">
              <BsTwitterX />
            </List.Item>
          </List>
        </div>
      </div>
    </>
  );
}

export default AsideLink;
