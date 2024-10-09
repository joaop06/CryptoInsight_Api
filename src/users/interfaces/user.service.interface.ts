import { UserEntityInterface } from "./user.entity.interface";
import { ServiceInterface } from "interfaces/ServiceInterface";

export interface UsersServiceInterface extends ServiceInterface {
    findOneByEmail(email: string): Promise<UserEntityInterface>
}