import { globalStyle, style } from '@vanilla-extract/css';

export const scrollArea = style({
    flexGrow: 1,
    width: '100%',
});

globalStyle(`${scrollArea} [data-radix-scroll-area-viewport]>div`, {
    display: 'block!important',
});

export const group = style({
    maxWidth: '100%',
    flexGrow: 1,
});

export const flex = style({
    minWidth: 0,
});

export const item = style({
    padding: 'var(--space-2)',
    borderRadius: 'var(--radius-2)',
    minWidth: 0,
    flexGrow: 1,
    flexShrink: 1,

    ':hover': {
        backgroundColor: 'var(--gray-a3)',
    },

    selectors: {
        '&[data-state="checked"]': {
            backgroundColor: 'var(--accent-9)',
            color: 'var(--accent-9-contrast)',
        },
    },
});

export const name = style({
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
});
