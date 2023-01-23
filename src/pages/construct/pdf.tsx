import React from 'react';
import { type NextPage } from 'next';

import { Constructor } from '@src/features/constructor';
import { Head } from '@src/components/Head';
import { ROUTES } from '@src/constants/routes';

const ConstructorPdfPage: NextPage = () => {
  return (
    <>
      <Head
        title="crashed.nu - constructor"
        description="Get your perfect schedule in constructor!"
        url={ROUTES.PDF.get({ full: true })}
      />
      <Constructor pdf />
    </>
  );
};

export default ConstructorPdfPage;
