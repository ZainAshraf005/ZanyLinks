import { useAppSelector } from "@/redux/hooks";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const ShowImage = () => {
  const imageRef = useRef(null);
  const { username } = useParams();
  const authUser = useAppSelector((state) => state.userReducer.authUser);
  const [imagePhoto, setImagePhoto] = useState("");
  const [showUpload, setShowUpload] = useState(false);

  const defaultImage = "/defaultImage.jpg";

  const getImage = async (username) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/${username}/image`,
        { withCredentials: true }
      );
      if (res.data?.success && res.data?.profileImage.length > 0) {
        setImagePhoto(res.data.profileImage.replace(/\\/g, "/"));
      } else {
        setImagePhoto(defaultImage);
      }
    } catch (error) {
      console.error(error);
      setImagePhoto(defaultImage);
    }
  };

  const addImage = async (file) => {
    if (!file) {
      toast.error("No file chosen");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/upload/profile`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data?.success) {
        toast.success(res.data.message || "Image uploaded successfully");
        setImagePhoto(res.data.filePath.replace(/\\/g, "/"));

        window.location.reload();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error uploading image");
    }
  };

  const handleUploadClick = () => {
    imageRef.current.value = "";
    imageRef.current.click();
  };

  useEffect(() => {
    const finalUsername = username ? username : authUser?.username;
    if (finalUsername) getImage(finalUsername);
    if (authUser && finalUsername === authUser.username) {
      setShowUpload(true);
    } else {
      setShowUpload(false);
    }
  }, [authUser, username]);

  return (
    <div
      style={{
        backgroundImage: `url(${imagePhoto})`,
      }}
      className=" bg-cover overflow-hidden group bg-no-repeat bg-center rounded-full flex justify-center items-center w-full h-full"
    >
      {showUpload && (
        <div
          onClick={handleUploadClick}
          className="flex opacity-0 group-hover:opacity-100 group-hover:bg-opacity-70 cursor-pointer transition-all delay-100 text-sm w-full bg-zinc-700 h-full text-center justify-center items-center flex-col"
        >
          Upload
          <div className="hidden bg-zinc-900">
            <input
              onChange={(e) => addImage(e.target.files[0])}
              ref={imageRef}
              type="file"
              name="file"
              id="file"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowImage;
