import { FormLayout } from '@src/layouts/Form';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
    <FormLayout>
        {children}
    </FormLayout>
);

export default Layout;
