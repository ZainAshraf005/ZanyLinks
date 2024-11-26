import { useAppSelector } from "@/redux/hooks";
import { redirect } from "next/navigation";

const Button = ({ text }) => {
  const authUser = useAppSelector((state) => state.userReducer.authUser);
  const handleClick = () => {
    if (authUser) {
      redirect("/profile");
    } else {
      redirect("/login");
    }
  };
  return (
    <button
      onClick={handleClick}
      className={`px-3 py-2  bg-purple-600 rounded-lg w-fit`}
    >
      {text}
    </button>
  );
};

export default Button;
