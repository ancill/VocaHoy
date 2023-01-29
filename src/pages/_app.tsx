import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "../utils/api";

import "../styles/globals.css";
import { useRouter } from "next/router";
import { useState } from "react";
import NavBottomBar, { routesConfig } from "../components/NavBottomBar";
import Head from "next/head";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [activePage, setActivePage] = useState(routesConfig.home);
  const router = useRouter();
  const changePage = (route: string) => {
    setActivePage(route);
    router.push(route);
  };

  return (
    <SessionProvider session={session}>
      <main data-theme="dracula">
        <Head>
          <title>Blazingly fast</title>
          <meta name="description" content="Fast vocabulary builder" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
        <NavBottomBar activePage={activePage} setActivePage={changePage} />
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
