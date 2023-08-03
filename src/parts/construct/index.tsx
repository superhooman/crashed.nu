import splitbee from '@splitbee/web';
import React from 'react';
import { useRouter } from 'next/router';
import { stringifyUrl } from 'query-string';

import type { Course } from '@src/server/PCC/typings';

import { Container } from '@src/components/Container';
import { Header } from '@src/components/Header';
import { Search } from '@src/parts/construct/Search';
import { Builder } from '@src/parts/construct/Builder';

export const Constructor: React.FC<{ pdf?: boolean }> = ({ pdf = false }) => {
    const [term, setTerm] = React.useState('');
    const [wasOnNext, setWasOnNext] = React.useState(false);
    const [courses, setCourses] = React.useState<Course[]>([]);

    const router = useRouter();

    const setScreen = React.useCallback((screen: 'list' | 'builder') => {
        let url: string;

        if (screen === 'list') {
            url = router.pathname;
        } else {
            url = stringifyUrl({
                url: router.pathname,
                query: {
                    screen: 'builder',
                }
            });
        }

        router.push(url);
    }, [router]);

    const screen = (router.query.screen === 'builder') ? 'builder' : 'list';

    const addCourse = React.useCallback((course: Course) => {
        setCourses((courses) => [...courses, course]);
    }, []);

    const removeCourse = React.useCallback((course: Course) => {
        setCourses((courses) => courses.filter((c) => c.id !== course.id));
    }, []);

    return (
        <>
            {screen === 'list' ? (
                <Container>
                    <Header fixed sub={pdf ? 'pdf' : undefined} />
                    <Search
                        term={term}
                        setTerm={setTerm}
                        courses={courses}
                        addCourse={addCourse}
                        removeCourse={removeCourse}
                        pdf={pdf}
                        proceed={() => {
                            splitbee.track('Proceed');
                            setScreen('builder');
                        }}
                    />
                </Container>
            ) : null}
            {screen === 'builder' || wasOnNext ? (
                <Builder
                    courses={courses}
                    hidden={screen !== 'builder'}
                    term={term}
                    pdf={pdf}
                    restart={() => {
                        splitbee.track('Restart');
                        setWasOnNext(true);
                        setScreen('list');
                    }}
                />
            ) : null}
        </>
    );
};
