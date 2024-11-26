"use client";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BsArrowUpRightCircle } from "react-icons/bs";
import toast from "react-hot-toast";
import ShowImage from "@/components/ShowImage";

const page = () => {
  const { username } = useParams();
  const [user, setUser] = useState({});

  const getLinks = async (username) => {
    try {
      const res = await axios.get(
        `https://zanylinks.up.railway.app/api/links/${username}`,
        { withCredentials: true }
      );
      if (res?.data?.success) {
        setUser(res.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "backend error");
    }
  };

  const image = "/background.jpg";

  useEffect(() => {
    getLinks(username);
  }, [username]);

  return (
    <div
      style={{ backgroundImage: `url(${image})` }}
      className="w-full h-screen bg-cover md:py-4 bg-center bg-norepeat flex justify-center text-zinc-800"
    >
      <div className=" bg-white/10 backdrop-blur-sm backdrop-filter bg-clip-border border border-gray-200/20 flex flex-col lg:w-[40%] md:w-[60%] items-center justify-center px-3 rounded-xl  w-full max-h-screen text-zinc-100 ">
        <div className="top mt-7 flex flex-col justify-center items-center text-4xl text-center">
          <div className="w-40 h-40">
            <ShowImage />
          </div>
          <h1 className="capitalize font-EB">{user.fullName}</h1>
        </div>
        <div className="w-full  px-3 sm:my-7 my-7 py-4  h-full   overflow-y-scroll overflow-x-hidden  flex flex-col items-center gap-4">
          {user?.socialLinks?.length > 0 ? (
            user.socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className="w-full"
                target="_blank"
              >
                <div className=" cursor-pointer flex justify-between items-center bg-white/20 backdrop-blur-sm backdrop-filter text-zinc-300  rounded-lg w-full p-3">
                  <div className="flex justify-between w-full items-center">
                    {link.platform}
                    <div className="text-xl">
                      <BsArrowUpRightCircle />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="w-full text-center flex justify-center items-center h-full">
              <div>Links not found</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
