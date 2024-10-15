import { UserEntity } from './user.entity';
import { UsersService } from './users.service';
import { Public } from 'src/auth/jwt/jwt-auth-guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dts';
import { UserReturnDto } from './dto/user-return.dto';
import { Exception } from 'interceptors/exception.filter';
import { ChangePasswordDto } from './dto/change-password.dto';
import { FindOptionsDto, FindReturnModelDto } from 'dto/find.dto';
import { UserControllerInterface } from './interfaces/user.controller.interface';
import { Controller, Get, Post, Delete, Param, Body, Patch, Query } from '@nestjs/common';
import { CreateDoc, DeleteDoc, UpdateDoc, FindAllDoc, FindOneDoc, ChangePasswordDoc } from './dto/users.documentation';
import { ApiBody, ApiTags, ApiParam, ApiQuery, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiConflictResponse, ApiNotFoundResponse, ApiBadRequestResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController implements UserControllerInterface {
    constructor(private readonly service: UsersService) { }

    @Delete(':id')
    @ApiParam(DeleteDoc.param)
    @ApiOperation(DeleteDoc.operation)
    @ApiOkResponse(DeleteDoc.okResponse)
    @ApiBadRequestResponse(DeleteDoc.badRequest)
    async delete(@Param('id') id: string): Promise<any> {
        try {
            const result = await this.service.delete(+id);
            return { message: 'Sucesso ao deletar', affected: result.affected };


        } catch (error) {
            const message = `Erro ao deletar: ${error.message}`;
            new Exception({ ...error, message });
        }
    }

    @Post('change-password')
    @ApiBody(ChangePasswordDoc.body)
    @ApiOperation(ChangePasswordDoc.operation)
    @ApiNotFoundResponse(ChangePasswordDoc.notFound)
    @ApiCreatedResponse(ChangePasswordDoc.okResponse)
    @ApiBadRequestResponse(ChangePasswordDoc.badRequest)
    async changePassword(@Body() object: ChangePasswordDto): Promise<any> {
        try {
            await this.service.changePassword(object);
            return { message: 'Sucesso ao atualizar senha' };

        } catch (error) {
            const message = `Erro ao atualizar senha: ${error.message}`;
            new Exception({ ...error, message });
        }
    }

    @Get(':id')
    @ApiParam(FindOneDoc.param)
    @ApiOperation(FindOneDoc.operation)
    @ApiOkResponse(FindOneDoc.okResponse)
    @ApiNotFoundResponse(FindOneDoc.notFound)
    async findOne(@Param('id') id: string): Promise<UserReturnDto> {
        try {
            return await this.service.findOne(+id);

        } catch (error) {
            new Exception(error);
        }
    }

    @Post()
    @Public()
    @ApiBody(CreateDoc.body)
    @ApiOperation(CreateDoc.operation)
    @ApiConflictResponse(CreateDoc.conflict)
    @ApiBadRequestResponse(CreateDoc.badRequest)
    @ApiCreatedResponse(CreateDoc.createdResponse)
    async create(@Body() object: CreateUserDto): Promise<UserReturnDto> {
        try {
            return await this.service.create(object);

        } catch (error) {
            const message = `Erro ao inserir: ${error.message}`;
            new Exception({ ...error, message });
        }
    }

    @Patch(':id')
    @ApiParam(UpdateDoc.param)
    @ApiOperation(UpdateDoc.operation)
    @ApiOkResponse(UpdateDoc.okResponse)
    @ApiBadRequestResponse(UpdateDoc.badRequest)
    async update(@Param('id') id: string, @Body() object: Partial<UpdateUserDto>): Promise<any> {
        try {
            const result = await this.service.update(+id, object);
            return { message: 'Sucesso ao atualizar', affected: result.affected };

        } catch (error) {
            const message = `Erro ao atualizar: ${error.message}`;
            new Exception({ ...error, message });
        }
    }

    @Get()
    @ApiQuery(FindAllDoc.query)
    @ApiOperation(FindAllDoc.operation)
    @ApiOkResponse(FindAllDoc.okResponse)
    @ApiBadRequestResponse(FindAllDoc.badRequest)
    async findAll(@Query() options: FindOptionsDto<UserEntity>): Promise<FindReturnModelDto<UserReturnDto>> {
        try {
            return await this.service.findAll(options);

        } catch (error) {
            new Exception(error);
        }
    }
}
