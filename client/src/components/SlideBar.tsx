import { Carousel } from "flowbite-react";

function SlideBar() {
  return (
    <>
      <div className="mx-auto mt-20 h-56 w-4/5 self-center sm:h-64 xl:h-80 2xl:h-96">
        <Carousel slideInterval={4000}>
          <img
            src="https://cdn.pixabay.com/photo/2025/02/03/21/01/forest-9380292_960_720.jpg"
            alt="..."
            className=""
          />
          <img
            src="https://cdn.pixabay.com/photo/2022/11/02/22/33/autumn-7566201_960_720.jpg"
            alt="..."
          />
          <img
            src="https://cdn.pixabay.com/photo/2020/02/19/06/51/landscape-4861494_960_720.jpg"
            alt="..."
          />
        </Carousel>
      </div>
    </>
  );
}

export default SlideBar;
