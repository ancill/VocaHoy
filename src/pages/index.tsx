import React from "react";
import LoginForm from "../components/User/LoginForm";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { NAVIGATION_ROUTES } from "../constants/navigation";

const IndexPage = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  console.log(sessionData);
  if (sessionData) {
    router.push(NAVIGATION_ROUTES.stats);
  }
  return <LoginForm />;
};
export default IndexPage;
