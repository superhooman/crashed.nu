import { Separator as SeparatorBase } from '@radix-ui/themes';

import * as cls from './styles.css';

export const Separator = () => (
    <SeparatorBase size="4" className={cls.noShrink} />
);
