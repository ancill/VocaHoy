import React, { useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import { NAVIGATION_CONFIGURATION } from "../../constants/navigation";

const NavBottomBar = ({
  setActivePage,
  activePage,
}: {
  setActivePage: (route: string) => void;
  activePage: string;
}) => {
  const [active, setActive] = useState();
  const [isMobile, setMobile] = useState();
  const size = useWindowSize();

  if (size?.width > 1024) {
    return null;
  }

  return (
    <div className="btm-nav">
      {NAVIGATION_CONFIGURATION.map((el) => (
        <button
          key={el.title}
          className={`text-primary ${activePage === el.route ? "active" : ""}`}
          onClick={() => setActivePage(el.route)}
        >
          {el.title}
          {el.icon()}
        </button>
      ))}
    </div>
  );
};

export default NavBottomBar;
