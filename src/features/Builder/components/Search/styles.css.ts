import { style } from '@vanilla-extract/css';

import { media } from '@src/styles/breakpoints';

export const noShrink = style({
    flexShrink: 0,
});


export const input = style({
    '@media': {
        [media.down('sm')]: {
            fontSize: 16,

            selectors: {
                '&::placeholder': {
                    fontSize: 'var(--font-size-2)'
                }
            }
        }
    }
});
