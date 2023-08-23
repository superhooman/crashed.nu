import { ChevronLeftIcon, MagnifyingGlassIcon, MinusCircledIcon, PlusCircledIcon, QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { Box, Button, Card, Flex, Grid, Heading, ScrollArea, Separator, Text } from '@radix-ui/themes';
import React from 'react';
import useSWRInfinite from 'swr/infinite';
import { useSWRConfig } from 'swr';
import { serialize } from 'swr/_internal';
import { z } from 'zod';

import type { Course } from '@src/server/PCC/types';
import type { SearchSchema } from '@src/schemas/search';
import type { SelectedCourse } from '@src/schemas/builder';

import { Input } from '@src/components/Input';
import { Select } from '@src/components/Select';
import { LEVELS } from '@src/constants/levels';
import { dateToSemester } from '@src/utils/semester/dateToSemester';
import { search } from '@src/app/actions/search';
import { LoadingContainer } from '@src/components/Loading';
import { Empty } from '@src/components/Empty';
import { Modal } from '@src/components/Modal';
import { Property } from '@src/components/Property';
import { useLocalStorage } from '@src/hooks/useLocalStorage';

import { useSemesters } from '../../contexts/semesters';
import { useSchedule } from '../../contexts/schedule';
import * as cls from './styles.css';


interface Props {
    back: () => void;
}

const getKey = (input: SearchSchema) => (pageIndex: number, previousPageData?: { items: Course[], cursor?: number }) => {
    if (previousPageData && !previousPageData.cursor) return input;

    return {
        ...input,
        key: 'search',
        page: previousPageData?.cursor ?? 1,
    };
};

export const Search: React.FC<Props> = ({ back }) => {
    const { semesters } = useSemesters();
    const { selected, toggleCourse } = useSchedule();
    const { cache } = useSWRConfig();
    const [ready, setReady] = React.useState(false);
    const [level, setLevel] = useLocalStorage('search.level', z.string(), LEVELS[0].value);

    const [semester, setSemester] = React.useState<string>(() => {
        const preferredSemester = dateToSemester(new Date());
        const semester = semesters.find(({ label }) => label.includes(preferredSemester));

        if (semester) {
            return semester?.value;
        }

        return semesters[0].value;
    });

    const [query, setQuery] = React.useState('');

    const handleQueryChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }, []);

    const [enabled, setEnabled] = React.useState(false);

    const [input, setInput] = React.useState<SearchSchema>(() => ({
        query,
        level,
        term: semester,
    }));

    const handleSearch = React.useCallback(() => {
        if (!query) {
            return;
        }
        setEnabled(true);
        setInput({
            query,
            level,
            term: semester,
        });
    }, [query, level, semester]);

    const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        handleSearch();
    }, [handleSearch]);

    const [modal, setModal] = React.useState<{ course?: Course, open: boolean }>({ open: false });

    const handleOpenModal = React.useCallback((course: Course) => {
        setModal({
            course,
            open: true,
        });
    }, []);

    const handleModalChange = React.useCallback((open: boolean) => {
        setModal((prev) => ({
            ...prev,
            open,
        }));
    }, []);

    const handleToggleCourse = React.useCallback((course: Course) => {
        const [key] = serialize({
            key: 'course',
            courseId: course.id,
        });

        cache.set(key, { data: course });
        toggleCourse(course.id, semester, course.abbr);
    }, [toggleCourse, semester, cache]);

    React.useLayoutEffect(() => {
        setReady(true);
    }, []);

    if (!ready) {
        return null;
    }

    return (
        <Flex direction="column" grow="1" height="100%">
            <Flex direction="column" align="start" gap="3" py="3" px="4">
                <Button onClick={back} color="gray" variant="soft">
                    <ChevronLeftIcon />
                    Back
                </Button>
            </Flex>
            <Separator size="4" className={cls.noShrink} />
            <Flex direction="column" gap="3" p="4" asChild>
                <form onSubmit={handleSubmit}>
                    <Input autoCapitalize="off" className={cls.input} autoCorrect="off" icon={<MagnifyingGlassIcon />} value={query} onChange={handleQueryChange} placeholder="Course abbr (ex. CSCI 152) or title" size="2" />
                    <Grid columns={{
                        initial: '2',
                        sm: '1'
                    }} width="100%" gap="3">
                        <Select value={level} onValueChange={setLevel} options={LEVELS} size="2" />
                        <Select value={semester} onValueChange={setSemester} options={semesters} placeholder="Semester" size="2" />
                    </Grid>
                    <Button type="submit" size="2" onClick={handleSearch}>Search</Button>
                </form>
            </Flex>
            <Separator size="4" className={cls.noShrink} />
            <Modal open={modal.open} onOpenChange={handleModalChange}>
                {modal.course ? (
                    <MoreInfo course={modal.course} />
                ) : null}
            </Modal>
            {enabled ? (
                <Results
                    selected={selected}
                    input={input}
                    toggleCourse={handleToggleCourse}
                    moreAboutCourse={handleOpenModal}
                />
            ) : null}
        </Flex>
    );
};

