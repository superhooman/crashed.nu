import React from "react";
import { type AppType } from "next/app";
import { setTheme } from "@src/utils/theme";

import { trpc } from "../utils/trpc";

import '@src/styles/reset.css';
import '@src/styles/global.scss';
import { isMobileContext } from "@src/utils/isMobileContext";
import Head from "next/head";

const ProviderIsMobile = isMobileContext.Provider;

const MyApp: AppType = ({ Component, pageProps }) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    setTheme();
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <ProviderIsMobile value={isMobile}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <Component {...pageProps} />
    </ProviderIsMobile>
  );
};

export default trpc.withTRPC(MyApp);
