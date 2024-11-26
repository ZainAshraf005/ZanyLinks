import Button from "../Button";

const ThirdPg = () => {
  return (
    <>
      <div className=" w-full flex items-center h-[100vh] sm:h-[120vh] bg-[#780016]">
        <div className="sm:container grid py-4 lg:grid-cols-2 h-[30rem] px-10  mx-auto">
          <div className=" flex flex-col gap-4 justify-center">
            <h1 className="sm:text-6xl text-2xl font-extrabold">
              Share your ZanyLinks from your Instagram, TikTok, Twitter and other
              bios
            </h1>
            <p className="text-base sm:text-lg">
            Add your unique ZanyLinks URL to all the platforms and places you find your audience. Then use your QR code to drive your offline traffic online.
            </p>
            <Button color={'purple'} text={'Get started for free'}/>

          </div>
          <div
            style={{ backgroundImage: "url('/3rd.png')" }}
            className="bg-contain bg-center h-[400%] lg:h-full my-6 bg-no-repeat"
          ></div>
        </div>
      </div>
    </>
  );
};

export default ThirdPg;
