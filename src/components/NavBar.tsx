import React, { useEffect, useRef, useState } from "react";
import { navBarConfig } from "./NavBottomBar";
import Link from "next/link";
import useWindowSize from "../hooks/useWindowSize";

type Props = {
  route: string;
};

const conf = {
  title: "Blazingly fast vocabulary builder",
  shortTitle: "BFVB",
};

const NavBar = ({ route }: Props) => {
  const size = useWindowSize();
  const [title, setTitle] = useState(conf.title);
  const getRouterForTitle = () => {
    return route === "/home" ? conf.title : route.split("/")[1]?.toUpperCase();
  };

  return (
    <div className="navbar glass rounded-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn-ghost btn lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
        </div>
        <a className="btn-ghost btn text-xl normal-case">
          {getRouterForTitle()}
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            {navBarConfig.map((el) => (
              <Link key={el.title} href={el.route}>
                {el.title}
              </Link>
            ))}
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <button className="btn-primary btn">Sign In</button>
      </div>
    </div>
  );
};

export default NavBar;
