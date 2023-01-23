import { ArrowLeftIcon, ArrowRightIcon, BackpackIcon, CardStackMinusIcon, CardStackPlusIcon, CookieIcon, Cross1Icon, CrumpledPaperIcon, InfoCircledIcon, MagnifyingGlassIcon, MinusIcon, UpdateIcon } from '@radix-ui/react-icons';
import splitbee from '@splitbee/web';
import { useFormik } from 'formik';
import React from 'react';
import Link from 'next/link';

import type { QueryFormSchema } from '@src/schemas/query';
import type { Course } from '@src/server/PCC/typings';

import { Button } from '@src/components/Button';
import { Divider } from '@src/components/Divider';
import { Empty } from '@src/components/Empty';
import { Input } from '@src/components/Input';
import { Loader } from '@src/components/Loader';
import { Modal, ModalActions, ModalTitle } from '@src/components/Modal';
import { Select } from '@src/components/Select';
import { Stack } from '@src/components/Stack';
import { Toolbar } from '@src/components/Toolbar';
import { Paragraph, Text } from '@src/components/Typography';
import { LEVELS } from '@src/constants/levels';
import { getTypes, typeDict, typeReg } from '@src/utils/data/getScheduleTypes';
import { useIsMobile } from '@src/utils/isMobileContext';
import { trpc } from '@src/utils/trpc';
import { Card } from '@src/components/Card';

import cls from './Search.module.scss';
import { CourseCard } from './components/CourseCard';
import { ScheduleItem, ScheduleItemSkeleton } from './components/ScheduleItem';


