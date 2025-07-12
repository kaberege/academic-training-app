import { Outlet, NavLink } from "react-router";
import { BiSearch } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { LuMessageCircle } from "react-icons/lu";
import logo from "./assets/images/logo.png";
import profile from "./assets/images/profile.png";

export default function App() {
  return (
    <div>
      <header className="sticky top-0 z-[999] bg-white flex items-center justify-between py-2 px-4 shadow shadow-zinc-400 ">
        <div className="flex items-center space-x-2">
          <a
            href="mailto:mentor@gmail.com"
            className="hidden sm:block text-lg text-blue-500 hover:text-blue-800 transition-colors"
          >
            learn@inasp
          </a>
          <img
            src={logo}
            alt="logo"
            className="h-8 w-8 rounded-full hover:brightness-75 transition-all"
            title="logo"
          />
          <ul className="hidden sm:flex items-center space-x-2 ml-4 text-lg font-medium">
            <li>
              <NavLink
                to="#"
                className={({ isActive }) =>
                  `${
                    isActive ? "text-gray-800" : "text-blue-700"
                  } hover:text-blue-700 transition-colors`
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="#"
                className={({ isActive }) =>
                  `${
                    isActive ? "text-gray-800" : "text-blue-700"
                  } hover:text-blue-700 transition-colors`
                }
              >
                My courses
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-2 text-zinc-500">
          <BiSearch className="hidden sm:block text-lg cursor-pointer hover:scale-105 transition-transform" />
          <div className="flex items-center sm:border-l-2 sm:border-zinc-200 sm:pl-2">
            <LuMessageCircle className="hidden sm:block mr-2 text-lg cursor-pointer hover:scale-105 transition-transform" />
            <img
              src={profile}
              alt="profile"
              className="h-8 w-8 rounded-full hover:brightness-75 transition-all"
              title="Profile"
            />
            <IoIosArrowDown className="ml-0.5 text-xs font-medium text-zinc-800" />
          </div>
        </div>
      </header>
      <main className="mt-2 px-8 sm:px-10">
        <Outlet />
      </main>
    </div>
  );
}
