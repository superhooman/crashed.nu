import { style } from '@vanilla-extract/css';

import { media } from '@src/styles/breakpoints';

export const root = style({
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '56px 1fr',

    vars: {
        '--block-height': '96px',
        '--header-height': '36px',
    },

    '@media': {
        'print': {
            vars: {
                '--block-height': '72px',
                '--header-height': '20px',
            }
        }
    }
});

export const element = style({
    position: 'absolute',
    top: 0,
    display: 'flex',
    alignItems: 'stretch',
    width: '100%',
});

export const buttons = style({
    display: 'none',
    position: 'absolute',
    width: '100%',
    padding: 'var(--space-2) var(--space-5)',
    height: 'var(--header-height)',

    '@media': {
        [media.down('md')]: {
            display: 'flex',
        },
    },
});


export const days = style({
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',

    '@media': {
        [media.down('md')]: {
            gridTemplateColumns: 'minmax(0, 1fr)',
        },
    },
});

export const selected = style({
    '@media': {
        [media.up('md')]: {
            get selectors() {
                return {
                    [`${dayTitle} &`]: {
                        fontWeight: 'bold',
                        color: 'var(--accent-9)',
                    },
                };
            }
        },
    }
});

export const error = style({});

export const day = style({
    selectors: {
        [`&:not(${selected})`]: {
            '@media': {
                [media.down('md')]: {
                    display: 'none',
                }
            }
        },
        ['&::before']: {
            content: '""',
            position: 'absolute',
            display: 'block',
            height: '100%',
            width: '1px',
            zIndex: 11,
            backgroundColor: 'var(--gray-a6)',
            transform: 'translateX(-0.5px)',
        }
    },
});

export const dayTitle = style({
    textAlign: 'center',
    lineHeight: 'var(--header-height)',
    fontSize: 'var(--font-size-1)',
    color: 'var(--gray-a11)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-2)',
    padding: '0 var(--space-2)',

    background: 'var(--color-page-background)',
    boxShadow: '0 1px 0 0 var(--gray-a6)',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',

    selectors: {
        [`${day}${error} &`]: {
            color: 'var(--tomato-8)',
        },
    },

    '@media': {
        [media.up('md')]: {
            position: 'sticky',
            top: 0,
            zIndex: 10,
        },
        'print': {
            fontSize: 'var(--font-size-1)',
        }
    }
});

export const dayLabel = style({
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
});

export const dayItems = style({
    position: 'relative',
});

export const overlap = style({
    backgroundColor: 'var(--tomato-8)',
    width: '100%',
    margin: 'var(--space-1)',
    borderRadius: 'var(--radius-1)',
    opacity: 0.4,
});

export const now = style({
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    top: 0,
    left: 0,
    zIndex: 1,
    width: '100%',
    opacity: 0.8,
    marginTop: '-7px',

    selectors: {
        '&::before': {
            content: '""',
            display: 'block',
            width: 8,
            height: 1,
            backgroundColor: 'var(--gray-a6)',
        },
        '&::after': {
            content: '""',
            display: 'block',
            width: '100%',
            height: 1,
            backgroundColor: 'var(--gray-a6)',
        }
    },

    '@media': {
        'print': {
            display: 'none',
        }
    }
});

export const nowTime = style({
    fontSize: 'var(--font-size-1)',
    lineHeight: 1.5,
    flexShrink: 0,
    padding: '0 var(--space-2)',
    border: 'var(--gray-a6) 1px solid',
    borderRadius: 'var(--radius-2)',
    backgroundColor: 'var(--color-panel-translucent)',
});

export const times = style({
    paddingTop: 'var(--header-height)',
});

export const timeCell = style({
    lineHeight: 'var(--block-height)',
    fontSize: 'var(--font-size-1)',
    textAlign: 'center',
    color: 'var(--gray-a11)',

    selectors: {
        '&:first-of-type': {
            boxShadow: 'inset 0 1px 0 0 var(--gray-a6)',
        },
        '&:not(:last-of-type)::after': {
            content: '""',
            position: 'absolute',
            display: 'block',
            height: 1,
            width: '100%',
            backgroundColor: 'var(--gray-a6)',
        }
    },

    '@media': {
        'print': {
            fontSize: 'var(--font-size-1)',
        }
    }
});

export const today = style({
    position: 'fixed',
    right: 20,
    bottom: 20,
    zIndex: 10,

    '@media': {
        [media.up('md')]: {
            display: 'none',
        }
    }
});
