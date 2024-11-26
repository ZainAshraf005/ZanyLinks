"use client";

import { setAuthUser } from "@/redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import axios from "axios";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const authUser = useAppSelector((state) => state.userReducer.authUser);
  useEffect(() => {
    if (authUser) {
      redirect("/profile");
    }
    emailRef.current.focus();
  }, [authUser]);
  const bg =
    "/login.jpg"
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const emailRef = useRef(null);

  const dispatch = useAppDispatch();

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
        `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/login`,
        user,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setAuthUser(res.data.data));

        setUser({
          email: "",
          password: "",
        });
        redirect("/profile");
      }
    } catch (error) {
      if (error.response?.data?.message)
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
          <p className="w-full text-center mt-3">Login for free</p>
          <div className="w-[80%] h-fit m-auto">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 sm:px-4  "
              action=""
            >
              <div className="email flex flex-col">
                <label htmlFor="email">email</label>
                <input
                  className="bg-transparent outline-none border border-zinc-700 rounded-lg p-2"
                  type="email"
                  autoComplete="off"
                  required={true}
                  name="email"
                  ref={emailRef}
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
                Login
              </button>
              <div>
                don't have an account{" "}
                <Link
                  className="text-blue-700 hover:underline"
                  href={"/signup"}
                >
                  SignUp
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
