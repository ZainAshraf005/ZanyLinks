"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BsArrowUpRightCircle } from "react-icons/bs";
import toast from "react-hot-toast";

const page = () => {
  const defaultImage = "/defaultImage.jpg";
  const image = "/background.jpg";

  const router = useRouter();
  const { username } = useParams();
  const [imagePhoto, setImagePhoto] = useState("");
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});

  const deleteUser = async () => {
    try {
      const res = await axios.post(
        `https://zanylinks.up.railway.app/api/auth/admin/user/delete`,
        { username },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.data?.success) {
        toast.success(res.data.message);
        router.push("/admin/users");
      }
    } catch (error) {
      if (error?.response?.data?.message)
        toast.error(error?.response?.data?.message);
      console.error(error);
    }
  };

  const getUsers = async () => {
    try {
      const res = await axios.get(
        `https://zanylinks.up.railway.app/api/auth/admin/users`,
        { withCredentials: true }
      );
      if (res.data?.success) {
        setUsers(res.data.users);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []); // Runs only once when the component mounts

  useEffect(() => {
    // This runs whenever `users` changes
    if (users.length > 0) {
      const foundUser = users.find((e) => e.username === username);
      setUser(foundUser || {});

      setImagePhoto(
        user.profileImage
          ? `${
              process.env.NEXT_PUBLIC_BACKEND_HOST
            }/${user.profileImage.replace(/\\/g, "/")}`
          : defaultImage
      );
    }
  }, [users, username]); // Dependency array includes `users` and `username`

  return (
    <div
      style={{ backgroundImage: `url(${image})` }}
      className="w-full h-screen bg-cover md:py-4 bg-center bg-norepeat flex justify-center text-zinc-800"
    >
      <div className="bg-white/10 backdrop-blur-sm backdrop-filter bg-clip-border border border-gray-200/20 flex flex-col lg:w-[40%] md:w-[60%] items-center justify-center px-3 rounded-xl w-full max-h-screen text-zinc-100">
        <div
          onClick={deleteUser}
          title="this will delete user instantly"
          className="absolute -top-3 right-3 bg-red-700 cursor-pointer rounded-full px-3 py-1"
        >
          delete user
        </div>
        <div className="top mt-7 flex flex-col justify-center items-center text-4xl text-center">
          <div className="w-40 h-40">
            <div
              style={{
                backgroundImage: `url(${imagePhoto})`,
              }}
              className=" bg-cover overflow-hidden group bg-no-repeat bg-center rounded-full flex justify-center items-center w-full h-full"
            ></div>
          </div>
          <h1 className="capitalize font-EB">
            {user?.fullName || "User not found"}
          </h1>
          <div className="text-sm w-full flex gap-4 mt-4">
            <h1>
              username:
              {` ${user?.username}` || "User not found"}
            </h1>
            <h1>
              email:
              {` ${user?.email}` || "User not found"}
            </h1>
          </div>
        </div>
        <div className="w-full px-3 sm:my-7 my-7 py-4 h-full overflow-y-scroll overflow-x-hidden flex flex-col items-center gap-4">
          {user?.socialLinks?.length > 0 ? (
            user.socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className="w-full"
                target="_blank"
              >
                <div className="cursor-pointer flex justify-between items-center bg-white/20 backdrop-blur-sm backdrop-filter text-zinc-300 rounded-lg w-full p-3">
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
