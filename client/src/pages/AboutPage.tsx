function AboutPage() {
  return (
    <>
      <section className="container mx-auto mt-24 w-4/5 self-center ">
        <h1 className="mb-5 mt-6 flex justify-center bg-gradient-to-t from-[#81C6FF] to-[#4F7EA4] bg-clip-text  text-center text-4xl font-bold text-transparent">
          Who we are?
        </h1>
        <div className="mx-auto flex w-4/5 rounded-md bg-white p-5">
          <div className="h-[360px] w-3/5 self-center overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1740560601721-fb8482c42b64?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="About-us"
              className=" mr-5 flex items-center justify-center rounded-md bg-cover"
            />
          </div>
          <div className="ml-5 flex w-1/2 flex-col items-center justify-evenly">
            <h2 className="text-3xl font-bold">
              Roin mauris risus, tempus at est et
            </h2>
            <span className="mt-2 px-2 py-1 text-left text-sm font-semibold text-[#808080]">
              CEO : Ritik Sharma
            </span>
            <p className="text-left text-[#2c2c2c]">
              lobortis luctus. Proin mauris risus, tempus at est et, ultricies
              facilisis mi id pretium suscipit. Vivamus molestie, neque cursus
              rutrum condimentum, massa sapien luctus libero, ac maximus diam
              justo et ligula. Sed non massa dapibus tellus ornare tincidunt.
              Nullam dolor sapien, blandit id molestie nec, tempor vel magna.
              Vivamus sodales volutpat dolor, quis maximus lacus venenatis eu.
              Vestibulum at mi erat. Morbi sed odio ut tortor finibus gravida
              non et nisi. Quisque ultricies ante non turpis porttitor augue ut
              egestas. Sed risus erat, imperdiet sed consectetur non, aliquet ve
            </p>
          </div>
        </div>
      </section>
      <section className="container mx-auto mt-24 w-4/5 self-center">
        <h2 className="mb-5 self-center bg-gradient-to-t from-[#81C6FF] to-[#4F7EA4] bg-clip-text text-center text-4xl font-bold text-transparent">
          Social Conflicts
        </h2>
        <div className="mx-auto flex w-full justify-evenly self-center rounded-md bg-white py-3">
          <img
            src="https://images.unsplash.com/photo-1740393148421-2159bf9e8d8e?q=80&w=480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="rounded-sm"
          />
          <img
            src="https://plus.unsplash.com/premium_photo-1668404817708-1c23cad9ee38?w=480&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDU2fHx8ZW58MHx8fHx8"
            alt=""
            className="rounded-sm"
          />
          <img
            src="https://images.unsplash.com/photo-1733510548920-028936a56a17?w=480&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8"
            alt=""
            className="rounded-sm"
          />
        </div>
      </section>
      <section className="container mx-auto mb-16 mt-24 w-4/5 self-center">
        <h2 className="mb-5 self-center bg-gradient-to-t from-[#81C6FF] to-[#4F7EA4] bg-clip-text text-center text-4xl font-bold text-transparent">
          Testimonial
        </h2>
        <div className="mx-auto flex w-1/2 self-center rounded-md bg-white">
          <div className="mx-auto  my-5 flex h-[400px] w-1/2 flex-col items-center justify-center self-center">
            <img
              src="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=360&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVyc29ufGVufDB8fDB8fHww"
              alt=""
              className="h-[390px] rounded-sm border-2 border-[#8900D9]"
            />
            <div className="mx-auto mt-3 flex w-9/12 flex-col items-center justify-center self-center rounded-sm border-2 border-[#808080] px-3 py-2">
              <h4 className="mb-1 text-base font-semibold">Avinew Rodio</h4>
              <span className="text-sm text-[#5a5a5a]">Senior SDE Amazon </span>
            </div>
          </div>
          <div className="m-8 flex w-1/2 flex-col items-center rounded-sm border-2 p-4">
            <h3 className="mx-auto my-5 flex items-center justify-center self-center border-b-2 border-black text-center text-2xl font-bold uppercase">
              Statement
            </h3>
            <p className="p-6">
              <span className="text-3xl font-bold">&quot;</span> bortis luctus.
              Proin mauris risus, tempus at est et, ultricies facilisis mi id
              pretium suscipit. Vivamus molestie, neque cursus rutrum bortis
              luctus. Proin mauris risus, tempus at est et, ultricies facilisis
              mi id pretium suscipit. Vivamus molestie, neque cursus rutrum
              vbortis luctus. Proin mauris risus, tempus at est et, ultricies
              facilisis mi id pretium suscipit. Vivamus molestie, neque cursus
              rutrum <span className="text-3xl font-bold">&quot;</span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutPage;
