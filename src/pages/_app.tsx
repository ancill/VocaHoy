import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "../utils/api";

import "../styles/globals.css";
import { useRouter } from "next/router";
import { useState } from "react";
import NavBottomBar, { routesConfig } from "../components/NavBottomBar";
import Head from "next/head";
import NavBar from "../components/NavBar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [activePage, setActivePage] = useState(routesConfig.decks);
  const router = useRouter();
  const changePage = (route: string) => {
    setActivePage(route);
    router.push(route);
  };
  return (
    <div
      data-theme="dracula"
      className="grid place-items-center items-end bg-gradient-to-br from-primary to-secondary pt-20 text-primary-content"
    >
      <SessionProvider session={session}>
        <Head>
          <title>Blazingly fast</title>
          <meta name="description" content="Fast vocabulary builder" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="container mx-auto min-h-screen py-4">
          <NavBar route={activePage} />
          <Component {...pageProps} />
          <NavBottomBar activePage={activePage} setActivePage={changePage} />
        </div>
      </SessionProvider>
    </div>
  );
};

export default api.withTRPC(MyApp);
