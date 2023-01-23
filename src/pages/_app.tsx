import React from 'react';
import App, { type AppContext, type AppType } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import splitbee from '@splitbee/web';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { stringifyUrl } from 'query-string';
import { Inter, Manrope } from '@next/font/google';
import clsx from 'clsx';

import { saveTheme } from '@src/utils/theme';
import { getThemeServer, themeContext } from '@src/utils/theme';
import { trpc } from '@src/utils/trpc';
import { type Theme } from '@src/utils/theme';
import { isMobileContext } from '@src/utils/isMobileContext';
import { AttachmentPreview } from '@src/parts/social/AttachmentPreview';

import '@src/styles/reset.css';
import '@src/styles/global.scss';
import '@src/styles/markdown.css';

const ProviderIsMobile = isMobileContext.Provider;

const ThemeProvider = themeContext.Provider;

const LIGHT_THEME_COLOR = '#ffffff';
const DARK_THEME_COLOR = '#171717';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--t-inter',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--t-manrope',
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const MyApp: AppType<{ session: Session | null, dev: boolean }> = ({
  Component,
  pageProps: { session, dev, ...pageProps },
}) => {
  const { push, query, pathname } = useRouter();

  const { aid } = query;

  const [aPreview, setAPreview] = React.useState(() => !!aid);
  const [isMobile, setIsMobile] = React.useState(false);
  const [theme, setThemeValue] = React.useState((pageProps as { theme?: Theme }).theme || 'system');

  React.useEffect(() => {
    const id = aid as string;
    setAPreview(Boolean(id));
  }, [aid]);

  React.useEffect(() => {
    if (!aPreview) {
      push(stringifyUrl({
        url: pathname,
        query: {
          ...query,
          aid: undefined,
        },
      }), undefined, { shallow: true });
    }
  }, [aPreview, push, pathname, query]);

  React.useEffect(() => {
    !dev && splitbee.init({
      scriptUrl: '/bee.js',
      apiUrl: '/_hive',
    });
  }, [dev]);

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
    };
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
          <AttachmentPreview
            id={aid as string}
            open={aPreview}
            onOpenChange={setAPreview}
          />
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

  const classNames = clsx(inter.className, manrope.className);

  return {
      ...appProps,
      pageProps: {
        ...appProps.pageProps,
        theme,
        classNames,
        dev: process.env.NODE_ENV === 'development'
      }
  };
};

export default trpc.withTRPC(MyApp);
