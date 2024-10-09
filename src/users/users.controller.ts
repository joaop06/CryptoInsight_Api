import { UserEntity } from './user.entity';
import { UsersService } from './users.service';
import { Public } from 'src/auth/jwt-auth-guard';
import { Controller, Get, Post, Delete, Param, Body, Patch } from '@nestjs/common';

@Controller('users')
export class UsersController {
    constructor(private readonly service: UsersService) { }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<UserEntity> {
        return this.service.findOne(+id);
    }

    @Post()
    @Public()
    create(@Body() object: UserEntity): Promise<UserEntity> {
        return this.service.create(object);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() object: Partial<UserEntity>): Promise<any> {
        return this.service.update(+id, object);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<any> {
        return this.service.delete(+id);
    }

    @Post('change-password')
    changePassword(@Body() changePasswordDto: { userId: number; oldPassword: string; newPassword: string }) {
        return this.service.changePassword(changePasswordDto);
    }
}
