import dynamic from 'next/dynamic';

export * from './Drawer';

export const Drawer = dynamic(() => import('./Drawer'), { ssr: false });
