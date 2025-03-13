import React from "react";

function CallToAction() {
  return (
    <>
      <div className="my-10 w-4/5 items-center self-center mx-auto">
        <h1 className="mb-5 w-fit rounded-sm border-2 px-3 py-1 text-2xl font-semibold">
          Recommendation
        </h1>
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1526779259212-939e64788e3c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="h-80 w-full rounded-sm object-cover object-top"
            alt="New image"
          />

          <div className="absolute flex flex-col gap-1 top-[189px] z-10 w-full rounded-b-sm bg-[#00000076] px-5 py-3 text-white">
            <h3 className="text-2xl font-semibold">Hello this is my title</h3>
            <span className="text-sm underline">javascript</span>
            <p className="h-12 w-[90%] overflow-y-hidden">
              Hello world this is alpha you know what you don't know give me
              some time to think la la la
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CallToAction;
