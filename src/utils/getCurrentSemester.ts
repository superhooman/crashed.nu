enum SemesterType {
    SUMMER = 'Summer',
    FALL = 'Fall',
    SPRING = 'Spring',
}

const monthToSemester = (month: number) => {
    if (month < 5) {
        return SemesterType.SPRING;
    }
    if (month < 7) {
        return SemesterType.SUMMER;
    }
    return SemesterType.FALL;
};

export const getSemesterDates = (opts: ReturnType<typeof getCurrentSemester>) => {
    const { semester, year } = opts;

    if (semester === SemesterType.SPRING) {
        return {
            start: new Date(`${year}-01-09`),
            end: new Date(`${year}-04-21`),
        };
    }

    if (semester === SemesterType.SUMMER) {
        return {
            start: new Date(`${year}-06-01`),
            end: new Date(`${year}-07-31`),
        }
    }

    return {
        start: new Date(`${year}-08-12`),
        end: new Date(`${year}-11-25`),
    }
}

export const getCurrentSemester = (date: Date) => {
    const year = date.getFullYear();

    const month = date.getMonth();

    const semester = monthToSemester(month);

    return {
        semester,
        year,
    }
};
