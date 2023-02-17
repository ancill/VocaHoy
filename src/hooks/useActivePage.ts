import { useRouter } from "next/router";
import { useState } from "react";
import { NAVIGATION_ROUTES } from "../constants/navigation";

export const useActivePageHook = () => {
  const [activePage, setActivePage] = useState(NAVIGATION_ROUTES.lib);

  const router = useRouter();
  const changePage = (route: string) => {
    setActivePage(route);
    router.push(route);
  };
  return { activePage, changePage };
};
