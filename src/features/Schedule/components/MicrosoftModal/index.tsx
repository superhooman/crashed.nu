import { Button, Flex, Heading, Text } from '@radix-ui/themes';
import { signIn } from 'next-auth/react';
import React from 'react';

import { MicrosoftIcon } from '@src/components/Icon';
import { Modal } from '@src/components/Modal';

export const MicrosoftModal: React.FC = () => {
    const [open, setOpen] = React.useState(true);

    const [loading, setLoading] = React.useState(false);

    const handleMicrosoftSignIn = React.useCallback(() => {
        setLoading(true);
        signIn('azure-ad', {
            callbackUrl: window.location.href,
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return (
        <Modal open={open} onOpenChange={setOpen}>
            <Heading mb="2" size="4">Important!</Heading>
            <Text mb="4" as="p" size="2">
                Soon our univeristy will switch to Microsoft Office 365 from Google Workspace.
                Please add your Microsoft account to your profile to continue using crashed.nu.
                Otherwise, you will lost access to your account.
            </Text>
            <Flex direction="column" width="100%" align="stretch">
                <Button disabled={loading} onClick={handleMicrosoftSignIn} size="3" variant="outline" color="gray" radius="large">
                    <MicrosoftIcon size={16} />
                    <Text size="2">Connect with Microsoft</Text>
                </Button>
            </Flex>
        </Modal>
    );
};
