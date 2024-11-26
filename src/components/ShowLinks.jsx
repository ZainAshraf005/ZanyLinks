import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { TiDelete } from "react-icons/ti";
import { IoIosAddCircleOutline } from "react-icons/io";
import { RiShareLine } from "react-icons/ri";
import Dialouge from "./Dialouge";
import toast from "react-hot-toast";
import { useAppSelector } from "@/redux/hooks";

const ShowLinks = ({ username }) => {
  const authUser = useAppSelector((state) => state.userReducer.authUser);
  const [links, setLinks] = useState([]);
  const [mode, setMode] = useState({
    update: false,
    add: true,
  });
  const [dialouge, setDialouge] = useState(false);
  const [linkObj, setLinkObj] = useState({
    platform: "",
    url: "",
  });

  const latestNodeRef = useRef(null);

  const handleEdit = (platform, url) => {
    setLinkObj({
      platform,
      url,
    });
    setMode({
      update: true,
      add: false,
    });
    setDialouge(true);
  };

  const handleAdd = () => {
    setMode({
      add: true,
      update: false,
    });
    setDialouge(true);
  };

  const handleCopy = async () => {
    const textToCopy = `${process.env.NEXT_PUBLIC_FRONTEND_HOST}/links/${authUser.username}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast.success("link copied");
    } catch (error) {
      throw new Error(`Error coping: ${error}`);
    }
  };

  const handleDelete = async (platform) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/links/remove/${platform}`,
        { withCredentials: true }
      );
      if (res?.data?.success) {
        toast.success(res.data.message);
        setLinks((prev) => prev.filter((link) => link.platform !== platform));
      }
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error);
    }
  };

  const fetchLinks = async (username) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/links/${username}`,
        { withCredentials: true }
      );
      if (res?.data?.success) {
        setLinks(res.data.data.socialLinks);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    if (!dialouge) fetchLinks(username);
  }, [dialouge]);

  return (
    <>
      <div className="h-screen overflow-hidden w-full relative pb-4">
        {dialouge && (
          <Dialouge link={linkObj} dialouge={setDialouge} mode={mode} />
        )}
        <div className="flex flex-col items-center justify-center h-screen text-zinc-800 ">
          <div className="p-3 text-lg md:text-2xl uppercase">
            your links here
          </div>
          <div className="flex text-zinc-800 w-full justify-between px-4 ">
            <div
              title="add new link"
              className=" p-1 cursor-pointer rounded-full text-2xl md:text-3xl"
              onClick={handleAdd}
            >
              <IoIosAddCircleOutline />
            </div>
            <div
              title="copy links page for sharing"
              className=" p-2 font-bold cursor-pointer rounded-full text-xl md:text-2xl"
              onClick={handleCopy}
            >
              <RiShareLine />
            </div>
          </div>
          <div className="w-full  px-3 sm:my-7 my-7 py-4  h-full border  overflow-y-scroll overflow-x-hidden  flex flex-col items-center gap-4">
            {links.length > 0 ? (
              links.map((link, index) => (
                <div
                  className="border flex cursor-pointer justify-between items-center border-zinc-400 rounded-lg w-full p-3"
                  key={link._id}
                  ref={index === links.length - 1 ? latestNodeRef : null}
                >
                  <div className="w-fit">
                    <div>{link.platform}</div>
                    <div className="text-zinc-700 w-52 sm:w-72 md:w-96 overflow-ellipsis overflow-hidden ">
                      {link.url}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      title="edit"
                      className="text-lg"
                      onClick={() => handleEdit(link.platform, link.url)}
                    >
                      <FiEdit />
                    </button>
                    <button
                      title="delete"
                      className="text-2xl text-red-600"
                      onClick={() => handleDelete(link.platform)}
                    >
                      <TiDelete />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <div>no links found</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowLinks;
