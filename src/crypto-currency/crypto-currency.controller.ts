import { FindDto, FindReturnDto } from 'dto/find.dto';
import { CryptoCurrencyEntity } from './crypto-currency.entity';
import { CryptoCurrencyService } from './crypto-currency.service';
import { CreateCryptoCurrencyDto } from './dto/create-crypto-currency.dto';
import { Controller, Post, Get, Patch, Delete, Body, Param, Req } from '@nestjs/common';
import { CryptoCurrencyControllerInterface } from './interfaces/crypto-currency.controller.interface';

@Controller('crypto-currency')
export class CryptoCurrencyController implements CryptoCurrencyControllerInterface {
    constructor(private readonly service: CryptoCurrencyService) { }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<any> {
        return this.service.delete(+id);
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<CryptoCurrencyEntity> {
        return this.service.findOne(+id);
    }

    @Post()
    create(@Body() object: CreateCryptoCurrencyDto): Promise<CryptoCurrencyEntity> {
        return this.service.create(object);
    }

    @Patch()
    update(@Param('id') id: string, object: Partial<CryptoCurrencyEntity>): Promise<any> {
        return this.service.update(+id, object);
    }

    @Get()
    findAll(@Req() options: FindDto<CryptoCurrencyEntity>): Promise<FindReturnDto<CryptoCurrencyEntity>> {
        return this.service.findAll(options);
    }
}
