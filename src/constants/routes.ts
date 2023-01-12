import { type StringifiableRecord, stringifyUrl } from "query-string";

export const DOMAIN = 'https://crashed.nu';

interface RouteOptions {
    query?: StringifiableRecord;
    full?: boolean;
}

class Route {
    path: string;

    constructor(path: string) {
        this.path = path;
    }

    private formatUrl = (path: string, full?: boolean) => `${full ? DOMAIN : ''}${path}`;

    get = ({ query, full }: RouteOptions = {}) => stringifyUrl({
        url: this.formatUrl(this.path, full),
        query,
    });

    getWithParams = (params: { [key: string]: string }, { query, full }: RouteOptions = {}) => {
        let path = this.path;

        Object.keys(params).forEach((key) => {
            path = path.replace(`:${key}`, params[key] ?? `:${key}`);
        });

        return stringifyUrl({
            url: this.formatUrl(path, full),
            query,
        });
    }
}

export const ROUTES = {
    HOME: new Route('/'),
    AUTH: new Route('/auth'),
    CONSTRUCTOR: new Route('/construct'),
    PDF: new Route('/construct/pdf'),
    SCHEDULE: new Route('/schedule'),
    SCHEDULE_ID: new Route('/schedule/:id'),
    SCHEDULE_SHORT: new Route('/s/:id'),
    PRIVATE: new Route('/error/private'),
    PRIVACY: new Route('/privacy'),
};
