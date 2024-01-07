import request from 'request';

import { parseSchedule } from './utils/parse';
import { scheduleTypeResolver } from './utils/scheduleTypeResolver';

const HOST = 'https://registrar.nu.edu.kz';
const BUILD_ID = 'form-Ge0qInuGtfAjDSYP-U-zTNaHfEezxfz2X0ip8lzvTVE';

export class Registrar {
    private HOST = HOST;
    private BUILD_ID = BUILD_ID;
    private jar: request.CookieJar;
    private request: request.RequestAPI<request.Request, request.CoreOptions, request.RequiredUriUrl>;

    constructor() {
        this.jar = request.jar();

        this.jar.setCookie('has_js=1;', this.HOST, {
            secure: true,
        });

        this.request = request.defaults({
            jar: this.jar,
        });
    }

    private login(username: string, password: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.request({
                method: 'POST',
                uri: `${this.HOST}/index.php?q=user/login`,
                strictSSL: false,
                form: {
                    name: username,
                    pass: password,
                    form_build_id: this.BUILD_ID,
                    form_id: 'user_login',
                    op: 'Log in',
                }
            }, (err, res) => {
                if (err) {
                    return reject('Error occured');
                }
                const redirect = res.headers.location;

                if (!redirect?.includes('my-registrar')) {
                    return reject('Invalid credentials');
                }

                resolve();
            });
        });
    };

    private getScheduleType(): Promise<'reg' | 'current'> {
        return new Promise((resolve, reject) => {
            this.request({
                method: 'GET',
                uri: `${this.HOST}/my-registrar/personal-schedule`,
                strictSSL: false,
            }, (err, res) => {
                if (err) {
                    return reject('Error occured');
                }
                
                const type = scheduleTypeResolver(res.body as string);

                resolve(type);
            });
        });
    };

    private getSchedule(type: 'reg' | 'current'): Promise<ReturnType<typeof parseSchedule>> {
        return new Promise((resolve, reject) => {
            this.request({
                method: 'GET',
                strictSSL: false,
                uri: `${this.HOST}/my-registrar/personal-schedule/json?method=getTimetable&type=${type}&page=1&start=0&limit=50`,
            }, (err, res) => {
                if (err) {
                    return reject('Error occured');
                }
                const data = res.body as string;
                const schedule = parseSchedule(data);

                resolve(schedule);
            });
        });
    }

    public async sync(username: string, password: string): Promise<ReturnType<typeof parseSchedule>> {
        await this.login(username, password);

        const type = await this.getScheduleType();
        const schedule = await this.getSchedule(type);

        return schedule;
    }
}
