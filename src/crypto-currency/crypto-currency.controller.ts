import { CryptoCurrencyEntity } from './crypto-currency.entity';
import { CryptoCurrencyService } from './crypto-currency.service';
import { Controller, Post, Get, Patch, Delete, Body, Param } from '@nestjs/common';

@Controller('crypto-currency')
export class CryptoCurrencyController {
    constructor(private readonly service: CryptoCurrencyService) { }

    @Get(':id')
    findOne(@Param() id: string): Promise<CryptoCurrencyEntity> {
        return this.service.findOne(+id);
    }

    @Post()
    create(@Body() object: CryptoCurrencyEntity): Promise<CryptoCurrencyEntity> {
        return this.service.create(object);
    }

    @Patch(':id')
    update(@Param() id: string, object: CryptoCurrencyEntity): Promise<any> {
        return this.service.update(+id, object);
    }

    @Delete(':id')
    delete(@Param() id: string): Promise<any> {
        return this.service.delete(+id);
    }
}
