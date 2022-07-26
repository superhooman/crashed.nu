import splitbee from "@splitbee/web";
import { Container } from "@src/components/Container";
import { Header } from "@src/components/Header";
import type { Course } from "@src/server/PCC/typings";
import React from "react";
import { PdfModal } from "../pdfModal";
import { Builder } from "./builder";
import { Search } from "./search";

export const Constructor: React.FC<{ pdf?: boolean }> = ({ pdf = false }) => {
    const [term, setTerm] = React.useState('');
    const [wasOnNext, setWasOnNext] = React.useState(false);
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
                    <Header fixed sub={pdf ? "pdf" : undefined} />
                    <Search
                        term={term}
                        setTerm={setTerm}
                        courses={courses}
                        addCourse={addCourse}
                        removeCourse={removeCourse}
                        pdf={pdf}
                        proceed={() => {
                            splitbee.track('Proceed');
                            setScreen('builder')
                        }}
                    />
                    {pdf || wasOnNext ? null : (
                        <PdfModal />
                    )}
                </Container>
            ) : null}
            {screen === 'builder' ? (
                <Builder
                    courses={courses}
                    term={term}
                    pdf={pdf}
                    restart={() => {
                        splitbee.track('Restart');
                        setWasOnNext(true);
                        setScreen('list')
                    }}
                />
            ) : null}
        </>
    );
}