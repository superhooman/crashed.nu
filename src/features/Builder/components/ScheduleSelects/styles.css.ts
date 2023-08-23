import { style } from '@vanilla-extract/css';

export const scheduleItem = style({
  width: '100%',
  textOverflow: 'ellipsis',
});

export const text = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  lineHeight: 1.1,
  fontSize: 'calc(var(--font-size-1) * 0.9)',

  selectors: {
    '& + &': {
      marginTop: 1,
    }
  }
});

export const fullWidth = style({
  width: '100%',
});
