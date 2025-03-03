import { User } from './User';

export class URL {
    constructor(
        public shortId: string,
        public originalUrl: string,
        public createdAt: Date,
        public views: number,
        public user?: User
    ) { }

    static create(originalUrl: string, shortId: string, userId?: string) {
        return new URL(
            shortId, 
            originalUrl, 
            new Date(), 
            0, 
            userId ? new User(userId, '', '', new Date(), []) : undefined);
    }

    public incrementViews() {
        this.views += 1;
    }

    public static validateUrl(url: string): boolean {
        const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!urlPattern.test(url);
    }
}