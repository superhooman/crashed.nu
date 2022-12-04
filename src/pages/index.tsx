import type { NextPage } from 'next';

import { Landing } from '@src/features/landing';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
        <Head>
            <title>crashed.nu - a collection of useful tools</title>
            <meta name="title" content="crashed.nu - a collection of useful tools" />
            <meta name="description" content="Get your perfect schedule in constructor!" />

            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://crashed.nu/" />
            <meta property="og:title" content="crashed.nu - a collection of useful tools" />
            <meta property="og:description" content="Get your perfect schedule in constructor!" />
            <meta property="og:image" content="https://crashed.nu/cover.png" />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content="https://crashed.nu/" />
            <meta property="twitter:title" content="crashed.nu - a collection of useful tools" />
            <meta property="twitter:description" content="Get your perfect schedule in constructor!" />
            <meta property="twitter:image" content="https://crashed.nu/cover.png" />
        </Head>
        <Landing />
    </>
  );
};

export default Home;
