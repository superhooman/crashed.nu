import React from 'react';
import { type NextPage } from 'next';

import { Constructor } from '@src/features/constructor';
import { Head } from '@src/components/Head';
import { ROUTES } from '@src/constants/routes';

const ConstructorPage: NextPage = () => {
  return (
    <>
      <Head
        title="crashed.nu - constructor"
        description="Get your perfect schedule in constructor!"
        url={ROUTES.CONSTRUCTOR.get({ full: true })}
      />
      <Constructor />
    </>
  );
};

export default ConstructorPage;
