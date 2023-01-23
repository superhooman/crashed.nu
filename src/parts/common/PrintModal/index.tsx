import React from 'react';

import { Button } from '@src/components/Button';
import { Modal, ModalTitle } from '@src/components/Modal';
import { Stack } from '@src/components/Stack';
import { Paragraph } from '@src/components/Typography';

import { Video } from './components/Video';

interface Props {
    open: boolean;
    onOpenChange: (value: boolean) => void;
}

export const PrintModal: React.FC<Props> = ({ open, onOpenChange }) => {
    return (
        <Modal maxWidth="lg" open={open} onOpenChange={onOpenChange}>
            <ModalTitle>Export as PDF</ModalTitle>
            <Stack direction="column" gap={12}>
                <div>
                    <Paragraph size="small">In order to export your schedule as PDF-file, we use built-in print functionality that is not customizable from our side.</Paragraph>
                    <br />
                    <Paragraph size="small">But you can make it better:</Paragraph>
                    <Paragraph size="small">- Disable headers and footers</Paragraph>
                    <Paragraph size="small">- Disable margins</Paragraph>
                    <Paragraph size="small">- Enable background graphics</Paragraph>

                </div>
                <Video />
                <Button onClick={() => {
                    onOpenChange(false);
                    setTimeout(() => window.print(), 500);
                }} fullWidth variant="primary">Export</Button>
                <Button onClick={() => onOpenChange(false)} fullWidth>Cancel</Button>
            </Stack>
        </Modal>
    );
};
