import React, { useEffect, useRef, useState } from "react";

import Link from "next/link";
import useWindowSize from "../../hooks/useWindowSize";
import { NAVIGATION_CONFIGURATION } from "../../constants/navigation";
import Auth from "../User/Auth";
import { useActivePageHook } from "../../hooks/useActivePage";

const NavBar = () => {
  const { activePage, changePage } = useActivePageHook();
  const size = useWindowSize();

  if (size?.width < 1024) {
    return null;
  }
  1;
  const getRouterForTitle = () => {
    return activePage?.split("/")[1]?.toUpperCase();
  };

  return (
    <div className="navbar sticky top-0 z-10 mb-4 rounded-lg bg-base-100">
      <div className="navbar-start">
        <a className="btn-ghost btn text-2xl font-extrabold normal-case text-secondary">
          {getRouterForTitle()}
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            {NAVIGATION_CONFIGURATION.map((el) => (
              <Link
                key={el.title}
                href={el.route}
                className="font-bold"
                onClick={() => changePage(el.route)}
              >
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
