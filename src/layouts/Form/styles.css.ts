import { style } from '@vanilla-extract/css';

export const container = style({
    vars: {
        '--container-1': '320px',
    }
});

export const inner = style({
    display: 'flex',
    height: '100%',
});
