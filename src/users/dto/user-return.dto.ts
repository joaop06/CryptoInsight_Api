import { Moment } from "moment";

export class UserReturnDto {
    id: number;
    name: string;
    email: string;
    createdAt: Date | string | Moment;
    updatedAt: Date | string | Moment;
    deletedAt: Date | string | Moment;
}