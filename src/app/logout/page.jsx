"use client";

import { clearAuthUser } from "@/redux/features/user/userSlice";
import { useAppDispatch } from "@/redux/hooks";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

const page = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    try {
      const res = await axios.get(
        `https://zanylinks.up.railway.app/api/auth/logout`,
        {
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(clearAuthUser());
        router.push("/");
      }
    } catch (error) {
      console.log("error logout: ", error);
      toast.error(error?.response?.data?.message);
      router.push("/");
    }
  };
  useEffect(() => {
    handleLogout();
  }, []);

  return <div></div>;
};

export default page;
