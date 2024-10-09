import { UserEntity } from "../user.entity";
import { DeleteDto } from "interfaces/dto/delete.dto";
import { CreateReturnDto } from '../../../interfaces/dto/create.dto';
import { UpdateReturnDto } from '../../../interfaces/dto/update.dto';
import { FindOneDto, FindOneReturnDto, FindAllDto, FindAllReturnDto } from '../../../interfaces/dto/find.dto';


export class ChangePasswordDto {
    userId: number;
    oldPassword: string;
    newPassword: string;
}

export class DeleteUserDto implements DeleteDto {
    id: string;
}

export class CreateUserReturnDto implements CreateReturnDto<UserEntity> {
    result: Partial<UserEntity>;
}

export class UpdateUserDto {
    name?: string;
    email?: string;
    password: undefined;
}

export class UpdateUserReturnDto implements UpdateReturnDto<UserEntity> {
    result: Partial<UserEntity>;
}

export class FindOneUserDto implements FindOneDto {
    id: string;
}

export class FindOneUserReturnDto implements FindOneReturnDto<UserEntity> {
    result: Partial<UserEntity>;
}

export class FindAllUserDto implements FindAllDto<UserEntity> { }

export class FindAllUserReturnDto implements FindAllReturnDto<UserEntity> {
    count: number;
    rows: UserEntity[];
}