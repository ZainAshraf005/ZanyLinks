import axios from "axios";
import { useRef, useState } from "react";
import { TiDelete } from "react-icons/ti";
import toast from "react-hot-toast";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

const AuthDialogue = ({ dialogue, mode }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const platformRef = useRef(null);
  const authUser = useAppSelector((state) => state.userReducer.authUser);
  const router = useRouter(); // Use useRouter for navigation

  const handleDelete = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password should match confirm password");
      return;
    }
    const user = {
      username: authUser.username,
      email: authUser.email,
      password,
    };

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/user/delete`,
        user,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res?.data?.success) {
        toast.success(res.data.message);
        setPassword("");
        setConfirmPassword("");
        dialogue(false);
        router.push("/logout");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
      console.error(error);
    }
  };
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      toast.error("new password can't be same as old one");
      return;
    }
    const object = {
      password: password,
      newPassword: confirmPassword,
    };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/update-password`,
        object,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data?.message) {
        toast.success(res.data.message);
        setPassword("");
        setConfirmPassword("");
        dialogue(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="absolute z-10 outline-none w-full flex justify-center items-center h-full bg-opacity-90 bg-zinc-900">
      <div className="border relative bg-zinc-900 py-36 rounded-md md:w-[50%] w-[90%] border-zinc-800 p-3  text-zinc-200 ">
        <div
          onClick={() => dialogue(false)}
          className="absolute cursor-pointer text-3xl top-3 left-3"
        >
          <TiDelete />
        </div>

        <div className="flex flex-col gap-5">
          <h1 className="text-center">
            {mode.delete ? "Delete User" : "Change Password"}
          </h1>

          <div>
            <form
              onSubmit={mode.delete ? handleDelete : handleChangePassword}
              className="flex flex-col gap-2"
            >
              <input
                className="py-1 outline-none px-2 rounded-lg bg-transparent border border-zinc-700"
                type="password"
                name="password"
                autoComplete="off"
                placeholder={`Enter${mode.password ? " old" : ""} password`}
                ref={platformRef}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className="py-1 outline-none px-2 rounded-lg bg-transparent border border-zinc-700"
                type="password"
                name="confirmPassword"
                autoComplete="off"
                placeholder={`${
                  mode.password ? "enter new " : "Confirm"
                } password`}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                className="py-1 px-2 rounded-lg bg-red-700  border-zinc-400"
                type="submit"
              >
                {mode.delete ? "Delete" : "Save"}
              </button>
            </form>
            {mode.delete && (
              <h1 className="w-full absolute bottom-5 text-center py-">
                this action can't be undo
              </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthDialogue;
