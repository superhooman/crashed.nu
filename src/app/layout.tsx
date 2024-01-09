import { Suspense } from 'react';

import { Providers } from './providers';

import '@src/styles/reset.css';
import '@src/styles/global.css';
import '@radix-ui/themes/styles.css';

export default function RootLayout({
    children,
}: {
  children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
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
                <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
                <meta name="theme-color" content="#191719" media="(prefers-color-scheme: dark)" />
            </head>
            <body>
                <Suspense>
                    <Providers>
                        {children}
                    </Providers>
                </Suspense>
            </body>
        </html>
    );
}
