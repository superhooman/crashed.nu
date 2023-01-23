import type { NextPage } from 'next';

import { Landing } from '@src/parts/landing';
import { Head } from '@src/components/Head';
import { DOMAIN } from '@src/constants/routes';

const Home: NextPage = () => {
  return (
    <>
        <Head
            title="crashed.nu - home"
            description="A collection of some useful tools"
            url={DOMAIN}
        />
        <Landing />
    </>
  );
};

export default Home;
