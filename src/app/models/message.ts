export class Message {
    id: number;
    title: string;
    content: string;
    beginDate: Date;
    endDate: Date;

    constructor(value: Partial<Message>) {
        Object.assign(this, value);
    }
}