interface MoreInfoProps {
    course: Course;
}

const MoreInfo: React.FC<MoreInfoProps> = ({ course }) => {
    return (
        <Flex direction="column">
            <Text as="p" color="green" size="2" weight="bold">{course.abbr}</Text>
            <Heading mb="4" size="5">{course.title}</Heading>
            <Text as="p" color="gray" size="2" mb="4">{course.description}</Text>
            <Property size="2" label="School" value={course.school} />
            <Property size="2" label="Department" value={course.department} />
            <Property size="2" label="Credits" value={course.credits} />
        </Flex>
    );
};

interface ResultsProps {
    input: SearchSchema;
    selected: SelectedCourse[];
    toggleCourse: (course: Course) => void;
    moreAboutCourse: (course: Course) => void;
}

const Results: React.FC<ResultsProps> = ({ input, moreAboutCourse, toggleCourse, selected }) => {
    const { cache } = useSWRConfig();
    const { data, setSize, isLoading, isValidating } = useSWRInfinite(getKey(input), search, {
        revalidateIfStale: true,
        revalidateAll: true,
        onSuccess: (_, key) => {
            // Disabling cache
            cache.delete(key);
        }
    });

    const isCourseSelected = React.useCallback((course: Course) => {
        return selected.some(({ id }) => id === course.id);
    }, [selected]);

    const loadMore = React.useCallback(() => {
        setSize((prev) => prev + 1);
    }, [setSize]);

    const items = React.useMemo(() => {
        return data?.flatMap(({ items }) => items) ?? [];
    }, [data]);

    const hasNextPage = React.useMemo(() => {
        if (!data) return false;

        return data[data.length - 1]?.cursor !== undefined;
    }, [data]);

    const isEmpty = React.useMemo(() => {
        return items.length === 0;
    }, [items]);

    return (
        <ScrollArea style={{ flexGrow: 1 }}>
            <Flex direction="column" gap="3" p="3">
                {items.map((course) => (
                    <Result
                        isSelected={isCourseSelected(course)}
                        course={course}
                        key={course.id}
                        toggleCourse={toggleCourse}
                        moreAboutCourse={moreAboutCourse}
                    />
                ))}
                {isLoading || isValidating ? (
                    <LoadingContainer />
                ) : null}
                {isEmpty && !(isLoading || isValidating) ? (
                    <Empty />
                ) : null}
                {hasNextPage && !(isLoading || isValidating) ? (
                    <Flex justify="center">
                        <Button variant="ghost" onClick={loadMore}>Load more</Button>
                    </Flex>
                ) : null}
            </Flex>
        </ScrollArea>
    );
};

interface ResultProps {
    course: Course;
    isSelected: boolean;
    toggleCourse: (course: Course) => void;
    moreAboutCourse: (course: Course) => void;
}

export const Result: React.FC<ResultProps> = ({ course, moreAboutCourse, toggleCourse, isSelected }) => {
    const handleMoreClick = React.useCallback(() => {
        moreAboutCourse(course);
    }, [course, moreAboutCourse]);

    const handleToggleCourse = React.useCallback(() => {
        toggleCourse(course);
    }, [course, toggleCourse]);

    return (
        <Card>
            <Flex direction="column" align="start" gap="3">
                <Flex direction="column" gap="1">
                    <Box>
                        <Text as="p" weight="bold" color="green" size="1">{course.abbr}</Text>
                        <Heading size="2">{course.title}</Heading>
                    </Box>
                    <Text as="p" color="gray" size="1">{course.school} • {course.credits} credits</Text>
                </Flex>
                <Flex gap="2" justify="between" width="100%">
                    {isSelected ? (
                        <Button color="tomato" variant="soft" onClick={handleToggleCourse}>
                            <MinusCircledIcon />
                            Remove
                        </Button>
                    ) : (
                        <Button onClick={handleToggleCourse}>
                            <PlusCircledIcon />
                            Add
                        </Button>
                    )}
                    <Button color="gray" onClick={handleMoreClick} variant="soft">
                        <QuestionMarkCircledIcon />
                    </Button>
                </Flex>
            </Flex>
        </Card>
    );
};
