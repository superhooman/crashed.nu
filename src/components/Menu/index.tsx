import dynamic from 'next/dynamic';

export * from './Menu';

export const Menu = dynamic(() => import('./Menu'), { ssr: false });
