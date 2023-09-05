import { style } from '@vanilla-extract/css';

export const inside = style({
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
});

export const over = style({
    top: 0,
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'var(--c-bg)',
});
