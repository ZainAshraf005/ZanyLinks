"use client";
import AccountSettings from "@/components/AccountSettings";
import ShowLinks from "@/components/ShowLinks";
import { useAppSelector } from "@/redux/hooks";
import { IoIosArrowForward } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ShowImage from "@/components/ShowImage";

const Page = () => {
  const router = useRouter();
  const authUser = useAppSelector((state) => state.userReducer.authUser);
  const [activeBox, setActiveBox] = useState(0);
  const [sideBar, setSideBar] = useState(false);
  useEffect(() => {
    if (!authUser) {
      router.replace("/404");
    }
  }, []);

  const boxes = ["show links", "account settings"];

  const handleClick = (index) => {
    setSideBar(false);
    setActiveBox(index);
  };

  return (
    <>
      <div className="flex w-full max-h-screen bg-zinc-100">
        <div
          className={`left md:w-[25%] bg-zinc-800 absolute z-10 h-screen w-full ${
            sideBar ? "" : "-translate-x-[100%]"
          } md:translate-x-0 md:static flex flex-col transition-all delay-150 ease-in-out justify-between py-4 px-1`}
        >
          <div>
            <div className="flex justify-between items-center">
              <div className="flex flex-wrap gap-2">
                <Link href={"/"}>
                  <div className="px-2 py-1 border border-zinc-600 hover:bg-zinc-700 cursor-pointer rounded-lg w-fit">
                    homePage
                  </div>
                </Link>
                <Link href={"/logout"}>
                  <div className="px-2 py-1 border border-zinc-600 hover:bg-zinc-700 cursor-pointer rounded-lg w-fit">
                    Logout
                  </div>
                </Link>
                {authUser.isAdmin && (
                  <Link href={"/admin/users"}>
                    <div className="px-2 py-1 border border-zinc-600 hover:bg-zinc-700 cursor-pointer rounded-lg w-fit">
                      Admin panel
                    </div>
                  </Link>
                )}
              </div>
              <div
                onClick={() => setSideBar(!sideBar)}
                className="md:hidden text-2xl"
              >
                <TiDelete />
              </div>
            </div>
          </div>
          <div className="w-full h-full flex items-center flex-col justify-center">
            <div className=" w-40 h-40 lg:w-52 lg:h-52 md:w-40 md:h-40">
              <ShowImage />
            </div>
            <div className="p-2 mt-4 text-2xl capitalize">
              Hi, {authUser?.fullName}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {boxes.map((box, index) => (
              <div
                key={index}
                onClick={() => handleClick(index)}
                className={`p-3 border border-zinc-600 rounded-lg cursor-pointer ${
                  activeBox === index && "bg-zinc-700"
                } hover:bg-zinc-700 `}
              >
                {box}
              </div>
            ))}
          </div>
        </div>
        <div className="right md:w-[75%] w-full relative">
          <div
            // onClick={handleSidebar}
            className={`absolute ${
              sideBar ? "hidden" : ""
            }  md:hidden z-10 top-3 left-5  text-zinc-800 text-xl border border-zinc-700 rounded-full `}
          >
            <IoIosArrowForward onClick={() => setSideBar(!sideBar)} />
          </div>
          {activeBox === 0 && <ShowLinks username={authUser?.username} />}

          {activeBox === 1 && <AccountSettings />}
        </div>
      </div>
    </>
  );
};

export default Page;
