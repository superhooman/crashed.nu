import { ArchiveIcon, GlobeIcon, MixIcon } from '@radix-ui/react-icons';

import type React from 'react';

export const SLUG_TO_ICON: Record<string, React.FC> = {
    'all': GlobeIcon,
    'market': ArchiveIcon,
    'games': MixIcon,
};
