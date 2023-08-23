import { style } from '@vanilla-extract/css';

import { media } from '@src/styles/breakpoints';

export const side = style({
  maxWidth: 300,
  width: '100%',
  position: 'sticky',
  top: 0,
  height: '100vh',
  borderRight: '1px solid var(--gray-a6)',
  overflow: 'hidden',

  vars: {
    '--c-bg': 'var(--color-page-background)',
  },

  '@media': {
    print: {
      display: 'none',
    },
    [media.down('sm')]: {
      display: 'none',
    },
  },
});

export const menu = style({
  width: '100%',
  position: 'relative',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  vars: {
    '--c-bg': 'var(--color-page-background)',
  },
});

export const header = style({
  borderBottom: '1px solid var(--gray-a6)',
  backgroundColor: 'var(--color-page-background)',
  height: 56 + 1,
  flexShrink: 0,
  '@media': {
    print: {
      display: 'none',
    },
    [media.down('sm')]: {
      display: 'none',
    },
  },
});

export const mobileHeader = style({
  borderBottom: '1px solid var(--gray-a6)',
  top: 0,
  position: 'sticky',
  zIndex: 50,
  backgroundColor: 'var(--color-page-background)',
  '@media': {
    print: {
      display: 'none',
    },
    [media.up('sm')]: {
      display: 'none',
    },
  },
});

export const top = style({
  minHeight: 'calc(var(--space-1) * 14)',
  paddingTop: 'var(--space-2)',
  paddingBottom: 'var(--space-2)',
  '@media': {
    print: {
      display: 'none',
    },
  },
});
