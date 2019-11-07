
export class User {
    name: string;
    firstName: string;
    mail: string;
    password: string;
    birthDay: Date;

    constructor(value: Partial<User>) {
        Object.assign(this, value);
    }
}
