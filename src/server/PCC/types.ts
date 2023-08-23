import type { StringifiableRecord } from 'query-string';

export interface RequestOptions {
    method: string;
    params?: StringifiableRecord;
}

export interface RegistrarSemester {
    ID: string;
    NAME: string;
}

export interface RegistrarSchedule {
    CAPACITY: string;
    DAYS: string;
    ENR: number;
    FACULTY: string;
    FINALEXAM: boolean;
    INSTANCEID: string;
    ROOM: string;
    ST: string;
    TIMES: string;
}

export interface Schedule {
    capacity: string;
    days: string;
    enr: number;
    faculty: string;
    finalExam: boolean;
    id: string;
    room: string;
    st: string;
    times: string;
}

export interface RegistrarCourse {
    ABBR: string;
    ACADEMICLEVEL: string;
    ACADEMICLEVELID: string;
    ANTIREQ: string;
    BREADTH: string;
    CCDISPLAY: string;
    COREQ: string;
    COURSEID: string;
    CRECTS: string;
    CRUS: string;
    DEPARTMENT: string;
    LASTTAUGHT: string;
    PREREQ: string;
    RNO: string;
    SCHOOL: string;
    SCHOOLABBR: string;
    SCHOOLID: string;
    SHORTDESC: string;
    TERMNAME: string;
    TITLE: string;
}

export interface Course {
    abbr: string;
    academicLevel: string;
    antiReq: string;
    coReq: string;
    preReq: string;
    id: string;
    department: string;
    school: string;
    description: string;
    title: string;
    credits: string;
    lastTaught: string;
}
