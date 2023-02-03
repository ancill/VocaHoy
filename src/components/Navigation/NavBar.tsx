import React, { useEffect, useRef, useState } from "react";

import Link from "next/link";
import useWindowSize from "../../hooks/useWindowSize";
import { NAVIGATION_CONFIGURATION } from "../../constants/navigation";
import Auth from "../User/Auth";

type Props = {
  route: string;
};

const conf = {
  title: "Blazingly fast vocabulary builder",
  shortTitle: "BFVB",
};

const NavBar = ({ route }: Props) => {
  const [title, setTitle] = useState(conf.title);
  const size = useWindowSize();

  if (size?.width < 1024) {
    return null;
  }

  const getRouterForTitle = () => {
    return route === "/home" ? conf.title : route.split("/")[1]?.toUpperCase();
  };

  return (
    <div className="navbar glass sticky top-0 z-10  rounded-lg text-primary-content">
      <div className="navbar-start">
        <a className="btn-ghost btn text-2xl font-extrabold normal-case">
          {getRouterForTitle()}
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            {NAVIGATION_CONFIGURATION.map((el) => (
              <Link key={el.title} href={el.route} className="font-bold">
                {el.title}
              </Link>
            ))}
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <Auth />
      </div>
    </div>
  );
};

export default NavBar;
