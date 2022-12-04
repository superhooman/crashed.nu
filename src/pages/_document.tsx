import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => (
    <Html className="dark">
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
            <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600&family=Inter:wght@400;600&display=swap" rel="stylesheet" />
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
            <meta name="theme-color" content="#ffffff" />
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
    </Html>
);

export default Document;
