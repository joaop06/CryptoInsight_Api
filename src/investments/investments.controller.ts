import { InvestmentsEntity } from './investments.entity';
import { Exception } from 'interceptors/exception.filter';
import { InvestmentsService } from './investments.service';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { FindOptionsDto, FindReturnModelDto } from 'dto/find.dto';
import { Controller, Delete, Get, Patch, Post, Param, Body, Query } from '@nestjs/common';
import { InvestmentsControllerInterface } from './interfaces/investments.controller.interface';
import { CreateDoc, DeleteDoc, FindAllDoc, FindOneDoc, UpdateDoc } from './dto/investments.documentation';
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('investments')
@Controller('investments')
export class InvestmentsController implements InvestmentsControllerInterface {
    constructor(
        private readonly service: InvestmentsService
    ) { }

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
    async findOne(@Param('id') id: string): Promise<InvestmentsEntity> {
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
    async create(@Body() object: CreateInvestmentDto): Promise<InvestmentsEntity> {
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
    async update(@Param('id') id: string, @Body() object: Partial<InvestmentsEntity>): Promise<any> {
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
    async findAll(@Query() options: FindOptionsDto<InvestmentsEntity>): Promise<FindReturnModelDto<InvestmentsEntity>> {
        try {
            return await this.service.findAll(options);

        } catch (error) {
            new Exception(error);
        }
    }
}
