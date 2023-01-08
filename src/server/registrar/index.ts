import request from 'request';
import { parseSchedule } from './utils/parse';

// Misterious build id
// Despite the fact that it changes, this value still works
const BUILD_ID = "form-qMZs1yFM-7KqIUxckoHzaq1ezPqh7dwSaLnUQJn2QHs";

class Registrar {
    private HOST: string;

    constructor(host: string) {
        this.HOST = host;
    }

    public async sync(username: string, password: string): Promise<ReturnType<typeof parseSchedule>> {
        const jar = request.jar();
        const r = request.defaults({
            jar
        });

        return new Promise((resolve, reject) => {
            r({
                method: 'POST',
                uri: `${this.HOST}/index.php?q=user/login`,
                form: {
                    name: username,
                    pass: password,
                    form_build_id: BUILD_ID,
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

                r({
                    method: 'GET',
                    uri: `${this.HOST}/my-registrar/personal-schedule/json?method=getTimetable&type=current&page=1&start=0&limit=50`,
                }, (err, res) => {
                    if (err) {
                        return reject('Error occured');
                    }
                    const data = res.body as string;
                    const schedule = parseSchedule(data);

                    resolve(schedule);
                });
            })
        })
    }
}

export default new Registrar('https://registrar.nu.edu.kz');
