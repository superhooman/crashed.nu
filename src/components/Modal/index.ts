import dynamic from 'next/dynamic';

export * from './Modal';

export const Modal = dynamic(() => import('./Modal'), { ssr: false });