export const Search: React.FC<{
    term: string;
    setTerm: (term: string) => void;
    courses: Course[];
    addCourse: (course: Course) => void;
    removeCourse: (course: Course) => void;
    proceed: () => void;
    pdf: boolean;
}> = ({ term, setTerm, courses, addCourse, removeCourse, proceed, pdf }) => {
    const [query, setQuery] = React.useState('');
    const [level, setLevel] = React.useState('1');

    const isMobile = useIsMobile();

    const [selectedCourse, setSelectedCourse] = React.useState<Course | null>(null);
    const [modal, setModal] = React.useState(false);

    const [open, setOpen] = React.useState(false);

    const { values, getFieldProps, setFieldValue, handleSubmit } = useFormik<QueryFormSchema>({
        initialValues: {
            query: '',
            term: '',
            level: '1'
        },
        onSubmit: (values) => {
            splitbee.track('Search', {
                query,
                term,
                level,
            });
            setQuery(values.query);
            setTerm(values.term);
            setLevel(values.level);
        },
    });

    const { data: semesters } = trpc.pcc.semesters.useQuery({ pdf }, {
        onSuccess: (data) => {
            setFieldValue('term', values.term || data[0]?.value);
        }
    });

    const coursesEnabled = !!query && !!term && !!level;

    const { data: coursesList, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } = trpc.pcc.search.useInfiniteQuery({
        query,
        term,
        level,
        pdf,
    }, {
        enabled: coursesEnabled,
        getNextPageParam: (lastPage) => lastPage.cursor,
    });

    const selectCourse = React.useCallback((course: Course | null) => {
        setSelectedCourse(course);
        setOpen(Boolean(course));
    }, []);

    const onOpenChange = React.useCallback((open: boolean) => {
        setOpen(open);

        if (!open) {
            setTimeout(() => setSelectedCourse(null), 300);
        }
    }, []);

    const toggleCourse = React.useCallback((course: Course) => {
        if (courses.map((c) => c.id).includes(course.id)) {
            removeCourse(course);
        } else {
            addCourse(course);
        }
    }, [courses, addCourse, removeCourse]);


    return (
        <Stack className={cls.search} alignItems="stretch">
            <div data-full={isMobile} className={cls.col}>
                <form className={cls.form} onSubmit={handleSubmit}>
                    <Stack direction="column" gap={16}>
                        {pdf ? (
                            <Card>
                                <Stack gap={8} alignItems="start">
                                    <CookieIcon style={{ flexShrink: 0 }} />
                                    <Stack direction="column" gap={8} alignItems="start">
                                        <Text size="small">
                                            This is experimental registrar PDF source{' '}
                                        </Text>
                                        <Link href="/constructor">
                                            <Button type="button" size="small" icon={<ArrowLeftIcon />}>
                                                Return to main
                                            </Button>
                                        </Link>
                                    </Stack>
                                </Stack>
                            </Card>
                        ) : null}
                        <Input
                            id="query"
                            label="Search"
                            icon={<MagnifyingGlassIcon />}
                            autoCorrect="off"
                            autoCapitalize="off"
                            placeholder="Course abbr (ex. CSCI 152) or title"
                            {...getFieldProps('query')}
                        />
                        {pdf ? null : (
                            <Select
                                label="Level"
                                value={values.level}
                                items={LEVELS}
                                onValueChange={(v) => setFieldValue('level', v)}
                            />
                        )}
                        {semesters && semesters.length > 1 ? (
                            <Select
                                label="Semester"
                                disabled={courses.length > 0}
                                value={values.term}
                                items={semesters || []}
                                onValueChange={(v) => setFieldValue('term', v)}
                            />
                        ) : null}
                        <Button type="submit" fullWidth variant="primary">Search</Button>
                    </Stack>
                </form>
                <Stack className={cls.results} direction="column" justifyContent="center" gap={12}>
                    {
                        coursesList?.pages.length ? (
                            <Stack className={cls.list} grow={1} direction="column">
                                {coursesList.pages.flatMap(({ items }) => items).map((course) => (
                                    <CourseCard pdf={pdf} key={course.id} course={course}>
                                        {
                                            courses.map((c) => c.id).includes(course.id) ? (
                                                <Button
                                                    onClick={() => toggleCourse(course)}
                                                    icon={<CardStackMinusIcon />}
                                                >
                                                    Remove
                                                </Button>
                                            ) : (
                                                <Button
                                                    onClick={() => toggleCourse(course)}
                                                    variant="primary"
                                                    icon={<CardStackPlusIcon />}
                                                >
                                                    Add
                                                </Button>
                                            )
                                        }
                                        {
                                            selectedCourse?.id === course.id ? (
                                                <Button className={cls.close} icon={<Cross1Icon />} onClick={() => selectCourse(null)}>Close</Button>
                                            ) : (
                                                <Button className={cls.button} icon={<InfoCircledIcon />} onClick={() => selectCourse(course)}>About</Button>
                                            )
                                        }
                                    </CourseCard>
                                ))}
                            </Stack>
                        ) : null
                    }
                    {hasNextPage ? (
                        <Button variant="link" fullWidth icon={<UpdateIcon />} isLoading={isFetchingNextPage} onClick={() => fetchNextPage()}>Load more</Button>
                    ) : null}
                </Stack>
                {coursesEnabled && isLoading ? (
                    <Stack gap={8} alignItems="center" justifyContent="center">
                        <Loader secondary />
                        <Text size="small" color="secondary">Loading...</Text>
                    </Stack>
                ) : null}
            </div>
            {isMobile ? (
                <Modal
                    open={open}
                    onOpenChange={onOpenChange}
                >
                    <Stack className={cls.drawerClose}>
                        <Button onClick={() => onOpenChange(false)} icon={<Cross1Icon />} />
                    </Stack>
                    {selectedCourse ? (
                        <AboutCourse
                            course={selectedCourse}
                            term={term}
                            toggleCourse={toggleCourse}
                            added={courses.map((c) => c.id).includes(selectedCourse.id)}
                            pdf={pdf}
                        />
                    ) : null}
                </Modal>
            ) : (
                <div className={cls.col}>
                    <div className={cls.sticky}>
                        {selectedCourse ? (
                            <div className={cls.flex}>
                                <AboutCourse
                                    course={selectedCourse}
                                    term={term}
                                    toggleCourse={toggleCourse}
                                    added={courses.map((c) => c.id).includes(selectedCourse.id)}
                                    pdf={pdf}
                                />
                            </div>
                        ) : (
                            <Stack className={cls.flex} alignItems="center" justifyContent="center" direction="column" gap={8}>
                                <CrumpledPaperIcon height={24} width={24} />
                                <Text color="secondary" size="small">Choose a course</Text>
                            </Stack>
                        )}
                    </div>
                </div>
            )}
            <Toolbar>
                <Stack alignItems="center" justifyContent="space-between">
                    <Button
                        disabled={courses.length === 0}
                        icon={<BackpackIcon />}
                        onClick={() => setModal(true)}
                    >
                        Cart {`(${courses.length})`}
                    </Button>
                    <Button
                        variant="primary"
                        disabled={courses.length === 0}
                        icon={<ArrowRightIcon />}
                        onClick={proceed}
                    >
                        Proceed
                    </Button>
                </Stack>
            </Toolbar>
            <Modal open={modal} onOpenChange={setModal}>
                <ModalTitle>Cart</ModalTitle>
                <Stack direction="column">
                    {courses.length ? courses.map((course, i) => {
                        const { abbr, title } = course;

                        return (
                            <React.Fragment key={course.id}>
                                {i > 0 ? <Divider /> : null}
                                <Stack alignItems="center" justifyContent="space-between" gap={16}>
                                    <div>
                                        <Text color="secondary" size="small">{abbr}</Text>
                                        <Paragraph bold type="primary">{title}</Paragraph>
                                    </div>
                                    <Button onClick={() => removeCourse(course)} size="small" icon={<MinusIcon />} />
                                </Stack>
                            </React.Fragment>
                        );
                    }) : (
                        <Empty />
                    )}
                </Stack>
                <ModalActions>
                    <Button onClick={() => setModal(false)} fullWidth>Close</Button>
                </ModalActions>
            </Modal>
        </Stack>
    );
};

