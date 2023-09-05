import { style } from '@vanilla-extract/css';

export const content = style({
    height: '100%',
    position: 'fixed',
    inset: 0,
    zIndex: 100,
    backgroundColor: 'var(--color-page-background)',

    '@media': {
        print: {
            display: 'none',
        },
    }
});

export const inner = style({
    height: '100%',
    width: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
});

export const overlay = style({
    backgroundColor: 'var(--color-overlay)',
    position: 'fixed',
    inset: 0,
    zIndex: 100,
    '@media': {
        print: {
            display: 'none',
        },
    }
});
