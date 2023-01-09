import React from "react";
import type { GetServerSideProps} from "next";
import { type NextPage } from "next";

import { Constructor } from "@src/features/constructor";
import { Head } from "@src/components/Head";

const ConstructorPage: NextPage = () => {
  return (
    <>
      <Head
        title="crashed.nu - constructor"
        description="Get your perfect schedule in constructor!"
        url="https://crashed.nu/constructor"
      />
      <Constructor />
    </>
  );
};

export default ConstructorPage;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      
    }
  }
}