const AboutCourse: React.FC<{
    course: Course,
    term: string,
    toggleCourse: (course: Course) => void,
    added: boolean,
    pdf: boolean,
}> = ({ course, term, toggleCourse, added, pdf }) => {
    return (
        <>
            <CourseCard pdf={pdf} course={course}>
                {added ? (
                    <Button fullWidth icon={<CardStackMinusIcon />} onClick={() => toggleCourse(course)}>Remove</Button>
                ) : (
                    <Button fullWidth icon={<CardStackPlusIcon />} variant="primary" onClick={() => toggleCourse(course)}>Add to cart</Button>
                )}
            </CourseCard>
            <Schedule course={course} term={term} pdf={pdf} />
        </>
    );
};

const Schedule: React.FC<{ course: Course, term: string, pdf: boolean }> = ({ course, term, pdf }) => {
    const { data: schedules, isLoading } = trpc.pcc.schedule.useQuery({
        id: course.id,
        term,
        pdf,
    });

    const types = React.useMemo<string[]>(() => {
        if (!schedules) return [];
        return Array.from(getTypes(schedules));
    }, [schedules]);

    return (
        <Stack className={cls.schedule} direction="column" gap={8}>
            {types.map((type, i) => (
                <React.Fragment key={type}>
                    {i > 0 ? <Divider /> : null}
                    <Stack direction="column" gap={12}>
                        <Text color="secondary" size="small" block>{typeDict[type] || type}</Text>
                        <Stack direction="column" gap={12} key={type}>
                            {schedules?.filter(({ st }) => st.match(typeReg)?.[0] === type).map((schedule) => (
                                <ScheduleItem key={schedule.st} schedule={schedule} />
                            ))}
                        </Stack>
                    </Stack>
                </React.Fragment>
            ))}
            {isLoading ? (
                <Stack direction="column" gap={12}>
                    <ScheduleItemSkeleton />
                    <ScheduleItemSkeleton />
                    <ScheduleItemSkeleton />
                </Stack>
            ) : null}
        </Stack>
    );
};
