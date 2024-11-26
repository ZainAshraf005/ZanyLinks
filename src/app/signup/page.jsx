"use client";
import { useAppSelector } from "@/redux/hooks";
import axios from "axios";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const bg = "/signup.jpg";
  const authUser = useAppSelector((state) => state.userReducer.authUser);
  if (authUser) {
    redirect("/404");
  }
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/signup`,
        user,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.data.success) {
        toast.success("user created successfully");
        setUser({
          fullName: "",
          username: "",
          email: "",
          password: "",
        });
        router.push("/login");
      }
    } catch (error) {
      console.error("error is: ", error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <div className="grid lg:grid-cols-2 w-full h-screen">
        <div className="left w-full h-screen bg-zinc-800 flex flex-col ">
          <div className="logo text-xl mt-3 px-3">
            <Link href={"/"}>ZanyLinks</Link>
          </div>
          <div className="heading w-full text-center text-3xl font-semibold pt-12 sm:pt-6">
            Join ZanyLinks
          </div>
          <p className="w-full text-center mt-3">signup for free</p>
          <div className="w-[80%] h-fit m-auto">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 sm:px-4  "
              action=""
            >
              <div className="fullName flex flex-col">
                <label htmlFor="fullName">fullName</label>
                <input
                  className="bg-transparent outline-none border border-zinc-700 rounded-lg p-2"
                  type="text"
                  autoComplete="off"
                  required={true}
                  name="fullName"
                  id="fullName"
                  value={user.fullName}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="username flex flex-col">
                <label htmlFor="username">username</label>
                <input
                  className="bg-transparent outline-none border border-zinc-700 rounded-lg p-2"
                  type="text"
                  autoComplete="off"
                  required={true}
                  name="username"
                  id="username"
                  value={user.username}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="email flex flex-col">
                <label htmlFor="email">email</label>
                <input
                  className="bg-transparent outline-none border border-zinc-700 rounded-lg p-2"
                  type="email"
                  autoComplete="off"
                  required={true}
                  name="email"
                  id="email"
                  value={user.email}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="password flex flex-col">
                <label htmlFor="password">password</label>
                <input
                  className="bg-transparent outline-none border border-zinc-700 rounded-lg p-2"
                  type="password"
                  autoComplete="off"
                  required={true}
                  name="password"
                  id="password"
                  value={user.password}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 transition-all delay-75 border hover:bg-green-700 border-zinc-700 rounded-lg"
              >
                SignUp
              </button>
              <div>
                already have an account{" "}
                <Link className="text-blue-700 hover:underline" href={"/login"}>
                  login
                </Link>
              </div>
            </form>
          </div>
        </div>
        <div
          style={{ backgroundImage: `url(${bg})` }}
          className="right w-full bg-cover bg-center bg-no-repeat hidden lg:block bg-green-700 "
        ></div>
      </div>
    </>
  );
};

export default page;
