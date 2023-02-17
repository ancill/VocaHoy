import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";

import { api } from "../utils/api";

import "../styles/globals.css";
import { useRouter } from "next/router";
import { useState } from "react";
import NavBottomBar from "../components/Navigation/NavBottomBar";
import Head from "next/head";
import NavBar from "../components/Navigation/NavBar";
import { NAVIGATION_ROUTES } from "../constants/navigation";
import LoginForm from "../components/User/LoginForm";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <main data-theme="dracula" className="h-max min-h-screen bg-base-300">
      <Head>
        <title>VocaHoy</title>
        <meta name="description" content="Fast vocabulary builder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
        <div className="container mx-auto">
          <NavBar />
          <Component {...pageProps} />
          <NavBottomBar />
        </div>
      </SessionProvider>
    </main>
  );
};

export default api.withTRPC(MyApp);
