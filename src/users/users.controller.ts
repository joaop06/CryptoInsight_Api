import { UserEntity } from './user.entity';
import { UsersService } from './users.service';
import { Public } from 'src/auth/jwt/jwt-auth-guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dts';
import { ChangePasswordDto } from './dto/change-password.dto';
import { FindDto, FindReturnDto } from 'interfaces/dto/find.dto';
import { UserControllerInterface } from './interfaces/user.controller.interface';
import { Controller, Get, Post, Delete, Param, Body, Patch, Req } from '@nestjs/common';

@Controller('users')
export class UsersController implements UserControllerInterface {
    constructor(private readonly service: UsersService) { }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<any> {
        return this.service.delete(+id);
    }

    @Post('change-password')
    changePassword(@Body() object: ChangePasswordDto): Promise<any> {
        return this.service.changePassword(object);
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<UserEntity> {
        return this.service.findOne(+id);
    }

    @Post()
    @Public()
    create(@Body() object: CreateUserDto): Promise<UserEntity> {
        return this.service.create(object);
    }

    @Patch(':id')
    update(@Param('id') id: string, object: UpdateUserDto): Promise<any> {
        return this.service.update(+id, object);
    }

    @Get()
    findAll(@Req() options: FindDto<UserEntity>): Promise<FindReturnDto<UserEntity>> {
        return this.service.findAll(options);
    }
}
