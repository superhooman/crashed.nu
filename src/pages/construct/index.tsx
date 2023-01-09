import React from "react";
import { type NextPage } from "next";

import { Constructor } from "@src/features/constructor";
import { Head } from "@src/components/Head";

const ConstructorPage: NextPage = () => {
  return (
    <>
      <Head
        title="crashed.nu - constructor"
        description="Get your perfect schedule in constructor!"
        url="https://crashed.nu/construct"
      />
      <Constructor />
    </>
  );
};

export default ConstructorPage;
