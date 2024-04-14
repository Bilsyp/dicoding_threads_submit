import { useState, useEffect } from "react";
import parse from "html-react-parser";
import ThreadEditor from "./interact/ThreadEditor";
import { FaHashtag } from "react-icons/fa";
import { useCreateThreadMutation } from "../api/threadApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../Loading";

const CreateThread = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [preview, setPreview] = useState(false);
  const [createThread, { isLoading, isSuccess, isError }] =
    useCreateThreadMutation();
  const { userToken } = useSelector((state) => state.auth);
  const handlePreview = () => setPreview(!preview);
  const handlePost = () => {
    const userData = {
      user: {
        title,
        body: value,
        category,
      },
      token: userToken,
    };
    createThread(userData);
  };
  useEffect(() => {
    if (isSuccess) {
      setCategory("");
      setTitle("");
      setValue("");
      toast.success("Thread Berhasil dibuat!", {
        position: "top-center",
      });
    }
    if (isError) {
      toast.error("Oops,Terjadi kesalahan saat pengiriman data!", {
        position: "top-center",
      });
    }
  }, [isSuccess, isError, isLoading]);
  if (preview) {
    return (
      <div className="px-5 lg:px-3 lg:max-w-3xl mx-auto mt-10 ">
        <button
          onClick={handlePreview}
          className="border shadow-sm p-3 rounded-md"
        >
          Back
        </button>{" "}
        <div className="mx-auto  text-center font-poppins  prose-xl max-w-4xl text-2xl font-bold block">
          <span className="text-3xl">{title}</span>
        </div>
        <div className=" container font-poppins mx-auto prose-xl  prose-img:mx-auto prose-img:border prose-img:shadow-sm prose-h1:text-xl p-3">
          {parse(value)}
          <span className=" italic border p-3 rounded-md">
            {" "}
            <FaHashtag className="inline" size={20} /> {category}
          </span>
        </div>
      </div>
    );
  }
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className=" px-2 lg:max-w-6xl lg:px-10 mx-auto my-3">
      <div>
        <h2 className="py-3 font-semibold">
          Create a new post to share with your audience.
        </h2>
      </div>
      <div className="space-y-6">
        <div
          className="rounded-lg border bg-card text-card-foreground shadow-sm"
          data-v0-t="card"
        >
          <div className="p-6 space-y-4">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col"
              htmlFor="title"
            >
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Title{" "}
              </span>

              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="title"
                value={title}
                placeholder="Enter a clear and descriptive title"
                required=""
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col"
              htmlFor="content"
            >
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Content{" "}
              </span>
              <ThreadEditor value={value} setValue={setValue} />
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col my-3"
                htmlFor="category"
              >
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Category{" "}
                </span>

                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="category"
                  value={category}
                  placeholder="Enter a clear and descriptive category"
                  required=""
                  onChange={(e) => setCategory(e.target.value)}
                />
              </label>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Enter your post content
              </span>
              <div className="mt-2 text-sm prose max-w-none">
                <button
                  onClick={handlePreview}
                  className="border shadow-sm p-3 rounded-md"
                >
                  see preview
                </button>
              </div>
            </label>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <a className="inline-flex items-center space-x-2 text-sm" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="m15 18-6-6 6-6"></path>
            </svg>
            Back to posts{" "}
          </a>
          <button onClick={handlePost} className="btn" type="submit">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateThread;
