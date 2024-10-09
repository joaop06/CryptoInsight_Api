import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoCurrencyEntity } from './crypto-currency.entity';

import { ServiceInterface } from 'interfaces/ServiceInterface';

@Injectable()
export class CryptoCurrencyService implements ServiceInterface {
    constructor(
        @InjectRepository(CryptoCurrencyEntity)
        private repository: Repository<CryptoCurrencyEntity>
    ) { }

    async findOne(id: number): Promise<CryptoCurrencyEntity> {
        return await this.repository.findOneBy({ id });
    }

    async create(object: CryptoCurrencyEntity): Promise<CryptoCurrencyEntity> {
        return await this.repository.save(object);
    }

    async update(id: number, object: Partial<CryptoCurrencyEntity>): Promise<any> {
        return await this.repository.update(id, object);
    }

    async delete(id: number): Promise<any> {
        return await this.repository.softDelete(id);
    }
}
