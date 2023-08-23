import { style } from '@vanilla-extract/css';

export const root = style({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    color: 'var(--gray-a11)',
    fontSize: 'var(--font-size)'
});

export const label = style({
    position: 'relative',
    display: 'block',
    flexGrow: 1,

    '::before': {
        position: 'absolute',
        bottom: 3,
        left: 0,
        display: 'block',
        width: '100%',
        height: 1,
        content: '""',
        background: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAABCAAAAAA+i0toAAAAAnRSTlMA/1uRIrUAAAAMSURBVHheY7j1/z8ABY8C2UtBe8oAAAAASUVORK5CYII=") 0 0 repeat-x',   
    },
});

export const span = style({
    position: 'relative',
    paddingRight: 3,
    backgroundColor: 'var(--color-panel)',
});

export const value = style({
    paddingLeft: 4,
    flexShrink: 0,
    maxWidth: '65%',
    textAlign: 'right',
});
