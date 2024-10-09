import { UserEntity } from "../user.entity";
import { ChangePasswordDto } from "./user.dto.interface";
import { ControllerInterface } from "interfaces/ControllerInterface";

export interface UserControllerInterface extends ControllerInterface<UserEntity> {
    changePassword(object: ChangePasswordDto)
}