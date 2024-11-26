import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import axios from "axios";
import { useEffect, useState } from "react";
import AuthDialogue from "./AuthDialogue";
import { setAuthUser } from "@/redux/features/user/userSlice";

const AccountSettings = () => {
  const authUser = useAppSelector((state) => state.userReducer.authUser);
  const dispatch = useAppDispatch();
  const [dialogue, setDialogue] = useState(false);
  const [mode, setMode] = useState({
    delete: false,
    password: false,
    name: false,
  });
  const getData = async (username) => {
    try {
      const res = await axios.get(
        `https://zanylinks.up.railway.app/api/links/${username}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(
          setAuthUser({
            ...authUser,
            socialLinks: res.data.data.socialLinks,
          })
        );
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  const handlePasswordChange = () => {
    setMode({
      password: true,
      delete: false,
      name: false,
    });
    setDialogue(true);
  };
  const handleDelete = () => {
    setMode({
      delete: true,
      password: false,
      name: false,
    });
    setDialogue(true);
  };

  useEffect(() => {
    getData(authUser?.username);
  }, []);

  return (
    <>
      <div className="flex justify-center relative items-center gap-3 text-zinc-800 w-full h-screen  ">
        {dialogue && <AuthDialogue dialogue={setDialogue} mode={mode} />}
        <div className="border border-zinc-300   relative rounded-lg p-4 flex flex-col justify-between gap-1 w-[90%] h-[80%]">
          <div
            onClick={handlePasswordChange}
            className="absolute p-1 -top-4 right-3 bg-zinc-700 text-zinc-100 text-xs sm:text-base cursor-pointer border border-zinc-700 rounded-full"
          >
            change password
          </div>
          <div className="flex gap-14 border-b px-3 border-zinc-300 items-center">
            <h1 className="text-sm md:text-lg py-3  w-20 ">Name :</h1>
            <h1 className=" text-sm md:text-lg capitalize">
              {authUser?.fullName}
            </h1>
          </div>
          <div className="flex gap-14 border-b px-3 border-zinc-300 items-center ">
            <h1 className="text-sm md:text-lg text-nowrap py-3 w-20 ">
              username :
            </h1>
            <h1 className=" text-sm md:text-lg ">{authUser?.username}</h1>
          </div>

          <div className="flex gap-14 border-b px-3 border-zinc-300 items-center">
            <h1 className="text-sm md:text-lg my-3 w-20 ">email :</h1>
            <h1 className=" text-sm md:text-lg ">{authUser?.email}</h1>
          </div>
          <div className="flex gap-14 w-full border-b px-3 border-zinc-300 items-center">
            <h1 className="text-sm md:text-lg w-20 text-nowrap my-3 ">
              profile pic :
            </h1>
            <h1 className=" text-sm md:text-lg ">
              {authUser?.profileImage
                ? authUser?.profileImage.replace(/\\/g, "/").split("/").pop()
                : "no profile pic choosen"}
            </h1>
          </div>
          <div className="flex gap-14 border-b px-3 border-zinc-300 items-center">
            <h1 className="text-sm md:text-lg my-3 w-20 text-nowrap ">
              social links :
            </h1>
            <h1 className=" text-sm md:text-lg ">
              {authUser.socialLinks.length}
            </h1>
          </div>
          <div>
            <button
              onClick={handleDelete}
              className="py-2 px-3 bg-red-600 text-zinc-100 w-full rounded-lg"
            >
              delete user
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSettings;
