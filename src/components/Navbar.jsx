import { Link } from "react-router-dom";
import { useState } from "react";
import { FaThreads } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaRegUserCircle, FaPlusCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdLeaderboard } from "react-icons/md";
import { LuLogIn } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slice/authSlice";
import { useClickAway } from "@uidotdev/usehooks";
function Navbar() {
  const [show, setShow] = useState(false);
  const ref = useClickAway(() => {
    setShow(false);
  });
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = () => dispatch(logout());

  return (
    <nav className="max-w-6xl px-3 mx-auto py-3 flex justify-between items-center">
      <div className="brand">
        <Link to={"/"} className="font-bold">
          <FaThreads className="inline" size={35} />
          <span className=" pl:1 lg:pl-3 ">Bilsyp</span>
        </Link>
      </div>
      <ul className="links rounded-md p-2">
        <li>
          <Link to={"/allThreads"} className="text-sm">
            All Threads
          </Link>
        </li>
      </ul>

      <div
        ref={ref}
        className="validation flex items-center justify-center gap-3 relative"
      >
        <Link
          to={"/login"}
          className={`${
            !isAuthenticated ? " hidden lg:block" : " block lg:hidden"
          } text-sm border   p-2 rounded-md shadow-md`}
        >
          Login
        </Link>
        <button
          className=" w-fit bg-slate-800 px-5 py-2 rounded-md text-white"
          onClick={() => setShow(!show)}
        >
          {show ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </button>
        <div
          className={`${
            !show ? "opacity-0 scale-0" : "opacity-100 scale-105"
          } duration-500 absolute h-fit pt-8 pb-5 px-3 w-80 bottom-0 top-[105%] right-3 test rounded-md border shadow-xl bg-gray-50 text-sm`}
        >
          <ul className="links flex justify-center flex-wrap gap-5">
            <li className={`${isAuthenticated ? "block" : "hidden"}`}>
              <Link to={"/profile"} className="flex items-center gap-2">
                <FaRegUserCircle size={20} /> Profile
              </Link>
            </li>
            <li className={`${isAuthenticated ? "block" : "hidden"}`}>
              <Link to={"/newThread"} className="flex items-center gap-2">
                <FaPlusCircle size={20} /> New Post
              </Link>
            </li>
            <li className={`${isAuthenticated ? "block" : "hidden"}`}>
              <Link
                to={"/"}
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <FiLogOut size={20} /> Logout
              </Link>
            </li>
            <li>
              <Link to={"/leaderboards"} className="flex items-center gap-2">
                <MdLeaderboard size={20} /> Leaderboard
              </Link>
            </li>
            <li>
              <Link
                to={"/login"}
                className={`${
                  isAuthenticated ? "hidden" : "block"
                }  lg:hidden flex items-center gap-2`}
              >
                <LuLogIn size={20} /> Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
