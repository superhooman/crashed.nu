import { SCHOOLS } from '@src/constants/schools';
import type { StringifiableRecord} from 'query-string';
import { stringifyUrl } from 'query-string';

import type { Course, RegistrarCourse, RegistrarSchedule, RegistrarSemester, RequestOptions, Schedule } from './typings';

const getSchool = (school: string) => SCHOOLS[school] || school;

// Public Course Catalog
class PCC {
    private HOST: string;
    private LIMIT = 10;

    constructor(host: string) {
        this.HOST = host;
    }

    private serialise(data: StringifiableRecord) {
        const result = [];
        for (const x in data) {
            result.push(`${encodeURIComponent(x)}=${encodeURIComponent(String(data[x]))}`);
        }
        return result.join('&');
    }

    private async request<T = unknown>({ method, params }: RequestOptions) {
        const requestOptions: RequestInit = params ? {
            method: 'POST',
            body: this.serialise({
                ...params,
                method,
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        } : {
            method: 'GET',
        };

        const url = params ? this.HOST : stringifyUrl({
            url: this.HOST,
            query: {
                method,
            },
        });

        const response = await fetch(url, requestOptions);

        return response.json() as unknown as T;
    }

    private mergeSchedules(schedules: Schedule[]) {
        return Object.values(schedules.reduce<Record<string, Schedule>>((dict, schedule) => {
            const exists = dict[schedule.st];
            if (exists) {
                exists.days += schedule.days;
                    if (!exists.room.includes(schedule.room)) {
                        exists.room += ` / ${schedule.room}`;
                    }
                dict[schedule.st] = exists;
            } else {
                dict[schedule.st] = schedule;
            }
            return dict;
        }, {}));
    }

    public async getSemesters() {
        const semesters: RegistrarSemester[] = await this.request({ method: 'getSemesters' });
        return semesters.map(({ ID, NAME }) => ({ label: NAME, value: ID }));
    }

    public async search(query: string, term: string, level = '-1', page = 1): Promise<{ items: Course[], cursor?: number }> {
        const result = await this.request<{ data: RegistrarCourse[], total: string }>({
            method: 'getSearchData',
            params: {
                'searchParams[formSimple]': 'false',
                'searchParams[limit]': this.LIMIT,
                'searchParams[page]': page,
                'searchParams[start]': 0,
                'searchParams[quickSearch]': query,
                'searchParams[sortField]': -1,
                'searchParams[sortDescending]': -1,
                'searchParams[semester]': term,
                'searchParams[schools]': '',
                'searchParams[departments]': '',
                'searchParams[levels][]': level,
                'searchParams[subjects]': '',
                'searchParams[instructors]': '',
                'searchParams[breadths]': '',
                'searchParams[abbrNum]': '',
                'searchParams[credit]': '',
            }
        });

        const items = result.data.map(({
            COURSEID,
            ABBR,
            ANTIREQ,
            COREQ,
            PREREQ,
            ACADEMICLEVEL,
            SCHOOL,
            SHORTDESC,
            DEPARTMENT,
            TITLE,
            CRECTS,
            LASTTAUGHT,
        }) => ({
            id: COURSEID,
            abbr: ABBR,
            preReq: PREREQ,
            antiReq: ANTIREQ,
            coReq: COREQ,
            academicLevel: ACADEMICLEVEL,
            school: getSchool(SCHOOL),
            description: SHORTDESC,
            department: DEPARTMENT,
            title: TITLE,
            credits: CRECTS,
            lastTaught: LASTTAUGHT,
        }));

        const hasNextPage = parseInt(result.total, 10) > page * this.LIMIT;

        return {
            items,
            ...(hasNextPage ? { cursor: page + 1 } : {}),
        };
    }

    public async getSchedules(id: string, term: string): Promise<Schedule[]> {
        const schedules = await this.request<RegistrarSchedule[]>({
            method: 'getSchedule',
            params: {
                termId: term,
                courseId: id,
            }
        });

        return this.mergeSchedules(schedules.map((schedule) => {
            const { CAPACITY, DAYS, ENR, FACULTY, FINALEXAM, INSTANCEID, ROOM, ST, TIMES } = schedule;
            return {
                capacity: CAPACITY,
                days: DAYS,
                enr: ENR,
                faculty: FACULTY,
                finalExam: FINALEXAM,
                id: INSTANCEID,
                room: ROOM,
                st: ST,
                times: TIMES,
            };
        }));
    }

    public async getSchedulesForIds(ids: string[], term: string) {
        const schedules = await Promise.all(
            ids.map<Promise<[string, Schedule[]]>>(async (id) => [id, await this.getSchedules(id, term)])
        );

        return schedules.reduce<Record<string, Schedule[]>>((dict, [id, schedules]) => {
            dict[id] = schedules;
            return dict;
        }, {});
    }
}

export default new PCC('https://registrar.nu.edu.kz/my-registrar/public-course-catalog/json');
