import { DotsVerticalIcon, ReloadIcon } from '@radix-ui/react-icons';
import { Text, Button, DropdownMenu, Flex, Heading } from '@radix-ui/themes';
import React from 'react';

import { Modal } from '@src/components/Modal';
import { PrintModal } from '@src/features/PrintModal';

import { useSchedule } from '../../contexts/schedule';
import { useCache } from '../../contexts/cache';
import { useSchedules } from '../../contexts/schedules';


export const Settings: React.FC = () => {
    const { selectedSchedule, deleteSchedule } = useSchedules();
    const { selected, clearSelected } = useSchedule();
    const { clearCache } = useCache();

    const [printModal, setPrintModal] = React.useState(false);

    const showPrintModal = React.useCallback(() => {
        setPrintModal(true);
    }, []);

    const [resetModal, setResetModal] = React.useState(false);

    const showResetModal = React.useCallback(() => {
        setResetModal(true);
    }, []);

    const hideResetModal = React.useCallback(() => {
        setResetModal(false);
    }, []);

    const handleClear = React.useCallback(() => {
        clearSelected();
    }, [clearSelected]);

    const handleReset = React.useCallback(() => {
        clearCache();
        localStorage.clear();
        window.location.reload();
    }, [clearCache]);

    const handleRemoveSchedule = React.useCallback(() => {
        deleteSchedule(selectedSchedule);
    }, [deleteSchedule, selectedSchedule]);

    const handlePrint = React.useCallback(() => {
        setPrintModal(false);
        setTimeout(() => window.print(), 800);
    }, []);

    const handleExport = React.useCallback(() => {
        const text = selected.map(({ abbr, selection }) => {
            return `${abbr}: ${Object.entries(selection ?? {}).map(([key, value]) => `${Number(value) + 1}${key}`).join(', ')}`;
        }).join('\n');

        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'schedule.txt';
        a.click();
    }, [selected]);

    return (
        <Flex gap="3" py="3" px="4" align="center" justify="between">
            <PrintModal open={printModal} onOpenChange={setPrintModal} onPrint={handlePrint} />
            <Button color="gray" variant="soft" onClick={handleClear}>
                <ReloadIcon />
                Reset
            </Button>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Button variant="soft" color="gray">
                        <DotsVerticalIcon />
                    </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content align="end">
                    <DropdownMenu.Item onClick={showPrintModal}>
                        Print
                    </DropdownMenu.Item>
                    <DropdownMenu.Item onClick={handleExport}>
                        Export as txt
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item onClick={handleRemoveSchedule}>
                        Remove schedule
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item onClick={showResetModal} color="red">
                        Clear all data
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
            <Modal open={resetModal} onOpenChange={setResetModal}>
                <Heading size="4">Clear all data</Heading>
                <Text as="p" size="2">
                    Are you sure? All schedules and cached data will be erased.
                </Text>

                <Flex gap="3" mt="4" justify="end">
                    <Button onClick={hideResetModal} variant="soft" color="gray">
                        Cancel
                    </Button>
                    <Button onClick={handleReset} variant="solid" color="red">
                        Clear
                    </Button>
                </Flex>
            </Modal>
        </Flex>
    );
};
