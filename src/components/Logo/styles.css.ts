import { style } from '@vanilla-extract/css';

export const glyph = style({
    color: 'var(--accent-9)',
    display: 'block',
});

export const logo = style({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-1)',
    fontSize: 'var(--font-size-4)',
    fontWeight: 600,
});

export const wordmark = style({
    marginTop: '-2%',
});
