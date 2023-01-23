import clsx from 'clsx';
import { Head, Html, Main, NextScript } from 'next/document';

import type { Theme } from '@src/utils/theme';

interface Props {
    __NEXT_DATA__: {
        props: {
            pageProps: {
                theme: Theme;
                className: string;
            };
        }
    }
}

const Document = ({ __NEXT_DATA__ }: Props) => {
    const { theme, className } = __NEXT_DATA__.props.pageProps;

    return (
        <Html className={clsx(className, theme)}>
            <Head>
                <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
                <link rel="manifest" href="/icons/site.webmanifest" />
                <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#10a37f" />
                <link rel="shortcut icon" href="/icons/favicon.ico" />
                <meta name="apple-mobile-web-app-title" content="crashed" />
                <meta name="application-name" content="crashed" />
                <meta name="msapplication-TileColor" content="#10a37f" />
                <meta name="msapplication-config" content="/icons/browserconfig.xml" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

export default Document;
