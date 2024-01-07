import type { Metadata } from 'next';

import { FormLayout } from '@src/layouts/Form';

export const metadata: Metadata = {
    title: 'crashed.nu | privacy policy',
};

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
    <FormLayout>
        {children}
    </FormLayout>
);

export default Layout;
