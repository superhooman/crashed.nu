export const dateToSemester = (date: Date) => {
    const month = date.getMonth();

    if (month < 3) {
        return 'Spring';
    }

    if (month < 6) {
        return 'Summer';
    }

    if (month < 10) {
        return 'Fall';
    }

    return 'Spring';
};
