import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoCurrencyEntity } from './crypto-currency.entity';
import { CryptoCurrencyServiceInterface } from './interfaces/crypto-currency.service.interface';

import {
    DeleteCryptoCurrencyDto,
    UpdateCryptoCurrencyDto,
    FindAllCryptoCurrencyDto,
    FindOneCryptoCurrencyDto,
    CreateCryptoCurrencyReturnDto,
    UpdateCryptoCurrencyReturnDto,
    FindAllCryptoCurrencyReturnDto,
    FindOneCryptoCurrencyReturnDto,
} from './interfaces/crypto-currency.dto.interface';
@Injectable()
export class CryptoCurrencyService implements CryptoCurrencyServiceInterface {
    constructor(
        @InjectRepository(CryptoCurrencyEntity)
        private repository: Repository<CryptoCurrencyEntity>
    ) { }

    async findOne(id: number): Promise<FindOneCryptoCurrencyReturnDto> {
        const crypto = await this.repository.findOneBy({ id });
        return { result: crypto };
    }

    async findAll(options: FindAllCryptoCurrencyDto): Promise<FindAllCryptoCurrencyReturnDto> {
        const [rows, count] = await this.repository.findAndCount(options)

        return { rows, count };
    }

    async create(object: CryptoCurrencyEntity): Promise<CreateCryptoCurrencyReturnDto> {
        const crypto = await this.repository.save(object);

        return { result: crypto };
    }

    async update(id: number, object: UpdateCryptoCurrencyDto): Promise<any> {
        return await this.repository.update(id, object);
    }

    async delete(id: number): Promise<any> {
        return await this.repository.softDelete(id);
    }
}
