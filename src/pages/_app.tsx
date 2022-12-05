import React from "react";
import { type AppType } from "next/app";
import splitbee from '@splitbee/web';
import { setTheme } from "@src/utils/theme";
import Head from "next/head";

import { trpc } from "@src/utils/trpc";

import { isMobileContext } from "@src/utils/isMobileContext";

import '@src/styles/reset.css';
import '@src/styles/global.scss';

const ProviderIsMobile = isMobileContext.Provider;

const MyApp: AppType = ({ Component, pageProps }) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    setTheme();
    splitbee.init({
      scriptUrl: '/bee.js',
      apiUrl: '/_hive',
    });
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile((typeof window !== 'undefined') && window.innerWidth < 768);
    };

    (typeof window !== 'undefined') && window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      (typeof window !== 'undefined') && window.removeEventListener('resize', handleResize);
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
