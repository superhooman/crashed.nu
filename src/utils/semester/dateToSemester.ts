enum SemesterType {
    SUMMER = 'Summer',
    FALL = 'Fall',
    SPRING = 'Spring',
}

export const dateToSemester = (date: Date) => {
    const month = date.getMonth();

    if (month <= 3) {
        return SemesterType.SPRING;
    }

    if (month <= 5) {
        return SemesterType.SUMMER;
    }

    if (month <= 10) {
        return SemesterType.FALL;
    }

    return SemesterType.SPRING;
};
