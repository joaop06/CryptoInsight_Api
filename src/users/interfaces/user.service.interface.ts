import { UserEntity } from "../user.entity";
import { ServiceInterface } from "interfaces/ServiceInterface";

export interface UsersServiceInterface extends ServiceInterface<UserEntity> {
    findOneByEmail(email: string): Promise<UserEntity>
}