import { style } from '@vanilla-extract/css';

export const label = style({
    gridColumn: 'span 2',
});

export const value = style({
    gridColumn: 'span 3',
});

export const card = style({
    pointerEvents: 'none',
    opacity: 0.8,
});
