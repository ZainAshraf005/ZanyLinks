import Button from "../Button"

const Hero = () => {
  return (
    <>
      <div className=" w-full flex items-center h-[100vh] sm:h-[120vh] bg-green-800">
        <div className="sm:container py-4 grid lg:grid-cols-2 h-[30rem] px-10  mx-auto">

        <div className=" flex flex-col gap-4 justify-center h-full">
            <h1 className="sm:text-6xl text-2xl font-extrabold">Everything you are. In one, simple link in bio.</h1>
            <p className="text-base sm:text-lg">Join 50M+ people using ZanyLinks for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
            <Button color={'yellow'} text={'create your links'}/>
        </div>
        <div style={{backgroundImage:"url('/hero.png')"}} className="bg-contain bg-no-repeat h-[300%] lg:h-full w-full bg-center my-6"></div>
        </div>
      </div>
    </>
  )
}

export default Hero
