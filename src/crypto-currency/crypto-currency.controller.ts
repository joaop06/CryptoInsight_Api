import { Exception } from 'interceptors/exception.filter';
import { CryptoCurrencyEntity } from './crypto-currency.entity';
import { FindOptionsDto, FindReturnModelDto } from 'dto/find.dto';
import { CryptoCurrencyService } from './crypto-currency.service';
import { CreateCryptoCurrencyDto } from './dto/create-crypto-currency.dto';
import { Controller, Post, Get, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { CryptoCurrencyControllerInterface } from './interfaces/crypto-currency.controller.interface';
import { CreateDoc, DeleteDoc, FindAllDoc, FindOneDoc, UpdateDoc } from 'src/crypto-currency/dto/crypto-currency.documentation';
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('crypto-currency')
@Controller('crypto-currency')
export class CryptoCurrencyController implements CryptoCurrencyControllerInterface {
    constructor(private readonly service: CryptoCurrencyService) { }

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

    @Get(':id')
    @ApiParam(FindOneDoc.param)
    @ApiOperation(FindOneDoc.operation)
    @ApiOkResponse(FindOneDoc.okResponse)
    @ApiNotFoundResponse(FindOneDoc.notFound)
    async findOne(@Param('id') id: string): Promise<CryptoCurrencyEntity> {
        try {
            return await this.service.findOne(+id);

        } catch (error) {
            new Exception(error);
        }
    }

    @Post()
    @ApiBody(CreateDoc.body)
    @ApiOperation(CreateDoc.operation)
    @ApiConflictResponse(CreateDoc.conflict)
    @ApiBadRequestResponse(CreateDoc.badRequest)
    @ApiCreatedResponse(CreateDoc.createdResponse)
    async create(@Body() object: CreateCryptoCurrencyDto): Promise<CryptoCurrencyEntity> {
        try {
            return await this.service.create(object);

        } catch (error) {
            const message = `Erro ao inserir: ${error.message}`;
            new Exception({ ...error, message });
        }
    }

    @Patch()
    @ApiParam(UpdateDoc.param)
    @ApiOperation(UpdateDoc.operation)
    @ApiOkResponse(UpdateDoc.okResponse)
    @ApiBadRequestResponse(UpdateDoc.badRequest)
    async update(@Param('id') id: string, @Body() object: Partial<CryptoCurrencyEntity>): Promise<any> {
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
    async findAll(@Query() options: FindOptionsDto<CryptoCurrencyEntity>): Promise<FindReturnModelDto<CryptoCurrencyEntity>> {
        try {
            return await this.service.findAll(options);

        } catch (error) {
            new Exception(error);
        }
    }
}
