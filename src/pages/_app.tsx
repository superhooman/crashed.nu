import React from "react";
import App, { type AppContext, type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import splitbee from '@splitbee/web';
import type { Theme } from "@src/utils/theme";
import { saveTheme } from "@src/utils/theme";
import { getThemeServer, themeContext } from "@src/utils/theme";
import Head from "next/head";

import { trpc } from "@src/utils/trpc";

import { isMobileContext } from "@src/utils/isMobileContext";

import '@src/styles/reset.css';
import '@src/styles/global.scss';
import { Toaster } from "react-hot-toast";

const ProviderIsMobile = isMobileContext.Provider;

const ThemeProvider = themeContext.Provider;

const LIGHT_THEME_COLOR = '#ffffff';
const DARK_THEME_COLOR = '#171717';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [isMobile, setIsMobile] = React.useState(false);
  const [theme, setThemeValue] = React.useState((pageProps as { theme?: Theme }).theme || 'system');

  React.useEffect(() => {
    splitbee.init({
      scriptUrl: '/bee.js',
      apiUrl: '/_hive',
    });
  }, []);

  const setTheme = React.useCallback((theme: Theme) => {
    setThemeValue(theme);
    saveTheme(theme);
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
    <ThemeProvider value={{
      theme,
      setTheme,
    }}>
      <SessionProvider session={session}>
        <Toaster containerClassName="notifications" />
        <ProviderIsMobile value={isMobile}>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            {
              theme === 'system' ? (
                <>
                  <meta name="theme-color" media="(prefers-color-scheme: light)" content={LIGHT_THEME_COLOR} />
                  <meta name="theme-color" media="(prefers-color-scheme: dark)" content={DARK_THEME_COLOR} />
                </>
              ) : (
                <meta name="theme-color" content={theme === 'light' ? LIGHT_THEME_COLOR : DARK_THEME_COLOR} />
              )
            }
          </Head>
          <Component {...pageProps} />
        </ProviderIsMobile>
      </SessionProvider>
    </ThemeProvider>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  const theme = getThemeServer(appContext.ctx.req);

  return { ...appProps, pageProps: { ...appProps.pageProps, theme } };
}

export default trpc.withTRPC(MyApp);
