import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvestmentsEntity } from './investments.entity';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { FindOptionsDto, FindReturnModelDto } from 'dto/find.dto';
import { InvestmentsServiceInterface } from './interfaces/investments.service.interface';

@Injectable()
export class InvestmentsService implements InvestmentsServiceInterface {
    constructor(
        @InjectRepository(InvestmentsEntity)
        private repository: Repository<InvestmentsEntity>
    ) { }

    async delete(id: number): Promise<any> {
        return await this.repository.softDelete(id);
    }

    async findOne(id: number): Promise<InvestmentsEntity> {
        return await this.repository.findOneBy({ id });
    }

    async create(object: CreateInvestmentDto): Promise<InvestmentsEntity> {
        return await this.repository.save(object);
    }

    async findAll(options: FindOptionsDto<InvestmentsEntity>): Promise<FindReturnModelDto<InvestmentsEntity>> {
        const [rows, count] = await this.repository.findAndCount(options);

        return { rows, count }
    }

    async update(id: number, object: Partial<InvestmentsEntity>): Promise<any> {
        return await this.repository.update(id, object);
    }

}
