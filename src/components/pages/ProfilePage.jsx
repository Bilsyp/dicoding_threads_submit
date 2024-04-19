import { useDispatch, useSelector } from "react-redux";
import { useGetProfileQuery } from "../api/threadApi";
import Loading from "../Loading";
import Error from "../Error";
import { useEffect } from "react";
import { setProfile } from "../../slice/authSlice";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.auth);
  const { data, isLoading, isError, isSuccess } = useGetProfileQuery(userToken);
  useEffect(() => {
    if (isSuccess) {
      dispatch(setProfile({ userId: data?.id, userData: data }));
    }
  }, [data, dispatch, isSuccess]);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }
  return (
    <section className=" max-w-6xl px-2 mx-auto">
      <div className="grid gap-6 items-center my-3">
        <div className="flex items-center">
          <img
            className="rounded-full bg-cover  w-20 h-20"
            alt="User profile picture"
            src={data?.avatar}
          />
          <div className="ml-4">
            <h1 className="text-2xl font-bold">{data?.name}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {data?.email}
            </p>
          </div>
        </div>
        <p className="text-lg leading-loose">
          Product Designer at Acme Corp. I love creating beautiful and
          user-friendly interfaces. In my free time, I enjoy photography and
          hiking.
        </p>
        <Link
          to={"/newThread"}
          className=" rounded-md p-3  border-2 shadow-lg  font-semibold w-fit"
        >
          New Post
        </Link>
        <div className="grid gap-4">
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
            data-v0-t="card"
          >
            <div className="p-4">
              <div className="grid gap-2">
                <h2 className="text-lg font-medium">
                  Designing the perfect form
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Posted on February 23, 2023
                </p>
              </div>
            </div>
          </div>
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
            data-v0-t="card"
          >
            <div className="p-4">
              <div className="grid gap-2">
                <h2 className="text-lg font-medium">
                  Exploring the principles of typography
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Posted on January 10, 2023
                </p>
              </div>
            </div>
          </div>
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
            data-v0-t="card"
          >
            <div className="p-4">
              <div className="grid gap-2">
                <h2 className="text-lg font-medium">
                  Creating a more accessible web
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Posted on November 30, 2022
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
