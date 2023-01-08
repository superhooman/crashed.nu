import type { NextPage } from 'next';

import { Landing } from '@src/features/landing';
import { Head } from '@src/components/Head';

const Home: NextPage = () => {
  return (
    <>
        <Head
            title="crashed.nu - a collection of useful tools"
            description="Get your perfect schedule in constructor!"
            url="https://crashed.nu/"
            image="https://crashed.nu/cover2.png"
        />
        <Landing />
    </>
  );
};

export default Home;
