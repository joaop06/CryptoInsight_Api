import { CryptoCurrencyEntity } from './crypto-currency.entity';
import { CryptoCurrencyService } from './crypto-currency.service';
import { Controller, Post, Get, Patch, Delete, Body, Param } from '@nestjs/common';
import { CryptoCurrencyControllerInterface } from './interfaces/crypto-currency.controller.interface';

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

@Controller('crypto-currency')
export class CryptoCurrencyController implements CryptoCurrencyControllerInterface {
    constructor(private readonly service: CryptoCurrencyService) { }

    @Get(':id')
    findOne(@Param('id') id: FindOneCryptoCurrencyDto): Promise<FindOneCryptoCurrencyReturnDto> {
        return this.service.findOne(+id);
    }

    @Get()
    findAll(options: FindAllCryptoCurrencyDto): Promise<FindAllCryptoCurrencyReturnDto> {
        return this.service.findAll(options);
    }

    @Post()
    create(@Body() object: CryptoCurrencyEntity): Promise<CreateCryptoCurrencyReturnDto> {
        return this.service.create(object);
    }

    @Patch(':id')
    update(@Param('id') id: string, object: UpdateCryptoCurrencyDto): Promise<UpdateCryptoCurrencyReturnDto> {
        return this.service.update(+id, object);
    }

    @Delete(':id')
    delete(@Param('id') id: DeleteCryptoCurrencyDto): Promise<any> {
        return this.service.delete(+id);
    }
}
