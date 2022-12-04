import { Container } from "@src/components/Container";
import { Header } from "@src/components/Header";
import type { Course } from "@src/server/PCC/typings";
import React from "react";
import { Builder } from "./builder";
import { Search } from "./search";

export const Constructor = () => {
    const [term, setTerm] = React.useState('');
    const [courses, setCourses] = React.useState<Course[]>([]);
    const [screen, setScreen] = React.useState<'list' | 'builder'>('list');

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
                    <Header fixed />
                    <Search
                        term={term}
                        setTerm={setTerm}
                        courses={courses}
                        addCourse={addCourse}
                        removeCourse={removeCourse}
                        proceed={() => setScreen('builder')}
                    />
                </Container>
            ) : null}
            {screen === 'builder' ? (
                <Builder
                    courses={courses}
                    term={term}
                    restart={() => setScreen('list')}
                />
            ) : null}
        </>
    );
}