import { FindDto, FindReturnDto } from 'dto/find.dto';
import { InvestmentsEntity } from './investments.entity';
import { InvestmentsService } from './investments.service';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { Controller, Delete, Get, Patch, Post, Param, Req } from '@nestjs/common';
import { InvestmentsControllerInterface } from './interfaces/investments.controller.interface';

@Controller('investments')
export class InvestmentsController implements InvestmentsControllerInterface {
    constructor(
        private readonly service: InvestmentsService
    ) { }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<any> {
        return this.service.delete(+id);
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<InvestmentsEntity> {
        return this.service.findOne(+id);
    }

    @Post()
    create(object: CreateInvestmentDto): Promise<InvestmentsEntity> {
        return this.service.create(object);
    }

    @Get()
    findAll(@Req() options: FindDto<InvestmentsEntity>): Promise<FindReturnDto<InvestmentsEntity>> {
        return this.service.findAll(options);
    }

    @Patch(':id')
    update(@Param('id') id: string, object: Partial<InvestmentsEntity>): Promise<any> {
        return this.service.update(+id, object);
    }
}
