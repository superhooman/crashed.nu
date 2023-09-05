import { style } from '@vanilla-extract/css';

import { media } from '@src/styles/breakpoints';

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

export const wrapper = style({
    position: 'fixed',
    inset: 0,
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--space-5)',

    '@media': {
        print: {
            display: 'none',
        },
        [media.down('sm')]: {
            padding: 0,
            paddingTop: 'var(--space-5)',
            alignItems: 'flex-start',
            top: 'unset',
            maxHeight: '100%',
        },
    },
});

export const noPrint = style({
    '@media': {
        print: {
            display: 'none',
        },
    },
});

export const content = style({
    zIndex: 100,
    position: 'relative',
    backgroundColor: 'var(--color-panel-solid)',
    borderRadius: 'var(--radius-5)',
    boxShadow: 'var(--shadow-6)',
    vars: {
        '--dialog-padding': 'var(--space-5)',
        '--inset-padding': 'var(--dialog-padding)',
    },
    padding: 'var(--dialog-padding)',
    scrollBehavior: 'smooth',
    width: '100%',

    selectors: {
        '&[data-width="xs"]': {
            maxWidth: '280px',
        },

        '&[data-width="sm"]': {
            maxWidth: '400px',
        },

        '&[data-width="md"]': {
            maxWidth: '480px',
        },

        '&[data-width="lg"]': {
            maxWidth: '600px',
        },
    },

    '@media': {
        print: {
            display: 'none',
        },
    
        [media.up('md')]: {
            maxHeight: 'calc(100vh - 120px)',
            overflowY: 'auto',
        },

        [media.down('sm')]: {
            position: 'fixed',
            display: 'flex',
            flexDirection: 'column',
            bottom: 0,

            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,

            '::before': {
                content: '""',
                display: 'block',
                backgroundColor: 'var(--gray-a6)',
                position: 'absolute',
                top: 'var(--space-3)',
                zIndex: 100,
                opacity: 0.5,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 'var(--space-8)',
                height: 'var(--space-1)',
                borderRadius: 'var(--radius-2)',
            },
        },
    },
});

export const title = style({
    position: 'sticky',
    top: 0,
});

export const description = style({});

export const actions = style({
    display: 'flex',
    position: 'sticky',
    bottom: 0,
    gap: 'var(--space-2)',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 'var(--space-4)',

    '@media': {
        [media.down('sm')]: {
            flexDirection: 'column-reverse',
            alignItems: 'stretch',
        },
    },
});
