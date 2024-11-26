import Button from "../Button";

const SecondPg = () => {
  return (
    <>
      <div className=" w-full flex items-center h-[100vh] sm:h-[120vh] bg-[#e9c0e9]">
        <div className="sm:container grid py-4 lg:grid-cols-2 h-[30rem] px-10  mx-auto">
          <div className=" flex lg:order-2 flex-col gap-4 justify-center">
            <h1 className="sm:text-6xl text-2xl text-purple-800 font-extrabold">
              Create and customize your ZanyLinks in minutes
            </h1>
            <p className="text-purple-800 text-base sm:text-lg txt">
              Connect your TikTok, Instagram, Twitter, website, store, videos,
              music, podcast, events and more. It all comes together in a link
              in bio landing page designed to convert.
            </p>
            <Button color={"purple"} text={"Get started for free"} />
          </div>
          <div
            style={{ backgroundImage: "url('/hero.png')" }}
            className="bg-contain  lg:order-1 bg-center bg-no-repeat lg:h-full h-[300%] my-6"
          ></div>
        </div>
      </div>
    </>
  );
};

export default SecondPg;
