import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { TiDelete } from "react-icons/ti";
import toast from "react-hot-toast";

const Dialouge = ({ link, dialouge, mode }) => {
  const [platform, setPlatform] = useState(link.platform || ""); // Corrected here
  const [url, setUrl] = useState(link.url || "");
  const platformRef = useRef(null);

  const handleCheck = (platform, url) => {
    if (platform?.length < 3) {
      toast.error("name can't be less than 3 chars");
      return false;
    }
    if (!url?.includes("http")) {
      toast.error("invalid url");
      return false;
    }

    return true;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const object = {
      platform: link.platform,
      newPlatform: platform.toLowerCase(),
      newUrl: url,
    };
    if (handleCheck(object.newPlatform, object.newUrl)) {
      try {
        const res = await axios.post(
          `https://zanylinks.up.railway.app/api/links/update`,
          object,
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        if (res.data.success) {
          toast.success(res.data.message);
          setPlatform("");
          setUrl("");
          dialouge(false);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  };
  const handleAdd = async (e) => {
    e.preventDefault();
    const object = {
      platform:platform.toLowerCase(),
      url,
    };
    if (handleCheck(object.platform, object.url)) {
      try {
        const res = await axios.post(
          `https://zanylinks.up.railway.app/api/links/add`,
          [object],
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        if (res?.data?.success) {
          toast.success(res.data.message);
          setPlatform("");
          setUrl("");
          dialouge(false);
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.message);
      }
    }
  };
  useEffect(() => {
    if (mode.add) {
      setPlatform("");
      setUrl("");
    }
    platformRef.current.focus();
  }, [mode]);

  return (
    <div className="absolute z-10 outline-none w-full flex justify-center items-center h-full bg-opacity-90 bg-zinc-900">
      <div className="border relative bg-zinc-900 py-36 rounded-md md:w-[50%] w-[90%] border-zinc-800 p-3  text-zinc-200 ">
        <div
          onClick={() => dialouge(false)}
          className="absolute cursor-pointer text-3xl top-3 left-3"
        >
          <TiDelete />
        </div>

        <div className="flex flex-col gap-5">
          <h1 className="text-center">
            {mode.update ? "Edit link" : "Add new Link"}
          </h1>

          <div>
            <form
              className="flex flex-col gap-2"
              onSubmit={mode.update ? handleSave : handleAdd}
            >
              <input
                className="py-1 outline-none px-2 rounded-lg bg-transparent border border-zinc-700"
                type="text"
                name="platform"
                autoComplete="off"
                placeholder="link name"
                ref={platformRef}
                id="platform"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
              />
              <input
                className="py-1 outline-none px-2 rounded-lg bg-transparent border border-zinc-700"
                type="text"
                name="url"
                autoComplete="off"
                placeholder="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <button
                className="py-1 px-2 rounded-lg bg-green-700  border-zinc-400"
                type="submit"
              >
                {mode.update ? "Save" : "Add"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialouge;
