import { Box, Button, Card, Checkbox, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import React from 'react';

import { Modal } from '@src/components/Modal';
import { Select } from '@src/components/Select';
import { Input } from '@src/components/Input';

import * as cls from './styles.css';

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;

    onPrint: () => void;
}

export const PrintModal: React.FC<Props> = ({ open, onOpenChange, onPrint }) => {
    const handleClose = React.useCallback(() => {
        onOpenChange(false);
    }, [onOpenChange]);

    return (
        <Modal
            open={open}
            onOpenChange={onOpenChange}
        >
            <Heading mb="2" size="4">Export to PDF</Heading>
            <Text mb="2" as="p" size="2">
                In order to export your schedule as PDF-file, we use built-in print functionality that is not customizable from our side.
            </Text>
            <Text mb="4" as="p" size="2">
                But you can make it better by settings up your browser&apos;s print settings to these:
            </Text>
            <Card className={cls.card}>
                <Flex direction="column" gap="4">
                    <Grid columns="5" gap="2" align="center">
                        <Text size="2" color="gray" className={cls.label}>Paper size</Text>
                        <Select className={cls.value} value="A4" options={[{ label: 'A4', value: 'A4' }]} />
                    </Grid>
                    <Grid columns="5" gap="2" align="center">
                        <Text size="2" color="gray" className={cls.label}>Pages per sheet</Text>
                        <Select className={cls.value} value="1" options={[{ label: '1', value: '1' }]} />
                    </Grid>
                    <Grid columns="5" gap="2" align="center">
                        <Text size="2" color="gray" className={cls.label}>Margins</Text>
                        <Select className={cls.value} value="None" options={[{ label: 'None', value: 'None' }]} />
                    </Grid>
                    <Grid columns="5" gap="2" align="center">
                        <Text size="2" color="gray" className={cls.label}>Scale</Text>
                        <Select className={cls.value} value="Custom" options={[{ label: 'Custom', value: 'Custom' }]} />
                    </Grid>
                    <Grid columns="5" gap="2" align="center">
                        <Text size="2" color="gray" className={cls.label} />
                        <Box>
                            <Input value="90" size="2" readOnly />
                        </Box>
                    </Grid>
                    <Grid columns="5" gap="2" align="start">
                        <Text size="2" color="gray" className={cls.label}>Options</Text>
                        <Flex className={cls.value}>
                            <Text size="2">
                                <label>
                                    <Checkbox mr="1" defaultChecked /> Background graphics
                                </label>
                            </Text>
                        </Flex>
                    </Grid>
                </Flex>
            </Card>
            <Flex mt="4" gap="2" justify="end">
                <Button onClick={handleClose} variant="soft" color="gray">Cancel</Button>
                <Button onClick={onPrint}>Print</Button>
            </Flex>
        </Modal>
    );
};
