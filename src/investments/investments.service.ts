import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvestmentsEntity } from './investments.entity';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { FindOptionsDto, FindReturnModelDto } from 'dto/find.dto';
import { InvestmentsServiceInterface } from './interfaces/investments.service.interface';
import { Exception } from 'interceptors/exception.filter';

@Injectable()
export class InvestmentsService implements InvestmentsServiceInterface {
    constructor(
        @InjectRepository(InvestmentsEntity)
        private repository: Repository<InvestmentsEntity>
    ) { }

    async delete(id: number): Promise<any> {
        const result = await this.repository.softDelete(id);

        if (result.affected === 0) throw new Exception({ message: 'Investimento não encontrado' })

        return result;
    }

    async findOne(id: number): Promise<InvestmentsEntity> {
        const investment = await this.repository.findOne({
            where: { id },
            relations: ['user', 'crypto'], // Faz o JOIN com a entidade UserEntity
            select: {
                user: {
                    id: true,
                    name: true
                },
                crypto: {
                    id: true,
                    name: true,
                    symbol: true,
                    price: true,
                    marketCap: true,
                    circulatingSupply: true
                }
            }
        });

        if (investment) return investment;
        else throw new Exception({ message: 'Investimento não encontrado', status: 404 });
    }

    async create(object: CreateInvestmentDto): Promise<InvestmentsEntity> {
        return await this.repository.save(object);
    }

    async findAll(options: FindOptionsDto<InvestmentsEntity>): Promise<FindReturnModelDto<InvestmentsEntity>> {
        const [rows, count] = await this.repository.findAndCount(options);

        return { rows, count }
    }

    async update(id: number, object: Partial<InvestmentsEntity>): Promise<any> {
        const result = await this.repository.update(id, object);

        if (result.affected === 0) throw new Exception({ message: 'Investimento não encontrado' })

        return result;
    }

}
