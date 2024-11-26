"use client";
import { useAppSelector } from "@/redux/hooks";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
const page = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const authUser = useAppSelector((state) => state.userReducer.authUser);
  const getUsers = async () => {
    try {
      const res = await axios.get(
        `https://zanylinks.up.railway.app/api/auth/admin/users`,
        { withCredentials: true }
      );
      if (res.data?.success) {
        console.log("users");
        setUsers(res.data.users);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (authUser && authUser?.isAdmin) {
      getUsers();
    } else {
      router.push("/404");
    }
  }, []);

  return (
    <>
      {authUser?.isAdmin && (
        <div className="flex flex-col text-zinc-800 bg-zinc-100 w-full h-screen">
          <Link
            href={"/profile"}
            className="absolute top-5 cursor-pointer left-4 rounded-xl bg-zinc-700 text-zinc-100 px-3 py-1"
          >
            profile page
          </Link>
          <div className="w-full text-center text-4xl capitalize border-b border-zinc-400 py-7">
            all users
          </div>
          <div className="p-4 grid grid-cols-4 gap-3">
            {users.map((user, index) => (
              <Link
                href={`./users/${user.username}`}
                key={index}
                className="border border-zinc-400 p-5 w-full capitalize rounded-xl text-center"
              >
                {user.fullName}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default page;
