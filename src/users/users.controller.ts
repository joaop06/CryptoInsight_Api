import { UserEntity } from './user.entity';
import { UsersService } from './users.service';
import { Public } from 'src/auth/jwt/jwt-auth-guard';
import { CreateUserDto } from './dto/create-user.dto';
import { FindDto, FindReturnDto } from 'dto/find.dto';
import { UpdateUserDto } from './dto/update-user.dts';
import { UsersDocs } from './dto/users.documentation';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UserControllerInterface } from './interfaces/user.controller.interface';
import { Controller, Get, Post, Delete, Param, Body, Patch, Req, HttpException, HttpStatus } from '@nestjs/common';



import {
    ApiBody,
    ApiTags,
    ApiParam,
    ApiQuery,
    ApiResponse,
    ApiOperation,
    ApiOkResponse,
    ApiFoundResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiBadRequestResponse,
} from '@nestjs/swagger';
import { NextFunction } from 'express';

@ApiTags('users')
@Controller('users')
export class UsersController implements UserControllerInterface {
    constructor(private readonly service: UsersService) { }

    @Delete(':id')
    @ApiParam(UsersDocs.delete.param)
    @ApiOperation(UsersDocs.delete.operation)
    @ApiOkResponse(UsersDocs.delete.okResponse)
    @ApiBadRequestResponse(UsersDocs.delete.badRequest)
    delete(@Param('id') id: string): Promise<any> {
        return this.service.delete(+id);
    }

    @Post('change-password')
    @ApiBody(UsersDocs.changePassword.body)
    @ApiOperation(UsersDocs.changePassword.operation)
    @ApiOkResponse(UsersDocs.changePassword.okResponse)
    @ApiBadRequestResponse(UsersDocs.changePassword.badRequest)
    changePassword(@Body() object: ChangePasswordDto): Promise<any> {
        return this.service.changePassword(object);
    }

    @Get(':id')
    @ApiParam(UsersDocs.findOne.param)
    @ApiOperation(UsersDocs.findOne.operation)
    @ApiOkResponse(UsersDocs.findOne.okResponse)
    @ApiNotFoundResponse(UsersDocs.findOne.notFound)
    findOne(@Param('id') id: string): Promise<UserEntity> {
        return this.service.findOne(+id);
    }

    @Post()
    @Public()
    @ApiBody(UsersDocs.create.body)
    @ApiOperation(UsersDocs.create.operation)
    @ApiBadRequestResponse(UsersDocs.create.badRequest)
    @ApiCreatedResponse(UsersDocs.create.createdResponse)
    async create(@Body() object: CreateUserDto): Promise<UserEntity> {
        try {
            return await this.service.create(object);

        } catch (e) {
            throw new HttpException({ message: 'Erro ao inserir', error: e.message }, HttpStatus.BAD_REQUEST)
        }
    }

    @Patch(':id')
    @ApiParam(UsersDocs.update.param)
    @ApiOperation(UsersDocs.update.operation)
    @ApiOkResponse(UsersDocs.update.okResponse)
    @ApiBadRequestResponse(UsersDocs.update.badRequest)
    update(@Param('id') id: string, object: UpdateUserDto): Promise<any> {
        return this.service.update(+id, object);
    }

    @Get()
    @ApiQuery(UsersDocs.findAll.query)
    @ApiOperation(UsersDocs.findAll.operation)
    @ApiOkResponse(UsersDocs.findAll.okResponse)
    @ApiBadRequestResponse(UsersDocs.findAll.badRequest)
    findAll(@Req() options: FindDto<UserEntity>): Promise<FindReturnDto<UserEntity>> {
        return this.service.findAll(options);
    }
}
