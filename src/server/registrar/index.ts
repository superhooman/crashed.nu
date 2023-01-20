import request from 'request';
import { parseSchedule } from './utils/parse';

const BUILD_ID = 'form-Ge0qInuGtfAjDSYP-U-zTNaHfEezxfz2X0ip8lzvTVE';

class Registrar {
    private HOST: string;

    constructor(host: string) {
        this.HOST = host;
    }

    public async sync(username: string, password: string): Promise<ReturnType<typeof parseSchedule>> {
        const jar = request.jar();
        jar.setCookie('has_js=1;', this.HOST, {
            secure: true,
        });

        const r = request.defaults({
            jar
        });

        return new Promise(async (resolve, reject) => {
            if (!BUILD_ID) return reject('Error occured');

            r({
                method: 'POST',
                uri: `${this.HOST}/index.php?q=user/login`,
                strictSSL: false,
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
                    console.log('INVALID CREDENTIALS', redirect);
                    return reject('Invalid credentials');
                }

                r({
                    method: 'GET',
                    strictSSL: false,
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
