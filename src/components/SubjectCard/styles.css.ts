import { style } from '@vanilla-extract/css';

export const root = style({
  position: 'relative',
  padding: 'var(--space-1) var(--space-2)',
  paddingLeft: 10,
  backgroundColor: 'var(--color-page-background)',

  margin: 'var(--space-1)',
  borderRadius: 'var(--radius-1)',
  width: '100%',
  zIndex: 1,
  overflow: 'hidden',
});

export const text = style({
  display: 'block',
  fontSize: 'calc(var(--font-size-1) * 0.9)',
  lineHeight: 1.2,

  '@media': {
    print: {
      fontSize: 'calc(var(--font-size-1) * 0.8)',
    }
  }
});

export const overflow = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const details = style({
  opacity: 0.8,
});

export const color = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -1,
  opacity: 0.2,
});

export const colorLine = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: 4,
  height: '100%',
});
