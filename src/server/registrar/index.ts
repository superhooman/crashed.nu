import { Agent } from 'https';

import makeFetchCookie from 'fetch-cookie';
import fetch from 'node-fetch';
import { CookieJar } from 'tough-cookie';
import { stringifyUrl } from 'query-string';

import { parseSchedule } from './utils/parse';
import { scheduleTypeResolver } from './utils/scheduleTypeResolver';

const HOST = 'https://registrar.nu.edu.kz';
const BUILD_ID = 'form-tFAqQhbP6TRrM1eFFrnkFOGsb2ExDtyBNHcywT3RB8s';

export class Registrar {
    private HOST = HOST;
    private BUILD_ID = BUILD_ID;
    private jar: CookieJar;
    private agent: Agent;
    private fetch: typeof fetch;
    private request: typeof fetch;

    constructor() {
        this.jar = new CookieJar();

        this.agent = new Agent({
            rejectUnauthorized: false,
        });

        this.jar.setCookie('has_js=1;', this.HOST, {
            secure: true,
        });

        this.fetch = makeFetchCookie(fetch, this.jar);

        this.request = (url, init) => this.fetch(url, { ...init, agent: this.agent });
    }

    private async login(username: string, password: string) {
        const url = stringifyUrl({
            url: `${this.HOST}/index.php`,
            query: { q: 'user/login' }
        });

        await this.request(url, {
            method: 'POST',
            body: `name=${username}&pass=${password}&form_build_id=${this.BUILD_ID}&form_id=user_login&op=Log+in`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).catch(() => {
            throw new Error('Error occured');
        });

        const cookies = await this.jar.getCookies(this.HOST);

        const authed = cookies.some((cookie) => cookie.key === 'AUTHSSL');

        if (authed) {
            return true;
        };

        throw new Error('Invalid credentials');
    };

    private async getScheduleType() {
        const url = `${this.HOST}/my-registrar/personal-schedule`;

        const text = await this.request(url).then((res) => res.text()).catch(() => {
            throw new Error('Error occured');
        });

        const type = scheduleTypeResolver(text);

        return type;
    };

    private async getSchedule(type: 'reg' | 'current') {
        const url = stringifyUrl({
            url: `${this.HOST}/my-registrar/personal-schedule/json`,
            query: {
                method: 'getTimetable',
                type,
                page: 1,
                start: 0,
                limit: 50,
            }
        });

        const text = await this.request(url).then((res) => res.text()).catch(() => {
            throw new Error('Error occured');
        });

        const schedule = parseSchedule(text);

        return schedule;
    }

    public async sync(username: string, password: string): Promise<ReturnType<typeof parseSchedule>> {
        await this.login(username, password);

        const type = await this.getScheduleType();
        const schedule = await this.getSchedule(type);

        return schedule;
    }
}
