import type { Metadata } from 'next';

import { Builder } from '@src/features/Builder';
import PCC from '@src/server/PCC';
import { DOMAIN } from '@src/constants/routes';

export const metadata: Metadata = {
    title: 'crashed.nu | builder',
    description: 'Build your perfect schedule. Before registration, of course.',
    openGraph: {
        title: 'crashed.nu | builder',
        description: 'Build your perfect schedule. Before registration, of course.',
        images: [
            '/og.png'
        ]
    },
    metadataBase: new URL(DOMAIN),
};

export default async function Home() {
    const semesters = await PCC.getSemesters();

    return (
        <Builder
            semesters={semesters}
        />
    );
}

export const dynamic = 'force-dynamic';
