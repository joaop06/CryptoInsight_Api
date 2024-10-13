import { UserEntity as Entity } from "../user.entity";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dts";
import { ServiceInterface } from "interfaces/service.interface";
import { ChangePasswordDto } from "../dto/change-password.dto";

export interface UsersServiceInterface extends ServiceInterface<
    Entity,
    CreateUserDto
> {
    removePassword(user: Entity): Partial<Entity>

    findOneByEmail(email: string): Promise<Entity>

    changePassword(object: ChangePasswordDto): Promise<any>

    update(id: number, object: UpdateUserDto): Promise<any>
}