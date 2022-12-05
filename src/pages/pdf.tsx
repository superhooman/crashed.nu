import React from "react";
import { type NextPage } from "next";

import { Constructor } from "@src/features/constructor";
import Head from "next/head";

const ConstructorPdfPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>crashed.nu - constructor</title>
        <meta name="title" content="crashed.nu - constructor" />
        <meta name="description" content="Get your perfect schedule in constructor!" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://crashed.nu/pdf" />
        <meta property="og:title" content="crashed.nu - constructor" />
        <meta property="og:description" content="Get your perfect schedule in constructor!" />
        <meta property="og:image" content="https://crashed.nu/cover.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://crashed.nu/pdf" />
        <meta property="twitter:title" content="crashed.nu - constructor" />
        <meta property="twitter:description" content="Get your perfect schedule in constructor!" />
        <meta property="twitter:image" content="https://crashed.nu/cover.png" />
      </Head>
      <Constructor pdf />
    </>
  );
};

export default ConstructorPdfPage;
