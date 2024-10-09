import { UserEntity } from './user.entity';
import { UsersService } from './users.service';
import { Public } from 'src/auth/jwt-auth-guard';
import { UserControllerInterface } from './interfaces/user.controller.interface';
import { Controller, Get, Post, Delete, Param, Body, Patch } from '@nestjs/common';


import {
    DeleteUserDto,
    UpdateUserDto,
    FindAllUserDto,
    FindOneUserDto,
    ChangePasswordDto,
    CreateUserReturnDto,
    UpdateUserReturnDto,
    FindAllUserReturnDto,
    FindOneUserReturnDto,
} from './interfaces/user.dto.interface';



@Controller('users')
export class UsersController implements UserControllerInterface {
    constructor(private readonly service: UsersService) { }

    @Get(':id')
    findOne(@Param('id') id: FindOneUserDto): Promise<FindOneUserReturnDto> {
        return this.service.findOne(+id);
    }

    @Get()
    findAll(options: FindAllUserDto): Promise<FindAllUserReturnDto> {
        return this.service.findAll(options);
    }

    @Post()
    @Public()
    create(@Body() object: UserEntity): Promise<CreateUserReturnDto> {
        return this.service.create(object);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() object: UpdateUserDto): Promise<UpdateUserReturnDto> {
        return this.service.update(+id, object);
    }

    @Delete(':id')
    delete(@Param('id') id: DeleteUserDto): Promise<any> {
        return this.service.delete(+id);
    }

    @Post('change-password')
    changePassword(@Body() object: ChangePasswordDto) {
        return this.service.changePassword(object);
    }
}
