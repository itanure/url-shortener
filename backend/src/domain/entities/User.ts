import { URL } from './URL';

export class User {
    constructor(
        public username: string,
        public email: string,
        public password: string,
        public createdAt: Date,
        public urls: URL[]
    ) { }
}
