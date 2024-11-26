import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const isLoggedIn = useAppSelector((state) => state.userReducer.authUser);
  return (
    <>
      <nav className="flex gap-6 fixed sm:top-[5%] left-[50%] -translate-x-[50%] px-4 items-center justify-between w-full sm:w-[70%] mx-auto bg-zinc-100 text-zinc-800 p-3 sm:rounded-xl">
        <div className="flex gap-4 text-zinc-500 items-center">
          <Link className="pr-5 text-zinc-800 text-lg font-bold" href={"/"}>
            ZanyLinks
          </Link>

          {isLoggedIn && <Link href={"/profile"}>Profile</Link>}
        </div>
        <div className="flex gap-3 items-center">
          {isLoggedIn ? (
            <>
              <Link
                className="px-3 py-2 bg-zinc-300 text-xs sm:text-base rounded-lg"
                href={"/logout"}
              >
                logout
              </Link>
            </>
          ) : (
            <>
              <Link
                className="sm:px-3 px-2 py-2 text-xs sm:text-base bg-zinc-300 rounded-lg"
                href={"/login"}
              >
                Login
              </Link>
              <Link
                className="sm:px-3 px-2 py-2 text-xs sm:text-base bg-zinc-900 text-zinc-200 rounded-lg"
                href={"/signup"}
              >
                SignUp
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
