import { Repository } from 'typeorm';
import * as tf from '@tensorflow/tfjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoCurrencyEntity } from './crypto-currency.entity';
import { FindOptionsDto, FindReturnModelDto } from 'dto/find.dto';
import { CreateCryptoCurrencyDto } from './dto/create-crypto-currency.dto';
import { CryptoCurrencyServiceInterface } from './interfaces/crypto-currency.service.interface';

@Injectable()
export class CryptoCurrencyService implements CryptoCurrencyServiceInterface {
    constructor(
        @InjectRepository(CryptoCurrencyEntity)
        private repository: Repository<CryptoCurrencyEntity>,
    ) { }

    async delete(id: number): Promise<any> {
        return await this.repository.softDelete(id);
    }

    async findOne(id: number): Promise<CryptoCurrencyEntity> {
        return await this.repository.findOneBy({ id });
    }

    async create(object: CreateCryptoCurrencyDto): Promise<CryptoCurrencyEntity> {
        return await this.repository.save(object);
    }

    async update(id: number, object: Partial<CryptoCurrencyEntity>): Promise<any> {
        return await this.repository.update(id, object);
    }

    async findAll(options?: FindOptionsDto<CryptoCurrencyEntity>): Promise<FindReturnModelDto<CryptoCurrencyEntity>> {
        const [rows, count] = await this.repository.findAndCount(options);
        return { rows, count };
    }
}
