import { DotsVerticalIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { Button, DropdownMenu, Flex, ScrollArea, Text } from '@radix-ui/themes';
import * as RadioGroup from '@radix-ui/react-radio-group';
import useSWR, { useSWRConfig } from 'swr';
import React from 'react';

import type { SelectedCourse } from '@src/schemas/builder';

import { Empty } from '@src/components/Empty';
import { getCourse } from '@src/app/actions/getCourse';
import { Select } from '@src/components/Select';

import { Separator } from '../Separator';
import { useSchedule } from '../../contexts/schedule';
import * as cls from './styles.css';
import { useSchedules } from '../../contexts/schedules';
import { Settings } from '../Settings';

interface Props {
    onAddCourse: () => void;
}

export const CourseList: React.FC<Props> = ({ onAddCourse }) => {
    const [enabled, setEnabled] = React.useState(false);

    const { schedules, selectedSchedule, selectSchedule, addSchedule } = useSchedules();
    const { selected, selectedCourse, selectCourse, removeCourse } = useSchedule();

    const handleScheduleChange = React.useCallback((value: string) => {
        if (value === 'new') {
            addSchedule();
            return;
        }
        selectSchedule(value);
    }, [addSchedule, selectSchedule]);
    
    React.useLayoutEffect(() => {
        setEnabled(true);
    }, []);

    if (!enabled) {
        return null;
    }

    return (
        <Flex direction="column" grow="1" height="3">
            <Flex direction="row" align="center" justify="between" gap="3" py="3" px="4">
                <Flex align="center" gap="2">
                    <Select
                        options={[
                            ...schedules.map((value, i) => ({ label: `Schedule ${i + 1}`, value })),
                            ...(schedules.length < 5 ? [{ label: 'Add...', value: 'new' }] : []),
                        ]}
                        value={selectedSchedule}
                        onValueChange={handleScheduleChange}
                    />
                </Flex>
                <Button onClick={onAddCourse}>
                    <PlusCircledIcon />
                    Add Courses
                </Button>
            </Flex>
            <Separator />

            {selected.length > 0 ? (
                <ScrollArea className={cls.scrollArea} scrollbars="vertical">
                    <Flex direction="column" gap="2" p="4" pr="5" style={{ minWidth: 0 }} width="100%">
                        <RadioGroup.Root
                            className={cls.group}
                            value={selectedCourse}
                            onValueChange={selectCourse}
                        >
                            <Flex
                                direction="column"
                                align="stretch"
                                justify="center" gap="2" width="100%" shrink="1" className={cls.flex}>
                                {selected.map(course => {
                                    const id = course.id;

                                    return (
                                        <Item course={course} id={id} term={course.term} key={id} removeCourse={removeCourse} />
                                    );
                                })}
                            </Flex>
                        </RadioGroup.Root>
                    </Flex>
                </ScrollArea>
            ) : (
                <Empty />
            )}
            <Separator />
            <Settings />
        </Flex>
    );
};

interface ItemProps {
    course: SelectedCourse;
    id: string;
    term: string;
    removeCourse: (id: string) => void;
}

const Item: React.FC<ItemProps> = ({ course, id, term, removeCourse }) => {
    const { mutate } = useSWRConfig();
    const { data } = useSWR({ key: 'course', courseId: course.id }, getCourse, {
        revalidateIfStale: false,
    });

    const handleRemove = React.useCallback(() => {
        removeCourse(course.id);
    }, [course, removeCourse]);

    const handleRefresh = React.useCallback(() => {
        mutate({ key: 'schedule', term, courseId: course.id });
    }, [course, mutate, term]);

    return (
        <Flex align="center" gap="4" width="100%" grow="1" shrink="1" className={cls.flex}>
            <RadioGroup.Item className={cls.item} value={id} id={id} key={id}>
                <label htmlFor={id}>
                    <Text as="div" weight="bold" size="1">{data?.abbr ?? '...'}</Text>
                    <Text as="div" size="1" className={cls.name}>{data?.title ?? 'Loading...'}</Text>
                </label>
            </RadioGroup.Item>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Button size="1" variant="ghost" color="gray">
                        <DotsVerticalIcon />
                    </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Item onClick={handleRefresh}>
                        Refresh
                    </DropdownMenu.Item>
                    <DropdownMenu.Item onClick={handleRemove} color="red">
                        Delete
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Flex>
    );
};
