import dynamic from 'next/dynamic';

export * from './Tooltip';

export const Tooltip = dynamic(() => import('./Tooltip'), { ssr: false });
