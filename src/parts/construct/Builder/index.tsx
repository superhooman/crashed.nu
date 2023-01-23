import React from 'react';
import { ArrowLeftIcon, DownloadIcon, FileIcon } from '@radix-ui/react-icons';
import splitbee from '@splitbee/web';

import type { Course } from '@src/server/PCC/typings';
import type { SelectedSchedule } from './types';

import { Button } from '@src/components/Button';
import { Header } from '@src/components/Header';
import { Stack } from '@src/components/Stack';
import { Loader } from '@src/components/Loader';
import { Text } from '@src/components/Typography';
import { Divider } from '@src/components/Divider';
import { trpc } from '@src/utils/trpc';
import Tooltip from '@src/components/Tooltip/Tooltip';
import { Calendar } from '@src/components/Calendar';
import { PrintModal } from '@src/parts/common/PrintModal';

import { Menu } from './components/Menu';
import { Schedules } from './components/Schedules';
import { getWeek } from './utils/getWeek';
import { getCalendarItems } from './utils/getCalendarItems';
import { exportData } from './utils/exportData';
import { BuilderLayout } from './layout';

interface BuilderProps {
    courses: Course[];
    term: string;
    restart: () => void;
    pdf: boolean;
}

const getInitialSelection = (courses: Course[]) => courses.reduce((res: SelectedSchedule, course) => {
    res[course.id] = {};
    return res;
}, {});

export const Builder: React.FC<BuilderProps> = ({ courses, term, restart, pdf }) => {
    const { data: schedule, isLoading } = trpc.pcc.schedulesForIds.useQuery({ ids: courses.map(({ id }) => id), term, pdf });
    const [selection, setSelection] = React.useState<SelectedSchedule>(getInitialSelection(courses));
    const [selected, setSelected] = React.useState(courses[0]?.id || '');
    const week = React.useMemo(() => getWeek(getCalendarItems(selection, courses, schedule)), [selection, courses, schedule]);

    const [printModal, setPrintModal] = React.useState(false);

    const getSelectionHandler = React.useCallback((type: string) => (v: string) => {
        setSelection((s) => ({
            ...s,
            [selected]: {
                ...s[selected],
                [type]: v,
            }
        }));
    }, [selected]);

    const saveFile = React.useCallback(() => {
        splitbee.track('Export');
        exportData(selection, courses, schedule);
    }, [selection, courses, schedule]);

    React.useEffect(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }, [selected]);

    const selectionSchedule = selection?.[selected];

    return (
        <>
            <BuilderLayout
                side={(
                    <Stack
                        direction="column"
                        alignItems="stretch"
                        justifyContent="stretch"
                        grow={1}
                        style={{
                            minHeight: 'calc(100% + 16px)',
                            marginTop: -16,
                        }}
                    >
                        <Header noContainer />
                        <Stack
                            style={{
                                width: '100%',
                                paddingTop: 16,
                            }}
                            grow={1}
                            alignItems="stretch"
                            justifyContent="stretch"
                        >
                            {!isLoading ? (
                                <Stack
                                    grow={1}
                                    direction="column"
                                    gap={16}
                                >
                                    <Menu
                                        courses={courses}
                                        selected={selected}
                                        setSelected={setSelected}
                                    />
                                </Stack>
                            ) : (
                                <Stack grow={1} direction="column" alignItems="center" justifyContent="center" gap={8}>
                                    <Loader size={16} secondary />
                                    <Text color="secondary" size="small">Fetching schedules</Text>
                                </Stack>
                            )}
                        </Stack>
                        <Divider />
                        <Stack justifyContent="space-between">
                            <Button icon={<ArrowLeftIcon />} variant="link" size="small" onClick={restart}>Go back</Button>
                            <Stack gap={8}>
                                <Tooltip delayDuration={0} content="Export as txt">
                                    <Button icon={<DownloadIcon />} variant="link" size="small" onClick={saveFile} />
                                </Tooltip>
                                <Tooltip delayDuration={0} content="Export as pdf">
                                    <Button icon={<FileIcon />} variant="link" size="small" onClick={() => setPrintModal(true)} />
                                </Tooltip>
                            </Stack>
                        </Stack>
                    </Stack>
                )}
            >
                {selectionSchedule ? (
                    <Schedules
                        getSelectionHandler={getSelectionHandler}
                        selection={selectionSchedule}
                        schedule={schedule?.[selected]}
                    />
                ) : null}
                <Calendar week={week} />
                <PrintModal open={printModal} onOpenChange={setPrintModal} />
            </BuilderLayout>
        </>
    );
};
