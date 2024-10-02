import { UserEntity } from './user.entity';
import { UsersService } from './users.service';
import { Controller, Get, Post, Delete, Param, Body, Patch } from '@nestjs/common';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<UserEntity> {
        return this.usersService.findOne(+id);
    }

    @Post()
    create(@Body() userObject: UserEntity): Promise<UserEntity> {
        return this.usersService.create(userObject);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() userObject: Partial<UserEntity>): Promise<any> {
        return this.usersService.update(+id, userObject);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<any> {
        return this.usersService.delete(+id);
    }

    @Post('change-password')
    changePassword(@Body() changePasswordDto: { userId: number; oldPassword: string; newPassword: string }) {
        return this.usersService.changePassword(changePasswordDto);
    }
}
