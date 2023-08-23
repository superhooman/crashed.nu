import type { Metadata } from 'next';

import { Builder } from '@src/features/Builder';
import PCC from '@src/server/PCC';

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
};

export default async function Home() {
  const semesters = await PCC.getSemesters();

  return (
    <Builder
      semesters={semesters}
    />
  );
}
