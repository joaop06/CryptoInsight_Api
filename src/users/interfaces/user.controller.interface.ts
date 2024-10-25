import { UserEntity as Entity } from "../user.entity";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserReturnDto } from "../dto/user-return.dto";
import { ChangePasswordDto } from "../dto/change-password.dto";
import { ControllerInterface } from "interfaces/controller.interface";

export interface UserControllerInterface extends ControllerInterface<
    Entity,
    CreateUserDto,
    UserReturnDto
> {
    changePassword(object: ChangePasswordDto): Promise<any>

    update(id: string, object: Partial<UpdateUserDto>): Promise<any>
}